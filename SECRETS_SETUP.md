# GitHub Secrets Setup Guide

This document outlines all the secrets needed for the deployment workflow to work properly.

## 📝 How to Add Secrets

1. Go to: `Settings` → `Secrets and variables` → `Actions`
2. Click `New repository secret`
3. Add each secret below

---

## 🔐 Required Secrets

### Backend/Frontend (Google Cloud + Firebase)

| Secret Name | Description | Where to Get |
|---|---|---|
| `GCP_SA_KEY` | Google Cloud Service Account JSON | Google Cloud Console → Service Accounts → Create Key (JSON) |
| `MONGO_URL` | MongoDB connection string | MongoDB Atlas → Connection String |
| `DB_NAME` | Database name | Your MongoDB database name |
| `STRIPE_API_KEY` | Stripe secret API key | Stripe Dashboard → API Keys |
| `EMERGENT_LLM_KEY` | Emergent LLM API key | Your LLM provider dashboard |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase service account JSON | Firebase Console → Project Settings → Service Accounts → Generate New Private Key |

### Android Signing & Build

| Secret Name | Description | How to Generate |
|---|---|---|
| `ANDROID_KEYSTORE_BASE64` | Base64 encoded keystore file | Run: `base64 -i /path/to/release.keystore \| tr -d '\n'` |
| `ANDROID_KEYSTORE_PASSWORD` | Keystore password | Password you set when creating keystore |
| `ANDROID_KEY_ALIAS` | Key alias (certificate name) | Alias from keystore (e.g., `release-key`) |
| `ANDROID_KEY_PASSWORD` | Key password | Password for the key entry |

**Generate Android Keystore:**
```bash
keytool -genkey -v -keystore release.keystore -keyalg RSA -keysize 2048 \
  -validity 10000 -alias release-key -storepass [PASSWORD] -keypass [PASSWORD]
```

### Google Play Store

| Secret Name | Description | Where to Get |
|---|---|---|
| `GOOGLE_PLAY_SERVICE_ACCOUNT` | Google Play service account JSON | Google Cloud Console → Service Accounts → Create Key (JSON) with Play Developer role |

**Steps:**
1. Go to Google Cloud Console
2. Create a service account
3. Grant it "Service Account User" & "Editor" roles
4. Create a JSON key
5. Go to Google Play Console → Settings → API Access
6. Link the service account

### Samsung Galaxy Store

| Secret Name | Description | Where to Get |
|---|---|---|
| `GALAXY_STORE_API_KEY` | Samsung Galaxy Store API key | Samsung Seller Office → App Info → API Key |
| `GALAXY_STORE_APP_ID` | Your app ID on Galaxy Store | Samsung Seller Office → App ID |

### Amazon Appstore

| Secret Name | Description | Where to Get |
|---|---|---|
| `AMAZON_CLIENT_ID` | Amazon Appstore API client ID | Amazon Developer Console → Apps → Security Profile → Client ID |
| `AMAZON_CLIENT_SECRET` | Amazon Appstore API client secret | Amazon Developer Console → Apps → Security Profile → Client Secret |
| `AMAZON_APP_ID` | Your app ID on Amazon Appstore | Amazon Developer Console → App ID |

---

## ✅ Verification Checklist

Before running the workflow, verify:

- [ ] All secrets added to GitHub repository
- [ ] `GCP_SA_KEY` has permissions: Cloud Run Admin, Service Account User, Container Registry Editor
- [ ] `GOOGLE_PLAY_SERVICE_ACCOUNT` linked in Google Play Console
- [ ] Android keystore created and Base64 encoded
- [ ] Firebase project initialized
- [ ] MongoDB database created
- [ ] Stripe API keys valid
- [ ] LLM API key valid

---

## 🚀 Running the Workflow

After adding all secrets, you can trigger the deployment in two ways:

### Option 1: Manual Trigger
1. Go to **Actions** tab
2. Select **"Deploy D's Empire to Google Cloud"**
3. Click **"Run workflow"** → **"Run workflow"**

### Option 2: Auto Trigger (Push to main)
```bash
git push origin main
```

---

## 📊 Workflow Status

Monitor the workflow execution:
1. Go to **Actions** tab
2. Click the latest workflow run
3. View logs for each job

---

## 🔧 Troubleshooting

**APK/AAB Build Fails:**
- Verify Android keystore password matches `ANDROID_KEYSTORE_PASSWORD`
- Check `ANDROID_KEY_ALIAS` exists in keystore: `keytool -list -v -keystore release.keystore`

**Google Play Deploy Fails:**
- Ensure service account has Play Developer API role
- Verify app package name matches `com.dons.empire` in workflow

**Galaxy Store Deploy Fails:**
- Check API key is valid and not expired
- Verify app is registered in Galaxy Seller Office

**Amazon Deploy Fails:**
- Verify client credentials are correct
- Check app is registered in Amazon Developer Console

---

## 📞 Support

For store-specific issues, refer to:
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Samsung Galaxy Store API Docs](https://developer.samsung.com/galaxy-store/register-app.html)
- [Amazon Appstore Developer Docs](https://developer.amazon.com/docs/app-submission/submitting-apps.html)
