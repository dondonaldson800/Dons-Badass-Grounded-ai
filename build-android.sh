#!/bin/bash

# 🏗️ D's Empire - Local APK/AAB Build Script
# Run this on your LOCAL MACHINE (not in Emergent container)

set -e

echo "🏰 D's Empire - Android Build Script"
echo "====================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if we're in the right directory
if [ ! -f "capacitor.config.json" ]; then
    echo -e "${RED}❌ Error: capacitor.config.json not found${NC}"
    echo "Please run this script from the root directory of your project"
    exit 1
fi

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not installed${NC}"
    exit 1
fi

if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java not installed${NC}"
    echo "Install Java 17: https://adoptium.net/"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites OK${NC}"
echo ""

# Install Capacitor CLI
echo "📦 Installing Capacitor CLI..."
npm install -g @capacitor/cli

# Build frontend
echo ""
echo "🔨 Building React frontend..."
cd frontend
yarn install
yarn build
cd ..

echo -e "${GREEN}✅ Frontend built${NC}"

# Copy build to root
echo ""
echo "📁 Copying build files..."
cp -r frontend/build ./build

# Initialize Android project
echo ""
echo "🤖 Setting up Android project..."
npx cap add android || echo "Android platform already exists"
npx cap sync android

echo -e "${GREEN}✅ Android project synced${NC}"

# Generate keystore if it doesn't exist
if [ ! -f "android/release.keystore" ]; then
    echo ""
    echo "🔐 Generating release keystore..."
    cd android
    keytool -genkey -v -keystore release.keystore \
        -alias empire \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -storepass empire2025 \
        -keypass empire2025 \
        -dname "CN=D's Empire, OU=Empire, O=Empire Inc, L=City, S=State, C=US"
    cd ..
    echo -e "${GREEN}✅ Keystore created${NC}"
fi

# Build selection menu
echo ""
echo "🎯 What do you want to build?"
echo "1) Debug APK (for testing)"
echo "2) Release APK (for distribution)"
echo "3) Release AAB (for Google Play)"
echo "4) All of the above"
read -p "Enter choice [1-4]: " choice

cd android
chmod +x gradlew

case $choice in
  1)
    echo ""
    echo "🔨 Building Debug APK..."
    ./gradlew assembleDebug
    echo ""
    echo -e "${GREEN}✅ Debug APK built!${NC}"
    echo -e "${BLUE}Location: android/app/build/outputs/apk/debug/app-debug.apk${NC}"
    ;;
    
  2)
    echo ""
    echo "🔨 Building Release APK..."
    ./gradlew assembleRelease
    echo ""
    echo -e "${GREEN}✅ Release APK built!${NC}"
    echo -e "${BLUE}Location: android/app/build/outputs/apk/release/app-release-unsigned.apk${NC}"
    ;;
    
  3)
    echo ""
    echo "🔨 Building Release AAB..."
    ./gradlew bundleRelease
    echo ""
    echo -e "${GREEN}✅ Release AAB built!${NC}"
    echo -e "${BLUE}Location: android/app/build/outputs/bundle/release/app-release.aab${NC}"
    ;;
    
  4)
    echo ""
    echo "🔨 Building all variants..."
    ./gradlew assembleDebug assembleRelease bundleRelease
    echo ""
    echo -e "${GREEN}✅ All builds complete!${NC}"
    echo ""
    echo "📦 Artifacts:"
    echo -e "${BLUE}Debug APK: android/app/build/outputs/apk/debug/app-debug.apk${NC}"
    echo -e "${BLUE}Release APK: android/app/build/outputs/apk/release/app-release-unsigned.apk${NC}"
    echo -e "${BLUE}Release AAB: android/app/build/outputs/bundle/release/app-release.aab${NC}"
    ;;
    
  *)
    echo -e "${RED}Invalid choice${NC}"
    exit 1
    ;;
esac

cd ..

# Create artifacts directory
mkdir -p artifacts
cp android/app/build/outputs/apk/debug/app-debug.apk artifacts/ 2>/dev/null || true
cp android/app/build/outputs/apk/release/app-release-unsigned.apk artifacts/empire-release.apk 2>/dev/null || true
cp android/app/build/outputs/bundle/release/app-release.aab artifacts/ 2>/dev/null || true

if [ -d "artifacts" ] && [ "$(ls -A artifacts)" ]; then
    echo ""
    echo "📁 Artifacts copied to ./artifacts/"
    ls -lh artifacts/
fi

echo ""
echo -e "${GREEN}🎉 Build complete!${NC}"
echo ""
echo "📱 Next steps:"
echo "1. Install APK on Android device"
echo "2. Or upload AAB to Google Play Console"
echo ""
echo "📲 To install on device:"
echo "   adb install artifacts/app-debug.apk"
