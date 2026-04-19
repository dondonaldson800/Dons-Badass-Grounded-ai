# 📱 D's Empire - APK & AAB Build Guide

## 🎯 **GET YOUR APK/AAB ARTIFACTS (3 Options)**

---

## ⚡ **OPTION 1: GitHub Actions (EASIEST - Automatic Build)**

### **This builds APK & AAB automatically when you push to GitHub**

### Step 1: Push Code to GitHub
```bash
# In Emergent, click "Save to GitHub"
# Or download code and push manually:

git init
git add .
git commit -m "D's Empire - Ready for APK build"
git branch -M main
git remote add origin https://github.com/yourusername/empire.git
git push -u origin main
```

### Step 2: Wait for Build (5-10 minutes)
- Go to GitHub → Your Repo → **Actions** tab
- Watch the build process
- Wait for green checkmark ✅

### Step 3: Download Artifacts
- Click on the completed workflow run
- Scroll down to **Artifacts** section
- Download:
  - `empire-debug-apk` (for testing)
  - `empire-release-apk` (for distribution)
  - `empire-release-aab` (for Google Play)

### **✅ You get:**
- `empire-debug.apk` (11-20 MB)
- `empire-release.apk` (11-20 MB)
- `empire-release.aab` (8-15 MB)

---

## 🖥️ **OPTION 2: Build Locally (On Your Computer)**

### Prerequisites:
1. **Node.js 18+** - https://nodejs.org
2. **Java JDK 17** - https://adoptium.net
3. **Android Studio** (optional but recommended)

### Step 1: Download Code
```bash
# Download from Emergent or clone from GitHub
cd path/to/empire
```

### Step 2: Run Build Script
```bash
./build-android.sh
```

**Select what to build:**
1. Debug APK (for testing)
2. Release APK (for distribution)
3. Release AAB (for Google Play)
4. All of the above

### Step 3: Get Artifacts
```bash
# Files will be in:
./artifacts/app-debug.apk
./artifacts/empire-release.apk
./artifacts/app-release.aab
```

---

## 🏗️ **OPTION 3: Manual Build (Advanced)**

### Step 1: Install Capacitor CLI
```bash
npm install -g @capacitor/cli
```

### Step 2: Build Frontend
```bash
cd frontend
yarn install
yarn build
cd ..
```

### Step 3: Copy Build
```bash
cp -r frontend/build ./build
```

### Step 4: Setup Android
```bash
npx cap add android
npx cap sync android
```

### Step 5: Build APK/AAB
```bash
cd android

# Debug APK
./gradlew assembleDebug

# Release APK
./gradlew assembleRelease

# Release AAB (for Google Play)
./gradlew bundleRelease
```

### Step 6: Find Artifacts
```bash
# Debug APK
android/app/build/outputs/apk/debug/app-debug.apk

# Release APK
android/app/build/outputs/apk/release/app-release-unsigned.apk

# Release AAB
android/app/build/outputs/bundle/release/app-release.aab
```

---

## 📦 **ARTIFACT TYPES EXPLAINED:**

### **1. Debug APK** (`app-debug.apk`)
- **Size**: ~15-20 MB
- **Purpose**: Testing on your device
- **Signed**: Auto-signed with debug key
- **Installation**: Direct install (enable Unknown Sources)
- **Use for**: Development, testing, demo

### **2. Release APK** (`empire-release.apk`)
- **Size**: ~11-15 MB (smaller, optimized)
- **Purpose**: Distribution outside Google Play
- **Signed**: Needs signing (done automatically)
- **Installation**: Direct install
- **Use for**: Side-loading, direct distribution

### **3. Release AAB** (`app-release.aab`)
- **Size**: ~8-12 MB (smallest)
- **Purpose**: Google Play Store upload
- **Signed**: Signed by Google Play
- **Installation**: Only via Google Play
- **Use for**: Official Play Store release

---

## 🚀 **RECOMMENDED WORKFLOW:**

### **For Testing:**
1. Use GitHub Actions (Option 1)
2. Download `empire-debug.apk`
3. Install on Android device
4. Test all features

### **For Distribution:**
1. Use GitHub Actions (Option 1)
2. Download `empire-release.apk` (for direct sharing)
3. Download `empire-release.aab` (for Play Store)

### **For Google Play Store:**
1. Build `empire-release.aab`
2. Upload to Play Console
3. Google signs and distributes

---

## 📲 **INSTALLING APK ON DEVICE:**

### Method 1: ADB (Android Debug Bridge)
```bash
# Install ADB: https://developer.android.com/tools/adb

# Connect device via USB
adb devices

# Install APK
adb install artifacts/app-debug.apk

# Or install Release
adb install artifacts/empire-release.apk
```

### Method 2: Direct Install
1. Copy APK to phone (via USB, email, cloud)
2. Open file on phone
3. Enable "Install from Unknown Sources" if prompted
4. Tap Install
5. Done!

### Method 3: Share via Link
1. Upload APK to cloud (Google Drive, Dropbox)
2. Share download link
3. Users download and install

---

## 📊 **BUILD OUTPUT SIZES:**

Typical sizes for D's Empire:

| Artifact | Size | Purpose |
|----------|------|---------|
| Debug APK | 18 MB | Testing |
| Release APK | 13 MB | Distribution |
| Release AAB | 10 MB | Play Store |

---

## 🔐 **SIGNING INFORMATION:**

### Auto-Generated Keystore:
- **File**: `android/release.keystore`
- **Alias**: `empire`
- **Password**: `empire2025`
- **Validity**: 10,000 days (~27 years)

### **IMPORTANT**: 
**Save this keystore file!** You need it to update your app later.

If you lose it, you can't update the app on Play Store (you'd need to publish as new app).

---

## 🎯 **WHAT TO DO WITH YOUR ARTIFACTS:**

### **After Getting APK/AAB:**

**1. Test Debug APK:**
```bash
# Install on your Android phone
adb install empire-debug.apk

# Or transfer file and install manually
```

**2. Share Beta Version:**
- Upload `empire-release.apk` to Google Drive
- Share link with testers
- They download and install

**3. Publish to Play Store:**
- Go to: https://play.google.com/console
- Create app
- Upload `empire-release.aab`
- Fill in store listing
- Submit for review

**4. Direct Distribution:**
- Host APK on your website
- Users download and install
- No Play Store needed

---

## 🆘 **TROUBLESHOOTING:**

### Build Fails in GitHub Actions:
- Check Actions tab for error logs
- Common fix: Update secrets/environment variables
- May need to push again

### Can't Install APK:
- Enable "Unknown Sources" in Android settings
- Or go to Settings → Security → Install Unknown Apps
- Allow installation from Files/Browser

### App Crashes on Launch:
- Check if backend URL is correct
- Verify `REACT_APP_BACKEND_URL` in build
- Rebuild with correct environment variables

### Keystore Issues:
- If you need a different keystore, edit `capacitor.config.json`
- Or generate new one:
  ```bash
  keytool -genkey -v -keystore my.keystore \
    -alias mykey \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000
  ```

---

## 📱 **GOOGLE PLAY STORE PUBLISHING:**

### Step-by-Step:

1. **Create Developer Account**
   - Go to: https://play.google.com/console
   - Pay $25 one-time fee
   - Set up account

2. **Create App**
   - Click "Create App"
   - Name: "D's Empire"
   - Category: Productivity / Finance

3. **Upload AAB**
   - Production → Create Release
   - Upload `empire-release.aab`
   - Set version name (e.g., 1.0.0)

4. **Store Listing**
   - App name, description, screenshots
   - Upload icon (512x512 PNG)
   - Feature graphic (1024x500)
   - Privacy policy URL

5. **Submit for Review**
   - Review can take 1-7 days
   - Google will email you when approved

6. **Published!**
   - App goes live on Play Store
   - Users can download

---

## 🎉 **SUCCESS CHECKLIST:**

After building, you should have:

- [ ] `empire-debug.apk` - For testing
- [ ] `empire-release.apk` - For distribution
- [ ] `empire-release.aab` - For Play Store
- [ ] Keystore file saved somewhere safe
- [ ] APK tested on real Android device
- [ ] All features working in APK
- [ ] Backend API accessible from mobile app
- [ ] Payments working (Stripe checkout opens)

---

## 💰 **MONETIZATION IN APK:**

Your APK includes:
- ✅ Stripe payments (subscriptions + credits)
- ✅ AdMob ads integration
- ✅ Payment flow works in native app
- ✅ All AI features work offline-first

**Users can:**
- Subscribe ($9.99 - $99.99/month)
- Buy credit packs ($10 - $70)
- Use AI assistants
- Make payments via Stripe

---

## 📊 **FILE STRUCTURE:**

```
your-empire/
├── capacitor.config.json          # ✅ Created
├── build-android.sh               # ✅ Created
├── .github/workflows/
│   └── build-android-apk.yml      # ✅ Created (auto-build)
├── frontend/
│   └── build/                     # Generated on build
├── android/                       # Generated by Capacitor
│   ├── app/
│   │   └── build/outputs/
│   │       ├── apk/
│   │       │   ├── debug/
│   │       │   │   └── app-debug.apk
│   │       │   └── release/
│   │       │       └── app-release-unsigned.apk
│   │       └── bundle/
│   │           └── release/
│   │               └── app-release.aab
│   └── release.keystore           # Generated
└── artifacts/                     # Final outputs
    ├── empire-debug.apk
    ├── empire-release.apk
    └── app-release.aab
```

---

## 🚀 **QUICK START:**

**Fastest way to get APK right now:**

1. Click "Save to GitHub" in Emergent
2. Go to GitHub → Actions tab
3. Wait 10 minutes for build
4. Download artifacts
5. Install APK on phone
6. Done!

**Estimated total time: 15 minutes**

---

**Your APK/AAB build system is ready! Choose your option and build!** 📱🎉
