#!/usr/bin/env bash
# Static export for Cloudflare (cf-main). Nothing server-side to stash: the
# site has no route handlers or middleware, so Workers serve only assets.
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf out
NEXT_PUBLIC_CLOUDFLARE=1 npx next build
npx tsx worker/build-assets.ts
