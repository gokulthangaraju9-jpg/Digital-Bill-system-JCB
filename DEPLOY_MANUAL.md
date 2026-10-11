# 🚀 Quick Firebase Deployment Guide

## Current Status
Your application changes are ready to deploy with the improved login input styling.

---

## Prerequisites Check

Before deploying, ensure you have:

- [ ] Node.js installed (v16 or higher)
- [ ] npm installed (comes with Node.js)
- [ ] Firebase CLI installed
- [ ] Firebase login completed

---

## Step 1: Install Node.js (If Not Installed)

1. Download Node.js from: https://nodejs.org/
2. Install the LTS version (recommended)
3. Restart PowerShell after installation
4. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

---

## Step 2: Install Firebase CLI

Open PowerShell and run:

```powershell
npm install -g firebase-tools
```

---

## Step 3: Login to Firebase

```powershell
firebase login
```

This will open a browser for you to authenticate with Google.

---

## Step 4: Build the Application

Navigate to the project folder:

```powershell
cd r:\JCB\jcb-platform
```

Build the application:

```powershell
npm run build
```

Wait for the build to complete. You should see a `dist` folder created.

---

## Step 5: Deploy to Firebase

Deploy everything:

```powershell
firebase deploy
```

Or deploy only hosting:

```powershell
firebase deploy --only hosting
```

---

## Quick Deploy Commands (Copy-Paste)

### Full Deployment (Build + Deploy):
```powershell
cd r:\JCB\jcb-platform
npm run build
firebase deploy
```

### Deploy Only (If Already Built):
```powershell
cd r:\JCB\jcb-platform
firebase deploy --only hosting
```

### Deploy Specific Components:
```powershell
# Hosting only
firebase deploy --only hosting

# Firestore rules only
firebase deploy --only firestore:rules

# Storage rules only
firebase deploy --only storage

# Everything
firebase deploy --only hosting,firestore:rules,storage
```

---

## After Deployment

### 1. Verify Deployment
- Visit: https://jcb-01.web.app
- or: https://jcb-01.firebaseapp.com

### 2. Enable Required APIs
You MUST enable these APIs for the app to work:

1. **Identity Toolkit API** (CRITICAL):
   - https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=jcb-01

2. **Token Service API**:
   - https://console.cloud.google.com/apis/library/securetoken.googleapis.com?project=jcb-01

3. **Firebase Installations API**:
   - https://console.cloud.google.com/apis/library/firebaseinstallations.googleapis.com?project=jcb-01

4. **Remove API Key Restrictions**:
   - Go to: https://console.cloud.google.com/apis/credentials?project=jcb-01
   - Click your API key
   - Set "API restrictions" to "Don't restrict key"
   - Click SAVE

### 3. Test the Application
- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+Shift+R)
- Try logging in with test credentials

---

## Troubleshooting

### "Node.js not found"
- Install Node.js from https://nodejs.org/
- Restart PowerShell
- Try again

### "Firebase command not found"
```powershell
npm install -g firebase-tools
```

### "Build failed"
- Check for errors in the output
- Ensure all dependencies are installed: `npm install`
- Check if port 5173 is available

### "Deployment failed"
- Verify you're logged in: `firebase login`
- Check project ID in `.firebaserc`
- Ensure you have permissions for the project

### "App loads but login fails"
- Enable Identity Toolkit API (see step 2 above)
- Remove API key restrictions
- Wait 2-3 minutes for changes to propagate
- Clear browser cache and try again

---

## View Deployment Status

### Firebase Console:
- https://console.firebase.google.com/project/jcb-01/hosting

### Deployment History:
```powershell
firebase hosting:releases:list
```

### Roll Back to Previous Version:
```powershell
firebase hosting:rollback
```

---

## What's Included in This Deployment

✅ Improved login input field styling
✅ Better text visibility on dark backgrounds  
✅ Fixed autofill text colors
✅ Proper font sizing and padding
✅ All security improvements
✅ Role-based access system
✅ Payment integration
✅ Job management system

---

## Next Steps After Deployment

1. **Enable APIs** (See ENABLE_APIS_CHECKLIST.md)
2. **Create test account** (See TEST_ACCOUNTS.md)
3. **Test all functionality**:
   - Login (Email & Google)
   - Dashboard access
   - Machine browsing
   - Job creation (if owner/admin)
4. **Set up monitoring** in Firebase Console
5. **Configure custom domain** (if needed)

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `firebase deploy` | Deploy to Firebase |
| `firebase serve` | Test locally before deploying |
| `firebase login` | Authenticate with Firebase |
| `firebase logout` | Sign out of Firebase |

---

## Support Links

- **Firebase Documentation**: https://firebase.google.com/docs
- **Firebase Console**: https://console.firebase.google.com/project/jcb-01
- **Google Cloud Console**: https://console.cloud.google.com/?project=jcb-01
- **Node.js**: https://nodejs.org/

---

**Status**: Ready for deployment
**Last Updated**: January 21, 2026
**Changes**: Input field styling improvements applied
