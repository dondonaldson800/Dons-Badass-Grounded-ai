# 🚀 D's Empire - Stripe Payments + Firebase Deployment Guide

## ✅ What's Included

### 💳 Stripe Payment System
- **Subscription Plans**: Basic ($9.99), Pro ($29.99), Enterprise ($99.99)
- **Credit Packages**: Starter (100 credits - $10), Power (500 credits - $40), Ultimate (1000 credits - $70)
- **Secure Checkout**: Powered by Stripe with webhook support
- **Payment Status Polling**: Real-time payment confirmation

### 🚀 Firebase Deployment
- **Hosting Configuration**: Optimized for React SPA
- **Backend Integration**: FastAPI backend support
- **Custom Domain Support**: Ready for your domain
- **CDN & Caching**: Automatic optimization

---

## 📋 Prerequisites

1. **Stripe Account** (you already have this ✓)
   - Get your live Stripe API key from: https://dashboard.stripe.com/apikeys
   
2. **Firebase Account**
   - Project ID: `249321727719`
   
3. **Local Machine** (for deployment)
   - Node.js installed
   - Firebase CLI installed

---

## 🔧 Setup Instructions

### Step 1: Configure Stripe (Production)

1. Replace test key in `/app/backend/.env`:
```env
STRIPE_API_KEY=sk_live_YOUR_LIVE_KEY_HERE
```

2. **(Optional)** Create Stripe Price IDs for fixed prices:
   - Go to https://dashboard.stripe.com/prices
   - Create prices for your packages
   - Use them in the checkout flow

### Step 2: Test Payments Locally

```bash
# The system is already set up and running!
# Test it by visiting:
http://localhost:3000/pricing

# Test cards (in test mode):
# Success: 4242 4242 4242 4242
# Decline: 4000 0000 0000 0002
```

### Step 3: Install Firebase CLI (on your local machine)

```bash
npm install -g firebase-tools
```

### Step 4: Build Frontend for Production

```bash
cd /app/frontend
yarn build
```

This creates an optimized production build in `/app/frontend/build/`

### Step 5: Deploy to Firebase

```bash
# Login to Firebase (first time only)
firebase login

# Deploy to hosting
firebase deploy --only hosting --project 249321727719

# Or deploy everything (hosting + functions)
firebase deploy --project 249321727719
```

---

## 🎯 Payment Flow

### For Users:

1. **Browse Plans** → `/pricing`
2. **Click "Get Started"** or "Buy Credits"
3. **Redirected to Stripe Checkout** (secure payment page)
4. **Enter Payment Details** (card info, billing address)
5. **Complete Payment**
6. **Redirected Back** → `/payment/success?session_id=xxx`
7. **Status Polling** (app checks payment status automatically)
8. **Credits Added** or **Subscription Activated**

### Backend Processing:

```
1. Frontend calls POST /api/payments/checkout/session
2. Backend validates package (SECURITY: amounts defined server-side)
3. Creates Stripe checkout session
4. Stores transaction in payment_transactions collection (status: pending)
5. Returns checkout URL to frontend
6. User completes payment on Stripe
7. Stripe webhook notifies backend → /api/payments/webhook/stripe
8. Backend updates transaction status
9. Frontend polls GET /api/payments/checkout/status/{session_id}
10. Credits/subscription activated once status = "paid"
```

---

## 📊 Database Schema

### `payment_transactions` Collection:

```javascript
{
  "id": "uuid",
  "session_id": "cs_test_...",
  "package_type": "subscription" | "credits",
  "package_id": "pro",
  "amount": 29.99,
  "currency": "usd",
  "user_email": "user@example.com" | null,
  "payment_status": "pending" | "paid" | "failed",
  "metadata": {
    "package_name": "Empire Pro",
    "credits": "500" // for credit packages
  },
  "created_at": "2025-03-28T...",
  "updated_at": "2025-03-28T...",
  "processed": true | false,
  "webhook_received": true | false
}
```

---

## 🔐 Security Features

✅ **Amount Validation**: All prices defined server-side (NEVER trusted from frontend)
✅ **Dynamic URLs**: Success/cancel URLs built from frontend origin (works in any environment)
✅ **Idempotency**: Same payment cannot be processed twice
✅ **Webhook Verification**: Stripe signature validation
✅ **Transaction Logging**: All payments recorded in database

---

## 🧪 Testing

### Test the Payment System:

1. Visit `/pricing` page
2. Click on any plan
3. Use Stripe test cards:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **3D Secure**: `4000 0025 0000 3155`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

### Test Webhook Locally:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Forward webhooks to local backend
stripe listen --forward-to localhost:8001/api/payments/webhook/stripe

# Trigger test webhook
stripe trigger checkout.session.completed
```

---

## 🌐 Production Deployment Checklist

### Before Going Live:

- [ ] Replace `STRIPE_API_KEY` with live key (`sk_live_...`)
- [ ] Test all payment flows in test mode
- [ ] Set up Stripe webhook endpoint in Stripe Dashboard:
  - URL: `https://yourdomain.com/api/payments/webhook/stripe`
  - Events: `checkout.session.completed`, `payment_intent.succeeded`
- [ ] Build frontend: `cd frontend && yarn build`
- [ ] Deploy to Firebase: `firebase deploy --project 249321727719`
- [ ] Test live payments with real card
- [ ] Monitor payment_transactions collection

### Stripe Dashboard Setup:

1. **Webhook Endpoint**: https://dashboard.stripe.com/webhooks
   - Add endpoint: `https://yourdomain.com/api/payments/webhook/stripe`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy webhook secret and add to backend `.env` if needed

2. **Enable Crypto Payments** (Optional):
   - Settings → Payment methods → Crypto
   - Only available in US
   - Change `payment_methods: ['card', 'crypto']` in frontend

---

## 🎨 Customization

### Add New Subscription Plan:

Edit `/app/backend/routes/payments.py`:

```python
SUBSCRIPTION_PLANS = {
    # ... existing plans
    "ultimate": {
        "name": "Empire Ultimate",
        "price": 199.99,
        "currency": "usd",
        "features": ["Everything", "24/7 Support", "Custom AI"]
    }
}
```

### Add New Credit Package:

```python
CREDIT_PACKAGES = {
    # ... existing packs
    "mega": {
        "name": "Mega Pack",
        "credits": 5000,
        "price": 300.00,
        "currency": "usd"
    }
}
```

Then update frontend `/app/frontend/src/pages/Pricing.js` UI as needed.

---

## 📱 API Endpoints

### Payment APIs:

```
GET  /api/payments/plans
     → Returns all available plans

POST /api/payments/checkout/session
     → Creates Stripe checkout session
     Body: {
       package_type: "subscription" | "credits",
       package_id: "pro",
       origin_url: "https://yourdomain.com",
       user_email: "user@example.com",
       payment_methods: ["card"]
     }

GET  /api/payments/checkout/status/{session_id}
     → Returns payment status (for polling)

POST /api/payments/webhook/stripe
     → Stripe webhook endpoint (internal use)
```

---

## 🆘 Troubleshooting

### Payment Not Completing:

1. Check browser console for errors
2. Verify `STRIPE_API_KEY` is set correctly
3. Check backend logs: `tail -f /var/log/supervisor/backend.err.log`
4. Verify MongoDB connection

### Webhook Not Receiving:

1. Check Stripe Dashboard → Webhooks → Recent deliveries
2. Verify webhook URL is publicly accessible
3. Check backend logs for webhook errors
4. Test with Stripe CLI locally first

### Credits Not Adding:

1. Check `payment_transactions` collection in MongoDB
2. Look for `processed: true` field
3. Check `payment_status` is "paid"
4. Verify no duplicate processing

---

## 💰 Revenue Tracking

All payments are stored in MongoDB for analytics:

```javascript
// Query total revenue
db.payment_transactions.aggregate([
  { $match: { payment_status: "paid" } },
  { $group: { _id: null, total: { $sum: "$amount" } } }
])

// Query by package type
db.payment_transactions.find({ 
  payment_status: "paid",
  package_type: "subscription"
})
```

---

## 🎉 You're Ready!

Your Empire now has:
- ✅ Full Stripe payment integration
- ✅ Subscription & credit packages
- ✅ Secure checkout flow
- ✅ Firebase deployment config
- ✅ Production-ready setup

**Test it now:** Visit `/pricing` and try a test payment!

**Deploy when ready:** `firebase deploy --project 249321727719`

---

Need help? Check:
- Stripe Dashboard: https://dashboard.stripe.com
- Firebase Console: https://console.firebase.google.com/project/249321727719
- Logs: `tail -f /var/log/supervisor/*.log`
