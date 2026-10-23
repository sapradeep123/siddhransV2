#!/usr/bin/env bash
# Build the static site from this checkout and publish it as a new release (run ON THE VPS as the deploy user).
#   scripts/deploy/release.sh
# Env: WEB_ROOT (default /var/www/siddhrans), SITE_URL (default https://siddhrans.com), KEEP (releases kept, default 5)
set -euo pipefail
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WEB_ROOT="${WEB_ROOT:-/var/www/siddhrans}"
SITE_URL="${SITE_URL:-https://siddhrans.com}"
KEEP="${KEEP:-5}"

cd "$APP_DIR"
echo "==> Node $(node -v), commit $(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
node -e 'const [a,b]=process.versions.node.split(".").map(Number); if (a<20||(a===20&&b<9)) { console.error("Node >= 20.9 required"); process.exit(1); }'

echo "==> Installing dependencies (npm ci)"
npm ci --no-audit --no-fund

echo "==> Building static site for ${SITE_URL}"
NEXT_PUBLIC_SITE_URL="$SITE_URL" npm run build

echo "==> Verifying the original logo"
npm run verify:logo

REL="$WEB_ROOT/releases/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$REL"
cp -a out/. "$REL/"
ln -sfn "$REL" "$WEB_ROOT/current.new"
mv -T "$WEB_ROOT/current.new" "$WEB_ROOT/current"      # atomic switch
echo "==> Live release: $REL"

# keep only the newest $KEEP releases
ls -1dt "$WEB_ROOT"/releases/*/ 2>/dev/null | tail -n +"$((KEEP+1))" | xargs -r rm -rf
echo "==> Done. Next: scripts/deploy/smoke-test.sh ${SITE_URL}"
