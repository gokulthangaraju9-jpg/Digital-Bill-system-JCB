# 🔐 Admin Role Setup Guide

## ⚠️ IMPORTANT: First-Time Admin Setup

The admin role is **NOT** automatically assigned. You must manually set it in Firestore.

---

## 📝 Step 1: Create User Document in Firestore

### Go to Firebase Console
1. Visit: https://console.firebase.google.com/project/jcb-01/firestore
2. Open **Firestore Database**
3. Navigate to `users` collection

### Create Admin User Document

**Collection:** `users`  
**Document ID:** `[USER_UID]` *(Get this from Authentication tab)*

**Fields:**
```
email: "pradeepgobi2006@gmail.com"
role: "ADMIN"
createdAt: [timestamp]
```

**Example:**
```
users/
  └── abc123xyz (document)
       ├── email: "pradeepgobi2006@gmail.com"
       ├── role: "ADMIN"
       └── createdAt: December 23, 2024 at 10:30:00 AM UTC+5:30
```

---

## 🛡️ Step 2: How It Works

### Client-Side (React)
```javascript
// On login → Fetch role from Firestore (READ ONLY)
const userRef = doc(db, "users", user.uid);
const snap = await getDoc(userRef);
const role = snap.data().role; // "ADMIN" or "USER"

// Route Protection
if (role !== "ADMIN") {
  return <Navigate to="/dashboard" />;
}
```

### Backend (Firestore Rules)
```
match /users/{userId} {
  allow read: if request.auth != null;
  allow write: if false; // Nobody can change role from client
}

match /admin/{doc} {
  allow read, write: if
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "ADMIN";
}
```

---

## ✅ Security Features

### ❌ What Hackers **CANNOT** Do:
- Edit JavaScript code to bypass checks
- Modify localStorage/sessionStorage
- Access `/admin` routes directly via URL
- Change their role from client-side

### ✅ Why It's Secure:
1. **Role stored in Firestore** (not in client code)
2. **Firestore rules** enforce role check at database level
3. **Client-side checks** only for UI/UX (not security)
4. **Role field is READ-ONLY** from client

---

## 🔥 Step 3: Normal Users

For all other users, the default role is `"USER"`.

**Automatic User Creation:**
- When users sign up, they get `role: "USER"` by default
- Only manual Firestore edit can change to `"ADMIN"`

---

## 📋 Step 4: Testing

### Test Admin Access:
1. Login as `pradeepgobi2006@gmail.com`
2. Check if sidebar shows "Admin Panel" section
3. Navigate to `/admin/dashboard`
4. Should load successfully

### Test Non-Admin Block:
1. Login as any other user
2. Try accessing `/admin/dashboard`
3. Should redirect to dashboard with "Access Denied"

---

## 🚨 Troubleshooting

### "User record not found" error:
- User document doesn't exist in Firestore
- Create document manually (see Step 1)

### "Access Denied" for admin email:
- Check `role` field is exactly `"ADMIN"` (uppercase)
- Verify document ID matches user UID
- Clear browser cache and re-login

### Direct URL access blocked:
- ✅ This is correct behavior
- Role check happens on every route load
- Firestore rules prevent unauthorized data access

---

## 📌 Summary

| Item | Value |
|------|-------|
| Admin Email | pradeepgobi2006@gmail.com |
| Admin Role | ADMIN (uppercase) |
| Normal Role | USER (uppercase) |
| Security | Firestore rules (backend) |
| Client Checks | UI/UX only |

**🎯 Key Point:** Client-side code just **reads** the role, but **Firestore rules** are the real security layer.
