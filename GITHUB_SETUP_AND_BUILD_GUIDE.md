# 🚀 GitHub Setup & APK Build Guide - Master Builder Instructions

## Owner: Don (Master Builder)
## Project: Dons-Badass-Grounded-ai
## Repository: dondonaldson800/Dons-Badass-Grounded-ai

---

## 📋 Part 1: Save Your Code to GitHub

### Step 1: Use "Save to GitHub" in Emergent UI

1. **Locate the "Save to GitHub" button** in your Emergent chat interface (bottom of the screen)
2. **Click "Save to GitHub"**
3. **Follow the prompts** to:
   - Connect your GitHub account (if not already connected)
   - Select repository: `dondonaldson800/Dons-Badass-Grounded-ai`
   - OR create a new repository
   - Commit message: "Add D's Empire Dashboard with AdMob Integration"
4. **Confirm push**

✅ **Your code is now on GitHub!**

---

## 📋 Part 2: Set Up GitHub Secrets (AdMob IDs)

### Why Use Secrets?
- Keeps your AdMob Publisher ID private
- Prevents ID exposure in public repositories
- Allows secure builds via GitHub Actions

### Step-by-Step Setup

1. **Go to Your Repository**
   ```
   https://github.com/dondonaldson800/Dons-Badass-Grounded-ai
   ```

2. **Navigate to Settings**
   - Click "Settings" tab (top right of repo)
   
3. **Go to Secrets and Variables**
   - In left sidebar: Click "Secrets and variables" → "Actions"

4. **Add Repository Secrets**

   Click "New repository secret" and add each of these:

   **Secret 1:**
   - Name: `ADMOB_APP_ID`
   - Value: `6268835652`
   - Click "Add secret"

   **Secret 2:**
   - Name: `ADMOB_PUB_ID`  
   - Value: `pub-8715031019966551`
   - Click "Add secret"

   **Secret 3 (Optional - if using Emergent LLM Key in builds):**
   - Name: `EMERGENT_LLM_KEY`
   - Value: `[Your Emergent LLM Key]`
   - Click "Add secret"

✅ **Secrets configured!** They're now available to GitHub Actions as:
- `${{ secrets.ADMOB_APP_ID }}`
- `${{ secrets.ADMOB_PUB_ID }}`

---

## 📋 Part 3: Update GitHub Actions Workflow (Optional)

Your workflow is already set up at `.github/workflows/build-android.yml`

**If you want to use secrets in the build**, update the workflow:

### Option A: Use Secrets in Build (Recommended for Production)

Edit `.github/workflows/build-android.yml` and add environment variables:

```yaml
jobs:
  build-android:
    runs-on: ubuntu-latest
    
    env:
      ADMOB_APP_ID: ${{ secrets.ADMOB_APP_ID }}
      ADMOB_PUB_ID: ${{ secrets.ADMOB_PUB_ID }}
    
    steps:
      # ... existing steps ...
      
      - name: Build Android Debug APK
        working-directory: ./frontend/android
        env:
          ADMOB_APP_ID: ${{ secrets.ADMOB_APP_ID }}
          ADMOB_PUB_ID: ${{ secrets.ADMOB_PUB_ID }}
        run: |
          chmod +x gradlew
          ./gradlew assembleDebug --no-daemon
```

### Option B: Keep Hardcoded Values (Current Setup)

The AdMob IDs are currently hardcoded in:
- `build.gradle` (manifestPlaceholders)
- `AndroidManifest.xml`
- `EmpireRevenueController.js`

**This works fine for now.** Secrets are mainly needed if you make the repo public.

---

## 📋 Part 4: Trigger the APK Build

### Method 1: Automatic Trigger (Recommended)

**Push to main/master branch:**

1. After using "Save to GitHub", the workflow automatically triggers
2. OR make any commit to `main` or `master` branch:
   ```bash
   git commit --allow-empty -m "Trigger APK build"
   git push origin main
   ```

### Method 2: Manual Trigger

1. **Go to Actions tab**
   ```
   https://github.com/dondonaldson800/Dons-Badass-Grounded-ai/actions
   ```

2. **Select "Build Android APK" workflow** (left sidebar)

3. **Click "Run workflow" button** (right side)

4. **Select branch:** `main`

5. **Click green "Run workflow" button**

✅ **Build started!**

---

## 📋 Part 5: Monitor the Build

### Watch Build Progress

1. **Go to Actions tab**
   ```
   https://github.com/dondonaldson800/Dons-Badass-Grounded-ai/actions
   ```

2. **Click on the running workflow** (yellow dot = in progress)

3. **View real-time logs:**
   - Click on "build-android" job
   - Expand each step to see detailed logs
   - Watch for errors in red

### Build Steps (What Happens)

```
✅ Checkout code
✅ Setup Node.js 20
✅ Setup Java 17
✅ Install frontend dependencies (yarn)
✅ Build React app
✅ Sync Capacitor
✅ Build Android Debug APK ← This is where it might fail
✅ Upload APK artifact
✅ Create GitHub Release (if on main/master)
```

### Typical Build Time
- **5-10 minutes** total
- Gradle build: 3-5 minutes
- React build: 1-2 minutes

---

## 📋 Part 6: Download the APK

### Option A: Download from Artifacts (Always Available)

1. **Workflow completes** (green checkmark ✅)

2. **Scroll down to "Artifacts" section** (bottom of workflow run page)

3. **Click "dempire-debug-apk"** to download ZIP file

4. **Unzip the file:**
   - Windows: Right-click → Extract All
   - Mac: Double-click the ZIP
   - Linux: `unzip dempire-debug-apk.zip`

5. **You'll find:** `app-debug.apk` (your Android app!)

### Option B: Download from Releases (If on main/master)

1. **Go to Releases**
   ```
   https://github.com/dondonaldson800/Dons-Badass-Grounded-ai/releases
   ```

2. **Click the latest release** (e.g., "D's Empire v1.0.X")

3. **Download "app-debug.apk"** from Assets section

---

## 📋 Part 7: Install APK on Android Device

### Prerequisites
- Android phone/tablet
- USB cable OR file transfer method

### Installation Steps

1. **Transfer APK to your phone:**
   - USB: Copy `app-debug.apk` to phone storage
   - Cloud: Upload to Google Drive, download on phone
   - Email: Email APK to yourself, download on phone

2. **Enable "Install from Unknown Sources":**
   - Go to Settings → Security (or Apps)
   - Enable "Unknown Sources" or "Install Unknown Apps"
   - Allow installation from Files/Chrome/etc.

3. **Install the APK:**
   - Open Files app on phone
   - Navigate to where you saved `app-debug.apk`
   - Tap the APK file
   - Tap "Install"
   - Wait for installation
   - Tap "Open"

✅ **D's Empire is now installed!**

---

## 🐛 Troubleshooting Build Failures

### Common Issues & Fixes

#### Issue 1: Gradle Dependency Conflicts
**Error:**
```
Duplicate class found
AAPT2 error
```

**Fix:** Already applied in `build.gradle`:
```gradle
configurations.all {
    resolutionStrategy {
        force 'androidx.core:core-ktx:1.12.0'
        force 'com.google.android.gms:play-services-ads:22.6.0'
        force 'androidx.multidex:multidex:2.0.1'
    }
}
```

#### Issue 2: Out of Memory
**Error:**
```
Java heap space error
```

**Fix:** Add to `gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4096m
```

#### Issue 3: Missing SDK Components
**Error:**
```
Android SDK not found
```

**Fix:** GitHub Actions already installs SDK. Check Java version:
```yaml
uses: actions/setup-java@v4
with:
  java-version: '17'  # Must be 17
```

#### Issue 4: Capacitor Sync Fails
**Error:**
```
capacitor.config.json not found
```

**Fix:** Ensure `capacitor.config.json` is in `/frontend/` directory

---

## 📊 Verify Build Success

### Check These Files in APK

Use an APK analyzer (Android Studio) or online tool:

1. **AdMob SDK included:**
   - Look for `com/google/android/gms/ads/` in APK

2. **Manifest has AdMob meta-data:**
   ```xml
   <meta-data
       android:name="com.google.android.gms.ads.APPLICATION_ID"
       android:value="ca-app-pub-8715031019966551~6268835652"/>
   ```

3. **JavaScript bundle includes:**
   - `EmpireRevenueController`
   - `BadassAIEngine`

---

## 🎯 Next Steps After Successful Build

### 1. Test the APK
- Install on Android device
- Test all features:
  - ✅ Dashboard loads
  - ✅ Q&A works
  - ✅ Image generation works
  - ✅ Chat works
  - ✅ AdMob initializes (check logs)

### 2. Publish to Samsung Galaxy Store

See `/app/GALAXY_STORE_SETUP.md` for:
- Creating Galaxy Store developer account
- Preparing store listing
- Uploading APK
- Publishing app

### 3. Get Real Ad Unit IDs

Currently using placeholder IDs:
```javascript
interstitial: "ca-app-pub-8715031019966551/XXXXXX"
```

**To get real IDs:**
1. Go to https://apps.admob.com/
2. Create ad units for your app
3. Copy real Ad Unit IDs
4. Update `EmpireRevenueController.js`
5. Rebuild APK

---

## 🔐 Security Best Practices

### 1. Keep Secrets Secret
- ✅ Never commit API keys to public repos
- ✅ Use GitHub Secrets for sensitive data
- ✅ Rotate keys if accidentally exposed

### 2. Production vs Debug APK
- **Debug APK:** For testing (current setup)
- **Release APK:** For Galaxy Store (requires signing)

**To create Release APK:**
```bash
cd /app/frontend/android
./gradlew assembleRelease
```

Requires:
- Signing keystore
- Key password
- Configured in `build.gradle`

### 3. App Signing for Galaxy Store
- Generate keystore:
  ```bash
  keytool -genkey -v -keystore dempire.keystore -alias dempire -keyalg RSA -keysize 2048 -validity 10000
  ```
- Keep keystore file safe
- Upload to Galaxy Store

---

## 📞 Support & Resources

### If Build Fails

1. **Check GitHub Actions logs** for specific error
2. **Review this guide's troubleshooting section**
3. **Common fixes:**
   - Clear Gradle cache: `./gradlew clean`
   - Update dependencies
   - Check Java/Node versions

### Useful Links

- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **Capacitor Android:** https://capacitorjs.com/docs/android
- **AdMob Setup:** https://support.google.com/admob/
- **Galaxy Store:** https://seller.samsungapps.com/

---

## ✅ Quick Checklist

Before building APK:
- [ ] Code pushed to GitHub via "Save to GitHub"
- [ ] GitHub Secrets configured (optional)
- [ ] Gradle resolution strategy applied
- [ ] AdMob IDs in manifest/build files
- [ ] Capacitor configured correctly

To build APK:
- [ ] Trigger GitHub Actions workflow
- [ ] Monitor build progress
- [ ] Download APK from Artifacts

To install:
- [ ] Transfer APK to Android device
- [ ] Enable Unknown Sources
- [ ] Install and test

---

## 🎉 You're All Set, Master Builder!

Your D's Empire Dashboard is ready to:
- ✅ Build automatically via GitHub Actions
- ✅ Generate APK with AdMob integration
- ✅ Install on any Android device
- ✅ Publish to Samsung Galaxy Store

**Use "Save to GitHub" whenever you're ready to build!**

---

**Built with 🔥 by Emergent Agent for Don's Badass Empire**
