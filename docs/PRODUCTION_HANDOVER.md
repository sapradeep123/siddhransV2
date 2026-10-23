# Siddhrans V2: Production Handover

Verified on the server on **2026-10-23**. This document contains no passwords, private keys or environment-file contents.

## 1. Production

| | |
|---|---|
| URL | https://siddhrans.vackya.com/ |
| VPS | 84.247.129.127 (Ubuntu 24.04.4 LTS, nginx 1.24, Node 22, k3s with Traefik and cert-manager) |
| DNS | `siddhrans.vackya.com` A record → 84.247.129.127. No AAAA record. |
| App checkout | `/opt/siddhrans/app` (owned by root; the contact service reads it as user `siddhrans`) |

## 2. GitHub

| | |
|---|---|
| Repository | https://github.com/sapradeep123/siddhransV2 (SSH remote `git@github.com:sapradeep123/siddhransV2.git`) |
| Branch | `main` |
| Latest commit | **`1a66c1dcdb8a0b6d297a9172d3d8ce2a2c30b10e`** (local `main` equals `origin/main`, 0 ahead, 0 behind, clean tree) |
| Author | Pradeep <sapradeep123@gmail.com> (repository-local identity) |

Recent history:

| Commit | Change | Affects |
|---|---|---|
| `1a66c1d` | Branded HTML enquiry email (`server/email.mjs`, `server/contact.mjs`, `server/index.mjs`, tests) | Contact service only |
| `c2a005f` | SEO tests read `SITE_URL` instead of hardcoding `siddhrans.com` | Tests only |
| `22f7d91` | VPS deployment kit (nginx and systemd templates, release/rollback/smoke scripts) | The frontend release below was built from this commit |

## 3. Deployed frontend vs latest GitHub commit (they differ, on purpose)

| | Commit | Notes |
|---|---|---|
| **Latest on GitHub** | `1a66c1d` | |
| **Frontend release currently live** | built from **`22f7d91`** | Release directory **`/var/www/siddhrans/releases/20261023-105401`**, active via the symlink `/var/www/siddhrans/current` |
| **Contact service currently running** | `1a66c1d` | Runs straight from `/opt/siddhrans/app`; restarted 2026-10-23 11:22 CEST |

The two newer commits change only tests (`c2a005f`) and the server-side contact service (`1a66c1d`). Neither changes anything the frontend build produces, so no frontend rebuild was needed. The site was built with `SITE_URL=https://siddhrans.vackya.com`, so canonical URLs, the sitemap, Open Graph tags and structured data all use that domain.

## 4. Contact service

- Systemd unit `siddhrans-contact`: **active and enabled**, bound to **127.0.0.1:8787 only**. Nginx proxies `/api/` to it, and it is not exposed directly.
- `/api/health` returns `{"ok":true}`.
- **Branded HTML email is running.** `server/contact.mjs` calls `buildEnquiryEmail` from `server/email.mjs`. Each message is multipart (HTML plus plain text) with the subject `New Website Enquiry | <Area> | Siddhrans`. The logo is the original `/brand/Siddhrans_Logo.png`, served from the production domain. All visitor input is HTML-escaped, and empty optional fields are omitted.
- The recipient confirmed that the test email arrived and looked correct.
- The form shows success only after SMTP accepts the message (200). A send failure returns 502 and the form shows its error message with the direct phone numbers and email.
- Validation, the per-client rate limit (app and nginx) and the honeypot field are unchanged.

## 5. SMTP (credentials not shown)

| Setting | Value |
|---|---|
| Provider | Hostinger |
| Host / port | `smtp.hostinger.com` : `465`, implicit TLS (`SMTP_SECURE=true`) |
| Account / From | `info@khubera.in` |
| Recipient | `gururaj.n@siddhrans.com` |
| Reply-To | The visitor's name and email |
| Password | Held only in `/etc/siddhrans-contact.env` (root:root, mode 600). It is not in GitHub, logs or this document. |
| Public origin for email links and logo | `SITE_URL` in the same env file |

An authenticated SMTP check succeeded, and real test enquiries were delivered.

## 6. Architecture: nginx, Traefik, cert-manager

Public ports 80 and 443 on this VPS belong to a **k3s Traefik ingress**, not to host nginx. Host nginx is an internal "origin" for several sites. Certbot is **not** used on this server.

```
Internet :80/:443
   │
Traefik (k3s)  ── TLS termination, HTTP→HTTPS redirect (308), certificates from cert-manager (ClusterIssuer letsencrypt-prod)
   │   Ingress siddhrans-web / siddhrans-http-redirect  → Service siddhrans-origin:8086 (namespace siddhrans)
   ▼
host nginx  10.42.0.1:8086  (/etc/nginx/sites-enabled/siddhrans)
   ├─ /           static site from /var/www/siddhrans/current  (no-cache for pages, security headers)
   ├─ /_next/static/  cached 1 year, immutable
   ├─ /img /brand /og cached 30 days
   └─ /api/       → 127.0.0.1:8787 (contact service), body limit 32k, rate limit 10 req/min per client
```

| Piece | Location |
|---|---|
| nginx origin vhost | `/etc/nginx/sites-available/siddhrans`, symlinked in `sites-enabled`. A backup of the pre-HSTS version is at `/root/siddhrans.nginx.bak`. |
| Kubernetes manifest (namespace, Service, Endpoints, Middleware, 2 Ingresses) | `/opt/siddhrans/k8s/siddhrans.yaml` (outside the repo) |
| Certificate | cert-manager `Certificate` `siddhrans-vackya-com-tls` (namespace `siddhrans`) |
| Other sites on the same stack | Hataka, Khubera, Xsainik (all returned HTTP 200 at verification). They were not modified. |

## 7. SSL, renewal and HSTS

- **Certificate:** Let's Encrypt (issuer CN=YR1), SAN `siddhrans.vackya.com` only. Valid from 2026-10-23, **expires 2027-01-21**. TLS verification returns code 0 (OK).
- **Renewal:** automatic via cert-manager. The renewal time is **2026-12-22**. `certbot renew --dry-run` does not apply here, because certbot manages no certificates on this host. A forced test renewal has **not** been run.
- **HTTP to HTTPS:** `http://siddhrans.vackya.com/` returns 308 to HTTPS.
- **HSTS:** `Strict-Transport-Security: max-age=31536000` on all routes. There is **no `includeSubDomains`** and **no `preload`**. This is deliberate: subdomains are not controlled by this deployment and preload is hard to undo.

## 8. Published telephone numbers

- **+91 89712 34343** (`tel:+918971234343`)
- **+91 99024 06387** (`tel:+919902406387`)

Both appear on the Contact page and footer at all viewport sizes, and in the email footer.

## 9. Latest test results (2026-10-23)

| Test | Result |
|---|---|
| Repo smoke test `scripts/deploy/smoke-test.sh https://siddhrans.vackya.com` (re-run during this handover) | **ALL CHECKS PASSED** (32 checks: 18 pages and the 404 page, robots and sitemap, both phone numbers and the email, footer, logo hash, security headers, contact API route and health) |
| Live browser pass, animations on, 12 pages × 3 widths (1440, 820, 390 px) (re-run during this handover) | 36 of 36 clean: no console or JavaScript errors, no failed requests, no broken images, no horizontal overflow |
| Floating navigation versus footer | The nav hides itself at the bottom of every page at every width, so there is no overlap |
| Product tabs, mobile navigation, phone links | All 4 tabs work at all widths. The mobile menu opens with 7 links. Both phone links are present. |
| Case studies: jump links, content reveal, 11 images, 3 talent cards, concept mockups | All pass on desktop and mobile. (My script's checklist count of 13 was wrong; the page correctly has 15.) |
| Repo e2e suite against the live site (run before the last commits) | 290 passed, 1 skipped. The only failures were SEO tests that hardcoded `siddhrans.com`; they were fixed in `c2a005f` and now pass 19 of 19 with `SITE_URL` set. The full suite was **not** re-run after `c2a005f` and `1a66c1d`, which touched only tests and the contact service. |
| Contact API tests (`npm run test:api`) | 16 of 16 pass (includes 7 email tests: subject, escaping, optional fields, multipart headers) |
| Real contact submission through the live form | Success shown only after SMTP accepted; email delivered and visually approved |
| Original logo | SHA-256 `9bfd52b5aa328b90dc5c0ca9a7e7b8966746787ea22b5688e6f902e56fb7dfa7` matches the approved original (smoke test) |

## 10. GitHub SSH deploy key

- Private key `/root/.ssh/siddhrans/siddhransV2_deploy` (Ed25519, mode 600). Public key `siddhransV2_deploy.pub`. Fingerprint `SHA256:qU+FeYsR4MSWiM9bCLvtE5BFp509FxXeDXqBuGUsbBk`.
- Registered on GitHub as a deploy key for this repository, with write access.
- GitHub host keys are pinned from `https://api.github.com/meta` in `/root/.ssh/siddhrans/known_hosts` (strict checking).
- Used only by this repository, through its **local** config: `core.sshCommand` set to `ssh -i … -o IdentitiesOnly=yes -o UserKnownHostsFile=… -o StrictHostKeyChecking=yes`, and `origin` set to the SSH URL. Global Git and SSH settings and other keys were not changed.
- Authentication was verified (`Hi sapradeep123/siddhransV2!`) and a push succeeded.

## 11. Operations: exact commands

All commands run on the VPS as root.

**Pull the latest code**
```bash
cd /opt/siddhrans/app && git pull --ff-only
```

**Deploy a new frontend release** (builds, verifies the logo, switches the symlink atomically, keeps the last 5 releases)
```bash
cd /opt/siddhrans/app
SITE_URL=https://siddhrans.vackya.com scripts/deploy/release.sh
scripts/deploy/smoke-test.sh https://siddhrans.vackya.com
```

**Update the contact service** (only if `server/` or dependencies changed)
```bash
cd /opt/siddhrans/app && npm ci --omit=dev     # note: release.sh runs a full `npm ci`, which also works
chmod -R o+rX /opt/siddhrans/app/server
systemctl restart siddhrans-contact
systemctl is-active siddhrans-contact; curl -s http://127.0.0.1:8787/api/health
journalctl -u siddhrans-contact -n 20 --no-pager     # logs event names only, never enquiry contents
```

**Change SMTP settings or the password:** edit `sudo nano /etc/siddhrans-contact.env`, then `systemctl restart siddhrans-contact`. Do not paste the password into chat, tickets or Git.

**Reload nginx after editing the origin vhost**
```bash
nginx -t && systemctl reload nginx
```

**Roll back the frontend** (instant symlink switch)
```bash
cd /opt/siddhrans/app
scripts/deploy/rollback.sh                    # previous release
scripts/deploy/rollback.sh 20261023-105401    # a named release folder
```
Note that only one release exists today, so rollback has nothing to switch to until a second release is created.

**Roll back the contact service**
```bash
cd /opt/siddhrans/app && git checkout <previous-commit> -- server package.json && systemctl restart siddhrans-contact
# afterwards: git checkout main -- server package.json  (or git revert) to return to the repository state
```

**Kubernetes objects** (only if the ingress needs to change)
```bash
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
k3s kubectl apply -f /opt/siddhrans/k8s/siddhrans.yaml
k3s kubectl -n siddhrans get ingress,certificate
```

## 12. Unresolved items and risks

1. **Domain is the staging-style `siddhrans.vackya.com`.** Canonical URLs, sitemap, Open Graph tags, the ingress host, the certificate and the email links all use it. To move to `siddhrans.com`: update DNS, add the host to `/opt/siddhrans/k8s/siddhrans.yaml` (ingress and certificate), update `server_name` in the nginx vhost, set `SITE_URL` in `/etc/siddhrans-contact.env`, rebuild with `SITE_URL=https://siddhrans.com scripts/deploy/release.sh`, and re-run the tests with `SITE_URL` set. HSTS is already live on the current host.
2. **Email deliverability is only confirmed for one mailbox.** Mail is sent from `khubera.in` to `siddhrans.com`. SPF, DKIM and DMARC for `khubera.in` were not checked, and spam placement may differ for other mailboxes or providers. Rendering was verified in Chromium and in the recipient's mailbox, not in every email client (Outlook desktop, Gmail app and so on).
3. **Only one frontend release exists,** so there is no previous release to roll back to until the next deploy.
4. **`docs/DEPLOYMENT.md` does not match this server.** It describes nginx on ports 80/443 with certbot. On this VPS the TLS and redirect layer is Traefik and cert-manager. Following the document literally here would conflict with the other sites, so it should be updated.
5. **The contact service runs from the git working tree.** A `git pull` changes the code on disk before the service is restarted, and the service depends on the `siddhrans` user being able to read `/opt/siddhrans/app` (`chmod -R o+rX`).
6. **The full e2e suite was not re-run after the last two commits.** Only the contact API tests (16/16), the live SEO tests and the live browser scripts were.
7. **Content items still open in the repo** (`docs/CONTENT_APPROVALS.md`): confirmation that the second phone number may be published, the privacy notice review, and no favicon yet.
8. **Housekeeping:** `/root/siddhrans.nginx.bak` and `/root/siddhrans-contact.env.bak` (the latter holds only the earlier placeholder settings, no password) can be deleted once no longer wanted. The `/api/health` endpoint is reachable publicly through nginx; it returns only `{"ok":true}`.
9. **Not tested:** a forced certificate renewal, a real send from a second device or network, and load behaviour.

## 13. Production-readiness assessment

**Ready for production use.** The site is publicly reachable over valid HTTPS with automatic renewal and HSTS. All smoke and browser checks pass, the contact form delivers branded email through Hostinger and reports failure honestly, the code is on GitHub with a clean tree, and the other sites on the VPS were not affected.

The main caveats are the staging-style domain (a deliberate, documented migration if `siddhrans.com` is wanted), email deliverability that depends on `khubera.in`'s sender authentication, and the single release available for rollback.
