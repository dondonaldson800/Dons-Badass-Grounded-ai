# 🚀 D's Empire - Google Cloud Platform Deployment Guide

## 📋 Overview

Your Empire can be deployed to Google Cloud Platform using:
1. **Firebase Hosting** (Frontend - Static files)
2. **Cloud Run** (Backend - FastAPI container)
3. **MongoDB Atlas** (Database - Managed MongoDB)

---

## 🎯 OPTION 1: Firebase Hosting + Cloud Run (Recommended)

### Prerequisites:
- Google Cloud Project ID: `249321727719`
- Firebase CLI installed
- Google Cloud SDK installed
- Stripe live API key

---

## 📦 STEP 1: Prepare for Deployment

### A. Install Required Tools (On Your Local Machine)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Install Google Cloud SDK
# macOS:
brew install --cask google-cloud-sdk

# Windows: Download from https://cloud.google.com/sdk/docs/install

# Linux:
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### B. Download Your App from Emergent

1. Click **"Save to GitHub"** in Emergent chat
2. Or use **"Download Code"** feature
3. Extract to your local machine

---

## 🔧 STEP 2: Configure Environment Variables

### Update Backend Environment (Production):

Edit `/backend/.env`:

```env
# MongoDB (Use MongoDB Atlas for production)
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=empire_production

# CORS (Your Firebase domain)
CORS_ORIGINS=https://your-app.web.app,https://your-app.firebaseapp.com

# Emergent LLM Key (Already configured)
EMERGENT_LLM_KEY=sk-emergent-2A80e92591dF18c1f5

# Stripe (Replace with LIVE key)
STRIPE_API_KEY=sk_live_YOUR_LIVE_STRIPE_KEY_HERE
```

### Update Frontend Environment:

Edit `/frontend/.env`:

```env
# Backend URL (Will be your Cloud Run URL)
REACT_APP_BACKEND_URL=https://your-backend-xxxxx.run.app

# AdMob (Already configured)
REACT_APP_ADMOB_PUB_ID=pub-8715031019966551
REACT_APP_ADMOB_APP_ID=6268835652
```

---

## 🚀 STEP 3: Deploy Backend to Cloud Run

### A. Login to Google Cloud

```bash
gcloud auth login
gcloud config set project 249321727719
```

### B. Create Dockerfile for Backend (Already exists at `/app/backend/Dockerfile`)

If not, create `/backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/

# Copy application
COPY . .

# Expose port
EXPOSE 8001

# Run application
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

### C. Deploy Backend to Cloud Run

```bash
cd backend

# Build and deploy in one command
gcloud run deploy empire-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8001 \
  --set-env-vars MONGO_URL="your_mongo_url",DB_NAME="empire_production",STRIPE_API_KEY="sk_live_...",EMERGENT_LLM_KEY="sk-emergent-2A80e92591dF18c1f5"

# Or build first, then deploy:
gcloud builds submit --tag gcr.io/249321727719/empire-backend

gcloud run deploy empire-backend \
  --image gcr.io/249321727719/empire-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8001
```

**Note the URL**: `https://empire-backend-xxxxx-uc.a.run.app`

---

## 🌐 STEP 4: Deploy Frontend to Firebase Hosting

### A. Login to Firebase

```bash
firebase login
```

### B. Update Frontend Environment

Update `/frontend/.env` with your Cloud Run backend URL:

```env
REACT_APP_BACKEND_URL=https://empire-backend-xxxxx-uc.a.run.app
```

### C. Build Frontend

```bash
cd frontend
yarn install
yarn build
```

This creates production build in `/frontend/build/`

### D. Deploy to Firebase

```bash
cd ..  # Back to root directory

# Initialize Firebase (if not already done)
firebase init hosting

# Select options:
# - Use existing project: 249321727719
# - Public directory: frontend/build
# - Single-page app: Yes
# - Overwrite index.html: No

# Deploy
firebase deploy --only hosting --project 249321727719
```

**Your app will be live at:**
- `https://249321727719.web.app`
- `https://249321727719.firebaseapp.com`

---

## 🗄️ STEP 5: Set Up MongoDB Atlas (Production Database)

### A. Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create a new cluster

### B. Configure Database

1. **Create Database User**:
   - Database Access → Add New User
   - Username: `empire_admin`
   - Password: (strong password)
   - Role: Read & Write

2. **Whitelist IPs**:
   - Network Access → Add IP Address
   - Add: `0.0.0.0/0` (Allow from anywhere)
   - Or add your Cloud Run IPs

3. **Get Connection String**:
   - Clusters → Connect → Connect your application
   - Copy connection string: `mongodb+srv://empire_admin:password@cluster0.xxxxx.mongodb.net/`

4. **Update Backend .env**:
   ```env
   MONGO_URL=mongodb+srv://empire_admin:password@cluster0.xxxxx.mongodb.net/
   DB_NAME=empire_production
   ```

5. **Redeploy Backend** with new MONGO_URL

---

## 💳 STEP 6: Configure Stripe for Production

### A. Get Live API Keys

1. Go to: https://dashboard.stripe.com/apikeys
2. Toggle **"View test data"** to OFF (production mode)
3. Copy **Secret Key**: `sk_live_...`

### B. Update Backend

```env
STRIPE_API_KEY=sk_live_51xxxxx
```

### C. Set Up Webhook Endpoint

1. Go to: https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. Endpoint URL: `https://empire-backend-xxxxx-uc.a.run.app/api/payments/webhook/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy **Signing secret**: `whsec_...`
6. (Optional) Add to backend .env: `STRIPE_WEBHOOK_SECRET=whsec_...`

---

## 🔐 STEP 7: Set Up Custom Domain (Optional)

### A. Add Custom Domain to Firebase

```bash
firebase hosting:channel:deploy production --project 249321727719
```

Or in Firebase Console:
1. Hosting → Add custom domain
2. Enter your domain: `empire.yourdomain.com`
3. Follow DNS setup instructions
4. Wait for SSL certificate (automatic)

### B. Update Environment Variables

Update frontend `.env`:
```env
REACT_APP_BACKEND_URL=https://empire-backend-xxxxx-uc.a.run.app
```

Rebuild and redeploy frontend.

---

## 🤖 STEP 8: Automate with GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Google Cloud

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Cloud SDK
        uses: google-github-actions/setup-gcloud@v1
        with:
          project_id: 249321727719
          service_account_key: ${{ secrets.GCP_SA_KEY }}
      
      - name: Deploy to Cloud Run
        run: |
          cd backend
          gcloud run deploy empire-backend \
            --source . \
            --platform managed \
            --region us-central1 \
            --allow-unauthenticated

  deploy-frontend:
    runs-on: ubuntu-latest
    needs: deploy-backend
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: |
          cd frontend
          yarn install
      
      - name: Build
        run: |
          cd frontend
          yarn build
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: 249321727719
```

---

## 📊 STEP 9: Monitor Your Deployment

### A. Cloud Run Logs

```bash
# View backend logs
gcloud run logs read empire-backend --region us-central1 --limit 50

# Stream logs in real-time
gcloud run logs tail empire-backend --region us-central1
```

### B. Firebase Hosting Logs

- Firebase Console → Hosting → Usage
- View traffic, bandwidth, requests

### C. Application Logs

- Google Cloud Console → Cloud Run → empire-backend → Logs
- Filter by severity, time range

---

## ✅ DEPLOYMENT CHECKLIST

Before going live:

### Backend:
- [ ] Updated MONGO_URL to MongoDB Atlas
- [ ] Added STRIPE_API_KEY (live key)
- [ ] Set CORS_ORIGINS to production domains
- [ ] Deployed to Cloud Run
- [ ] Verified API endpoints work

### Frontend:
- [ ] Updated REACT_APP_BACKEND_URL
- [ ] Built production bundle (`yarn build`)
- [ ] Deployed to Firebase Hosting
- [ ] Verified app loads correctly

### Database:
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured
- [ ] Connection tested

### Payments:
- [ ] Stripe live API key added
- [ ] Webhook endpoint configured
- [ ] Test payment completed
- [ ] Transaction logged in MongoDB

### Security:
- [ ] All environment variables updated
- [ ] CORS properly configured
- [ ] API authentication working
- [ ] HTTPS enabled (automatic with Firebase/Cloud Run)

---

## 💰 COST ESTIMATION

### Firebase Hosting:
- **Free tier**: 10 GB storage, 360 MB/day transfer
- **Spark Plan**: Free
- **Blaze Plan**: Pay as you go ($0.026/GB storage, $0.15/GB transfer)

### Cloud Run:
- **Free tier**: 2M requests/month, 360K GB-seconds memory
- **Cost**: ~$0.10 per 100K requests after free tier
- **Estimate for 10K users/month**: ~$5-20/month

### MongoDB Atlas:
- **Free tier**: M0 (512 MB storage)
- **M10 tier**: $0.08/hour (~$57/month) - Recommended for production
- **Estimate**: $0-60/month depending on usage

### Total Monthly Cost: **~$10-100/month** (depending on traffic)

---

## 🆘 TROUBLESHOOTING

### Backend not starting:
```bash
# Check Cloud Run logs
gcloud run logs read empire-backend --region us-central1 --limit 50

# Common issues:
# - Missing environment variables
# - Wrong MongoDB connection string
# - Port mismatch (ensure PORT=8001)
```

### Frontend CORS errors:
```bash
# Ensure backend CORS_ORIGINS includes your Firebase domain
CORS_ORIGINS=https://249321727719.web.app,https://249321727719.firebaseapp.com
```

### Payment not working:
```bash
# Check Stripe webhook logs
# Dashboard → Webhooks → Recent deliveries

# Verify webhook URL is correct
# Test with Stripe CLI:
stripe listen --forward-to https://your-backend.run.app/api/payments/webhook/stripe
```

---

## 🎉 YOU'RE LIVE!

Once deployed, your Empire will be accessible at:
- **Frontend**: https://249321727719.web.app
- **Backend**: https://empire-backend-xxxxx-uc.a.run.app
- **Custom domain** (if configured): https://empire.yourdomain.com

---

## 📚 USEFUL COMMANDS

```bash
# View Cloud Run services
gcloud run services list

# Delete a deployment
gcloud run services delete empire-backend --region us-central1

# View Firebase deployments
firebase hosting:channel:list

# Rollback Firebase deployment
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live

# View all projects
gcloud projects list
firebase projects:list
```

---

## 🔗 HELPFUL LINKS

- **Google Cloud Console**: https://console.cloud.google.com/run?project=249321727719
- **Firebase Console**: https://console.firebase.google.com/project/249321727719
- **Cloud Run Docs**: https://cloud.google.com/run/docs
- **Firebase Hosting Docs**: https://firebase.google.com/docs/hosting
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Stripe Dashboard**: https://dashboard.stripe.com

---

**Need help? Deployment should take 15-30 minutes following this guide.**

Good luck with your launch! 🚀👑
