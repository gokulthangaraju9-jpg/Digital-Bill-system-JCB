# Role-Based Access Control System - Sri Balaji Earth Movers

## Overview
This application implements a comprehensive role-based access control (RBAC) system with two distinct user roles: **Admin** and **Normal User**.

---

## User Roles

### 1. **Admin**
- Full access to all administrative features
- Can manage users, machines, bookings, and content
- Access to sensitive data and system settings

### 2. **Normal User**
- Limited access to public and authenticated user features
- Can view machines, make bookings, use calculator
- Cannot access admin routes or settings

---

## Authentication Flow

```
┌─────────────────┐
│  User visits    │
│   website       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Login Page     │◄──── (On logout only)
│  /login         │
└────────┬────────┘
         │
         │ Login Success
         ▼
┌─────────────────┐
│  Intro Page     │◄──── (Default landing after login)
│  /intro         │
└────────┬────────┘
         │
    ┌────┴─────┐
    │          │
    ▼          ▼
 Normal     Admin
  User       User
    │          │
    │          │
    ▼          ▼
Dashboard   Admin
Pages       Dashboard
```

---

## Page Access Matrix

| Page/Route | Normal User | Admin | Public (Not Logged In) |
|------------|------------|-------|------------------------|
| `/login` | ❌ (redirected) | ❌ (redirected) | ✅ |
| `/intro` | ✅ | ✅ | ❌ (redirected to login) |
| `/dashboard` | ✅ | ✅ | ❌ |
| `/calculate` | ✅ | ✅ | ❌ |
| `/book` | ✅ | ✅ | ❌ |
| `/admin/dashboard` | ❌ | ✅ | ❌ |
| `/admin/*` | ❌ (Access Denied) | ✅ | ❌ (redirected to login) |

---

## Admin Features

### Admin-Only Pages
1. **Admin Dashboard** (`/admin/dashboard`)
   - Analytics overview
   - System metrics
   - User statistics

2. **User Management** (planned)
   - View all users
   - Block/unblock users
   - Assign roles
   - View user activity

3. **Machine Management** (planned)
   - Approve machine listings
   - Edit machine details
   - Disable machines
   - Inventory management

4. **Booking Management** (planned)
   - View all bookings
   - Cancel bookings
   - Resolve disputes
   - Booking analytics

5. **Payment & Earnings Overview** (planned)
   - Revenue analytics
   - Payment tracking
   - Transaction history

6. **Advertisement Management** (planned)
   - Enable/disable ad slots
   - Ad performance metrics

7. **Content Moderation** (planned)
   - Review uploaded images
   - Approve/reject content

8. **Reports & Complaints** (planned)
   - Handle user reports
   - Investigation tools

9. **System Settings** (planned)
   - Maintenance mode
   - Rate limits
   - Policy configuration

10. **Notifications** (planned)
    - Broadcast announcements
    - Alert management

11. **Activity Logs** (planned)
    - Admin action history
    - Audit trail

---

## Normal User Features

### Accessible Pages
1. **Intro Page** (`/intro`)
   - Company information
   - JCB details
   - Contact information

2. **Dashboard** (`/dashboard`)
   - Personal statistics
   - Recent bookings
   - Quick actions

3. **Calculator** (`/calculate`)
   - Hours calculation
   - Cost estimation

4. **Book Machine** (`/book`)
   - Browse available machines
   - Make booking requests
   - View booking history

5. **Profile** (planned)
   - Edit personal information
   - View booking history

---

## Authentication Implementation

### Firebase Auth Persistence
```javascript
// In firebase.js
setPersistence(auth, browserLocalPersistence)
```

**Benefits:**
- Session persists across browser restarts
- No automatic timeout issues
- User stays logged in until manual logout
- Cookies and session storage enabled

### Protected Routes

#### 1. **RequireAuth Component**
- Wraps all authenticated routes
- Checks if user is logged in
- Redirects to `/login` if not authenticated
- Shows loading spinner during auth check

```javascript
<Route path="/intro" element={<RequireAuth><IntroPage /></RequireAuth>} />
```

#### 2. **RequireAdmin Component**
- Wraps all admin-only routes
- Checks user role from Firestore or hardcoded admin emails
- Shows "Access Denied" for non-admin users
- Redirects to `/intro` if unauthorized

```javascript
<Route element={<RequireAdmin />}>
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
</Route>
```

---

## Admin Email Configuration

### Hardcoded Admin Emails
The following emails have automatic admin access:

1. `pradeepgbi8@gmail.com` ✅ (Primary Admin)
2. `admin@sribalaji.com` ✅ (System Admin)

**To add more admins:**
1. Update `RequireAdmin.jsx`
2. Or add user role in Firestore: `users/{uid}/role = 'admin'`

---

## Security Features

### 1. **Route Protection**
- All authenticated routes wrapped in `RequireAuth`
- Admin routes wrapped in `RequireAdmin`
- Direct URL access blocked for unauthorized users

### 2. **Role Verification**
- Server-side role check via Firestore
- Fallback to hardcoded admin emails
- Role cached during session

### 3. **Redirect Logic**
- Unauthorized admin access → `/intro` (Access Denied)
- Not logged in → `/login`
- After login → `/intro`
- After logout → `/login`

### 4. **UI Protection**
- Admin navigation hidden for normal users
- Admin buttons/links not rendered
- Client-side and server-side validation

---

## Firestore Database Structure

### Users Collection
```
users/
  {userId}/
    email: "user@example.com"
    role: "admin" | "user"
    displayName: "John Doe"
    createdAt: timestamp
    lastLogin: timestamp
```

---

## How to Test

### Test as Normal User
1. Sign up with any email (not admin email)
2. Should land on `/intro`
3. Try accessing `/admin/dashboard` → Access Denied
4. Can access: `/dashboard`, `/calculate`, `/book`

### Test as Admin
1. Sign in with `pradeepgbi8@gmail.com`
2. Should land on `/intro`
3. Can access `/admin/dashboard`
4. Has full access to all routes

---

## Best Practices Implemented

✅ **Authentication Persistence** - No timeout issues
✅ **Role-based routing** - Clear separation of access
✅ **Protected routes** - Secure by default
✅ **Loading states** - Good UX during auth checks
✅ **Redirect after logout** - Clear flow
✅ **Hardcoded admin fallback** - Always accessible
✅ **Firestore role management** - Scalable solution
✅ **Access denied feedback** - Clear error messages
✅ **URL protection** - Direct access blocked

---

## Future Enhancements

1. **Multi-factor Authentication (MFA)**
2. **Password reset functionality**
3. **Email verification**
4. **Session timeout warnings**
5. **Activity logging**
6. **Role hierarchy** (Super Admin, Moderator, etc.)
7. **Permission-based access** (granular control)
8. **Admin invite system**

---

## Troubleshooting

### Issue: User gets logged out randomly
**Solution:** Firebase persistence is now set to `browserLocalPersistence`

### Issue: Can't access admin dashboard
**Check:**
1. Are you logged in with admin email?
2. Is email exactly `pradeepgbi8@gmail.com`?
3. Check Firestore for role assignment

### Issue: Redirect loop
**Solution:** Clear browser cache and cookies, re-login

---

## Contact

For admin access or role assignment, contact:
- **Email:** pradeepgbi8@gmail.com
- **Website:** jcb-01.web.app

---

**Built by GPT Boys** 🤖
