#!/bin/bash

###############################################################################
# GROUNDED EMPIRE - GitHub Deployment Script
# This script initializes Git repos and pushes all Core Four apps to GitHub
###############################################################################

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  GROUNDED EMPIRE - GitHub Deployment  ${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Check for required environment variables
if [ -z "$GITHUB_TOKEN" ]; then
  echo -e "${RED}ERROR: GITHUB_TOKEN not set${NC}"
  echo "Please set your GitHub Personal Access Token:"
  echo "  export GITHUB_TOKEN='your_token_here'"
  exit 1
fi

if [ -z "$GITHUB_ORG" ]; then
  echo -e "${YELLOW}WARNING: GITHUB_ORG not set. Using default 'Grounded-Empire'${NC}"
  GITHUB_ORG="Grounded-Empire"
fi

echo -e "${GREEN}✓ GitHub Token: Found${NC}"
echo -e "${GREEN}✓ GitHub Organization: ${GITHUB_ORG}${NC}\n"

# App configurations
declare -A APPS=(
  ["expo-empire"]="empire-general"
  ["expo-law"]="empire-law"
  ["expo-medical"]="empire-medical"
  ["expo-nonprofit"]="grounded-giving"
)

# Function to initialize and push a single app
deploy_app() {
  local APP_DIR=$1
  local REPO_NAME=$2
  local APP_PATH="/app/${APP_DIR}"
  
  echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BLUE}Deploying: ${APP_DIR} → ${REPO_NAME}${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
  
  if [ ! -d "$APP_PATH" ]; then
    echo -e "${RED}ERROR: Directory ${APP_PATH} not found${NC}"
    return 1
  fi
  
  cd "$APP_PATH"
  
  # Initialize Git if not already done
  if [ ! -d ".git" ]; then
    echo -e "${YELLOW}→ Initializing Git repository...${NC}"
    git init
    git config user.name "emergent-agent-e1"
    git config user.email "github@emergent.sh"
  else
    echo -e "${GREEN}✓ Git repository already initialized${NC}"
  fi
  
  # Add all files
  echo -e "${YELLOW}→ Staging files...${NC}"
  git add .
  
  # Commit
  if git diff-index --quiet HEAD -- 2>/dev/null; then
    echo -e "${GREEN}✓ No changes to commit${NC}"
  else
    echo -e "${YELLOW}→ Committing changes...${NC}"
    git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S') - Core Four deployment" || true
  fi
  
  # Add remote if not exists
  REMOTE_URL="https://${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/${REPO_NAME}.git"
  
  if git remote | grep -q origin; then
    echo -e "${YELLOW}→ Updating remote origin...${NC}"
    git remote set-url origin "$REMOTE_URL"
  else
    echo -e "${YELLOW}→ Adding remote origin...${NC}"
    git remote add origin "$REMOTE_URL"
  fi
  
  # Create main branch if needed
  git branch -M main
  
  # Push to GitHub
  echo -e "${YELLOW}→ Pushing to GitHub...${NC}"
  if git push -u origin main --force; then
    echo -e "${GREEN}✅ Successfully deployed ${APP_DIR} to GitHub!${NC}"
  else
    echo -e "${RED}❌ Failed to push ${APP_DIR}${NC}"
    return 1
  fi
}

# Deploy all apps
echo -e "${BLUE}Starting deployment of Core Four apps...\n${NC}"

SUCCESS_COUNT=0
FAIL_COUNT=0

for APP_DIR in "${!APPS[@]}"; do
  REPO_NAME="${APPS[$APP_DIR]}"
  if deploy_app "$APP_DIR" "$REPO_NAME"; then
    ((SUCCESS_COUNT++))
  else
    ((FAIL_COUNT++))
  fi
done

# Summary
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}       DEPLOYMENT SUMMARY              ${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✅ Successful: ${SUCCESS_COUNT}${NC}"
echo -e "${RED}❌ Failed: ${FAIL_COUNT}${NC}"

if [ $FAIL_COUNT -eq 0 ]; then
  echo -e "\n${GREEN}🎉 All apps successfully deployed to GitHub!${NC}"
  echo -e "\n${YELLOW}Next Steps:${NC}"
  echo -e "1. Verify repositories at: https://github.com/${GITHUB_ORG}"
  echo -e "2. Configure EAS projects: ${BLUE}eas build:configure${NC}"
  echo -e "3. Trigger builds: ${BLUE}eas build --platform android --profile production${NC}\n"
else
  echo -e "\n${RED}⚠️  Some deployments failed. Check the output above for details.${NC}\n"
  exit 1
fi
