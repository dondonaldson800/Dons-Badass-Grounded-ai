# 🏛️ GROUNDED EMPIRE - CORE FOUR EXPORT PACKAGE

## 📦 Package Contents

This archive contains the complete source code for all 4 Core Apps:

### 1. Empire General (expo-empire/)
- **Bundle ID:** com.empire.general
- **Theme:** Electric Cobalt Blue (#1E90FF)
- **Screens:** Home, AI Assistant, Tools, Settings
- **Features:** General utility app with AI integration

### 2. Empire Law (expo-law/)
- **Bundle ID:** com.empire.law
- **Theme:** Deep Gold (#D4AF37)
- **Screens:** Home, Legal Terminology, Secure Notes, Settings
- **Features:** Encrypted note storage, offline legal database

### 3. Empire Medical (expo-medical/)
- **Bundle ID:** com.empire.medical
- **Theme:** Clinical Teal (#008B8B)
- **Screens:** Home, Daily Log, Emergency Info, History
- **Features:** HIPAA-compliant health tracking with SecureStore

### 4. Grounded Giving (expo-nonprofit/)
- **Bundle ID:** com.empire.giving
- **Theme:** Energetic Orange (#FF8C00)
- **Screens:** Home, Impact Dashboard, Donate, Volunteer Hub
- **Features:** Nonprofit impact tracking, donations, volunteering

---

## 🚀 Quick Start

### 1. Extract Archive
```bash
unzip core-four-apps.zip
cd expo-empire  # or expo-law, expo-medical, expo-nonprofit
```

### 2. Install Dependencies
```bash
yarn install
# or
npm install
```

### 3. Run Locally
```bash
npx expo start
```

### 4. Build for Production
```bash
# Login to Expo
eas login

# Configure EAS
eas build:configure

# Build Android
eas build --platform android --profile production
```

---

## 📱 Testing on Device

### Option 1: Expo Go (Development)
1. Install Expo Go app on your phone
2. Run `npx expo start`
3. Scan QR code with Expo Go

### Option 2: Development Build
```bash
eas build --platform android --profile development
```

### Option 3: Production APK
```bash
eas build --platform android --profile preview
```

---

## 🔧 Deployment to GitHub

### Initialize Git for Each App
```bash
# For Empire General
cd expo-empire
git init
git add .
git commit -m "Initial commit: Empire General"
git remote add origin https://github.com/YOUR_ORG/empire-general.git
git push -u origin main

# Repeat for expo-law, expo-medical, expo-nonprofit
```

### Automated Script
```bash
export GITHUB_ORG="YourGitHubOrg"

for app in expo-empire expo-law expo-medical expo-nonprofit; do
  cd $app
  git init
  git add .
  git commit -m "Initial commit: $app"
  REPO_NAME="${app//expo-/empire-}"
  git remote add origin https://github.com/${GITHUB_ORG}/${REPO_NAME}.git
  git push -u origin main
  cd ..
done
```

---

## 📋 File Structure

Each app contains:
```
expo-[name]/
├── App.js                 # Main application
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── eas.json              # Build configuration
├── .gitignore            # Git ignore rules
├── README.md             # App documentation
└── screens/              # Screen components
    ├── HomeScreen.js
    ├── [Screen2].js
    ├── [Screen3].js
    └── [Screen4].js
```

---

## 🎨 Customization

### Change App Name
Edit `app.json`:
```json
{
  "expo": {
    "name": "Your Custom Name"
  }
}
```

### Change Bundle ID
Edit `app.json`:
```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.appname"
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.appname"
    }
  }
}
```

### Change Theme Colors
Edit `App.js`:
```javascript
export const AppTheme = {
  colors: {
    primary: '#YOUR_COLOR',
    // ...
  }
};
```

---

## 🔐 Security Features

### Empire Law (Encrypted Storage)
- Uses `expo-crypto` for AES-256 encryption
- All notes encrypted before storage
- Offline-first, no backend required

### Empire Medical (HIPAA Compliance)
- Uses `expo-secure-store` for hardware-backed encryption
- Health logs stored securely on device
- No cloud sync for privacy

---

## 📊 Build Profiles

### Development
```bash
eas build --platform android --profile development
```
- Includes debugging tools
- Expo Dev Client enabled

### Preview (APK)
```bash
eas build --platform android --profile preview
```
- APK format (for testing/side-loading)
- Smaller file size

### Production (AAB)
```bash
eas build --platform android --profile production
```
- AAB format (for Google Play)
- Optimized and minified

---

## 🛠️ Troubleshooting

### "Module not found" error
```bash
rm -rf node_modules
yarn install
npx expo start -c
```

### "Unable to resolve module"
```bash
npx expo start --clear
```

### EAS build fails
```bash
# Check credentials
eas whoami

# Reconfigure
eas build:configure

# Check bundle ID is unique
```

---

## 📦 Dependencies

All apps use:
- React Native 0.74.0
- Expo SDK 51.0.0
- React Navigation 6.x
- AsyncStorage 1.23.1

**Law App additional:**
- expo-crypto (encryption)

**Medical App additional:**
- expo-secure-store (HIPAA-grade storage)

**Nonprofit App additional:**
- expo-sharing (social sharing)

---

## 🎯 Next Steps

1. ✅ Extract this archive
2. ✅ Choose an app to work with
3. ✅ Install dependencies (`yarn install`)
4. ✅ Test locally (`npx expo start`)
5. ✅ Customize as needed
6. ✅ Push to GitHub
7. ✅ Build with EAS
8. ✅ Submit to app stores

---

## 📞 Support

**Expo Documentation:**
- https://docs.expo.dev

**EAS Build:**
- https://docs.expo.dev/build/introduction/

**React Navigation:**
- https://reactnavigation.org

**Store Submission:**
- Google Play: https://play.google.com/console
- Samsung: https://seller.samsungapps.com
- Amazon: https://developer.amazon.com

---

## ✅ Production Ready

All 4 apps are:
- ✅ Syntax validated
- ✅ Fully functional
- ✅ Navigation configured
- ✅ EAS build-ready
- ✅ Git-ready
- ✅ Store submission-ready

---

**Your Core Four are ready to conquer the app stores!** 🚀

*Grounded Empire Project | December 2025*
