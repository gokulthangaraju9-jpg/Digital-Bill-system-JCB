# 🧪 Test Account Credentials

## 📧 Quick Test Login

### Option 1: Create New Test Account Now

**Method 1 - Firebase Console (Fast & Easy):**
1. Go to: https://console.firebase.google.com/project/jcb-01/authentication/users
2. Click **"Add user"** button
3. Enter these credentials:
   ```
   Email: test@sribalaji.com
   Password: TestPass123!
   ```
4. Click **"Add user"**
5. Go back to your login page and use these credentials

**Method 2 - Use the Sign-Up Form:**
1. On your login page, click **"NEW USER? CREATE ACCOUNT"**
2. Fill in the form with any email/password
3. Submit and you'll be logged in

---

## 🔑 Existing Admin Accounts

These are the admin accounts configured in your system:

### Primary Admin
```
Email: pradeepgbi8@gmail.com
Password: [Set in Firebase Console]
```

### System Admin
```
Email: admin@sribalaji.com
Password: [Set in Firebase Console]
```

**Note**: If you don't have passwords for these, you can:
1. Go to: https://console.firebase.google.com/project/jcb-01/authentication/users
2. Find the user by email
3. Click the 3-dot menu → "Reset password"
4. Set a new password

---

## 🎯 Suggested Test Accounts

For testing different roles, create these accounts:

### Regular User (Customer)
```
Email: customer@test.com
Password: Customer123!
Role: customer (automatic)
```

### Machine Owner
```
Email: owner@test.com
Password: Owner123!
Role: owner (set in Firestore)
```

### Test Admin
```
Email: testadmin@test.com
Password: Admin123!
Role: admin (set in Firestore)
```

---

## 🚀 Quick Setup (Copy-Paste Ready)

**Create test user via Firebase Console:**

1. Open: https://console.firebase.google.com/project/jcb-01/authentication/users

2. Click "Add user" and use:
   ```
   Email: test@sribalaji.com
   Password: TestPass123!
   ```

3. Test login at: https://jcb-01.web.app/login
   - Email: `test@sribalaji.com`
   - Password: `TestPass123!`

---

## ⚠️ IMPORTANT: Enable Authentication First

Before any login will work, you MUST:

✅ **Enable Identity Toolkit API**
   - Go to: https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=jcb-01
   - Click **ENABLE**

✅ **Enable Email/Password Sign-In**
   - Go to: https://console.firebase.google.com/project/jcb-01/authentication/providers
   - Click on **Email/Password**
   - Enable it if not already enabled

✅ **Remove API Restrictions**
   - Go to: https://console.cloud.google.com/apis/credentials?project=jcb-01
   - Click your API key
   - Set "API restrictions" to **"Don't restrict key"**

---

## 🔧 Password Requirements

Your system accepts passwords that meet these criteria:
- Minimum 6 characters (Firebase requirement)
- Recommended: At least 8 characters with:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Special characters (!@#$%^&*)

**Strong password examples:**
- `TestPass123!`
- `Demo@2026$ecure`
- `SriBalaji#2026`

---

## 📱 Testing Workflow

1. **Enable APIs** (if not done):
   - Identity Toolkit API
   - Token Service API
   - Firebase Installations API

2. **Create test account**:
   - Use Firebase Console method above
   - OR use Sign-Up form on website

3. **Test login**:
   - Go to login page
   - Enter test credentials
   - Click "ACCESS ACCOUNT" or "GOOGLE" button

4. **Verify**:
   - Check Console (F12) for errors
   - Should redirect to dashboard
   - Should see user menu in header

---

## 🐛 Troubleshooting Login

**"Google Sign In Failed"**
- APIs not enabled yet - follow API enablement steps

**"Invalid email or password"**
- Check account exists in Firebase Console
- Password must be at least 6 characters

**"User not found"**
- Account doesn't exist - create it first
- Check spelling of email

**No errors but stuck on login page**
- Clear browser cache (Ctrl+Shift+Del)
- Try Incognito/Private window
- Check Console for errors

---

## 📞 Quick Links

- **Firebase Users**: https://console.firebase.google.com/project/jcb-01/authentication/users
- **Sign-In Methods**: https://console.firebase.google.com/project/jcb-01/authentication/providers
- **API Credentials**: https://console.cloud.google.com/apis/credentials?project=jcb-01
- **Enable APIs**: https://console.cloud.google.com/apis/dashboard?project=jcb-01

---

**Last Updated**: January 21, 2026
**Status**: Waiting for APIs to be enabled
