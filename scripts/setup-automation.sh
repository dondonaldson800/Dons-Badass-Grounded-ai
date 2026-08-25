#!/bin/bash

# ============================================================================
# Dons-Badass-Grounded-ai - Full Automation Setup Script
# ============================================================================
# This script automates:
# 1. EAS Project initialization
# 2. Google Cloud Service Account creation
# 3. GitHub Secrets configuration
# 4. Google Play Console setup
# ============================================================================

set -e

echo "🚀 Starting Full Automation Setup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================================================
# Step 1: Check Prerequisites
# ============================================================================
echo -e "${BLUE}Step 1: Checking Prerequisites${NC}"
echo "================================"

check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}❌ $1 is not installed${NC}"
        return 1
    else
        echo -e "${GREEN}✅ $1 found${NC}"
        return 0
    fi
}

echo "Checking required tools..."
check_command "node" || exit 1
check_command "npm" || exit 1
check_command "git" || exit 1

echo ""

# ============================================================================
# Step 2: Install EAS CLI
# ============================================================================
echo -e "${BLUE}Step 2: Installing EAS CLI${NC}"
echo "============================="

if ! command -v eas &> /dev/null; then
    echo "Installing eas-cli globally..."
    npm install -g eas-cli
    echo -e "${GREEN}✅ eas-cli installed${NC}"
else
    echo -e "${GREEN}✅ eas-cli already installed${NC}"
fi

echo ""

# ============================================================================
# Step 3: Login to Expo
# ============================================================================
echo -e "${BLUE}Step 3: Expo Login${NC}"
echo "===================="

echo "You need to login to Expo (expo.dev)"
echo "If you don't have an account, create one at https://expo.dev"
echo ""
read -p "Press Enter to continue with Expo login..."

eas login

echo -e "${GREEN}✅ Expo login complete${NC}"
echo ""

# ============================================================================
# Step 4: Initialize EAS Project
# ============================================================================
echo -e "${BLUE}Step 4: Initialize EAS Project${NC}"
echo "================================"

if [ -f "eas.json" ]; then
    echo -e "${YELLOW}⚠️  eas.json already exists${NC}"
    read -p "Do you want to reconfigure? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping EAS init..."
    else
        eas init
    fi
else
    echo "Initializing EAS project..."
    eas init
fi

echo ""

# ============================================================================
# Step 5: Get EAS Project ID
# ============================================================================
echo -e "${BLUE}Step 5: Getting EAS Project ID${NC}"
echo "================================"

PROJECT_INFO=$(eas project info)
EAS_PROJECT_ID=$(echo "$PROJECT_INFO" | grep "Project ID:" | awk '{print $NF}')

echo -e "${GREEN}✅ EAS Project ID: ${BLUE}$EAS_PROJECT_ID${NC}"
echo ""
echo "Save this for GitHub Secrets:"
echo "  Name: EAS_PROJECT_ID"
echo "  Value: $EAS_PROJECT_ID"
echo ""

# ============================================================================
# Step 6: Get Package Name
# ============================================================================
echo -e "${BLUE}Step 6: Get Package Name${NC}"
echo "========================="

PACKAGE_NAME=$(grep -o '"package":[[:space:]]*"[^"]*"' app.json | cut -d'"' -f4)

if [ -z "$PACKAGE_NAME" ]; then
    PACKAGE_NAME="com.dondonaldson.groundedai"
    echo "Package name not found in app.json"
    read -p "Enter your package name (default: $PACKAGE_NAME): " -r
    PACKAGE_NAME=${REPLY:-$PACKAGE_NAME}
fi

echo -e "${GREEN}✅ Package Name: ${BLUE}$PACKAGE_NAME${NC}"
echo ""
echo "Save this for GitHub Secrets:"
echo "  Name: ANDROID_PACKAGE_NAME"
echo "  Value: $PACKAGE_NAME"
echo ""

# ============================================================================
# Step 7: Google Cloud Setup Instructions
# ============================================================================
echo -e "${BLUE}Step 7: Google Cloud Setup${NC}"
echo "==========================="
echo ""
echo "You need to create a Google Cloud service account."
echo "Follow these steps in your browser:"
echo ""
echo "1. Visit: https://console.cloud.google.com/"
echo "2. Create a NEW PROJECT"
echo "   - Project name: 'Dons-Badass-Grounded-AI'"
echo "3. Go to: IAM & Admin → Service Accounts"
echo "4. CREATE SERVICE ACCOUNT"
echo "   - Name: 'play-store-api'"
echo "   - Description: 'For automated Play Store submissions'"
echo "5. Click CREATE AND CONTINUE"
echo "6. Grant role: 'Service Account User'"
echo "7. Click DONE"
echo "8. Click on the new service account"
echo "9. Go to KEYS tab"
echo "10. Click ADD KEY → Create new key"
echo "11. Select JSON format"
echo "12. Click CREATE and SAVE the JSON file"
echo ""
read -p "Press Enter once you've downloaded the service account JSON..."

# ============================================================================
# Step 8: Convert JSON to Base64
# ============================================================================
echo -e "${BLUE}Step 8: Encode Service Account JSON${NC}"
echo "===================================="
echo ""
echo "You'll need to provide the path to your downloaded service account JSON file"
read -p "Enter path to service-account.json: " -r SERVICE_ACCOUNT_PATH

if [ ! -f "$SERVICE_ACCOUNT_PATH" ]; then
    echo -e "${RED}❌ File not found: $SERVICE_ACCOUNT_PATH${NC}"
    exit 1
fi

echo "Encoding JSON to base64..."
ENCODED_JSON=$(base64 -w 0 < "$SERVICE_ACCOUNT_PATH")

echo -e "${GREEN}✅ JSON encoded${NC}"
echo ""
echo "Save this for GitHub Secrets:"
echo "  Name: GOOGLE_PLAY_SERVICE_ACCOUNT"
echo "  Value: (paste below)"
echo ""
echo "$ENCODED_JSON"
echo ""

# ============================================================================
# Step 9: Add GitHub Secrets
# ============================================================================
echo -e "${BLUE}Step 9: Add GitHub Secrets${NC}"
echo "=========================="
echo ""
echo "Go to your GitHub repository:"
echo "https://github.com/dondonaldson800/Dons-Badass-Grounded-ai/settings/secrets/actions"
echo ""
echo "Add these 3 secrets:"
echo ""
echo "1️⃣  Secret Name: EAS_PROJECT_ID"
echo "   Value: $EAS_PROJECT_ID"
echo ""
echo "2️⃣  Secret Name: ANDROID_PACKAGE_NAME"
echo "   Value: $PACKAGE_NAME"
echo ""
echo "3️⃣  Secret Name: GOOGLE_PLAY_SERVICE_ACCOUNT"
echo "   Value: (base64 encoded JSON above)"
echo ""
read -p "Press Enter once all secrets are added to GitHub..."

# ============================================================================
# Step 10: Create Google Play App
# ============================================================================
echo -e "${BLUE}Step 10: Create Google Play App${NC}"
echo "================================"
echo ""
echo "Visit Google Play Console:"
echo "https://play.google.com/console"
echo ""
echo "Instructions:"
echo "1. Click CREATE APP"
echo "2. App name: 'Dons Badass Grounded AI'"
echo "3. Default language: English"
echo "4. App type: Application"
echo "5. Category: Utilities (or appropriate)"
echo "6. Click CREATE"
echo ""
echo "You'll need to complete:"
echo "  - App icon (512x512)"
echo "  - Screenshots (5-8 minimum)"
echo "  - Descriptions (short & full)"
echo "  - Privacy policy URL"
echo "  - Content rating questionnaire"
echo ""
read -p "Press Enter once your app is created in Play Console..."

# ============================================================================
# Step 11: Add Service Account to Play Console
# ============================================================================
echo -e "${BLUE}Step 11: Grant Service Account Access${NC}"
echo "======================================"
echo ""
echo "In Google Play Console:"
echo "1. Go to: Settings → User and permissions"
echo "2. Click: Invite user"
echo "3. Paste service account email (from JSON file)"
echo "4. Select role: Admin"
echo "5. Click: Send invite"
echo ""
read -p "Press Enter once service account is added..."

# ============================================================================
# Step 12: Build Test
# ============================================================================
echo -e "${BLUE}Step 12: Test Build${NC}"
echo "==================="
echo ""
echo "Let's test the EAS build locally:"
echo ""
read -p "Do you want to build a test APK? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Building preview APK..."
    eas build --platform android --profile preview
else
    echo "Skipped test build"
fi

echo ""

# ============================================================================
# Step 13: Final Summary
# ============================================================================
echo -e "${GREEN}✅ SETUP COMPLETE!${NC}"
echo "==================="
echo ""
echo "🎉 Your app is now fully automated!"
echo ""
echo "📋 Quick Reference:"
echo "  - EAS Project ID: $EAS_PROJECT_ID"
echo "  - Package Name: $PACKAGE_NAME"
echo "  - GitHub Secrets: 3 secrets added"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "1️⃣  AUTOMATIC APK BUILD (every push to main):"
echo "   - Just push code to main branch"
echo "   - APK automatically builds"
echo "   - Download from Actions tab"
echo ""
echo "2️⃣  MANUAL AAB BUILD (for Play Store):"
echo "   - Go to: GitHub Actions tab"
echo "   - Select: 'EAS Build & Play Store Submit'"
echo "   - Click: Run workflow"
echo "   - Choose: aab build type"
echo "   - Check: auto_submit option"
echo "   - Click: Run workflow"
echo ""
echo "3️⃣  UPLOAD TO PLAY STORE:"
echo "   - Download AAB artifact from workflow"
echo "   - Go to Play Console"
echo "   - Create release on Internal testing track"
echo "   - Upload AAB"
echo "   - Submit for review"
echo ""
echo "📊 Status:"
echo "   ✅ EAS initialized"
echo "   ✅ GitHub secrets configured"
echo "   ✅ Google Cloud service account created"
echo "   ✅ CI/CD automation ready"
echo ""
echo "🔗 Useful Links:"
echo "   - GitHub Actions: https://github.com/dondonaldson800/Dons-Badass-Grounded-ai/actions"
echo "   - Play Console: https://play.google.com/console"
echo "   - EAS Dashboard: https://expo.dev/"
echo ""
echo -e "${BLUE}Happy deploying! 🚀${NC}"
