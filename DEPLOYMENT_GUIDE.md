# 🚀 Complete Deployment Guide - JCB Platform

## Step 1: Get MongoDB Atlas Connection String

1. **In MongoDB Atlas Dashboard** (where you are now):
   - Click **"Connect"** button on Cluster0
   - Choose **"Connect your application"**
   - Copy the connection string, it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<username>` and `<password>` with your actual credentials
   - Add database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/jcb-platform?retryWrites=true&w=majority`

---

## Step 2: Deploy Backend to Render (FREE)

### A. Prepare Backend for Deployment

1. **Update server/package.json** with start script (already done):
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

2. **Create server/.env.production** with production values:
```env
MONGODB_URI=mongodb+srv://your-connection-string
PORT=5000
RAZORPAY_KEY_ID=rzp_live_YOUR_KEY
RAZORPAY_KEY_SECRET=your_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
NODE_ENV=production
```

### B. Deploy to Render

1. **Go to** https://render.com
2. **Sign up** with GitHub
3. **Click "New +"** → **"Web Service"**
4. **Connect your GitHub repository** (or manual deploy)
5. **Configure:**
   - **Name:** `jcb-platform-api`
   - **Root Directory:** `jcb-platform/server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

6. **Add Environment Variables:**
   - `MONGODB_URI` → Your Atlas connection string
   - `RAZORPAY_KEY_ID` → Your Razorpay key
   - `RAZORPAY_KEY_SECRET` → Your Razorpay secret
   - `RAZORPAY_WEBHOOK_SECRET` → Your webhook secret
   - `NODE_ENV` → `production`

7. **Click "Create Web Service"**
8. **Wait 5-10 minutes** for deployment
9. **Copy your backend URL:** `https://jcb-platform-api.onrender.com`

---

## Step 3: Deploy Frontend to Vercel (FREE)

### A. Update Frontend Environment Variables

1. **Create .env.production** in root:
```env
VITE_API_URL=https://jcb-platform-api.onrender.com/api
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY

# Your existing Firebase config
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### B. Deploy to Vercel

1. **Go to** https://vercel.com
2. **Sign up** with GitHub
3. **Click "Add New"** → **"Project"**
4. **Import your Git repository**
5. **Configure:**
   - **Framework Preset:** `Vite`
   - **Root Directory:** `jcb-platform`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

6. **Add Environment Variables:**
   - Paste all variables from `.env.production`

7. **Click "Deploy"**
8. **Wait 3-5 minutes**
9. **Your site is live:** `https://jcb-platform.vercel.app`

---

## Step 4: Alternative - Deploy Both to Railway (EASIER)

Railway can host both backend and frontend together.

### Deploy to Railway

1. **Go to** https://railway.app
2. **Sign up** with GitHub
3. **Click "New Project"** → **"Deploy from GitHub repo"**
4. **Select your repository**

#### For Backend:
- **Service Name:** `backend`
- **Root Directory:** `jcb-platform/server`
- **Start Command:** `npm start`
- **Add all environment variables**

#### For Frontend:
- **Service Name:** `frontend`
- **Root Directory:** `jcb-platform`
- **Build Command:** `npm run build`
- **Start Command:** `npx serve dist`
- **Add environment variables**

---

## Step 5: Update CORS Settings

Once backend is deployed, update CORS in `server/index.js`:

```javascript
app.use(cors({
  origin: [
    'https://jcb-platform.vercel.app',
    'https://your-custom-domain.com',
    'http://localhost:5173' // For local development
  ],
  credentials: true
}));
```

---

## Step 6: Setup Razorpay Webhook

1. **Go to Razorpay Dashboard** → **Settings** → **Webhooks**
2. **Add Webhook URL:**
   ```
   https://jcb-platform-api.onrender.com/api/payments/webhook
   ```
3. **Select Events:**
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
4. **Save and get webhook secret**
5. **Add to environment variables**

---

## Step 7: Configure MongoDB Network Access

In MongoDB Atlas:

1. **Go to "Network Access"**
2. **Click "Add IP Address"**
3. **Select "Allow Access from Anywhere"** (0.0.0.0/0)
4. **Or add Render/Vercel IPs** (check their docs)
5. **Click "Confirm"**

---

## Step 8: Test Production Deployment

1. **Visit your frontend URL**
2. **Try booking a machine**
3. **Complete payment** (use test mode first)
4. **Check MongoDB Atlas** for new data
5. **Verify in Razorpay dashboard**

---

## Quick Deployment Commands

### Manual Deployment (No GitHub)

#### Backend:
```bash
cd jcb-platform/server

# Build/prepare
npm install --production

# Deploy to Render/Railway via CLI
# Or zip and upload manually
```

#### Frontend:
```bash
cd jcb-platform

# Build
npm run build

# The 'dist' folder is ready to deploy
# Upload to Vercel/Netlify/any static host
```

---

## Environment Variables Checklist

### Backend (.env)
- [x] `MONGODB_URI` - Atlas connection string
- [x] `PORT` - 5000
- [x] `RAZORPAY_KEY_ID` - From Razorpay
- [x] `RAZORPAY_KEY_SECRET` - From Razorpay
- [x] `RAZORPAY_WEBHOOK_SECRET` - From Razorpay
- [x] `NODE_ENV` - production

### Frontend (.env)
- [x] `VITE_API_URL` - Your backend URL
- [x] `VITE_RAZORPAY_KEY_ID` - From Razorpay
- [x] `VITE_FIREBASE_*` - Firebase config

---

## Recommended: Vercel (Frontend) + Render (Backend)

**Best combination for FREE tier:**
- ✅ Vercel: Lightning fast, great for React
- ✅ Render: Reliable, easy MongoDB connection
- ✅ Both have good free tiers

---

## Cost Breakdown

### Free Tier (Recommended for Testing)
- **MongoDB Atlas:** Free (512 MB)
- **Vercel:** Free (100 GB bandwidth)
- **Render:** Free (750 hours/month)
- **Total:** ₹0/month

### Paid Tier (For Production)
- **MongoDB Atlas:** ~$9/month (2 GB)
- **Vercel Pro:** Free (sufficient)
- **Render:** $7/month (persistent)
- **Total:** ~₹1,200/month

---

## Security Checklist Before Going Live

- [ ] Switch to Razorpay **LIVE** keys
- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Update CORS to specific domains
- [ ] Add rate limiting
- [ ] Enable MongoDB authentication
- [ ] Set proper network access rules
- [ ] Add error logging (Sentry)
- [ ] Setup monitoring
- [ ] Enable backups
- [ ] Add admin authentication

---

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:** Check Network Access in Atlas, allow 0.0.0.0/0

### Issue: "CORS error"
**Solution:** Update CORS in server/index.js with your frontend URL

### Issue: "Payment not working"
**Solution:** Check Razorpay keys in environment variables

### Issue: "Build failed on Vercel"
**Solution:** Ensure all dependencies in package.json

---

## Next Steps After Deployment

1. **Test everything** thoroughly
2. **Switch to LIVE mode** in Razorpay
3. **Add custom domain** (optional)
4. **Setup monitoring** (Render/Vercel analytics)
5. **Enable backups** in MongoDB Atlas
6. **Add admin authentication**
7. **Setup email notifications**

---

## Support

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **MongoDB Atlas:** https://docs.atlas.mongodb.com

---

**Ready to deploy! Follow the steps above.** 🚀

For fastest deployment, I recommend:
1. **Backend:** Render.com (easier MongoDB connection)
2. **Frontend:** Vercel.com (fastest React hosting)
