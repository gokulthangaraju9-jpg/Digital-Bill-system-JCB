# Quick Reference Guide - Marketplace Dashboard

## 📋 Table of Contents
- [Mode Switching](#mode-switching)
- [Common Commands](#common-commands)
- [Component Usage](#component-usage)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)

---

## 🔄 Mode Switching

### Current Mode
```javascript
import { getConfig, isDemo, isProduction } from './config/environment';

const config = getConfig();
console.log(config.name); // "Demo Mode" or "Production Mode"

if (isDemo()) {
  // Demo-specific logic
}

if (isProduction()) {
  // Production-specific logic
}
```

### Switch to Demo Mode
```bash
# .env file
VITE_APP_MODE=demo
```

### Switch to Production Mode
```bash
# .env file
VITE_APP_MODE=production
```

---

## 💻 Common Commands

### Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Firebase
```bash
# Deploy everything
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions

# Deploy only Firestore rules
firebase deploy --only firestore:rules

# Start emulators
firebase emulators:start
```

### Functions
```bash
# Install function dependencies
cd functions && npm install

# Test functions locally
npm run serve

# View function logs
firebase functions:log
```

---

## 🧩 Component Usage

### Dashboard Stats
```jsx
import SummaryStats from './components/dashboard/SummaryStats';

function Dashboard() {
  return (
    <div>
      <SummaryStats userId={currentUser.id} />
    </div>
  );
}
```

### Subscription Badge
```jsx
import SubscriptionBadge from './components/subscription/SubscriptionBadge';

function Header() {
  const handleUpgrade = () => {
    // Navigate to upgrade page
  };

  return (
    <SubscriptionBadge 
      user={currentUser} 
      onUpgrade={handleUpgrade}
    />
  );
}
```

### Ad Unit
```jsx
import AdUnit from './components/ads/AdUnit';

function Sidebar() {
  return (
    <div>
      <AdUnit 
        slot="1234567890"
        format="rectangle"
        user={currentUser}
        style={{ marginBottom: '20px' }}
      />
    </div>
  );
}
```

---

## 📚 API Reference

### Data Service

#### Get Dashboard Stats
```javascript
import dataService from './services/dataService';

const stats = await dataService.getDashboardStats(userId);
// Returns: { todaysEarnings, totalHours, activeMachines, pendingBills, ... }
```

#### Get Bookings
```javascript
const bookings = await dataService.getBookings(userId, {
  status: 'confirmed',
  startDate: new Date('2025-12-01'),
  endDate: new Date('2025-12-31'),
  limit: 10
});
```

#### Create Booking
```javascript
const newBooking = await dataService.createBooking({
  customerId: 'customer_123',
  ownerId: 'owner_456',
  machineId: 'machine_001',
  bookingDate: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  location: {
    address: '123 Main St',
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  hourlyRate: 1500
});
```

#### Update Booking
```javascript
await dataService.updateBooking('booking_123', {
  status: 'confirmed',
  meterReadings: {
    start: 1200,
    end: 1205,
    hours: 5
  }
});
```

#### Subscribe to Real-Time Updates
```javascript
const unsubscribe = dataService.subscribeToStats(userId, (stats) => {
  console.log('Updated stats:', stats);
});

// Cleanup
return () => unsubscribe();
```

### Subscription Utils

#### Check Feature Access
```javascript
import { checkFeatureAccess } from './utils/subscriptionUtils';

const access = checkFeatureAccess(user, 'addMachine', currentMachineCount);

if (access.allowed) {
  // Allow action
} else {
  // Show upgrade prompt
  console.log(access.message);
}
```

#### Check if User Should See Ads
```javascript
import { shouldShowAds } from './utils/subscriptionUtils';

if (shouldShowAds(user)) {
  // Show ads
}
```

#### Get Days Remaining
```javascript
import { getDaysRemaining, isExpiringSoon } from './utils/subscriptionUtils';

const days = getDaysRemaining(user.subscription);
const expiring = isExpiringSoon(user.subscription);

if (expiring) {
  // Show renewal reminder
}
```

---

## 🎯 Custom Hooks

### useDashboardStats
```javascript
import { useDashboardStats } from './hooks/useDashboardStats';

function Dashboard() {
  const { stats, loading, error } = useDashboardStats(userId);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;

  return <div>{stats.todaysEarnings}</div>;
}
```

---

## 🔧 Troubleshooting

### Dashboard Shows 0 Values

**Check:**
1. Is `VITE_APP_MODE` set correctly in `.env`?
2. Is user authenticated?
3. Are Firestore rules allowing read access?
4. Check browser console for errors

**Fix:**
```javascript
// Verify mode
import { getConfig } from './config/environment';
console.log(getConfig());

// Check Firebase connection
import { db } from './firebase';
console.log(db);
```

### Ads Not Showing

**Check:**
1. Is user on ad-supported plan?
2. Is AdSense approved?
3. Is ad blocker disabled?
4. Is `VITE_APP_MODE=production`?

**Fix:**
```javascript
import { shouldShowAds } from './utils/subscriptionUtils';
console.log('Should show ads:', shouldShowAds(user));
```

### Real-Time Updates Not Working

**Check:**
1. Are Cloud Functions deployed?
2. Are Firestore rules correct?
3. Is subscription active?

**Fix:**
```bash
# Check function logs
firebase functions:log

# Redeploy functions
firebase deploy --only functions
```

### Build Errors

**Common Issues:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

## 📊 Data Flow Diagram

```
Customer Creates Booking
         ↓
Firestore: /bookings/{id}
         ↓
Cloud Function: updateMachineStatus
         ↓
Firestore: /machines/{id} (status: 'booked')
         ↓
Owner Confirms Booking
         ↓
Work Completed (meter readings added)
         ↓
Cloud Function: calculateDailyEarnings
         ↓
Firestore: /earnings/{ownerId}/daily/{date}
         ↓
Real-Time Listener Updates Dashboard
         ↓
Dashboard Shows Updated Stats
```

---

## 🔐 Security Checklist

- [ ] Firestore rules deployed
- [ ] Environment variables not committed
- [ ] API keys secured
- [ ] User authentication required
- [ ] Input validation implemented
- [ ] Rate limiting configured
- [ ] HTTPS enforced
- [ ] CORS configured

---

## 📈 Performance Tips

1. **Use React Query for caching:**
```javascript
import { useQuery } from '@tanstack/react-query';

const { data } = useQuery({
  queryKey: ['stats', userId],
  queryFn: () => dataService.getDashboardStats(userId),
  staleTime: 5 * 60 * 1000 // 5 minutes
});
```

2. **Implement pagination:**
```javascript
const bookings = await dataService.getBookings(userId, {
  limit: 20,
  startAfter: lastDoc
});
```

3. **Use Firestore indexes:**
```bash
firebase deploy --only firestore:indexes
```

---

## 💡 Quick Tips

### Format Currency
```javascript
const formatCurrency = (amount) => {
  return `₹ ${amount?.toLocaleString('en-IN') || '0'}`;
};
```

### Format Date
```javascript
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
```

### Calculate Percentage Change
```javascript
const calculateChange = (current, previous) => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};
```

---

## 🚀 Deployment Checklist

- [ ] Update `.env` to production mode
- [ ] Build project (`npm run build`)
- [ ] Deploy Firestore rules
- [ ] Deploy Cloud Functions
- [ ] Deploy to Firebase Hosting
- [ ] Test all features
- [ ] Monitor Firebase console
- [ ] Set up error tracking
- [ ] Configure analytics

---

## 📞 Support

- **Documentation:** `MARKETPLACE_DASHBOARD_DESIGN.md`
- **Implementation:** `IMPLEMENTATION_GUIDE.md`
- **Firebase:** https://firebase.google.com/support
- **React:** https://react.dev/community

---

**Last Updated:** December 18, 2025
