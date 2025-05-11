#!/usr/bin/env bash

# adjust this path to where your Obsidian “vault-publish” folder really lives:
SOURCE="/Users/jycai/Development/Writing Portfolio/Personal Vault/vault-publish"

# destination in your Astro project
DEST="./content/"

# ensure DEST exists
mkdir -p "$DEST"

# copy only Markdown files and directory structure
rsync -av \
  --include='*/' \
  --include='*.md' \
  --exclude='*' \
  "$SOURCE" "$DEST"
