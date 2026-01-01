#!/usr/bin/env bash

# Script to create a new work log entry for today

WORKLOG_DIR="src/content/work-log"
DATE=$(date +%Y-%m-%d)
FILE_PATH="${WORKLOG_DIR}/${DATE}.md"

# Check if file already exists
if [ -f "$FILE_PATH" ]; then
    echo "File ${FILE_PATH} already exists!"
    exit 1
fi

# Create the file with standardized header
cat > "$FILE_PATH" << EOF
---
title: New entry
date: ${DATE}
---

EOF

echo "Created new work log entry: ${FILE_PATH}"
echo "Opening in editor..."

# Try to open in default editor (works in most IDEs/editors)
if command -v code &> /dev/null; then
    code "$FILE_PATH"
elif command -v nvim &> /dev/null; then
    nvim "$FILE_PATH"
elif command -v vim &> /dev/null; then
    vim "$FILE_PATH"
else
    echo "File created. Open it manually to edit."
fi

