# 🔑 Firebase API Key Fix Guide

## 🚨 Problem
Your Firebase API key is returning **400 INVALID_ARGUMENT** errors, causing:
- ❌ Google Sign-In to fail
- ❌ Firebase Authentication to fail
- ❌ Analytics to fail
- ❌ All Firebase services to be unusable

## 📋 Quick Diagnosis
Current API Key: `AIzaSyB8mS4i9IUjutRUjE50PPEkfmQzCyOvXEw`

Error in Console:
```
FirebaseError: Installations: Create Installation request failed with error 
"400 INVALID_ARGUMENT: API key not valid. Please pass a valid API key."
```

---

## ✅ Solution Steps

### Step 1: Get the Correct API Key

1. **Open Firebase Console**
   - Go to: https://console.firebase.google.com/project/jcb-01/settings/general
   - Scroll to **"Your apps"** section
   - Find your **Web app** (should show "jcb-01")
   - Copy the **Web API Key** (starts with `AIza`)

2. **Alternative: Check Google Cloud Console**
   - Go to: https://console.cloud.google.com/apis/credentials?project=jcb-01
   - Look for **Browser key** or **API key**
   - Click on the key to view/copy it

### Step 2: Enable Required APIs

**CRITICAL**: These APIs MUST be enabled for Firebase Auth to work:

Go to: https://console.cloud.google.com/apis/library?project=jcb-01

Enable these APIs:
- ✅ **Identity Toolkit API** (identitytoolkit.googleapis.com)
- ✅ **Token Service API** (securetoken.googleapis.com)
- ✅ **Firebase Installations API** (firebaseinstallations.googleapis.com)  
- ✅ **Firebase Management API** (firebase.googleapis.com)
- ✅ **Google Analytics API** (analytics.googleapis.com)

### Step 3: Check API Key Restrictions

1. Go to: https://console.cloud.google.com/apis/credentials?project=jcb-01
2. Click on your API key
3. Check **API restrictions**:

**Option A (Recommended for Development):**
- Set to: **Don't restrict key**

**Option B (Production - More Secure):**
- Set to: **Restrict key**
- Select these APIs:
  - Identity Toolkit API
  - Token Service API
  - Firebase Installations API
  - Firebase Management API
  - Google Analytics API

4. Check **Application restrictions**:
   - Set to: **HTTP referrers (web sites)**
   - Add these referrers:
     ```
     https://jcb-01.web.app/*
     https://jcb-01.firebaseapp.com/*
     http://localhost:5173/*
     http://localhost:4173/*
     ```

5. Click **SAVE**

### Step 4: Update Your Project

Once you have the correct API key, run this command:

```powershell
cd r:\JCB\jcb-platform
.\update-api-key.ps1 -NewApiKey "YOUR_NEW_API_KEY_HERE"
```

**OR** manually update these files:

1. **`.env.local`**
   ```env
   VITE_FIREBASE_API_KEY=YOUR_NEW_API_KEY_HERE
   ```

2. **`.env.production`**
   ```env
   VITE_FIREBASE_API_KEY=YOUR_NEW_API_KEY_HERE
   ```

### Step 5: Rebuild and Deploy

```powershell
# Navigate to project
cd r:\JCB\jcb-platform

# Install dependencies (if needed)
npm install

# Build the project
npm run build

# Deploy to Firebase
firebase deploy

# Or deploy everything at once
firebase deploy --only hosting,firestore,storage
```

### Step 6: Clear Cache and Test

1. **Clear browser cache**: Ctrl+Shift+Del → Clear cache and cookies
2. **Hard reload**: Ctrl+Shift+R or Ctrl+F5
3. **Test sign-in**: Try Google Sign-In and email login

---

## 🔍 Verification Checklist

After completing the steps above, verify:

- [ ] API key is copied correctly (39 characters, starts with AIza)
- [ ] All required APIs are **enabled** in Google Cloud Console
- [ ] API key restrictions allow your domains
- [ ] `.env.local` has the new API key
- [ ] `.env.production` has the new API key
- [ ] Project is rebuilt with `npm run build`
- [ ] Changes are deployed with `firebase deploy`
- [ ] Browser cache is cleared
- [ ] No 400 errors in browser console
- [ ] Google Sign-In works
- [ ] Email login works

---

## 🐛 Still Not Working?

### Check Console for Specific Errors

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for errors containing:
   - `400` or `401` status codes
   - `INVALID_ARGUMENT`
   - `API key not valid`
   - `identitytoolkit.googleapis.com`

### Common Issues

**Issue**: "API key not valid"
- **Fix**: Double-check you copied the full key correctly

**Issue**: "API key not found"
- **Fix**: The key might have been deleted/regenerated

**Issue**: "This API key is not authorized"
- **Fix**: Check HTTP referrer restrictions in API key settings

**Issue**: "Identity Toolkit API has not been used"
- **Fix**: Enable Identity Toolkit API in Google Cloud Console

**Issue**: 403 errors instead of 400
- **Fix**: Check billing is enabled on Google Cloud project

---

## 📞 Emergency Contact

If you're still stuck:
1. Check Firebase Status: https://status.firebase.google.com/
2. Firebase Support: https://firebase.google.com/support
3. Stack Overflow: Tag questions with `firebase` and `google-authentication`

---

## 📝 Files Modified

The API key is used in:
- `jcb-platform/.env.local` ← Development
- `jcb-platform/.env.production` ← Production/Deployed
- `jcb-platform/src/firebase.js` ← Has fallback values

---

## ⚡ Quick Command Reference

```powershell
# Update API key
.\update-api-key.ps1 -NewApiKey "AIzaXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

# Build project
npm run build

# Deploy to Firebase
firebase deploy

# Test locally first
npm run dev
```

---

**Last Updated**: January 21, 2026
**Status**: Active Issue - Requires Firebase Console Access
