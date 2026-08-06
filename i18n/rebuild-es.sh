#!/usr/bin/env bash
# Regenerate site/es/ from the current English pages.
# Safe to re-run: it rebuilds es/ from scratch, so ES never drifts from EN.
# Any NEW English copy must be added to 2-content.py first, or it stays English.
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf es && mkdir -p es/projects
cp index.html who-we-are.html community.html residential.html contact.html es/
cp projects/*.html es/projects/

# es/ sits one level deeper, so shared assets/styles move up one level
sed -i '' -e 's|="assets/|="../assets/|g'      -e 's|="styles/|="../styles/|g'      es/*.html
sed -i '' -e 's|="\.\./assets/|="../../assets/|g' -e 's|="\.\./styles/|="../../styles/|g' es/projects/*.html

python3 i18n/1-chrome.py    # nav, footer, CTA, forms, EN/ES toggle + hreflang (touches EN too)
python3 i18n/2-content.py   # page copy
echo "es/ rebuilt"
