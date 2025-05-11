#!/usr/bin/env bash
rsync -av --include='*/' --include='*.md' --exclude='*' \
  /path/to/Obsidian/vault-publish/ ./content/
