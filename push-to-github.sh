#!/usr/bin/env bash
# LabExpress Rajasthan - Auto Push to GitHub for minasubhash8@gmail.com
set -e

GIT_EMAIL="minasubhash8@gmail.com"
GIT_NAME="Subhash Meena"
DEFAULT_USER="minasubhash8-create"
DEFAULT_REPO="Lab-express"

echo "=========================================================="
echo "🚀 LabExpress GitHub & Vercel Push Utility"
echo "Author Email: $GIT_EMAIL"
echo "Target Repo: https://github.com/$DEFAULT_USER/$DEFAULT_REPO"
echo "=========================================================="

# Ensure Git is configured
git config user.email "$GIT_EMAIL"
git config user.name "$GIT_NAME"

# Check if repo is initialized
if [ ! -d ".git" ]; then
  git init
  git branch -M main
fi

# Stage and commit any latest changes
git add .
git commit -m "feat: complete LabExpress Rajasthan diagnostic network with GST MSME & Vercel deployment" || echo "Working tree clean, proceeding..."

echo ""
echo "Enter your GitHub Username (Default: $DEFAULT_USER):"
read -r GITHUB_USER
GITHUB_USER=${GITHUB_USER:-$DEFAULT_USER}

echo "Enter your GitHub Repository Name (Default: $DEFAULT_REPO):"
read -r REPO_NAME
REPO_NAME=${REPO_NAME:-$DEFAULT_REPO}

REMOTE_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"

echo ""
echo "Setting git remote origin to: $REMOTE_URL"
git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE_URL"

echo ""
echo "Pushing code to branch 'main'..."
echo "(If prompted, enter your GitHub Username and Personal Access Token)"
git push -u origin main

echo ""
echo "✅ Code pushed successfully to $REMOTE_URL!"
echo "Now go to https://vercel.com/new to connect your repository and auto-deploy!"
