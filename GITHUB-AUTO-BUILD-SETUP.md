# 🤖 GITHUB AUTO-BUILD SETUP GUIDE

**Complete setup for automated EAS builds triggered by GitHub pushes**

---

## 🎯 WHAT YOU'RE SETTING UP

**The Magic:** Push code → GitHub automatically builds your apps!

```
You: git push
         ↓
GitHub: "New code detected!"
         ↓
GitHub Actions: Runs build script
         ↓
EAS: Builds your app in the cloud
         ↓
You: Get notification & download APK/AAB
```

---

## ✅ PREREQUISITES

Before starting, make sure you have:

- [x] GitHub account
- [x] Expo account (expo.dev)
- [x] EXPO_TOKEN from expo.dev
- [x] 4 GitHub repositories created
- [x] Apps downloaded with workflow files (in the ZIP)

---

## 📋 COMPLETE SETUP (STEP-BY-STEP)

### STEP 1: Get Your EXPO_TOKEN (5 minutes)

**1.1** Go to: https://expo.dev/accounts/[your-username]/settings/access-tokens

**1.2** Click "Create Token"

**1.3** Fill in:
- Name: `GitHub Actions Automation`
- Expiration: `No expiration`

**1.4** Click "Create" and **COPY THE TOKEN**

**Example token:** `abc123xyz789...` (long string)

**⚠️ Save it somewhere safe - you'll use it 4 times!**

---

### STEP 2: Add EXPO_TOKEN to GitHub (For Each Repo)

You need to add the token as a "secret" in each GitHub repository.

#### For Empire General:

**2.1** Go to: `https://github.com/YOUR_USERNAME/empire-general`

**2.2** Click "Settings" tab (top right)

**2.3** In left sidebar, click "Secrets and variables" → "Actions"

**2.4** Click "New repository secret"

**2.5** Fill in:
- Name: `EXPO_TOKEN` (exactly this, uppercase)
- Secret: Paste your Expo token

**2.6** Click "Add secret"

#### Repeat for Other 3 Repos:

Do the same for:
- `https://github.com/YOUR_USERNAME/empire-law` → Add EXPO_TOKEN
- `https://github.com/YOUR_USERNAME/empire-medical` → Add EXPO_TOKEN
- `https://github.com/YOUR_USERNAME/grounded-giving` → Add EXPO_TOKEN

**Checkpoint:** All 4 repos should have `EXPO_TOKEN` secret added ✅

---

### STEP 3: Push Apps with Workflow Files (10 minutes)

The workflow files are already in your apps! Just push to GitHub.

#### Download Updated Archive

**3.1** Download the NEW `/app/core-four-apps.zip` from Emergent
(I just updated it with the workflow files!)

**3.2** Extract it:
```bash
unzip core-four-apps.zip
```

#### Push All 4 Apps

**3.3** Set your credentials:
```bash
export GITHUB_TOKEN="your_github_token"
export GITHUB_ORG="YourGitHubUsername"
```

**3.4** Run this ONE command to push all 4 apps:

```bash
for app in expo-empire expo-law expo-medical expo-nonprofit; do
  echo "🚀 Pushing $app..."
  cd "$app"
  git init
  git add .
  git commit -m "🤖 Add GitHub Actions auto-build"
  REPO_NAME="${app//expo-/empire-}"
  git remote add origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/${REPO_NAME}.git"
  git branch -M main
  git push -u origin main --force
  cd ..
  echo "✅ $app pushed with auto-build!"
  echo ""
done
```

**This pushes all 4 apps with the GitHub Actions workflows!**

---

### STEP 4: Configure EAS for Each App (5 minutes)

Before the auto-build can work, you need to run `eas build:configure` once per app.

**4.1** Install EAS CLI globally (if you haven't):
```bash
npm install -g eas-cli
```

**4.2** Login to EAS:
```bash
eas login
```

**4.3** Configure each app:

```bash
cd expo-empire
eas build:configure
cd ..

cd expo-law
eas build:configure
cd ..

cd expo-medical
eas build:configure
cd ..

cd expo-nonprofit
eas build:configure
cd ..
```

**This links each app to your Expo account.**

---

### STEP 5: Test the Automation! (2 minutes)

Let's test if it works!

#### Method 1: Make a Small Change

**5.1** Edit any file (e.g., change a color in App.js)

**5.2** Commit and push:
```bash
cd expo-empire
# Make a small change
git add .
git commit -m "Test auto-build"
git push origin main
```

**5.3** Go to GitHub: `https://github.com/YOUR_USERNAME/empire-general/actions`

**You should see:**
- ✅ A workflow running (orange dot)
- ✅ After ~2 minutes: Green checkmark (workflow completed)
- ✅ EAS build triggered!

#### Method 2: Manual Trigger

**5.1** Go to: `https://github.com/YOUR_USERNAME/empire-general/actions`

**5.2** Click "EAS Build - Empire General" workflow

**5.3** Click "Run workflow" → "Run workflow"

**5.4** Watch it run!

---

## 🎯 UNDERSTANDING THE WORKFLOW FILE

Let me explain what each part does:

```yaml
name: EAS Build - Empire General
```
**→ The workflow name (appears in GitHub Actions tab)**

```yaml
on:
  push:
    branches:
      - main
```
**→ Trigger: Runs when you push to 'main' branch**

```yaml
  workflow_dispatch:
```
**→ Allows manual trigger from GitHub UI**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```
**→ Use Ubuntu Linux server to run the build**

```yaml
- uses: actions/checkout@v3
```
**→ Download your code from GitHub**

```yaml
- uses: actions/setup-node@v3
  with:
    node-version: 18.x
```
**→ Install Node.js (needed for Expo)**

```yaml
- uses: expo/expo-github-action@v8
  with:
    token: ${{ secrets.EXPO_TOKEN }}
```
**→ Login to Expo using your secret token**

```yaml
- run: yarn install
```
**→ Install all dependencies (node_modules)**

```yaml
- run: eas build --platform android --profile production --non-interactive --no-wait
```
**→ Trigger the EAS build! (APK/AAB)**

```yaml
- uses: actions/github-script@v6
  with:
    script: |
      github.rest.repos.createCommitComment(...)
```
**→ Add a comment on your commit with build status**

---

## 🔄 HOW IT WORKS GOING FORWARD

### Every Time You Push to GitHub:

**1. You make changes:**
```bash
cd expo-empire
# Edit some files
git add .
git commit -m "Update feature X"
git push origin main
```

**2. GitHub Actions automatically:**
- ✅ Detects your push
- ✅ Runs the workflow
- ✅ Installs dependencies
- ✅ Triggers EAS build

**3. You get notified:**
- ✅ Email from Expo: "Build complete!"
- ✅ Go to expo.dev to download APK/AAB

**NO MANUAL `eas build` COMMAND NEEDED!** 🎉

---

## 📊 MONITORING BUILDS

### View Build Status:

**GitHub:**
- Go to: `https://github.com/YOUR_USERNAME/[repo-name]/actions`
- See all workflow runs
- Green ✅ = Success
- Red ❌ = Failed
- Orange 🟠 = Running

**Expo:**
- Go to: `https://expo.dev/accounts/[your-account]/projects`
- See all your builds
- Download APK/AAB files

---

## 🎯 ADVANCED FEATURES

### Build on Pull Requests

Add this to trigger builds on PRs:

```yaml
on:
  push:
    branches:
      - main
  pull_request:  # Add this
    branches:
      - main
```

### Build Multiple Platforms

Build both Android and iOS:

```yaml
- name: 🚀 Build Android
  run: eas build --platform android --profile production --non-interactive --no-wait

- name: 🚀 Build iOS
  run: eas build --platform ios --profile production --non-interactive --no-wait
```

### Scheduled Builds

Build every night at 2 AM:

```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily
```

---

## 🚨 TROUBLESHOOTING

### "EXPO_TOKEN not found"
**Fix:** Make sure you added the secret to GitHub
- Go to repo Settings → Secrets → Actions
- Verify `EXPO_TOKEN` exists

### "Project not configured"
**Fix:** Run `eas build:configure` first
```bash
cd expo-empire
eas build:configure
```

### "Invalid credentials"
**Fix:** Regenerate EXPO_TOKEN
- Go to expo.dev → Account → Access Tokens
- Create new token
- Update GitHub secret

### Workflow doesn't trigger
**Fix:** Check you pushed to `main` branch
```bash
git branch  # Check current branch
git push origin main  # Push to main
```

---

## 💰 COST

**GitHub Actions:**
- ✅ Free for public repos (unlimited)
- ✅ 2,000 minutes/month for private repos (free tier)
- Each build takes ~5 minutes = 400 builds/month free

**EAS Builds:**
- ✅ Free tier: Limited builds per month
- ✅ Production plan: $99/month unlimited builds
- Check: https://expo.dev/pricing

---

## 📋 QUICK REFERENCE

### Push and Auto-Build:
```bash
git add .
git commit -m "Your changes"
git push origin main
# Build starts automatically!
```

### Manual Trigger:
- Go to GitHub → Actions tab
- Click "Run workflow"

### Check Build Status:
- GitHub: repo/actions
- Expo: expo.dev/accounts/projects

### Download Build:
- Wait for email from Expo
- Go to expo.dev
- Download APK/AAB

---

## ✅ SETUP COMPLETE CHECKLIST

- [ ] EXPO_TOKEN obtained from expo.dev
- [ ] EXPO_TOKEN added to all 4 GitHub repos (Settings → Secrets)
- [ ] Downloaded updated core-four-apps.zip (with workflow files)
- [ ] Pushed all 4 apps to GitHub with workflows
- [ ] Ran `eas build:configure` for each app
- [ ] Tested auto-build by pushing or manual trigger
- [ ] Received email notification from Expo
- [ ] Downloaded APK/AAB from expo.dev

---

## 🎉 YOU'RE DONE!

**From now on:**
```bash
# Just push code
git push origin main

# GitHub automatically builds your app!
# Download from expo.dev when ready
```

**No more manual builds needed!** 🚀

---

*Master Architect's Automated Empire - Complete* 🏛️🤖
