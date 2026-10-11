# Security Implementation Guide

## Overview
Comprehensive security measures implemented to protect the JCB Platform against common web vulnerabilities.

---

## 🛡️ Security Features Implemented

### 1. **Authentication & Session Management**

#### JWT-like Session System
- **Location**: `src/utils/sessionUtils.js`
- **Features**:
  - Secure session tokens
  - 24-hour session expiry
  - Auto-refresh (1 hour threshold)
  - Activity tracking
  - IP logging
  - Multi-device session management

#### Session Validation
```javascript
import { validateSession, getSession } from './utils/sessionUtils';

// Check if session is valid
const isValid = await validateSession();

// Get current session
const session = getSession();
console.log(session.role, session.permissions);
```

#### Role-Based Access Control (RBAC)
- **Roles**: USER, OPERATOR, ADMIN
- **Permissions**: Hierarchical permission system
- **Usage**:
```javascript
import { hasPermission, hasRole } from './utils/sessionUtils';

if (hasRole('ADMIN')) {
  // Admin-only code
}

if (hasPermission('manage:users')) {
  // Permission-specific code
}
```

---

### 2. **CSRF Protection**

#### CSRF Token System
- **Location**: `src/utils/csrfUtils.js`
- **Features**:
  - Random token generation (32 bytes)
  - 1-hour token expiry
  - SessionStorage-based (more secure than localStorage)
  - Automatic token rotation

#### Usage
```javascript
import { getCSRFToken, withCSRFToken } from './utils/csrfUtils';

// Add CSRF token to form submission
const data = withCSRFToken({
  email: 'user@example.com',
  name: 'John Doe'
});

// Or get token directly
const token = getCSRFToken();
```

#### React Hook
```javascript
import { useCSRFToken } from './utils/csrfUtils';

function MyForm() {
  const { token } = useCSRFToken();
  
  return (
    <form>
      <input type="hidden" name="_csrf" value={token} />
      {/* form fields */}
    </form>
  );
}
```

---

### 3. **Input Validation & Sanitization**

#### Comprehensive Validation
- **Location**: `src/utils/validationUtils.js`
- **Features**:
  - XSS prevention
  - SQL injection prevention
  - Email validation (RFC 5322 compliant)
  - Password strength validation
  - Phone number validation
  - URL validation
  - File upload validation
  - Form validation

#### Usage Examples

**Email Validation**
```javascript
import { validateEmailStrict } from './utils/validationUtils';

const result = validateEmailStrict(email);
if (!result.isValid) {
  console.error(result.error);
} else {
  console.log('Valid email:', result.value);
}
```

**Password Validation**
```javascript
import { validatePasswordStrict } from './utils/validationUtils';

const result = validatePasswordStrict(password, {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true
});

console.log(result.strength); // 'weak', 'medium', or 'strong'
```

**Form Validation**
```javascript
import { validateForm } from './utils/validationUtils';

const schema = {
  email: (value) => validateEmailStrict(value),
  password: (value) => validatePasswordStrict(value),
  phone: (value) => validatePhoneNumber(value, 'IN')
};

const { isValid, errors, values } = validateForm(formData, schema);
```

**XSS Prevention**
```javascript
import { sanitizeHTML } from './utils/validationUtils';

const safeContent = sanitizeHTML(userInput);
```

---

### 4. **Rate Limiting**

#### Advanced Rate Limiter
- **Location**: `src/utils/rateLimitUtils.js`
- **Features**:
  - Token bucket algorithm
  - Sliding window algorithm
  - IP-based limiting
  - Action-based limiting
  - Automatic block/unblock
  - Configurable limits per action

#### Pre-configured Limits
```javascript
RATE_LIMITS = {
  login: {
    maxAttempts: 5,
    windowMs: 300000,      // 5 minutes
    blockDuration: 900000  // 15 minutes
  },
  signup: {
    maxAttempts: 3,
    windowMs: 600000,      // 10 minutes
    blockDuration: 1800000 // 30 minutes
  },
  api: {
    maxAttempts: 100,
    windowMs: 60000,       // 1 minute
    blockDuration: 60000   // 1 minute
  }
}
```

#### Usage
```javascript
import { checkRateLimit, recordSuccess } from './utils/rateLimitUtils';

// Check rate limit before action
const result = checkRateLimit('user-login', 'login');

if (!result.allowed) {
  console.error(`Blocked until: ${result.blockedUntil}`);
  return;
}

// Perform action...

// Record success (resets counter)
recordSuccess('user-login');
```

#### Middleware Wrapper
```javascript
import { rateLimitMiddleware } from './utils/rateLimitUtils';

const protectedFunction = rateLimitMiddleware(
  myFunction,
  'unique-key',
  'api'
);
```

---

### 5. **Content Security Policy (CSP)**

#### Security Headers
- **Location**: `src/utils/securityHeaders.js`
- **Features**:
  - Strict CSP directives
  - XSS protection headers
  - Clickjacking prevention
  - MIME type sniffing prevention
  - Referrer policy
  - Permissions policy
  - HSTS (Strict Transport Security)

#### Applied Headers
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://trusted-cdn.com; ...
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

#### Initialization
```javascript
import { initializeSecurity } from './utils/securityHeaders';

// Called in main.jsx
initializeSecurity();
```

---

### 6. **Secure Cookie Management**

#### Cookie Options
```javascript
import { setSecureCookie, getCookie, deleteCookie } from './utils/securityHeaders';

// Set secure cookie
setSecureCookie('session_id', 'abc123', {
  secure: true,
  sameSite: 'strict',
  maxAge: 86400 // 24 hours
});

// Get cookie
const value = getCookie('session_id');

// Delete cookie
deleteCookie('session_id');
```

---

### 7. **Network Monitoring**

#### Offline/Online Detection
- **Location**: `src/utils/networkUtils.js`
- **Features**:
  - Real-time network status
  - Automatic reconnection
  - Retry with exponential backoff
  - Firestore health checks

#### Usage
```javascript
import { subscribeToNetworkStatus, retryWithBackoff } from './utils/networkUtils';

// Subscribe to network changes
const unsubscribe = subscribeToNetworkStatus((isOnline) => {
  console.log('Network status:', isOnline ? 'Online' : 'Offline');
});

// Retry failed operations
const result = await retryWithBackoff(async () => {
  return await fetchData();
}, 3, 1000); // 3 retries, 1 second initial delay
```

#### UI Component
- **Component**: `src/components/common/NetworkStatus.jsx`
- Shows banner when offline/online

---

## 🔒 Security Best Practices

### Password Security
✅ **Minimum 8 characters** (configurable)
✅ **Mix of uppercase, lowercase, numbers**
✅ **Optional special characters**
✅ **Maximum 128 characters**
✅ **Common password detection**
✅ **Password strength indicator**

### Session Security
✅ **24-hour session expiry**
✅ **Auto-refresh every hour**
✅ **Activity tracking**
✅ **Force logout all devices**
✅ **Session invalidation on logout**

### API Security
✅ **Rate limiting on all endpoints**
✅ **CSRF tokens for mutations**
✅ **Input validation on all inputs**
✅ **Output encoding**
✅ **Error message sanitization**

### Data Security
✅ **XSS prevention** (input sanitization)
✅ **SQL injection prevention** (parameterized queries)
✅ **CSRF protection** (token-based)
✅ **Clickjacking prevention** (X-Frame-Options)
✅ **MIME sniffing prevention**

---

## 🚀 Usage in Components

### Protected Route Example
```javascript
import { hasPermission } from '../utils/sessionUtils';

function AdminPanel() {
  if (!hasPermission('view:admin')) {
    return <Navigate to="/dashboard" />;
  }
  
  return <div>Admin Content</div>;
}
```

### Form with CSRF Protection
```javascript
import { withCSRFToken } from '../utils/csrfUtils';
import { validateForm } from '../utils/validationUtils';

function MyForm() {
  const handleSubmit = async (formData) => {
    // Validate
    const { isValid, errors } = validateForm(formData, schema);
    if (!isValid) {
      console.error(errors);
      return;
    }
    
    // Add CSRF token
    const secureData = withCSRFToken(formData);
    
    // Submit
    await submitData(secureData);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Rate-Limited Action
```javascript
import { checkRateLimit, recordSuccess } from '../utils/rateLimitUtils';

async function handleLogin(email, password) {
  const result = checkRateLimit(`login-${email}`, 'login');
  
  if (!result.allowed) {
    throw new Error(`Too many attempts. Try again in ${result.remaining} attempts.`);
  }
  
  // Perform login
  const user = await loginUser(email, password);
  
  // Success - reset counter
  recordSuccess(`login-${email}`);
  
  return user;
}
```

---

## 🔧 Configuration

### Firestore Security Rules
File: `firestore.rules`

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() &&
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'ADMIN';
    }
    
    // Apply rules...
  }
}
```

### Firebase Storage Rules
File: `storage.rules`

```rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🧪 Testing Security

### Test CSRF Protection
```javascript
// Should fail without token
await submitForm({ data: 'test' });

// Should succeed with token
const secureData = withCSRFToken({ data: 'test' });
await submitForm(secureData);
```

### Test Rate Limiting
```javascript
// Should succeed first 5 times
for (let i = 0; i < 5; i++) {
  const result = checkRateLimit('test', 'login');
  console.log(result.allowed); // true
}

// Should fail on 6th attempt
const result = checkRateLimit('test', 'login');
console.log(result.allowed); // false
```

### Test Input Validation
```javascript
// XSS attempt - should be sanitized
const dirty = '<script>alert("XSS")</script>';
const clean = sanitizeHTML(dirty);
console.log(clean); // &lt;script&gt;alert("XSS")&lt;/script&gt;

// SQL injection attempt - validation should fail
const email = "'; DROP TABLE users; --";
const result = validateEmailStrict(email);
console.log(result.isValid); // false
```

---

## 📊 Security Monitoring

### Session Activity Logs
All session activities are logged to Firestore:
- Session creation
- Session refresh
- Session cleared
- Login attempts
- Failed login attempts

### Rate Limit Logs
Rate limit violations are logged to console in development:
```
⚠️ Rate limit exceeded for: login-user@example.com
Blocked until: 2025-12-27T10:30:00.000Z
```

---

## 🔐 Admin Security Features

### Force Logout All Sessions
```javascript
import { forceLogoutAllSessions } from '../utils/sessionUtils';

// Admin can force logout user from all devices
await forceLogoutAllSessions(userId);
```

### View User Activity
```javascript
// Check user's activity log in Firestore
const activityRef = collection(db, `users/${userId}/activity`);
const activities = await getDocs(activityRef);
```

---

## ✅ Security Checklist

- [x] **Authentication**: Firebase Auth with email/password and Google OAuth
- [x] **Password Hashing**: Handled by Firebase Auth (bcrypt-equivalent)
- [x] **Session Management**: JWT-like tokens with expiry
- [x] **CSRF Protection**: Token-based protection for all mutations
- [x] **XSS Prevention**: Input sanitization and output encoding
- [x] **SQL Injection Prevention**: Firestore parameterized queries
- [x] **Rate Limiting**: Brute force protection
- [x] **Content Security Policy**: Strict CSP headers
- [x] **HTTPS**: Enforced via HSTS headers
- [x] **Role-Based Access Control**: Admin, Operator, User roles
- [x] **Input Validation**: All inputs validated
- [x] **Error Handling**: Generic error messages (no sensitive info)
- [x] **Activity Logging**: Session and authentication logs
- [x] **Network Monitoring**: Offline detection and retry logic

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Rate Limiting Best Practices](https://www.nginx.com/blog/rate-limiting-nginx/)

---

## 🆘 Troubleshooting

### "Too many login attempts"
- Wait for the block duration (15 minutes for login)
- Or clear localStorage: `localStorage.clear()`

### "CSRF token missing or invalid"
- Refresh the page to generate new token
- Check sessionStorage is enabled

### "Session expired"
- Re-login to create new session
- Sessions expire after 24 hours of inactivity

---

**Last Updated**: December 27, 2025
**Version**: 1.0.0
