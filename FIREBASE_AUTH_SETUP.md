# 🔧 Firebase Authentication Setup Checklist

## ❌ Current Issue
Login not working on https://jcb-01.web.app

## ✅ Solution Steps

### STEP 1: Enable Google Sign-In Provider
1. Open: https://console.firebase.google.com/project/jcb-01/authentication/providers
2. Click on **"Google"** in the providers list
3. Toggle **"Enable"** switch to ON
4. **Project support email**: pradeepgbi8@gmail.com
5. Click **"Save"**

### STEP 2: Enable Email/Password Provider
1. In the same providers page: https://console.firebase.google.com/project/jcb-01/authentication/providers
2. Click on **"Email/Password"**
3. Toggle **"Enable"** to ON (first option only, NOT "Email link")
4. Click **"Save"**

### STEP 3: Verify Authorized Domains
1. Go to: https://console.firebase.google.com/project/jcb-01/authentication/settings
2. Scroll to **"Authorized domains"** section
3. Ensure these domains are listed:
   - ✅ `jcb-01.web.app`
   - ✅ `jcb-01.firebaseapp.com`
   - ✅ `localhost`
4. If any are missing, click **"Add domain"** and add them

### STEP 4: Verify Firestore Security Rules
1. Go to: https://console.firebase.google.com/project/jcb-01/firestore/rules
2. Rules should already be published (from your firestore.rules file)
3. Verify the rules allow authenticated users to read/write

---

## 🧪 Testing After Setup

### Test in Incognito/Private Window:
1. Open **https://jcb-01.web.app** in Incognito/Private browsing
2. Click **"Login"** or **"Sign Up"**
3. Try **Google Sign-In** button
4. OR try **Email/Password** with:
   - Email: test@example.com
   - Password: test123

### If Still Not Working:
1. Press **F12** to open browser console
2. Check for error messages
3. Look for messages like:
   - `auth/unauthorized-domain` → Add domain to authorized list
   - `auth/operation-not-allowed` → Enable the auth provider
   - `auth/popup-blocked` → Allow popups for the site

---

## 📋 Current Configuration ✅

Your project is already configured with:
- ✅ Firebase Project ID: `jcb-01`
- ✅ Production mode enabled
- ✅ Firebase credentials in `.env`
- ✅ App deployed to: https://jcb-01.web.app

**The ONLY thing missing is enabling authentication providers in Firebase Console!**

---

## 🆘 Quick Support

If you see specific error messages, they mean:

| Error | Solution |
|-------|----------|
| `auth/unauthorized-domain` | Add `jcb-01.web.app` to authorized domains |
| `auth/operation-not-allowed` | Enable Google/Email provider in Console |
| `auth/popup-blocked` | Allow popups OR try Email/Password instead |
| `auth/network-request-failed` | Check internet connection |
| Connection refused | Firestore rules might be blocking - check rules |

---

## ✅ After Setup Checklist

- [ ] Google Sign-In enabled
- [ ] Email/Password enabled
- [ ] All 3 domains authorized
- [ ] Tested in incognito window
- [ ] Login works successfully

**Once all providers are enabled, the login will work immediately - no rebuild or redeploy needed!**
