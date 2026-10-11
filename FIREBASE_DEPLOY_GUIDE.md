# 🚀 Firebase Deployment Guide (jcb-01.web.app)

## Quick Deploy (10 Minutes)

### 1️⃣ Deploy Backend to Render

**Get MongoDB Connection String:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/jcb-platform?retryWrites=true&w=majority
```

**Render Setup:**
1. Go to [render.com](https://render.com)
2. **New** → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Root Directory:** `jcb-platform/server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

5. **Environment Variables:**
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/jcb-platform
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_secret_key
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://jcb-01.web.app
```

6. Click **Create Web Service**
7. Wait 3-5 minutes for deployment
8. **Copy your backend URL** (e.g., `https://jcb-backend-xxxx.onrender.com`)

---

### 2️⃣ Update Frontend Environment

Create `r:\JCB\jcb-platform\.env.production`:
```env
VITE_API_URL=https://jcb-backend-xxxx.onrender.com/api
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id

# Your Firebase config (already set up)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=jcb-01.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=jcb-01
VITE_FIREBASE_STORAGE_BUCKET=jcb-01.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

### 3️⃣ Deploy to Firebase

**From `jcb-platform` directory:**

```powershell
# Build production bundle
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

**That's it!** Your app is live at **https://jcb-01.web.app** 🎉

---

## 🧪 Test Your Deployment

1. Visit https://jcb-01.web.app
2. Sign up / Login
3. Go to **Book Machine**
4. Click **Book Now** on any machine
5. Try both payment methods:
   - ✅ **Cash on Delivery** (instant confirmation)
   - ✅ **Pay Online** (Razorpay test card: 4111 1111 1111 1111)

---

## 🔍 Verify Everything Works

### Check MongoDB Atlas:
- Go to your Cluster0 → Browse Collections
- Database: `jcb-platform`
- Collections: `bookings`, `owners`, `ownerearnings`
- Verify new booking appears

### Check Razorpay Dashboard:
- Go to [dashboard.razorpay.com](https://dashboard.razorpay.com)
- Orders → See your test payment
- Payments → Verify payment capture

### Check Owner Earnings:
- Login as machine owner
- Dashboard → View earnings panel
- See commission breakdown (95% to you, 5% to platform)

---

## 🚨 Troubleshooting

### Frontend can't reach backend?
**Check CORS:** Your backend's `FRONTEND_URL` must be `https://jcb-01.web.app`

### Payment not working?
**Check API URL:** 
1. Open browser console (F12) on jcb-01.web.app
2. Check API calls - should go to your Render backend
3. Verify `.env.production` has correct `VITE_API_URL`

### Firebase deploy fails?
```powershell
# Login again
firebase login

# Check project
firebase projects:list

# Use correct project
firebase use jcb-01
```

---

## 📱 Update Production Anytime

**Quick redeploy:**
```powershell
cd r:\JCB\jcb-platform
npm run build
firebase deploy --only hosting
```

**Backend updates:**
- Push changes to GitHub
- Render auto-deploys (if auto-deploy enabled)
- Or manually trigger deploy from Render dashboard

---

## 💰 Go Live Checklist

Before accepting real payments:

1. ✅ Replace Razorpay test keys with **live keys**
2. ✅ Update `.env.production` with live keys
3. ✅ Rebuild and redeploy: `npm run build && firebase deploy`
4. ✅ Test with real ₹1 transaction
5. ✅ Configure Razorpay webhook: `https://your-backend.onrender.com/api/payments/webhook`
6. ✅ Add real bank details for owner payouts

---

## 🎯 Your Stack

| Component | Service | URL |
|-----------|---------|-----|
| **Frontend** | Firebase Hosting | https://jcb-01.web.app |
| **Backend** | Render.com | https://jcb-backend-xxxx.onrender.com |
| **Database** | MongoDB Atlas | Cluster0 (Mumbai) |
| **Payments** | Razorpay | dashboard.razorpay.com |
| **Auth** | Firebase Auth | Built-in |

---

**Need help?** Check [DEPLOY_NOW.md](./DEPLOY_NOW.md) for detailed troubleshooting.
