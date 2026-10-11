# Implementation Guide - Marketplace Dashboard System

## Quick Start

### 1. Environment Setup

**For Demo Mode (Testing):**
```bash
# Create .env file
cp .env.example .env

# Set mode to demo
VITE_APP_MODE=demo
```

**For Production Mode (Real Data):**
```bash
# Create .env file
cp .env.example .env

# Set mode to production
VITE_APP_MODE=production

# Add your Firebase credentials
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The app will automatically use the mode specified in your `.env` file.

---

## Switching Between Modes

### Demo Mode → Production Mode

1. **Update `.env` file:**
   ```
   VITE_APP_MODE=production
   ```

2. **Add Firebase credentials** to `.env`

3. **Deploy Firestore security rules:**
   ```bash
   firebase deploy --only firestore:rules
   ```

4. **Deploy Cloud Functions:**
   ```bash
   cd functions
   npm install
   cd ..
   firebase deploy --only functions
   ```

5. **Restart dev server:**
   ```bash
   npm run dev
   ```

### Production Mode → Demo Mode

1. **Update `.env` file:**
   ```
   VITE_APP_MODE=demo
   ```

2. **Restart dev server**

---

## Firebase Setup (Production Mode)

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project
3. Enable Firestore Database
4. Enable Authentication (Email/Phone)

### 2. Get Firebase Configuration

1. Project Settings → General
2. Scroll to "Your apps"
3. Click Web app icon
4. Copy configuration values to `.env`

### 3. Set Up Firestore

**Create Collections:**
- `users` - User profiles and subscriptions
- `machines` - Machine listings
- `bookings` - Booking records
- `earnings` - Aggregated earnings data

**Deploy Security Rules:**
```bash
firebase deploy --only firestore:rules
```

### 4. Set Up Cloud Functions

**Install Firebase Functions:**
```bash
firebase init functions
```

**Create earnings calculation function:**

Create `functions/index.js`:
```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.calculateDailyEarnings = functions.firestore
  .document('bookings/{bookingId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const oldData = change.before.data();
    
    // Only calculate when status changes to 'paid'
    if (newData.status === 'paid' && oldData.status !== 'paid') {
      const ownerId = newData.ownerId;
      const date = new Date(newData.paidAt.toDate()).toISOString().split('T')[0];
      
      const earningsRef = admin.firestore()
        .doc(`earnings/${ownerId}/daily/${date}`);
      
      await admin.firestore().runTransaction(async (transaction) => {
        const earningsDoc = await transaction.get(earningsRef);
        
        if (earningsDoc.exists) {
          transaction.update(earningsRef, {
            totalEarnings: admin.firestore.FieldValue.increment(newData.totalAmount),
            totalHours: admin.firestore.FieldValue.increment(newData.meterReadings.hours),
            completedBookings: admin.firestore.FieldValue.increment(1),
            bookingIds: admin.firestore.FieldValue.arrayUnion(newData.id)
          });
        } else {
          transaction.set(earningsRef, {
            ownerId: ownerId,
            date: date,
            totalEarnings: newData.totalAmount,
            totalHours: newData.meterReadings.hours,
            totalBookings: 1,
            completedBookings: 1,
            pendingBills: 0,
            bookingIds: [newData.id]
          });
        }
      });
    }
  });
```

**Deploy functions:**
```bash
firebase deploy --only functions
```

---

## Google AdSense Integration (Production)

### 1. Create AdSense Account

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign up and verify your website
3. Get your Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)

### 2. Add AdSense Script

Add to `index.html`:
```html
<head>
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
</head>
```

### 3. Update Environment Variable

```
VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

### 4. Create Ad Units

1. In AdSense dashboard, create ad units
2. Get ad slot IDs
3. Use in AdUnit component:

```jsx
<AdUnit 
  slot="1234567890" 
  format="rectangle"
  user={currentUser}
/>
```

---

## Payment Integration (Razorpay)

### 1. Create Razorpay Account

1. Go to [Razorpay](https://razorpay.com/)
2. Sign up and complete KYC
3. Get API keys from Dashboard

### 2. Install Razorpay

```bash
npm install razorpay
```

### 3. Add to Environment

```
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
```

### 4. Create Payment Component

```jsx
import { useRazorpay } from 'react-razorpay';

const handleUpgrade = () => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: 25000, // ₹250 in paise
    currency: 'INR',
    name: 'JCB Marketplace',
    description: 'Premium Subscription',
    handler: async (response) => {
      // Update user subscription in Firestore
      await updateSubscription(userId, {
        plan: 'paid',
        status: 'active',
        paymentId: response.razorpay_payment_id
      });
    }
  };
  
  const rzp = new window.Razorpay(options);
  rzp.open();
};
```

---

## Testing Checklist

### Demo Mode Testing
- [ ] Dashboard shows mock data
- [ ] Stats update on page reload
- [ ] Mode indicator is visible
- [ ] No Firebase calls are made
- [ ] Ad placeholders are shown

### Production Mode Testing
- [ ] Dashboard shows real data from Firestore
- [ ] Real-time updates work
- [ ] Bookings are saved correctly
- [ ] Earnings are calculated automatically
- [ ] Ads are displayed (for ad-supported users)
- [ ] Subscription checks work
- [ ] Payment flow works

---

## Deployment

### 1. Build for Production

```bash
npm run build
```

### 2. Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

### 3. Set Production Environment Variables

In Firebase Console:
1. Go to Hosting
2. Add environment variables
3. Redeploy

---

## Monitoring & Analytics

### 1. Firebase Analytics

Enable in Firebase Console:
```
VITE_ENABLE_ANALYTICS=true
```

### 2. Error Tracking (Sentry)

```bash
npm install @sentry/react
```

Add to `main.jsx`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.VITE_APP_MODE
});
```

### 3. Performance Monitoring

Use Firebase Performance Monitoring:
```bash
firebase init performance
```

---

## Troubleshooting

### Issue: "Dashboard shows 0 values in production"

**Solution:**
1. Check Firebase credentials in `.env`
2. Verify Firestore rules allow read access
3. Check browser console for errors
4. Ensure user is authenticated

### Issue: "Ads not showing"

**Solution:**
1. Verify AdSense account is approved
2. Check ad blocker is disabled
3. Ensure user has ad-supported plan
4. Wait 24-48 hours for ads to activate

### Issue: "Real-time updates not working"

**Solution:**
1. Check Firestore rules allow read access
2. Verify Cloud Functions are deployed
3. Check Firebase quota limits
4. Review browser console for errors

---

## Best Practices

### 1. Data Security
- Never commit `.env` file
- Use Firestore security rules
- Validate all user inputs
- Implement rate limiting

### 2. Performance
- Use React Query for caching
- Implement pagination for large lists
- Optimize Firestore queries with indexes
- Use Cloud Functions for heavy calculations

### 3. User Experience
- Show loading states
- Handle errors gracefully
- Provide clear upgrade prompts
- Test on mobile devices

### 4. Cost Optimization
- Monitor Firebase usage
- Set up billing alerts
- Use Firestore indexes efficiently
- Cache frequently accessed data

---

## Support & Resources

- **Documentation:** See `MARKETPLACE_DASHBOARD_DESIGN.md`
- **Firebase Docs:** https://firebase.google.com/docs
- **React Docs:** https://react.dev
- **Razorpay Docs:** https://razorpay.com/docs

---

## Next Steps

1. ✅ Set up environment (demo or production)
2. ✅ Test dashboard in demo mode
3. ⬜ Configure Firebase project
4. ⬜ Deploy Cloud Functions
5. ⬜ Set up AdSense
6. ⬜ Integrate payment gateway
7. ⬜ Test in production mode
8. ⬜ Deploy to Firebase Hosting
9. ⬜ Monitor and optimize

---

**Need Help?** Check the design document or create an issue in the repository.
