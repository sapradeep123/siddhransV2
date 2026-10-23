#!/usr/bin/env bash
# Post-deployment checks against a running site:
#   scripts/deploy/smoke-test.sh https://siddhrans.com
# Verifies pages, assets, the original logo hash, both phone numbers, security headers and the contact API route.
set -uo pipefail
BASE="${1:-http://127.0.0.1}"; BASE="${BASE%/}"
LOGO_SHA="9bfd52b5aa328b90dc5c0ca9a7e7b8966746787ea22b5688e6f902e56fb7dfa7"
fail=0
ok()  { echo "  ok   $1"; }
bad() { echo "  FAIL $1"; fail=1; }
status() { curl -ks -o /dev/null -w '%{http_code}' "$@"; }

echo "Pages"
for p in / /services/ /products/ /industries/ /engineering-use-cases/ /case-studies/ /about/ /contact/ /privacy/ /image-credits/ \
  /services/enterprise-software-engineering/ /services/ai-ml-intelligent-automation/ /services/rpa-business-automation/ /services/cybersecurity/ \
  /services/cloud-infrastructure/ /services/data-analytics-integration/ /services/embedded-systems-industrial-iot/ /services/managed-technology-services/; do
  code=$(status "$BASE$p"); [ "$code" = 200 ] && ok "$p" || bad "$p -> $code"
done
code=$(status "$BASE/definitely-missing/"); [ "$code" = 404 ] && ok "unknown page returns 404" || bad "unknown page returned $code"

echo "SEO"
curl -ks "$BASE/robots.txt" | grep -q "Sitemap:" && ok robots.txt || bad robots.txt
curl -ks "$BASE/sitemap.xml" | grep -q "<urlset" && ok sitemap.xml || bad sitemap.xml

echo "Content"
contact=$(curl -ks "$BASE/contact/")
for t in "tel:+918971234343" "tel:+919902406387" "mailto:gururaj.n@siddhrans.com"; do
  echo "$contact" | grep -q "$t" && ok "contact page has $t" || bad "contact page missing $t"
done
curl -ks "$BASE/" | grep -qE "Let(&#x27;|')s engineer what comes next" && ok "footer call to action" || bad "footer call to action"

echo "Logo"
sha=$(curl -ks "$BASE/brand/Siddhrans_Logo.png" | sha256sum | cut -d' ' -f1)
[ "$sha" = "$LOGO_SHA" ] && ok "logo hash matches the approved original" || bad "logo hash is $sha"

echo "Headers"
h=$(curl -ksI "$BASE/")
for k in content-security-policy x-frame-options x-content-type-options referrer-policy; do
  echo "$h" | grep -qi "^$k:" && ok "$k" || bad "$k missing"
done

echo "Contact API route"
code=$(status -X POST "$BASE/api/contact" -H 'Content-Type: application/json' -d '{}')
[ "$code" = 400 ] && ok "POST /api/contact -> 400 validation (service reachable)" || bad "POST /api/contact -> $code (expected 400)"
code=$(status "$BASE/api/health"); [ "$code" = 200 ] && ok "/api/health" || bad "/api/health -> $code"

if [ "$fail" = 0 ]; then echo "ALL CHECKS PASSED"; else echo "SOME CHECKS FAILED"; exit 1; fi
