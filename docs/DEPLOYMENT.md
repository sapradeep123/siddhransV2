# Deploying Siddhrans V2 to a Linux VPS with nginx

Simple, no Docker, no CI/CD. Two parts:

1. **The website**: a static export (`out/`), served directly by nginx.
2. **The contact API**: a tiny Node service (`server/`) behind nginx at `/api/`, which emails enquiries. It stores nothing.

Nothing in this repository connects to your server or changes DNS, nginx or SSL by itself. Files under `deploy/` are templates you copy and edit.

## Choose your topology
| Topology | Who owns ports 80/443 | TLS | Use sections |
|---|---|---|---|
| **A. Plain VPS** | host nginx | certbot | 3A, 4A |
| **B. k3s host with Traefik + cert-manager** (the production VPS, `84.247.129.127`) | Traefik in k3s | cert-manager (`letsencrypt-prod`) | 3B, 4B |

Run `ss -tlnp | grep -E ':(80|443)\b'` first. If nothing host-side listens on 80/443 and `k3s kubectl -n kube-system get deploy traefik` exists, you are on topology B: **do not** install a 443 server block or run certbot, because they would collide with Traefik and the other sites. Everything else (build, contact API, smoke test, rollback) is identical in both. Full production details are in `docs/PRODUCTION_HANDOVER.md`.

## What the VPS needs
- Linux with nginx, `git`, `curl`, and **Node.js 20.9 or newer** (22 LTS recommended; see `.node-version`).
- About **1.5 GB RAM free while building** (Next.js build). If the VPS is small, build on your PC or a CI runner and copy `out/` instead (see "Build elsewhere").
- A domain pointing at the VPS (you handle DNS) and an SMTP mailbox/relay for sending enquiry emails.

## Exact files and directories the deployment uses
| Path | Purpose |
|---|---|
| `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `.node-version` | build definition |
| `src/` | application source (18 pages, components, content) |
| `public/` | logo (`brand/Siddhrans_Logo.png`, unchanged), photographs (`img/`), social image (`og/`) |
| `scripts/verify-logo.mjs` | confirms the logo hash during release |
| `scripts/deploy/{release,rollback,smoke-test}.sh` | deployment helpers |
| `server/` (`index.mjs`, `contact.mjs`) | contact API source (uses `nodemailer` from the root `package.json`) |
| `deploy/nginx/siddhrans.conf` | nginx template |
| `deploy/systemd/siddhrans-contact.service` | systemd unit template |
| `deploy/siddhrans-contact.env.example` | environment template (real values go in `/etc/siddhrans-contact.env`, never in git) |
| **Generated, not in git:** `out/` (the site), `.next/`, `node_modules/` | produced by the build |

Fonts are downloaded at build time and self-hosted inside `out/_next/static/media/`; the site makes no request to Google or any third party at runtime. The build machine needs internet access once, to fetch the fonts and npm packages.

## 1. One-time setup
```bash
# a service user and directories
sudo useradd --system --home /opt/siddhrans --shell /usr/sbin/nologin siddhrans
sudo mkdir -p /opt/siddhrans /var/www/siddhrans/releases /var/www/letsencrypt
sudo chown -R $USER:$USER /opt/siddhrans /var/www/siddhrans          # deploy user owns the app and releases

# clone the repository
git clone https://github.com/sapradeep123/siddhransV2.git /opt/siddhrans/app
cd /opt/siddhrans/app
```
(No credentials are stored in the repository.) On the production VPS the checkout pushes and pulls with a dedicated, repository-only SSH deploy key, configured in the repo's **local** Git config so global Git/SSH settings are untouched:
```bash
ssh-keygen -t ed25519 -N "" -C "siddhransV2-deploy@$(hostname)" -f /root/.ssh/siddhrans/siddhransV2_deploy      # then add the .pub under GitHub: repo Settings > Deploy keys (tick "Allow write access" only if this server must push)
curl -s https://api.github.com/meta | python3 -c "import sys,json;[print('github.com',k) for k in json.load(sys.stdin)['ssh_keys']]" > /root/.ssh/siddhrans/known_hosts
git config --local core.sshCommand "ssh -i /root/.ssh/siddhrans/siddhransV2_deploy -o IdentitiesOnly=yes -o UserKnownHostsFile=/root/.ssh/siddhrans/known_hosts -o StrictHostKeyChecking=yes"
git remote set-url origin git@github.com:sapradeep123/siddhransV2.git
ssh -i /root/.ssh/siddhrans/siddhransV2_deploy -o IdentitiesOnly=yes -o UserKnownHostsFile=/root/.ssh/siddhrans/known_hosts -T git@github.com   # expect: "Hi sapradeep123/siddhransV2!"
```

### Contact API secrets (kept on the VPS only)
```bash
sudo cp deploy/siddhrans-contact.env.example /etc/siddhrans-contact.env
sudo chown root:root /etc/siddhrans-contact.env && sudo chmod 600 /etc/siddhrans-contact.env
sudo nano /etc/siddhrans-contact.env     # set MAIL_TO, MAIL_FROM, SMTP_HOST/PORT/USER/PASS
```
`MAIL_TO` defaults to `gururaj.n@siddhrans.com`. `TRUST_PROXY=true` is correct because nginx sits in front. Set `SITE_URL` to the public origin (for example `https://siddhrans.vackya.com`): the enquiry email loads the original logo from `$SITE_URL/brand/Siddhrans_Logo.png` and links back to that site. For Hostinger use `SMTP_HOST=smtp.hostinger.com`, `SMTP_PORT=465`, `SMTP_SECURE=true` (implicit TLS); for STARTTLS on 587 use `SMTP_SECURE=false`. Enter `SMTP_PASS` yourself in a terminal editor (`sudo nano /etc/siddhrans-contact.env`), never in chat or Git.

### Contact API service
```bash
cd /opt/siddhrans/app && npm ci --omit=dev          # installs nodemailer for the API
sudo cp deploy/systemd/siddhrans-contact.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now siddhrans-contact
curl -s http://127.0.0.1:8787/api/health            # {"ok":true}
```
If the service cannot read `/opt/siddhrans/app`, make the directory readable by the `siddhrans` user (`chmod -R o+rX /opt/siddhrans/app`). Watch logs with `journalctl -u siddhrans-contact -f` (only event names are logged, never enquiry contents).

## 2. Build and publish the website
```bash
cd /opt/siddhrans/app
git pull --ff-only
SITE_URL=https://siddhrans.vackya.com scripts/deploy/release.sh   # use the domain being served
```
`release.sh` runs `npm ci`, builds with `NEXT_PUBLIC_SITE_URL` baked into canonical URLs, sitemap, Open Graph and structured data, verifies the logo SHA-256, copies `out/` to `/var/www/siddhrans/releases/<timestamp>/`, atomically points `/var/www/siddhrans/current` at it, and keeps the last 5 releases. (`npm ci` here installs dev dependencies too, which the build needs; the API service uses the same `node_modules`.)

### Build elsewhere (small VPS)
On your PC: `npm ci && NEXT_PUBLIC_SITE_URL=https://siddhrans.com npm run build && npm run verify:logo`, then
`rsync -a --delete out/ user@vps:/var/www/siddhrans/releases/$(date +%Y%m%d-%H%M%S)/` and switch the symlink with `ln -sfn <release> /var/www/siddhrans/current`.

## 3A. nginx (topology A: plain VPS, nginx owns 80/443)
```bash
sudo cp deploy/nginx/siddhrans.conf /etc/nginx/conf.d/siddhrans.conf
sudo nano /etc/nginx/conf.d/siddhrans.conf      # server names, certificate paths
sudo nginx -t && sudo systemctl reload nginx
```
Keep your existing sites untouched: this is a separate file with its own `server_name`. Try it first on a staging hostname before using the real domain.

## 3B. nginx origin + Traefik ingress (topology B: k3s host, production VPS)
Traefik terminates TLS and redirects HTTP to HTTPS; host nginx only serves an internal **origin** that Traefik forwards to.

```
Internet :80/:443 → Traefik (k3s) → Service siddhrans-origin:8086 → Endpoints 10.42.0.1:8086 → host nginx origin
                                                                    ├─ /      static site (/var/www/siddhrans/current)
                                                                    └─ /api/  → 127.0.0.1:8787 (contact service)
```

**1) nginx origin.** Adapt `deploy/nginx/siddhrans.conf`: remove both `listen 80/443` blocks and all `ssl_*` lines, and listen only on the cluster bridge address on a free port (check `ss -tlnp | grep 10.42.0.1`; `8086` is used by Siddhrans):
```nginx
limit_req_zone $binary_remote_addr zone=siddhrans_contact:10m rate=10r/m;
server {
    listen 10.42.0.1:8086;
    server_name siddhrans.vackya.com;
    set_real_ip_from 10.42.0.0/16;          # trust Traefik's X-Forwarded-For
    real_ip_header X-Forwarded-For;
    real_ip_recursive on;
    server_tokens off;
    root /var/www/siddhrans/current;
    # ...same locations, caching and security headers as the template...
    # in `location /api/`:  proxy_set_header X-Forwarded-Proto https;
}
```
Install it as `/etc/nginx/sites-available/siddhrans`, symlink it into `sites-enabled`, then `sudo nginx -t && sudo systemctl reload nginx`. Check it directly:
`curl -s -o /dev/null -w '%{http_code}\n' -H 'Host: siddhrans.vackya.com' http://10.42.0.1:8086/`

**2) Kubernetes objects** (new namespace `siddhrans`; nothing existing is modified). Save as `siddhrans.yaml` and `k3s kubectl apply -f` it:
```yaml
apiVersion: v1
kind: Namespace
metadata: {name: siddhrans}
---
apiVersion: v1
kind: Service
metadata: {name: siddhrans-origin, namespace: siddhrans}
spec: {ports: [{port: 8086, targetPort: 8086}]}
---
apiVersion: v1
kind: Endpoints
metadata: {name: siddhrans-origin, namespace: siddhrans}
subsets: [{addresses: [{ip: 10.42.0.1}], ports: [{port: 8086}]}]
---
apiVersion: traefik.io/v1alpha1
kind: Middleware
metadata: {name: redirect-https, namespace: siddhrans}
spec: {redirectScheme: {scheme: https, permanent: true}}
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: siddhrans-web
  namespace: siddhrans
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
    traefik.ingress.kubernetes.io/router.tls: "true"
spec:
  ingressClassName: traefik
  rules:
  - host: siddhrans.vackya.com
    http: {paths: [{path: /, pathType: Prefix, backend: {service: {name: siddhrans-origin, port: {number: 8086}}}}]}
  tls: [{hosts: [siddhrans.vackya.com], secretName: siddhrans-vackya-com-tls}]
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: siddhrans-http-redirect
  namespace: siddhrans
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: web
    traefik.ingress.kubernetes.io/router.middlewares: siddhrans-redirect-https@kubernetescrd
spec:
  ingressClassName: traefik
  rules:
  - host: siddhrans.vackya.com
    http: {paths: [{path: /, pathType: Prefix, backend: {service: {name: siddhrans-origin, port: {number: 8086}}}}]}
```
The live copy is `/opt/siddhrans/k8s/siddhrans.yaml` on the VPS. To serve another hostname (for example `siddhrans.com`), add it to `rules` and `tls.hosts`, and to `server_name` in the nginx origin.

## 4A. HTTPS with certbot (topology A only)
```bash
sudo apt install certbot            # or: sudo snap install --classic certbot
# 1) first deploy ONLY the port-80 server block (comment out the 443 block), reload nginx, then:
sudo certbot certonly --webroot -w /var/www/letsencrypt -d siddhrans.com -d www.siddhrans.com
# 2) re-enable the 443 block, then
sudo nginx -t && sudo systemctl reload nginx
sudo certbot renew --dry-run        # renewal is automatic via the certbot timer
```

## 4B. HTTPS with cert-manager (topology B, production VPS)
The `cert-manager.io/cluster-issuer: letsencrypt-prod` annotation on `siddhrans-web` makes cert-manager request the certificate by itself (HTTP-01 through Traefik). Certbot is **not** used and `certbot renew --dry-run` does not apply.
```bash
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
k3s kubectl -n siddhrans get certificate,order,challenge            # Certificate READY should become True in about 30 s
k3s kubectl -n siddhrans get certificate siddhrans-vackya-com-tls -o jsonpath='notAfter={.status.notAfter} renewal={.status.renewalTime}'
echo | openssl s_client -connect siddhrans.vackya.com:443 -servername siddhrans.vackya.com -verify_return_error 2>&1 | grep 'Verify return code'
```
Certificates last 90 days and cert-manager renews them about 30 days before expiry. If issuance stalls, `k3s kubectl -n siddhrans describe challenge` shows why (usually DNS not yet pointing at the VPS).

## 4C. HSTS (both topologies)
Enable only after HTTPS works. Production sends `Strict-Transport-Security: max-age=31536000` **without** `includeSubDomains` and **without** `preload`. On topology B add the header in the nginx origin (Traefik is shared with other sites, so do not set it there). nginx does not inherit `add_header` into a location that sets its own, so repeat it in every location that does (`/`, `/_next/static/`, the `img|brand|og` location and `/api/`).

## 5. Smoke test
```bash
scripts/deploy/smoke-test.sh https://siddhrans.vackya.com     # the domain being served
```
It checks all 18 pages and the 404 page, `robots.txt`, `sitemap.xml`, both phone numbers and the email on the Contact page, the footer, the original logo hash, security headers, and that `POST /api/contact` reaches the API (expects a 400 validation reply for an empty body) and `/api/health`. Then submit one real enquiry from the Contact page and confirm it arrives in the `MAIL_TO` mailbox.

The website sends enquiries to `/api/contact` on its own origin, which is exactly what the nginx `location /api/` forwards to `127.0.0.1:8787`.

## 6. Updating later
```bash
cd /opt/siddhrans/app && git pull --ff-only && SITE_URL=https://siddhrans.vackya.com scripts/deploy/release.sh && scripts/deploy/smoke-test.sh https://siddhrans.vackya.com
# if server/ or dependencies changed:
npm ci --omit=dev && sudo systemctl restart siddhrans-contact
```

## 7. Rollback
```bash
scripts/deploy/rollback.sh                 # back to the previous release (instant symlink switch)
scripts/deploy/rollback.sh 20261023-101500 # or a named release folder
sudo systemctl stop siddhrans-contact      # if needed: the form then shows its error message with the direct phone numbers and email
```
nginx: restore the previous file and `sudo nginx -t && sudo systemctl reload nginx`.

## 8. Security notes
- No secrets are in the repository. `.env` files are git-ignored; only `*.env.example` templates are tracked.
- The API validates input, neutralises header injection, rate-limits per client (and nginx rate-limits again), has a hidden spam-trap field, caps body size at 20 KB, and never logs enquiry contents.
- The systemd unit runs as an unprivileged user with a read-only filesystem and a memory cap.
- The CSP in the nginx template matches what the automated tests run against (no third-party origins).

## 9. Known items before go-live
Confirm the enquiry recipient and the second phone number (`+91 99024 06387`) as publishable; supply a favicon (none exists; the site ships a blank icon); review the privacy notice; confirm the canonical domain (`NEXT_PUBLIC_SITE_URL` / `SITE_URL`). See `docs/CONTENT_APPROVALS.md`.
