#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/gh-connect.sh <github_owner> <repo_name> [path_to_project=.]

OWNER="${1:?owner missing}"
REPO="${2:?repo missing}"
PROJECT_DIR="${3:-.}"

cd "$PROJECT_DIR"

# Ensure git
git init
git add .
git commit -m "chore: initial import" || true
git branch -M main

# Create repo if it doesn't exist
if ! gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
  gh repo create "$OWNER/$REPO" --private --source=. --remote=origin --push
else
  git remote add origin "https://github.com/$OWNER/$REPO.git" 2>/dev/null || true
  git push -u origin main
fi

echo "Done. Repo: https://github.com/$OWNER/$REPO"
echo "Remember to add secrets in GitHub → Settings → Secrets and variables → Actions:"
echo " - DATABASE_URL"
echo " - LOCAL_ENC_KEY"
