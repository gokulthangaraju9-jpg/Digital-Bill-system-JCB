# 🔧 Fix Firebase Authentication 400 Error

## 🚨 Current Problem
Your Firebase API key is returning **400 (Bad Request)** errors, which means:
- The API key is invalid, restricted, or has been regenerated
- Firebase is rejecting all requests from your application

## ✅ Solution Steps

### Step 1: Get New Firebase Configuration

1. **Open Firebase Console**
   - Go to: https://console.firebase.google.com/
   - Login with your Google account

2. **Select Your Project**
   - Click on project: **jcb-01**

3. **Get Web App Configuration**
   - Click the **⚙️ gear icon** (Project Settings)
   - Scroll down to **"Your apps"** section
   - Click on your web app OR click **"Add app"** → **Web** if you don't have one
   - Copy the **firebaseConfig** object

4. **Your config should look like this:**
```javascript
const firebaseConfig = {
  apiKey: "AIza...",  // ← NEW KEY
  authDomain: "jcb-01.firebaseapp.com",
  projectId: "jcb-01",
  storageBucket: "jcb-01.firebasestorage.app",
  messagingSenderId: "154560187184",
  appId: "1:154560187184:web:...",  // ← NEW APP ID
  measurementId: "G-..."  // ← NEW MEASUREMENT ID
};
```

### Step 2: Update Your .env File

Open `r:\JCB\jcb-platform\.env` and update these lines with your NEW values:

```env
VITE_FIREBASE_API_KEY=YOUR_NEW_API_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=jcb-01.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=jcb-01
VITE_FIREBASE_STORAGE_BUCKET=jcb-01.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=154560187184
VITE_FIREBASE_APP_ID=YOUR_NEW_APP_ID_HERE
VITE_FIREBASE_MEASUREMENT_ID=YOUR_NEW_MEASUREMENT_ID_HERE
```

### Step 3: Update .env.production File

Also update `r:\JCB\jcb-platform\.env.production` with the same values.

### Step 4: Restart Development Server

```powershell
# Stop the current server (Ctrl+C)
# Then restart:
cd r:\JCB\jcb-platform
npm run dev
```

### Step 5: Clear Browser Cache

1. Open DevTools (F12)
2. Right-click the **Refresh** button
3. Click **"Empty Cache and Hard Reload"**

---

## 🔍 Check Firebase API Key Restrictions

If the new key still doesn't work, check API key restrictions:

1. Go to: https://console.cloud.google.com/apis/credentials?project=jcb-01
2. Find your API key (Browser key or Web API key)
3. Click **Edit**
4. Under **"API restrictions"**:
   - Select **"Don't restrict key"** for testing
   - OR ensure these APIs are enabled:
     - Identity Toolkit API
     - Firebase Installations API
     - Firebase Management API
     - Cloud Firestore API
     - Firebase Storage API
5. Under **"Application restrictions"**:
   - For development: Select **"None"**
   - For production: Use **"HTTP referrers"** and add:
     - `http://localhost:*`
     - `http://127.0.0.1:*`
     - `https://jcb-01.web.app`
     - `https://jcb-01.firebaseapp.com`
     - `https://your-production-domain.com`

---

## 🧪 Test the Fix

After making changes, test login:

1. Go to: http://localhost:5173/login
2. Try logging in with email/password
3. Check Console (F12) - you should see:
   - ✅ Firebase app initialized
   - ✅ Firebase auth initialized
   - ✅ Auth persistence set to LOCAL
   - **NO 400 errors**

---

## 🆘 Still Not Working?

### Check Firebase Authentication is Enabled

1. Firebase Console → **Authentication**
2. Click **"Get Started"** if not enabled
3. Go to **Sign-in method** tab
4. Enable:
   - ✅ **Email/Password** (native)
   - ✅ **Google** (if you want Google login)

### Check Firestore Database Exists

1. Firebase Console → **Firestore Database**
2. Click **"Create database"** if needed
3. Choose **"Start in test mode"** (for development)
4. Select region: **us-central1** or closest to you

### Check Storage Bucket Exists

1. Firebase Console → **Storage**
2. Click **"Get started"** if needed
3. Use default rules for testing

---

## 📝 Common Errors and Fixes

| Error | Cause | Solution |
|-------|-------|----------|
| `400 API key not valid` | Old/expired API key | Get new key from Firebase Console |
| `403 Permission denied` | API restrictions too strict | Temporarily disable restrictions |
| `auth/invalid-api-key` | Wrong API key format | Copy exact key from Firebase Console |
| `Failed to fetch measurement ID` | Analytics not enabled | Enable Google Analytics in Firebase |
| `installations/request-failed` | API key restrictions | Check Cloud Console API restrictions |

---

## ✅ Verification Checklist

- [ ] Got new API keys from Firebase Console
- [ ] Updated `.env` file
- [ ] Updated `.env.production` file
- [ ] Restarted dev server
- [ ] Cleared browser cache
- [ ] Checked API key restrictions
- [ ] Authentication is enabled in Firebase
- [ ] Firestore database exists
- [ ] Storage bucket exists
- [ ] Login page loads without 400 errors

---

## 🔄 Quick Command to Restart

```powershell
# Navigate to project
cd r:\JCB\jcb-platform

# Install dependencies (if needed)
npm install

# Start dev server
npm run dev
```

Once fixed, you should see this in console:
```
✅ Firebase app initialized
✅ Firebase analytics initialized
✅ Firebase auth initialized
✅ Auth persistence set to LOCAL
✅ Firestore initialized
✅ Firebase storage initialized
✅ Storage connection verified
```

Good luck! 🚀
