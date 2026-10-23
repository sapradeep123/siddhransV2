#!/usr/bin/env bash
# Switch the live site back to the previous release (or a named one):
#   scripts/deploy/rollback.sh [release-folder-name]
set -euo pipefail
WEB_ROOT="${WEB_ROOT:-/var/www/siddhrans}"
CURRENT="$(readlink -f "$WEB_ROOT/current")"
if [ -n "${1:-}" ]; then
  TARGET="$WEB_ROOT/releases/$1"
else
  TARGET="$(ls -1dt "$WEB_ROOT"/releases/*/ | sed 's#/$##' | grep -vxF "$CURRENT" | head -n1)"
fi
[ -d "$TARGET" ] || { echo "No such release: $TARGET" >&2; exit 1; }
ln -sfn "$TARGET" "$WEB_ROOT/current.new"
mv -T "$WEB_ROOT/current.new" "$WEB_ROOT/current"
echo "Rolled back: $CURRENT -> $TARGET"
