#!/bin/sh
set -e

cd "$(dirname "$0")"

npm install
npm run build

exec npx next start -H 0.0.0.0 -p 3000
