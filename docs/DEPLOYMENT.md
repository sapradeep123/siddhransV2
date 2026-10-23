# Deploying Siddhrans V2 to a Linux VPS with nginx

Simple, no Docker, no CI/CD. Two parts:

1. **The website**: a static export (`out/`), served directly by nginx.
2. **The contact API**: a tiny Node service (`server/`) behind nginx at `/api/`, which emails enquiries. It stores nothing.

Nothing in this repository connects to your server or changes DNS, nginx or SSL by itself. Files under `deploy/` are templates you copy and edit.

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
(Use SSH or a read-only deploy key if you prefer; no credentials are stored in the repository.)

### Contact API secrets (kept on the VPS only)
```bash
sudo cp deploy/siddhrans-contact.env.example /etc/siddhrans-contact.env
sudo chown root:root /etc/siddhrans-contact.env && sudo chmod 600 /etc/siddhrans-contact.env
sudo nano /etc/siddhrans-contact.env     # set MAIL_TO, MAIL_FROM, SMTP_HOST/PORT/USER/PASS
```
`MAIL_TO` defaults to `gururaj.n@siddhrans.com` (proposed recipient; confirm it). `TRUST_PROXY=true` is correct because nginx sits in front.

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
SITE_URL=https://siddhrans.com scripts/deploy/release.sh
```
`release.sh` runs `npm ci`, builds with `NEXT_PUBLIC_SITE_URL` baked into canonical URLs, sitemap, Open Graph and structured data, verifies the logo SHA-256, copies `out/` to `/var/www/siddhrans/releases/<timestamp>/`, atomically points `/var/www/siddhrans/current` at it, and keeps the last 5 releases. (`npm ci` here installs dev dependencies too, which the build needs; the API service uses the same `node_modules`.)

### Build elsewhere (small VPS)
On your PC: `npm ci && NEXT_PUBLIC_SITE_URL=https://siddhrans.com npm run build && npm run verify:logo`, then
`rsync -a --delete out/ user@vps:/var/www/siddhrans/releases/$(date +%Y%m%d-%H%M%S)/` and switch the symlink with `ln -sfn <release> /var/www/siddhrans/current`.

## 3. nginx
```bash
sudo cp deploy/nginx/siddhrans.conf /etc/nginx/conf.d/siddhrans.conf
sudo nano /etc/nginx/conf.d/siddhrans.conf      # server names, certificate paths
sudo nginx -t && sudo systemctl reload nginx
```
Keep your existing sites untouched: this is a separate file with its own `server_name`. Try it first on a staging hostname such as `staging.siddhrans.com` before using the real domain. Review `siddhrans.com` redirecting to `cyyberaix.in` (currently done by the old host) as a separate, deliberate decision.

## 4. HTTPS
Use Let's Encrypt with certbot (webroot method, so nginx is not stopped):
```bash
sudo apt install certbot            # or: sudo snap install --classic certbot
# 1) first deploy ONLY the port-80 server block (comment out the 443 block), reload nginx, then:
sudo certbot certonly --webroot -w /var/www/letsencrypt -d siddhrans.com -d www.siddhrans.com
# 2) re-enable the 443 block, then
sudo nginx -t && sudo systemctl reload nginx
sudo certbot renew --dry-run        # renewal is automatic via the certbot timer
```
After HTTPS works on every hostname, uncomment the `Strict-Transport-Security` line in the nginx file. Do not enable it earlier: browsers remember it.

## 5. Smoke test
```bash
scripts/deploy/smoke-test.sh https://siddhrans.com
```
It checks all 18 pages and the 404 page, `robots.txt`, `sitemap.xml`, both phone numbers and the email on the Contact page, the footer, the original logo hash, security headers, and that `POST /api/contact` reaches the API (expects a 400 validation reply for an empty body) and `/api/health`. Then submit one real enquiry from the Contact page and confirm it arrives in the `MAIL_TO` mailbox.

The website sends enquiries to `/api/contact` on its own origin, which is exactly what the nginx `location /api/` forwards to `127.0.0.1:8787`.

## 6. Updating later
```bash
cd /opt/siddhrans/app && git pull --ff-only && SITE_URL=https://siddhrans.com scripts/deploy/release.sh && scripts/deploy/smoke-test.sh https://siddhrans.com
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
