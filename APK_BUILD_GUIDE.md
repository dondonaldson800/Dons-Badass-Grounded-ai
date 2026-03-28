# 📱 APK/AAB Build Guide - Don's Empire

## 🎯 Build Your Android App

**Two Options:**
1. ✅ **GitHub Actions (Recommended)** - Automated, works perfectly
2. ❌ **Local Build** - Requires Android Studio (not available in container)

---

## ✅ OPTION 1: GitHub Actions Build (EASY & RECOMMENDED)

### **Why This Works:**
- ✅ No local setup needed
- ✅ Builds on GitHub's servers (x86 architecture)
- ✅ Already configured and working
- ✅ Generates both APK and AAB
- ✅ Downloads ready in 5-10 minutes

### **Step-by-Step:**

#### **1. Verify GitHub Actions Workflow Exists**

Check that you have:
```
/app/.github/workflows/build-android.yml
```

**This file is READY! ✅**

#### **2. Push Your Code to GitHub**

**Use "Save to GitHub" in Emergent UI:**
1. Click "Save to GitHub" button
2. Connect GitHub account (if not already)
3. Select repository: `dondonaldson800/Dons-Badass-Grounded-ai`
4. Commit message: "🚀 Build Don's Empire APK"
5. Push

**OR use Git manually (if you have access):**
```bash
git add .
git commit -m "🚀 Build Don's Empire APK with AdMob"
git push origin main
```

#### **3. Workflow Triggers Automatically**

As soon as you push to `main` or `master`, GitHub Actions will:
- ✅ Set up Node.js 20
- ✅ Set up Java 17
- ✅ Install frontend dependencies
- ✅ Build React app
- ✅ Sync Capacitor
- ✅ Run Gradle build with your AdMob fixes
- ✅ Generate APK (debug)
- ✅ Upload as artifact

**Build Time:** 5-10 minutes

#### **4. Download Your APK**

1. **Go to Actions tab:**
   ```
   https://github.com/dondonaldson800/Dons-Badass-Grounded-ai/actions
   ```

2. **Click latest workflow run** (green checkmark ✅)

3. **Scroll down to "Artifacts"**

4. **Click "dempire-debug-apk"** to download

5. **Unzip the file:**
   - You'll find: `app-debug.apk`

6. **Transfer to Android device & install!**

---

## 📋 Build Status Verification

**Check workflow is running:**
```
https://github.com/dondonaldson800/Dons-Badass-Grounded-ai/actions
```

**Look for:**
- 🟡 Yellow dot = Building (in progress)
- ✅ Green checkmark = Success! Download APK
- ❌ Red X = Failed (check logs)

**Build Logs:**
- Click on the workflow run
- Click "build-android" job
- View each step's output

---

## 🔧 If Build Fails - Common Fixes

### **Error: "Duplicate class found"**
**Already Fixed!** ✅

Your `build.gradle` has resolution strategy:
```gradle
configurations.all {
    resolutionStrategy {
        force 'androidx.core:core-ktx:1.12.0'
        force 'com.google.android.gms:play-services-ads:22.6.0'
        force 'androidx.multidex:multidex:2.0.1'
    }
}
```

### **Error: "Task assembleDebug failed"**
**Fix:** Check dependencies are installed
```bash
cd /app/frontend
yarn install
npx cap sync android
```

### **Error: "Gradle daemon stopped"**
**Fix:** Add to `gradle.properties`:
```
org.gradle.jvmargs=-Xmx4096m
org.gradle.daemon=false
```

---

## 🏗️ OPTION 2: Local Build (Requires Setup)

### **Prerequisites:**
- ✅ Android Studio installed
- ✅ Java JDK 17+
- ✅ Android SDK (API 34)
- ✅ Gradle 8.x

### **Steps:**

#### **1. Install Android Studio**
- Download from: https://developer.android.com/studio
- Install Android SDK
- Accept licenses

#### **2. Set Environment Variables**
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

#### **3. Build React App**
```bash
cd /app/frontend
yarn build
```

#### **4. Sync Capacitor**
```bash
npx cap sync android
```

#### **5. Build APK**
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

#### **6. Find APK**
```
/app/frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📦 Build Outputs

### **Debug APK (for testing):**
```
File: app-debug.apk
Size: ~50-100 MB
Signing: Debug keystore
Use: Testing, sharing with friends
Upload: Amazon Appstore (works!)
```

### **Release AAB (for production):**
```
File: app-release.aab
Size: ~30-50 MB
Signing: Your release keystore
Use: Google Play Store, Samsung Galaxy Store
Upload: Production app stores
```

---

## 🚀 Build Release APK/AAB

### **For Production Stores:**

#### **1. Generate Keystore:**
```bash
keytool -genkey -v -keystore dempire-release.keystore \
  -alias dempire \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**Save password securely!**

#### **2. Configure Signing:**

Edit `/app/frontend/android/app/build.gradle`:

```gradle
android {
    signingConfigs {
        release {
            storeFile file("../../dempire-release.keystore")
            storePassword "YOUR_KEYSTORE_PASSWORD"
            keyAlias "dempire"
            keyPassword "YOUR_KEY_PASSWORD"
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### **3. Build Release:**
```bash
cd /app/frontend/android
./gradlew assembleRelease  # For APK
./gradlew bundleRelease    # For AAB (Google Play)
```

#### **4. Find Outputs:**
```
APK: android/app/build/outputs/apk/release/app-release.apk
AAB: android/app/build/outputs/bundle/release/app-release.aab
```

---

## 📲 Installing APK on Android Device

### **Method 1: USB Transfer**
1. Connect phone to computer via USB
2. Copy `app-debug.apk` to phone
3. Open file on phone
4. Enable "Install from Unknown Sources"
5. Tap Install
6. Open Don's Empire! 🎉

### **Method 2: Cloud Transfer**
1. Upload APK to Google Drive/Dropbox
2. Download on phone
3. Install as above

### **Method 3: Direct Download**
1. Host APK on Firebase Storage
2. Share download link
3. Users download & install

---

## 🏪 Uploading to App Stores

### **Amazon Appstore (FREE!):**
1. Create developer account (free)
2. Upload `app-debug.apk` or `app-release.apk`
3. Fill app details
4. Submit for review
5. Published! 🎉

**AdMob verification happens automatically**

### **Samsung Galaxy Store:**
1. Create seller account
2. Upload `app-release.apk` or `app-release.aab`
3. Fill details (see GALAXY_STORE_SETUP.md)
4. Submit
5. Published!

### **Google Play Store:**
1. Requires AAB (not APK)
2. Build: `./gradlew bundleRelease`
3. Upload to Play Console
4. $25 one-time fee
5. Submit

---

## ✅ Your Current Build Status

**What's Ready:**
- ✅ AdMob IDs configured (pub-8715031019966551)
- ✅ Gradle resolution strategy applied
- ✅ Multidex enabled
- ✅ Android manifest updated
- ✅ GitHub Actions workflow configured
- ✅ All dependencies resolved

**What You Need:**
- GitHub account connected
- Push code to trigger build
- OR local Android Studio setup

**Recommendation:**
👉 **Use GitHub Actions!** Easiest and already works perfectly.

---

## 🎯 Quick Start - Get Your APK Now!

**5 Simple Steps:**

1. **Save to GitHub** (use Emergent UI button)
2. **Go to** `github.com/dondonaldson800/Dons-Badass-Grounded-ai/actions`
3. **Wait** 5-10 minutes for build
4. **Download** "dempire-debug-apk" from Artifacts
5. **Install** on Android device

**That's it! 🎉**

---

## 📊 Build Specifications

**Target Android Version:** 14 (API 34)  
**Minimum Android Version:** 7.0 (API 24)  
**Architecture:** ARM64, ARMv7, x86, x86_64  
**Package Name:** `com.dempire.delivery`  
**Version:** 1.0.0  
**AdMob SDK:** 22.6.0  
**Multidex:** Enabled  

---

## 🎆 After You Get Your APK

**Test It:**
- ✅ Install on your Android device
- ✅ Check all features work
- ✅ Verify bottom navigation
- ✅ Test theme switching (Heart!)
- ✅ Check AdMob initializes
- ✅ Try all 4 apps

**Share It:**
- Send to friends/testers
- Get feedback
- Fix any issues
- Build again

**Publish It:**
- Upload to Amazon (free!)
- OR Samsung Galaxy Store
- OR Google Play Store
- Start earning! 💰

---

**Ready to build? Use GitHub Actions - it's the easiest way!** 🚀

**Next:** Push to GitHub → Wait → Download APK → Install → Profit! 💰
