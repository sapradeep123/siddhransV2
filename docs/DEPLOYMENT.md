# Deployment guide: Siddhrans InfoTech website

**Nothing in this guide has been run.** The website has not been deployed, and no DNS, nginx, SSL or live-site change has been made. Follow it only when you decide to go live, ideally first on a staging hostname.

## What gets deployed
1. **Static site**: the `out/` folder produced by `npm run build` (plain HTML/CSS/JS/images; no Node process needed to serve it).
2. **Contact API** (optional but required for the enquiry form to work): `server/` run as a small Node service, reverse-proxied by nginx at `/api/contact`.

## 0. Before you start
- Decide the canonical hostname (proposed `siddhrans.com`). Today `siddhrans.com` redirects (via LiteSpeed) to `cyyberaix.in`, which is served by nginx on your VPS. Changing that redirect or DNS is your decision and is not covered here.
- Confirm the enquiry recipient (`MAIL_TO`, proposed `gururaj.n@siddhrans.com`) and create an SMTP mailbox or relay for `MAIL_FROM`.
- Back up the current site and nginx configuration (see Rollback).
- Review `docs/CONTENT_APPROVALS.md` and clear the items listed there.

## 1. Build (on your computer or a CI runner, not on the VPS)
```bash
git clone git@github.com:sapradeep123/siddhransV2.git && cd siddhransV2
npm ci
NEXT_PUBLIC_SITE_URL=https://siddhrans.com npm run build   # canonical URL used in metadata, sitemap and robots
npm run verify:logo                                        # must print: Logo verified against approved SHA-256 9bfd52b5...dfa7
npm run test:e2e                                           # optional full test run (needs Microsoft Edge or Chrome)
```
Fonts are self-hosted by the build; the site makes no runtime request to Google or any third party.

## 2. Upload the static site (release folders, instant rollback)
```bash
REL=/var/www/siddhrans/releases/$(date +%Y%m%d-%H%M%S)
ssh user@vps "mkdir -p $REL"
rsync -a --delete out/ user@vps:$REL/
ssh user@vps "ln -sfn $REL /var/www/siddhrans/current"       # switching = one symlink
```

## 3. Contact API service
```bash
rsync -a server/ user@vps:/opt/siddhrans-contact/            # contains its own package.json (nodemailer only)
ssh user@vps "cd /opt/siddhrans-contact && npm install --omit=dev"
```
`/etc/siddhrans-contact.env` (mode 600; never commit):
```
MAIL_TO=gururaj.n@siddhrans.com
MAIL_FROM="Siddhrans Website <website@siddhrans.com>"
SMTP_HOST=...        SMTP_PORT=587     SMTP_SECURE=false
SMTP_USER=...        SMTP_PASS=...
PORT=8787            HOST=127.0.0.1    TRUST_PROXY=true
RATE_LIMIT_MAX=5     RATE_WINDOW_MS=900000
```
`/etc/systemd/system/siddhrans-contact.service`:
```ini
[Unit]
Description=Siddhrans contact API
After=network.target

[Service]
WorkingDirectory=/opt/siddhrans-contact
EnvironmentFile=/etc/siddhrans-contact.env
ExecStart=/usr/bin/node index.mjs
Restart=on-failure
User=www-data
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl daemon-reload && sudo systemctl enable --now siddhrans-contact
curl -s http://127.0.0.1:8787/api/health        # {"ok":true}
```
The API stores nothing: each enquiry is emailed and discarded. It logs only event names (`sent`, `rate_limited`, `honeypot`, `send_failed:<code>`), never message contents.

## 4. nginx server block (add as a **new** file; do not edit the live site's block until you switch)
```nginx
server {
    listen 443 ssl http2;
    server_name siddhrans.com www.siddhrans.com;      # staging first: e.g. staging.siddhrans.com
    # ssl_certificate / ssl_certificate_key: your existing certificate arrangement (not changed by this repo)

    root /var/www/siddhrans/current;
    index index.html;
    error_page 404 /404.html;

    gzip on;  gzip_types text/css application/javascript application/json image/svg+xml application/xml text/plain;
    # brotli on; brotli_types ...;   (if the module is installed)

    # Security headers (this exact policy is what the automated tests run against)
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
    add_header Strict-Transport-Security "max-age=31536000" always;   # only once HTTPS is final

    # Pages: always revalidate
    location / {
        try_files $uri $uri/index.html =404;
        add_header Cache-Control "no-cache" always;
    }
    # Fingerprinted build assets and images: cache for a year
    location /_next/static/ { expires 1y; add_header Cache-Control "public, max-age=31536000, immutable" always; }
    location ~ ^/(img|brand|og)/ { expires 30d; add_header Cache-Control "public, max-age=2592000" always; }
    # (re-add the security headers inside any location that sets add_header, as nginx does not inherit them)

    # Contact API
    location /api/ {
        client_max_body_size 32k;
        limit_req zone=contact burst=5 nodelay;            # define: limit_req_zone $binary_remote_addr zone=contact:10m rate=10r/m; (http block)
        proxy_pass http://127.0.0.1:8787;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;      # the API trusts this header (TRUST_PROXY=true)
        proxy_read_timeout 20s;
    }
}
```
`sudo nginx -t && sudo systemctl reload nginx`. Because pages are static exports with trailing-slash routes, the `try_files` line above is all that is needed (there is no client-router payload to rewrite: the site uses plain links).

## 5. Verify after deployment
```bash
curl -sI https://HOST/ | head                               # 200, security headers present
curl -s https://HOST/brand/Siddhrans_Logo.png | sha256sum   # 9bfd52b5aa328b90dc5c0ca9a7e7b8966746787ea22b5688e6f902e56fb7dfa7
curl -s https://HOST/sitemap.xml | head; curl -s https://HOST/robots.txt
curl -s -X POST https://HOST/api/contact -H 'Content-Type: application/json' -d '{}'   # 400 with field errors
```
Then send one real enquiry from the form and confirm it reaches the mailbox. You can run the test suite against the live host with `BASE_URL`-style overrides, or run `npm run lighthouse` locally against the build.

## 6. Rollback
- Site: `ln -sfn /var/www/siddhrans/releases/<previous> /var/www/siddhrans/current` (instant).
- Contact API: `sudo systemctl stop siddhrans-contact` (the form then shows its error message with the direct email and phone).
- nginx: restore the backed-up block and `nginx -t && systemctl reload nginx`.

## 7. Pending before go-live
See `docs/CONTENT_APPROVALS.md`. In particular: confirm the recipient email, supply a favicon (none has been created; the site ships a blank icon), review the privacy notice, and decide the canonical domain and old-site redirect.
