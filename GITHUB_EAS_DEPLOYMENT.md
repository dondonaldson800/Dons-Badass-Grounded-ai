# 🚀 GROUNDED EMPIRE - GitHub + EAS Cloud Deployment Guide

## Master Architect's Launch Strategy

This guide walks you through deploying all **Core Four** apps (General, Law, Medical, Nonprofit) to GitHub and building them via **Expo Application Services (EAS)** for Google Play, Samsung Galaxy Store, and Amazon Appstore.

---

## 📋 Prerequisites

### 1. **GitHub Account & Organization**
- Create a GitHub organization called `Grounded-Empire` (or your preferred name)
- Generate a **Personal Access Token (PAT)** with `repo` permissions
  - Go to: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate new token with `repo` scope
  - Save this token securely

### 2. **Expo Account & EAS CLI**
- Create an Expo account at [expo.dev](https://expo.dev)
- Install EAS CLI globally (if not already installed):
  ```bash
  npm install -g eas-cli
  ```
- Login to EAS:
  ```bash
  eas login
  ```
- Generate an **EXPO_TOKEN** for CI/CD:
  ```bash
  eas whoami
  # Then go to expo.dev → Account Settings → Access Tokens → Create Token
  ```

---

## 🏗️ Step 1: Initialize Git Repositories

### For Each App (General, Law, Medical, Nonprofit)

Run these commands from the Emergent agent or your local terminal:

```bash
# Navigate to each app directory
cd /app/expo-empire
git init
git add .
git commit -m "Initial commit: Empire General App"

cd /app/expo-law
git init
git add .
git commit -m "Initial commit: Empire Law App"

cd /app/expo-medical
git init
git add .
git commit -m "Initial commit: Empire Medical App"

cd /app/expo-nonprofit
git init
git add .
git commit -m "Initial commit: Grounded Giving App"
```

---

## 🔗 Step 2: Connect to GitHub

### Create Remote Repositories

For each app, create a new repository on GitHub under your `Grounded-Empire` organization:

1. Go to GitHub → Your Organization → New Repository
2. Create these repositories:
   - `empire-general`
   - `empire-law`
   - `empire-medical`
   - `grounded-giving`
3. Make them **private** initially

### Push to GitHub

Replace `YOUR_GITHUB_ORG` and `YOUR_GITHUB_TOKEN` with your actual values:

```bash
# Set up credentials
export GITHUB_TOKEN="your_personal_access_token_here"
export GITHUB_ORG="Grounded-Empire"

# Empire General
cd /app/expo-empire
git remote add origin https://${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/empire-general.git
git branch -M main
git push -u origin main

# Empire Law
cd /app/expo-law
git remote add origin https://${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/empire-law.git
git branch -M main
git push -u origin main

# Empire Medical
cd /app/expo-medical
git remote add origin https://${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/empire-medical.git
git branch -M main
git push -u origin main

# Grounded Giving
cd /app/expo-nonprofit
git remote add origin https://${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/grounded-giving.git
git branch -M main
git push -u origin main
```

---

## ⚙️ Step 3: Configure EAS Projects

### Link Each App to EAS

For each app, run `eas build:configure` to generate unique project IDs:

```bash
cd /app/expo-empire
eas build:configure

cd /app/expo-law
eas build:configure

cd /app/expo-medical
eas build:configure

cd /app/expo-nonprofit
eas build:configure
```

This will update the `extra.eas.projectId` in each `app.json` automatically.

**IMPORTANT:** Commit and push these changes:

```bash
cd /app/expo-empire
git add app.json
git commit -m "Configure EAS project ID"
git push

# Repeat for expo-law, expo-medical, expo-nonprofit
```

---

## 🏭 Step 4: Build APK/AAB Files

### Build Locally (Agent-Controlled)

If you have `EXPO_TOKEN` configured in your environment:

```bash
export EXPO_TOKEN="your_expo_token_here"

# Build all 4 apps in production mode (AAB for Google Play)
cd /app/expo-empire && eas build --platform android --profile production --non-interactive
cd /app/expo-law && eas build --platform android --profile production --non-interactive
cd /app/expo-medical && eas build --platform android --profile production --non-interactive
cd /app/expo-nonprofit && eas build --platform android --profile production --non-interactive
```

### Build from Your Local Machine

Alternatively, clone the repos from GitHub and run:

```bash
git clone https://github.com/Grounded-Empire/empire-general.git
cd empire-general
yarn install
eas build --platform android --profile production
```

### Build Profiles

- **`development`**: Development client for testing
- **`preview`**: APK for internal distribution (side-loading)
- **`production`**: AAB for Google Play submission

---

## 📦 Step 5: Download & Distribute

### Download Built Files

After EAS completes the build (takes 10-20 minutes), you'll receive:

- **APK** (for preview builds): Side-load to devices or upload to Samsung/Amazon
- **AAB** (for production builds): Upload to Google Play Console

Download links are provided in the EAS dashboard: [expo.dev/accounts/YOUR_ACCOUNT/projects](https://expo.dev/accounts)

### Distribution Channels

| Store | File Format | Submission Process |
|-------|-------------|-------------------|
| **Google Play** | AAB | EAS can auto-submit with service account key |
| **Samsung Galaxy Store** | APK or AAB | Manual upload to [seller.samsungapps.com](https://seller.samsungapps.com) |
| **Amazon Appstore** | APK | Manual upload to [developer.amazon.com](https://developer.amazon.com) |

---

## 🤖 Step 6: Automate with GitHub Actions (Optional)

Create `.github/workflows/eas-build.yml` in each repo:

```yaml
name: EAS Build
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: yarn install
      - name: Build Android AAB
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
        run: eas build --platform android --profile production --non-interactive
```

**Set GitHub Secret:**
- Go to your repo → Settings → Secrets → New repository secret
- Name: `EXPO_TOKEN`
- Value: Your Expo access token

---

## 🎯 Bundle Identifier Reference

Each app has a unique bundle ID:

| App | Bundle ID | GitHub Repo |
|-----|-----------|-------------|
| Empire General | `com.empire.general` | `empire-general` |
| Empire Law | `com.empire.law` | `empire-law` |
| Empire Medical | `com.empire.medical` | `empire-medical` |
| Grounded Giving | `com.empire.giving` | `grounded-giving` |

---

## 🔄 Update Workflow

When you need to update an app:

1. **Make changes in Emergent agent** or local editor
2. **Commit & push to GitHub:**
   ```bash
   cd /app/expo-[APP_NAME]
   git add .
   git commit -m "Update: [description]"
   git push origin main
   ```
3. **Trigger new build:**
   ```bash
   eas build --platform android --profile production
   ```
4. **Download updated APK/AAB** from EAS dashboard
5. **Submit to stores**

---

## 🛠️ Troubleshooting

### Build Fails: "Invalid Bundle Identifier"
- Ensure `android.package` and `ios.bundleIdentifier` in `app.json` match across all files
- Bundle IDs must be unique per app

### Build Fails: "Missing Credentials"
- Run `eas credentials` to configure Android keystore
- EAS will auto-generate a keystore if none exists

### Build Fails: "Dependency Error"
- Check `package.json` versions match Expo SDK (`~51.0.0`)
- Run `yarn install` to update dependencies

### Cannot Push to GitHub: "Authentication Failed"
- Verify your GitHub Personal Access Token has `repo` permissions
- Use HTTPS with token: `https://YOUR_TOKEN@github.com/org/repo.git`

---

## 📞 Support Resources

- **EAS Documentation**: [docs.expo.dev/build/introduction/](https://docs.expo.dev/build/introduction/)
- **Google Play Console**: [play.google.com/console](https://play.google.com/console)
- **Expo Community**: [forums.expo.dev](https://forums.expo.dev)

---

## ✅ Deployment Checklist

- [ ] Created GitHub organization
- [ ] Generated GitHub Personal Access Token
- [ ] Created Expo account and generated EXPO_TOKEN
- [ ] Initialized Git repos for all 4 apps
- [ ] Pushed code to GitHub
- [ ] Configured EAS projects (`eas build:configure`)
- [ ] Triggered production builds (`eas build --platform android --profile production`)
- [ ] Downloaded APK/AAB files from EAS dashboard
- [ ] Submitted to Google Play / Samsung / Amazon stores

---

🎉 **Congratulations!** Your **Grounded Empire** apps are now live on the cloud and ready for deployment to millions of users.

**Next:** Scale this workflow to the remaining 16 apps using the Master Template strategy.
