# 🚀 Quick Deploy - Step by Step

## ⚡ Fastest Way to Deploy (15 Minutes)

### Step 1: Get MongoDB Connection String (2 min)

You're already in MongoDB Atlas! 

1. Click **"Connect"** button on Cluster0
2. Choose **"Connect your application"**
3. Copy connection string:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/jcb-platform?retryWrites=true&w=majority
   ```

### Step 2: Deploy Backend to Render (5 min)

1. Go to **https://render.com** → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. **Manual Deploy** (or connect GitHub):
   - Name: `jcb-backend`
   - Region: `Singapore` (closest to Mumbai)
   - Root Directory: `jcb-platform/server`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Environment Variables:**
   ```
   MONGODB_URI=your_atlas_connection_string
   RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
   RAZORPAY_KEY_SECRET=your_secret
   PORT=5000
   NODE_ENV=production
   ```

5. Click **"Create Web Service"**
6. **Copy your URL:** `https://jcb-backend.onrender.com`

### Step 3: Deploy Frontend to Vercel (5 min)

1. Go to **https://vercel.com** → Sign up with GitHub
2. Click **"Add New"** → **"Project"**
3. **Import your repository** or drag-drop folder
4. Configure:
   - Framework: `Vite`
   - Root Directory: `jcb-platform`
   - Build: `npm run build`
   - Output: `dist`

5. **Environment Variables:**
   ```
   VITE_API_URL=https://jcb-backend.onrender.com/api
   VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

6. Click **"Deploy"**
7. **Your site is live!** 🎉

### Step 4: Update MongoDB Network Access (1 min)

1. In MongoDB Atlas → **Network Access**
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### Step 5: Test (2 min)

1. Visit your Vercel URL
2. Try booking a machine
3. Test payment with card: `4111 1111 1111 1111`
4. Check if it works! ✅

---

## 🎯 Even Faster: Deploy via Terminal

### Backend (Render CLI)
```powershell
# Install Render CLI
npm install -g render-cli

# Deploy
cd jcb-platform/server
render deploy
```

### Frontend (Vercel CLI)
```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
cd jcb-platform
vercel --prod
```

---

## 🔥 Ultra Fast: Railway (All-in-One)

Deploy BOTH in one place:

1. **Go to https://railway.app**
2. **New Project** → **Deploy from GitHub**
3. **Add both services:**
   - Backend: `jcb-platform/server`
   - Frontend: `jcb-platform`
4. **Add environment variables**
5. **Done in 5 minutes!**

---

## 📋 Your MongoDB Connection String Format

From your Cluster0, it should look like:

```
mongodb+srv://<username>:<password>@cluster0.<random>.mongodb.net/jcb-platform?retryWrites=true&w=majority
```

**Replace:**
- `<username>` with your MongoDB username
- `<password>` with your MongoDB password
- Add `/jcb-platform` before the `?` (database name)

---

## ✅ Deployment Checklist

- [ ] Get MongoDB connection string
- [ ] Deploy backend to Render/Railway
- [ ] Copy backend URL
- [ ] Deploy frontend to Vercel
- [ ] Add environment variables
- [ ] Allow MongoDB network access
- [ ] Test booking flow
- [ ] Test payment
- [ ] Check data in MongoDB
- [ ] 🎉 You're live!

---

## 🆘 Quick Troubleshooting

**Backend won't start:**
- Check MongoDB connection string
- Ensure all env variables are set
- Check Render logs

**Frontend can't connect:**
- Verify VITE_API_URL is correct
- Check CORS in backend
- Open browser console for errors

**Payment not working:**
- Verify Razorpay keys
- Check if backend URL is correct
- Test with test card first

---

## 🎊 After Deployment

Your URLs will be:
- **Frontend:** `https://jcb-platform.vercel.app`
- **Backend:** `https://jcb-backend.onrender.com`
- **Database:** MongoDB Atlas (already set up)

**Share your site and start taking bookings!** 🚀

---

Need help? The deployment should take **10-15 minutes total**. Follow the steps in order and you'll be live!
