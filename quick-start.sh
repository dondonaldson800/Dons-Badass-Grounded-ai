#!/bin/bash

###############################################################################
# QUICK START - Deploy Core Four to GitHub + EAS
# Run this script after setting your credentials
###############################################################################

echo "🏛️ GROUNDED EMPIRE - Quick Start Deployment"
echo "==========================================="
echo ""

# Check credentials
if [ -z "$GITHUB_TOKEN" ] || [ -z "$GITHUB_ORG" ]; then
  echo "❌ Missing credentials. Please run:"
  echo ""
  echo "export GITHUB_TOKEN=\"your_github_token_here\""
  echo "export GITHUB_ORG=\"Grounded-Empire\""
  echo ""
  echo "Optional (for automated EAS builds):"
  echo "export EXPO_TOKEN=\"your_expo_token_here\""
  echo ""
  exit 1
fi

echo "✅ Credentials detected"
echo "   GitHub Org: $GITHUB_ORG"
echo ""

# Step 1: Deploy to GitHub
echo "📤 STEP 1: Pushing Core Four to GitHub..."
echo ""
/app/deploy-to-github.sh

if [ $? -ne 0 ]; then
  echo "❌ GitHub deployment failed. Please check errors above."
  exit 1
fi

echo ""
echo "✅ All apps successfully pushed to GitHub!"
echo ""

# Step 2: EAS Configuration Instructions
echo "⚙️ STEP 2: Configure EAS Projects"
echo ""
echo "Run these commands to link each app to Expo:"
echo ""
echo "  cd /app/expo-empire && eas build:configure"
echo "  cd /app/expo-law && eas build:configure"
echo "  cd /app/expo-medical && eas build:configure"
echo "  cd /app/expo-nonprofit && eas build:configure"
echo ""

# Step 3: Build Instructions
echo "🏗️ STEP 3: Trigger Production Builds"
echo ""
echo "After configuring EAS, build all apps:"
echo ""
echo "  cd /app/expo-empire && eas build --platform android --profile production --non-interactive &"
echo "  cd /app/expo-law && eas build --platform android --profile production --non-interactive &"
echo "  cd /app/expo-medical && eas build --platform android --profile production --non-interactive &"
echo "  cd /app/expo-nonprofit && eas build --platform android --profile production --non-interactive &"
echo "  wait"
echo ""
echo "This will build all 4 apps in parallel (~20 mins total)."
echo ""

# Step 4: Download & Submit
echo "📦 STEP 4: Download & Submit to Stores"
echo ""
echo "1. Go to expo.dev/accounts/[your-account]/projects"
echo "2. Download the .aab files for each app"
echo "3. Submit to:"
echo "   - Google Play Console: play.google.com/console"
echo "   - Samsung Galaxy Store: seller.samsungapps.com"
echo "   - Amazon Appstore: developer.amazon.com"
echo ""

echo "🎉 Deployment pipeline ready!"
echo ""
echo "📚 For detailed instructions, see:"
echo "   - /app/GITHUB_EAS_DEPLOYMENT.md"
echo "   - /app/CORE_FOUR_STATUS.md"
echo ""
