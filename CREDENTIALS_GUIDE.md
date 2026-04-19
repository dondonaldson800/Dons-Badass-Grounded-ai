# 🔑 CREDENTIALS SETUP GUIDE

This file contains instructions for obtaining the necessary credentials to deploy your Grounded Empire apps.

---

## 📋 REQUIRED CREDENTIALS

### 1. GitHub Personal Access Token

**What it's for:** Pushing code to GitHub repositories

**How to get it:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Tokens (classic)"
3. Give it a name: "Grounded Empire Deployment"
4. Select scopes: ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

**Set in environment:**
```bash
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
export GITHUB_ORG="Grounded-Empire"  # Or your org name
```

---

### 2. Expo Access Token

**What it's for:** Automating EAS builds from CI/CD or scripts

**How to get it:**
1. Go to https://expo.dev/
2. Create an account (free) if you don't have one
3. Go to Account Settings → Access Tokens
4. Click "Create Token"
5. Give it a name: "Grounded Empire CI"
6. **COPY THE TOKEN**

**Set in environment:**
```bash
export EXPO_TOKEN="your_expo_token_here"
```

**Alternatively, login manually:**
```bash
npm install -g eas-cli
eas login
```

---

### 3. Google Play Console (For Store Submission)

**What it's for:** Publishing apps to Google Play Store

**How to get it:**
1. Go to https://play.google.com/console
2. Create a developer account ($25 one-time registration fee)
3. Complete identity verification
4. Accept Developer Distribution Agreement

**For automated submission (optional):**
- Create a service account in Google Cloud Console
- Download the JSON key
- Link it to EAS: `eas credentials`

---

### 4. Samsung Galaxy Store (Optional)

**What it's for:** Publishing apps to Samsung devices

**How to get it:**
1. Go to https://seller.samsungapps.com/
2. Register as a developer (FREE)
3. Submit required documents (business license or ID verification)

**Submission:** Manual upload of APK/AAB files

---

### 5. Amazon Appstore (Optional)

**What it's for:** Publishing apps to Amazon Fire devices and Amazon Appstore on Android

**How to get it:**
1. Go to https://developer.amazon.com/
2. Create a developer account (FREE)
3. Complete registration

**Submission:** Manual upload of APK files

---

## 🚀 QUICK SETUP COMMANDS

Once you have your credentials, run:

```bash
# Export your tokens
export GITHUB_TOKEN="your_github_personal_access_token"
export GITHUB_ORG="Grounded-Empire"  # Your GitHub org name
export EXPO_TOKEN="your_expo_access_token"  # Optional for automation

# Run the quick start script
cd /app
./quick-start.sh
```

---

## 🔒 SECURITY BEST PRACTICES

### DO ✅
- Store tokens in environment variables (not in code)
- Use `.env` files for local development (add to `.gitignore`)
- Use GitHub Secrets for CI/CD workflows
- Rotate tokens periodically (every 90 days recommended)
- Use fine-grained tokens with minimal permissions

### DON'T ❌
- Commit tokens to Git repositories
- Share tokens in chat/email
- Use the same token across multiple unrelated projects
- Leave tokens in command history (use `export` instead of inline)

---

## 📝 ENVIRONMENT VARIABLE TEMPLATE

Create a file `~/.grounded-empire-env` (outside the repository):

```bash
#!/bin/bash
# Grounded Empire Deployment Credentials
# Source this file: source ~/.grounded-empire-env

export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
export GITHUB_ORG="Grounded-Empire"
export EXPO_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Optional: Store account credentials
export GOOGLE_SERVICE_ACCOUNT_KEY_PATH="/path/to/google-service-account.json"
```

Then load it when needed:
```bash
source ~/.grounded-empire-env
```

---

## 🆘 TROUBLESHOOTING

### "Authentication failed" when pushing to GitHub
- Verify your token has `repo` permissions
- Check if the token is expired (go to GitHub settings)
- Ensure you're using HTTPS remote URL (not SSH)

### "EXPO_TOKEN invalid" error
- Make sure you copied the full token from expo.dev
- Try logging in manually with `eas login` instead

### "Unable to find project" during EAS build
- Run `eas build:configure` first for each app
- Ensure you're logged into the correct Expo account

---

## 📞 SUPPORT

If you encounter issues obtaining credentials:
- **GitHub:** https://docs.github.com/en/authentication
- **Expo:** https://docs.expo.dev/accounts/login/
- **Google Play:** https://support.google.com/googleplay/android-developer

---

## ✅ CHECKLIST

Before running deployment scripts, verify:

- [ ] GitHub account created
- [ ] GitHub organization created (or using personal account)
- [ ] GitHub Personal Access Token generated with `repo` scope
- [ ] Expo account created at expo.dev
- [ ] Expo Access Token generated (or logged in via `eas login`)
- [ ] Environment variables exported in current terminal session
- [ ] (Optional) Google Play Console account created
- [ ] (Optional) Samsung/Amazon developer accounts created

---

*Once all credentials are set, proceed with `/app/quick-start.sh`*
