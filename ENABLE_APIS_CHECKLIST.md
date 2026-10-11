# ✅ Firebase APIs Enablement Checklist

## 🎯 Your Firebase Config is Correct!
The configuration you provided matches what's in your code. The issue is that required APIs are not enabled in Google Cloud Console.

---

## 📋 Step-by-Step Checklist

### Step 1: Enable Identity Toolkit API (MOST IMPORTANT)
- [ ] Go to: https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=jcb-01
- [ ] Click **"ENABLE"** button
- [ ] Wait for confirmation (usually 10-30 seconds)

### Step 2: Enable Token Service API
- [ ] Go to: https://console.cloud.google.com/apis/library/securetoken.googleapis.com?project=jcb-01
- [ ] Click **"ENABLE"** button
- [ ] Wait for confirmation

### Step 3: Enable Firebase Installations API
- [ ] Go to: https://console.cloud.google.com/apis/library/firebaseinstallations.googleapis.com?project=jcb-01
- [ ] Click **"ENABLE"** button
- [ ] Wait for confirmation

### Step 4: Enable Firebase Management API
- [ ] Go to: https://console.cloud.google.com/apis/library/firebase.googleapis.com?project=jcb-01
- [ ] Click **"ENABLE"** button
- [ ] Wait for confirmation

### Step 5: Check API Key Restrictions
- [ ] Go to: https://console.cloud.google.com/apis/credentials?project=jcb-01
- [ ] Find your API key (starts with `AIzaSyB8mS4i9I...`)
- [ ] Click on the key name to edit
- [ ] Under **"API restrictions"**, select **"Don't restrict key"**
- [ ] Click **"SAVE"** at the bottom

### Step 6: Verify Billing (If Required)
- [ ] Go to: https://console.cloud.google.com/billing?project=jcb-01
- [ ] Ensure billing is enabled (some APIs require billing)
- [ ] Free tier should be sufficient for testing

### Step 7: Test Your App
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Hard refresh the page (Ctrl+Shift+R)
- [ ] Try Google Sign-In again
- [ ] Check Console for errors (F12 → Console tab)

---

## 🔍 Quick Verification

After enabling APIs, verify they're active:
- Visit: https://console.cloud.google.com/apis/dashboard?project=jcb-01
- You should see these APIs listed as **"Enabled"**:
  - ✅ Identity Toolkit API
  - ✅ Token Service API  
  - ✅ Firebase Installations API
  - ✅ Firebase Management API

---

## ⚡ All-in-One Links

**Enable All APIs** (open each in new tab):
1. https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=jcb-01
2. https://console.cloud.google.com/apis/library/securetoken.googleapis.com?project=jcb-01
3. https://console.cloud.google.com/apis/library/firebaseinstallations.googleapis.com?project=jcb-01
4. https://console.cloud.google.com/apis/library/firebase.googleapis.com?project=jcb-01

**Check API Key Restrictions**:
- https://console.cloud.google.com/apis/credentials?project=jcb-01

**View Enabled APIs**:
- https://console.cloud.google.com/apis/dashboard?project=jcb-01

---

## 🐛 If Still Not Working

After enabling all APIs and removing restrictions:

1. **Wait 2-3 minutes** - API changes can take time to propagate
2. **Clear ALL browser data** for your site
3. **Try in Incognito/Private window**
4. **Check browser console** (F12) for new error messages
5. **Verify Firebase project status**: https://console.firebase.google.com/project/jcb-01

---

## 📞 Common Error Messages

| Error Message | Solution |
|--------------|----------|
| "API key not valid" | Enable Identity Toolkit API |
| "This API has not been used" | Enable the specific API mentioned |
| "Billing must be enabled" | Add billing account in Google Cloud |
| "403 Forbidden" | Check billing and project permissions |
| "Quota exceeded" | Check quotas in Google Cloud Console |

---

**Status**: Waiting for APIs to be enabled
**Next Action**: Enable APIs using links above, then test
**Estimated Time**: 5-10 minutes
