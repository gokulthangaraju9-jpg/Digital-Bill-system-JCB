# Quick Security Reference Guide

## 🔒 Security Features - Quick Access

### File Upload (Storage)
```javascript
import { uploadFileSecure } from './utils/storageUtils';

// Basic upload with auto-validation
const url = await uploadFileSecure(file, `folder/${userId}/file.jpg`);

// With progress tracking
const url = await uploadFileSecure(
  file, 
  path, 
  (progress) => setUploadProgress(progress)
);
```

### Password Validation
```javascript
import { analyzePasswordStrength, validatePasswordRequirements } from './utils/passwordUtils';

// Check strength
const { strength, score, feedback } = analyzePasswordStrength(password);

// Validate requirements
const { isValid, errors } = validatePasswordRequirements(password);
```

### Protected Routes
```javascript
import { ProtectedRoute, AdminRoute, PublicRoute } from './components/auth/ProtectedRoute';

// User route
<ProtectedRoute><Dashboard /></ProtectedRoute>

// Admin route
<AdminRoute><AdminPanel /></AdminRoute>

// Public route (login/signup)
<PublicRoute><Login /></PublicRoute>
```

### XSS Protection
```javascript
import { sanitizeHTML, sanitizeURL, detectXSS } from './utils/xssProtection';

// Sanitize input
const safe = sanitizeHTML(userInput);

// Check URL
const safeUrl = sanitizeURL(url);

// Detect attack
if (detectXSS(input)) { /* handle */ }
```

### Token Management
```javascript
import { getAccessToken, autoRefreshToken } from './utils/tokenUtils';

// Get current token
const token = getAccessToken();

// Refresh if needed
await autoRefreshToken(user);
```

## 🛡️ Security Checklist

- ✅ **Authentication**: JWT tokens + Firebase Auth
- ✅ **Password**: bcrypt hashing (Firebase) + strength validation
- ✅ **Routes**: Protected with role-based access
- ✅ **Input**: Validation + sanitization on all forms
- ✅ **XSS**: Prevented via sanitization + CSP headers
- ✅ **CSRF**: Token system in place
- ✅ **Rate Limiting**: 5 attempts per 15 min
- ✅ **File Upload**: Size, type, and content validation
- ✅ **Storage**: Firebase rules + secure paths

## 🚨 Important Files

| File | Purpose |
|------|---------|
| `utils/storageUtils.js` | Secure file upload/download |
| `utils/tokenUtils.js` | JWT-like token management |
| `utils/passwordUtils.js` | Password validation |
| `utils/xssProtection.js` | XSS prevention |
| `utils/securityUtils.js` | Input validation |
| `utils/csrfUtils.js` | CSRF protection |
| `components/auth/ProtectedRoute.jsx` | Route protection |
| `contexts/AuthContext.jsx` | Auth state + tokens |

## 📝 Common Tasks

### Add Admin-Only Feature
```javascript
import { useIsAdmin } from './components/auth/ProtectedRoute';

function MyComponent() {
  const isAdmin = useIsAdmin();
  
  return (
    <>
      {isAdmin && <AdminButton />}
    </>
  );
}
```

### Validate File Before Upload
```javascript
import { validateFileUpload } from './utils/securityUtils';

const validation = validateFileUpload(file, {
  maxSizeMB: 5,
  allowedTypes: ['image/jpeg', 'image/png']
});

if (!validation.isValid) {
  alert(validation.message);
}
```

### Check Password Strength in Real-Time
```javascript
import { analyzePasswordStrength, getStrengthColor } from './utils/passwordUtils';

const analysis = analyzePasswordStrength(password);
const color = getStrengthColor(analysis.strength);

// Show: Weak (red), Fair (orange), Good (yellow), Strong (green)
```

All security features are implemented and ready to use! 🎉
