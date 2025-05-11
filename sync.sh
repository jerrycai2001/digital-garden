#!/usr/bin/env bash
rsync -av --include='*/' --include='*.md' --exclude='*' \
  /Users/jycai/Development/Writing Portfolio/Personal Vault/vault-publish/ ./content/
