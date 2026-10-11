# ✅ Deployment Checklist - JCB Platform

**Time Required:** 15-20 minutes  
**Difficulty:** Easy  
**Cost:** FREE (with free tiers)

---

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas Cluster0 is running (✓ You have this!)
- [ ] Razorpay account created
- [ ] Firebase project configured
- [ ] All code is working locally
- [ ] Environment variables noted down

---

## 🎯 Step-by-Step Deployment

### Phase 1: Get MongoDB Connection (2 min)

- [ ] **In MongoDB Atlas dashboard:**
  - [ ] Click "Connect" on Cluster0
  - [ ] Choose "Connect your application"
  - [ ] Copy connection string
  - [ ] Replace `<username>` and `<password>`
  - [ ] Add database name: `/jcb-platform`
  
  **Final format:**
  ```
  mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/jcb-platform?retryWrites=true&w=majority
  ```

- [ ] **Allow network access:**
  - [ ] Go to "Network Access" tab
  - [ ] Click "Add IP Address"
  - [ ] Select "Allow Access from Anywhere"
  - [ ] Confirm

---

### Phase 2: Deploy Backend (5-7 min)

**Option A: Render.com (Recommended)**

- [ ] Go to https://render.com
- [ ] Sign up with GitHub or email
- [ ] Click "New +" → "Web Service"

**Configuration:**
- [ ] Name: `jcb-backend`
- [ ] Region: `Singapore` or `Ohio`
- [ ] Branch: `main` or `master`
- [ ] Root Directory: `jcb-platform/server`
- [ ] Runtime: `Node`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Instance Type: `Free`

**Environment Variables to Add:**
```
MONGODB_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
PORT=5000
NODE_ENV=production
```

- [ ] Click "Create Web Service"
- [ ] Wait 5-10 minutes for deployment
- [ ] **Copy backend URL:** `https://jcb-backend.onrender.com`
- [ ] Test: Visit `https://jcb-backend.onrender.com` (should see "JCB Platform API is running")

---

### Phase 3: Deploy Frontend (5-7 min)

**Option A: Vercel (Recommended)**

- [ ] Go to https://vercel.com
- [ ] Sign up with GitHub
- [ ] Click "Add New" → "Project"
- [ ] Import your Git repository

**Configuration:**
- [ ] Framework Preset: `Vite`
- [ ] Root Directory: `jcb-platform`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

**Environment Variables to Add:**
```
VITE_API_URL=https://jcb-backend.onrender.com/api
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

- [ ] Click "Deploy"
- [ ] Wait 3-5 minutes
- [ ] **Your site is live!** Copy the URL

---

### Phase 4: Update CORS (2 min)

- [ ] **In Render backend settings:**
  - [ ] Add environment variable:
    ```
    FRONTEND_URL=https://your-vercel-url.vercel.app
    ```
  - [ ] Save and redeploy

---

### Phase 5: Configure Razorpay Webhook (2 min)

- [ ] Go to Razorpay Dashboard
- [ ] Navigate to Settings → Webhooks
- [ ] Click "Create Webhook"
- [ ] Webhook URL: `https://jcb-backend.onrender.com/api/payments/webhook`
- [ ] Active Events:
  - [ ] `payment.captured`
  - [ ] `payment.failed`
  - [ ] `order.paid`
- [ ] Save and copy the webhook secret
- [ ] Add to Render environment variables:
  ```
  RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
  ```

---

### Phase 6: Test Deployment (3 min)

- [ ] **Visit your frontend URL**
- [ ] **Test user registration/login**
- [ ] **Browse machines**
- [ ] **Try booking with COD:**
  - [ ] Fill booking details
  - [ ] Select "Cash on Delivery"
  - [ ] Submit
  - [ ] Should see success message

- [ ] **Try booking with Online Payment:**
  - [ ] Fill booking details
  - [ ] Select "Online Payment"
  - [ ] Use test card: `4111 1111 1111 1111`
  - [ ] CVV: `123`, Expiry: any future date
  - [ ] Complete payment
  - [ ] Should see success message

- [ ] **Verify in MongoDB Atlas:**
  - [ ] Go to "Browse Collections"
  - [ ] Check `bookings` collection
  - [ ] Check `ownerEarnings` collection
  - [ ] Should see new documents

- [ ] **Verify in Razorpay:**
  - [ ] Go to Dashboard → Payments
  - [ ] Should see test payment

---

## 🎉 Post-Deployment Tasks

### Immediate (Do Now)
- [ ] Share your site URL with team
- [ ] Test all features thoroughly
- [ ] Bookmark admin dashboard
- [ ] Save all credentials securely

### Within 24 Hours
- [ ] Setup custom domain (optional)
- [ ] Configure email notifications
- [ ] Add admin authentication
- [ ] Setup monitoring/analytics

### Within 1 Week
- [ ] Switch to Razorpay LIVE keys
- [ ] Complete KYC verification
- [ ] Add owner bank details
- [ ] Enable production mode

---

## 🔐 Security Checklist (Before Going Live)

- [ ] All environment variables set correctly
- [ ] Using HTTPS (automatic on Vercel/Render)
- [ ] CORS configured for specific domains
- [ ] MongoDB network access restricted
- [ ] Razorpay webhook secret configured
- [ ] Admin routes protected
- [ ] Error logging enabled
- [ ] Backups configured in MongoDB Atlas

---

## 📊 Your Deployment URLs

**Fill these in after deployment:**

- **Frontend:** `_________________________________`
- **Backend:** `_________________________________`
- **Database:** MongoDB Atlas Cluster0 ✓
- **Payment:** Razorpay Dashboard ✓

---

## 🆘 Troubleshooting

### Backend Issues

**Problem:** Backend won't start
- [ ] Check MongoDB connection string
- [ ] Verify all environment variables
- [ ] Check Render logs
- [ ] Ensure network access is allowed

**Problem:** CORS error
- [ ] Add FRONTEND_URL environment variable
- [ ] Redeploy backend
- [ ] Clear browser cache

### Frontend Issues

**Problem:** Can't fetch machines
- [ ] Verify VITE_API_URL is correct
- [ ] Check if backend is running
- [ ] Open browser console for errors
- [ ] Test backend URL directly

**Problem:** Payment not working
- [ ] Check Razorpay keys
- [ ] Verify keys are test/live mode
- [ ] Check browser console
- [ ] Test with Razorpay test cards

---

## 💾 Backup Plan

If deployment fails, you can always:

1. **Run locally** while troubleshooting
2. **Use ngrok** to temporarily expose local server
3. **Deploy to Railway** (easier alternative)
4. **Contact support** (Render/Vercel have great support)

---

## 🎊 Success Criteria

Your deployment is successful when:

- ✅ Frontend loads without errors
- ✅ Users can browse machines
- ✅ Booking with COD works
- ✅ Online payment works
- ✅ Data appears in MongoDB
- ✅ Razorpay shows transactions
- ✅ Owner earnings are created
- ✅ Admin can process payouts

---

## 📞 Need Help?

**Resources:**
- Render Status: https://status.render.com
- Vercel Status: https://vercel-status.com
- MongoDB Support: https://support.mongodb.com
- Razorpay Docs: https://razorpay.com/docs

**Documentation:**
- DEPLOY_NOW.md - Quick guide
- DEPLOYMENT_GUIDE.md - Detailed guide
- PAYMENT_SYSTEM_COMPLETE.md - Full system docs

---

**Current Status:**

[ ] Not Started  
[ ] Backend Deployed  
[ ] Frontend Deployed  
[ ] Testing Complete  
[ ] ✅ LIVE IN PRODUCTION

---

**Estimated Total Time:** 15-20 minutes  
**Your Start Time:** __________  
**Your Finish Time:** __________

---

🚀 **You're ready to deploy! Start with Phase 1 and work through each step.** 🚀
