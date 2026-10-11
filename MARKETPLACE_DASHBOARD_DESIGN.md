# Marketplace Dashboard System - Complete Design Document

## Table of Contents
1. [System Overview](#system-overview)
2. [Mode Architecture](#mode-architecture)
3. [Data Flow](#data-flow)
4. [Monetization Strategy](#monetization-strategy)
5. [Technical Implementation](#technical-implementation)
6. [Security & Best Practices](#security--best-practices)

---

## System Overview

### Purpose
A dual-mode marketplace dashboard that supports:
- **Demo Mode**: Testing environment with mock data for UI/UX validation
- **Production Mode**: Real-time data from Firebase with actual bookings and earnings

### Key Features
- Real-time earnings calculation from confirmed bookings
- Live pending bills tracking
- Machine status monitoring
- Tiered access control (Free, Paid, Ad-supported)
- Scalable architecture for public deployment

---

## Mode Architecture

### 1. Demo Mode (Testing)
**Purpose**: UI/UX testing, development, and demonstrations

**Characteristics**:
- Mock data stored in localStorage or React state
- Simulated real-time updates
- Data resets on page reload (optional persistence)
- No database connections required
- Fast iteration for design changes

**Use Cases**:
- Development environment
- UI/UX testing
- Client demonstrations
- Onboarding tutorials

### 2. Production Mode (Real)
**Purpose**: Live marketplace with actual user data

**Characteristics**:
- Firebase Firestore database integration
- Real-time listeners for live updates
- Persistent data across sessions
- Secure authentication required
- Calculated values from actual bookings

**Use Cases**:
- Public deployment
- Actual user transactions
- Revenue generation
- Analytics tracking

---

## Data Flow

### Booking → Earnings → Dashboard Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    CUSTOMER BOOKING FLOW                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
1. Customer creates booking request
   - Machine selection
   - Date/time selection
   - Duration estimate
   - Location details
                              ↓
2. Booking stored in Firestore
   Collection: /bookings
   Status: "pending"
                              ↓
3. Owner receives notification
   - Real-time listener triggers
   - Push notification sent
                              ↓
4. Owner accepts/rejects booking
   Status: "confirmed" or "rejected"
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    EARNINGS CALCULATION                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
5. Work completion logged
   - Start meter reading
   - End meter reading
   - Actual hours calculated
                              ↓
6. Earnings calculated
   Formula: (End - Start) × Hourly Rate
   Status: "completed"
                              ↓
7. Bill generated
   Status: "pending_payment"
                              ↓
8. Payment confirmation
   Status: "paid"
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    DASHBOARD UPDATE                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
9. Real-time dashboard updates
   - Today's Earnings (sum of paid bookings today)
   - Total Hours (sum of hours today)
   - Active Machines (bookings with status "in_progress")
   - Pending Bills (bookings with status "pending_payment")
```

### Database Schema

#### Bookings Collection
```javascript
/bookings/{bookingId}
{
  id: "booking_123",
  customerId: "user_456",
  ownerId: "owner_789",
  machineId: "machine_001",
  
  // Booking Details
  status: "pending" | "confirmed" | "in_progress" | "completed" | "paid" | "rejected",
  bookingDate: Timestamp,
  startTime: Timestamp,
  endTime: Timestamp,
  
  // Location
  location: {
    address: "123 Main St",
    coordinates: { lat: 0, lng: 0 }
  },
  
  // Meter Readings
  meterReadings: {
    start: 1200,
    end: 1205,
    hours: 5
  },
  
  // Financial
  hourlyRate: 1500,
  totalAmount: 7500,
  paymentStatus: "pending" | "paid" | "failed",
  
  // Timestamps
  createdAt: Timestamp,
  updatedAt: Timestamp,
  completedAt: Timestamp,
  paidAt: Timestamp
}
```

#### Machines Collection
```javascript
/machines/{machineId}
{
  id: "machine_001",
  ownerId: "owner_789",
  
  // Machine Details
  type: "JCB 3DX",
  model: "2020",
  registrationNumber: "KA-01-AB-1234",
  
  // Pricing
  hourlyRate: 1500,
  dailyRate: 10000,
  
  // Status
  status: "available" | "booked" | "maintenance" | "offline",
  currentBookingId: "booking_123" | null,
  
  // Location
  baseLocation: {
    address: "Bangalore, Karnataka",
    coordinates: { lat: 0, lng: 0 }
  },
  
  // Availability
  availability: {
    monday: { start: "08:00", end: "18:00" },
    tuesday: { start: "08:00", end: "18:00" },
    // ... other days
  },
  
  // Stats
  totalBookings: 150,
  totalHours: 1200,
  rating: 4.5,
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### Users Collection
```javascript
/users/{userId}
{
  id: "user_123",
  email: "user@example.com",
  phone: "+919876543210",
  name: "John Doe",
  
  // User Type
  role: "owner" | "customer" | "admin",
  
  // Subscription
  subscription: {
    plan: "free" | "paid" | "ad_supported",
    status: "active" | "expired" | "cancelled",
    startDate: Timestamp,
    endDate: Timestamp,
    amount: 250
  },
  
  // Limits (for free users)
  limits: {
    maxMachines: 2,
    maxAnalyticsDays: 7,
    adsEnabled: true
  },
  
  // Ad Earnings (for ad-supported users)
  adStats: {
    totalImpressions: 1500,
    totalClicks: 45,
    earnedCredits: 120,
    creditsUsed: 50
  },
  
  // Stats
  totalEarnings: 125000,
  totalBookings: 45,
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### Earnings Collection (Aggregated)
```javascript
/earnings/{ownerId}/daily/{date}
{
  ownerId: "owner_789",
  date: "2025-12-18",
  
  // Daily Stats
  totalEarnings: 12450,
  totalHours: 8.5,
  totalBookings: 3,
  completedBookings: 2,
  pendingBills: 1,
  
  // Breakdown
  bookingIds: ["booking_123", "booking_456"],
  
  // Calculated at end of day
  calculatedAt: Timestamp
}
```

---

## Monetization Strategy

### Tier Comparison

| Feature | Free Plan | Ad-Supported | Paid Plan (₹250/mo) |
|---------|-----------|--------------|---------------------|
| **Machine Listings** | 2 machines | 5 machines | Unlimited |
| **Dashboard Analytics** | 7 days | 30 days | Unlimited |
| **Booking Priority** | Standard | Standard | Priority |
| **Ads Display** | ❌ No ads | ✅ Ads shown | ❌ No ads |
| **Advanced Reports** | ❌ | ❌ | ✅ |
| **Featured Listings** | ❌ | ❌ | ✅ |
| **API Access** | ❌ | ❌ | ✅ |
| **Support** | Email | Email | Priority |

### Revenue Streams

#### 1. Subscription Revenue
- **Monthly**: ₹250/user
- **Target**: 1000 paid users = ₹2,50,000/month
- **Annual discount**: ₹2500/year (2 months free)

#### 2. Advertisement Revenue
- **Display Ads**: Google AdSense
- **Placement Strategy**:
  - Dashboard sidebar (300x250)
  - Between booking cards (native ads)
  - Bottom banner (728x90)
- **Expected**: ₹0.50 - ₹2 per 1000 impressions
- **Target**: 1M impressions/month = ₹500 - ₹2000/month

#### 3. Commission Model (Future)
- **Booking Commission**: 5% per transaction
- **Example**: ₹10,000 booking = ₹500 commission
- **Target**: 500 bookings/month = ₹2,50,000/month

#### 4. Featured Listings (Future)
- **Top placement**: ₹500/month per machine
- **Highlighted badge**: ₹200/month
- **Target**: 100 featured listings = ₹50,000/month

### Ad-Based Free Access Model

Users can earn free premium features through ad engagement:

```javascript
// Ad Credit System
1 Ad Impression = 0.1 credits
1 Ad Click = 5 credits
100 credits = 1 day of premium access
3000 credits = 1 month premium access

// Example:
User views 1000 ads/day = 100 credits/day
After 30 days = 3000 credits = 1 month free premium
```

**Implementation**:
- Track ad impressions via Google AdSense API
- Store credits in user profile
- Auto-upgrade when threshold reached
- Credits expire after 90 days

---

## Technical Implementation

### 1. Mode Switching System

#### Environment Configuration
```javascript
// src/config/environment.js
export const APP_MODE = import.meta.env.VITE_APP_MODE || 'demo'; // 'demo' or 'production'

export const config = {
  demo: {
    useFirebase: false,
    useMockData: true,
    persistData: false,
    enableAnalytics: false
  },
  production: {
    useFirebase: true,
    useMockData: false,
    persistData: true,
    enableAnalytics: true
  }
};

export const getConfig = () => config[APP_MODE];
```

#### Data Service Abstraction
```javascript
// src/services/dataService.js
import { getConfig } from '../config/environment';
import { DemoDataService } from './demoDataService';
import { ProductionDataService } from './productionDataService';

class DataService {
  constructor() {
    const config = getConfig();
    this.service = config.useMockData 
      ? new DemoDataService() 
      : new ProductionDataService();
  }

  async getDashboardStats(userId) {
    return this.service.getDashboardStats(userId);
  }

  async getBookings(userId, filters) {
    return this.service.getBookings(userId, filters);
  }

  async createBooking(bookingData) {
    return this.service.createBooking(bookingData);
  }

  // ... other methods
}

export default new DataService();
```

### 2. Real-Time Earnings Calculation

#### Cloud Function (Firebase)
```javascript
// functions/calculateEarnings.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

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
          // Update existing earnings
          transaction.update(earningsRef, {
            totalEarnings: admin.firestore.FieldValue.increment(newData.totalAmount),
            totalHours: admin.firestore.FieldValue.increment(newData.meterReadings.hours),
            totalBookings: admin.firestore.FieldValue.increment(1),
            completedBookings: admin.firestore.FieldValue.increment(1),
            bookingIds: admin.firestore.FieldValue.arrayUnion(newData.id),
            calculatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
        } else {
          // Create new earnings document
          transaction.set(earningsRef, {
            ownerId: ownerId,
            date: date,
            totalEarnings: newData.totalAmount,
            totalHours: newData.meterReadings.hours,
            totalBookings: 1,
            completedBookings: 1,
            pendingBills: 0,
            bookingIds: [newData.id],
            calculatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
        }
      });
    }
    
    return null;
  });
```

#### Real-Time Dashboard Hook
```javascript
// src/hooks/useDashboardStats.js
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import dataService from '../services/dataService';
import { getConfig } from '../config/environment';

export const useDashboardStats = (userId) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const config = getConfig();

  useEffect(() => {
    if (config.useMockData) {
      // Demo mode - use mock data
      dataService.getDashboardStats(userId)
        .then(data => {
          setStats(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    } else {
      // Production mode - real-time listener
      const today = new Date().toISOString().split('T')[0];
      const earningsRef = collection(db, `earnings/${userId}/daily`);
      const q = query(earningsRef, where('date', '==', today));

      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          if (!snapshot.empty) {
            const data = snapshot.docs[0].data();
            setStats({
              todaysEarnings: data.totalEarnings,
              totalHours: data.totalHours,
              activeMachines: data.totalBookings - data.completedBookings,
              pendingBills: data.pendingBills
            });
          } else {
            setStats({
              todaysEarnings: 0,
              totalHours: 0,
              activeMachines: 0,
              pendingBills: 0
            });
          }
          setLoading(false);
        },
        (err) => {
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    }
  }, [userId, config.useMockData]);

  return { stats, loading, error };
};
```

### 3. Subscription Management

#### Subscription Check Middleware
```javascript
// src/utils/subscriptionCheck.js
export const checkSubscriptionAccess = (user, feature) => {
  const { subscription, limits } = user;
  
  // Admin always has access
  if (user.role === 'admin') return { allowed: true };
  
  // Check subscription status
  if (subscription.plan === 'paid' && subscription.status === 'active') {
    return { allowed: true, reason: 'paid_subscription' };
  }
  
  // Check feature limits for free users
  const featureLimits = {
    maxMachines: limits.maxMachines || 2,
    maxAnalyticsDays: limits.maxAnalyticsDays || 7,
    advancedReports: false,
    apiAccess: false
  };
  
  if (feature in featureLimits) {
    return {
      allowed: featureLimits[feature],
      reason: 'free_plan_limit',
      upgradeRequired: true
    };
  }
  
  // Check ad credits for ad-supported users
  if (subscription.plan === 'ad_supported') {
    const creditsBalance = user.adStats.earnedCredits - user.adStats.creditsUsed;
    const requiredCredits = getFeatureCredits(feature);
    
    if (creditsBalance >= requiredCredits) {
      return { allowed: true, reason: 'ad_credits', cost: requiredCredits };
    } else {
      return {
        allowed: false,
        reason: 'insufficient_credits',
        required: requiredCredits,
        current: creditsBalance
      };
    }
  }
  
  return { allowed: false, reason: 'no_subscription' };
};

const getFeatureCredits = (feature) => {
  const creditCosts = {
    advancedReports: 50,
    extendedAnalytics: 30,
    prioritySupport: 100
  };
  return creditCosts[feature] || 0;
};
```

### 4. Ad Integration System

#### Ad Component with Tracking
```javascript
// src/components/ads/AdUnit.jsx
import React, { useEffect, useRef } from 'react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const AdUnit = ({ slot, format = 'auto', style = {} }) => {
  const adRef = useRef(null);
  const { user } = useAuth();
  const impressionTracked = useRef(false);

  useEffect(() => {
    // Load Google AdSense
    if (window.adsbygoogle && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        
        // Track impression for ad-supported users
        if (user?.subscription?.plan === 'ad_supported' && !impressionTracked.current) {
          trackAdImpression(user.id);
          impressionTracked.current = true;
        }
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [user]);

  const trackAdImpression = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        'adStats.totalImpressions': increment(1),
        'adStats.earnedCredits': increment(0.1)
      });
    } catch (error) {
      console.error('Failed to track ad impression:', error);
    }
  };

  // Don't show ads for paid users
  if (user?.subscription?.plan === 'paid') {
    return null;
  }

  return (
    <div className="ad-container" style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdUnit;
```

---

## Security & Best Practices

### 1. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function hasActivePaidSubscription() {
      let user = get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
      return user.subscription.plan == 'paid' && user.subscription.status == 'active';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow create: if isAuthenticated();
      allow update: if isOwner(userId);
    }
    
    // Machines collection
    match /machines/{machineId} {
      allow read: if true; // Public listings
      allow create: if isAuthenticated();
      allow update, delete: if isOwner(resource.data.ownerId);
      
      // Validate machine count for free users
      allow create: if isAuthenticated() && (
        hasActivePaidSubscription() ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.limits.maxMachines > 
        request.auth.token.machineCount
      );
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      allow create: if true; // Anyone can create booking
      allow read: if isAuthenticated() && (
        isOwner(resource.data.ownerId) || 
        isOwner(resource.data.customerId)
      );
      allow update: if isAuthenticated() && isOwner(resource.data.ownerId);
      
      // Prevent price manipulation
      allow update: if request.resource.data.totalAmount == resource.data.totalAmount;
    }
    
    // Earnings collection
    match /earnings/{ownerId}/daily/{date} {
      allow read: if isOwner(ownerId);
      allow write: if false; // Only Cloud Functions can write
    }
  }
}
```

### 2. Data Validation

```javascript
// src/utils/validation.js
export const validateBooking = (bookingData) => {
  const errors = {};
  
  if (!bookingData.machineId) {
    errors.machineId = 'Machine selection is required';
  }
  
  if (!bookingData.startTime) {
    errors.startTime = 'Start time is required';
  }
  
  if (!bookingData.endTime) {
    errors.endTime = 'End time is required';
  }
  
  if (new Date(bookingData.endTime) <= new Date(bookingData.startTime)) {
    errors.endTime = 'End time must be after start time';
  }
  
  if (!bookingData.location || !bookingData.location.address) {
    errors.location = 'Location is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateMeterReading = (reading) => {
  const errors = {};
  
  if (!reading.start || reading.start < 0) {
    errors.start = 'Valid start reading is required';
  }
  
  if (!reading.end || reading.end < 0) {
    errors.end = 'Valid end reading is required';
  }
  
  if (reading.end <= reading.start) {
    errors.end = 'End reading must be greater than start reading';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
```

### 3. Performance Optimization

#### Caching Strategy
```javascript
// src/hooks/useCache.js
import { useQuery } from '@tanstack/react-query';

export const useCachedDashboardStats = (userId) => {
  return useQuery({
    queryKey: ['dashboardStats', userId],
    queryFn: () => dataService.getDashboardStats(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchInterval: 60 * 1000 // Refresh every minute
  });
};
```

#### Database Indexing
```javascript
// Firestore indexes (firestore.indexes.json)
{
  "indexes": [
    {
      "collectionGroup": "bookings",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "ownerId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "bookings",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "ownerId", "order": "ASCENDING" },
        { "fieldPath": "paidAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "machines",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "rating", "order": "DESCENDING" }
      ]
    }
  ]
}
```

---

## Implementation Checklist

### Phase 1: Foundation (Week 1-2)
- [ ] Set up environment configuration (demo/production)
- [ ] Create data service abstraction layer
- [ ] Implement demo data service with mock data
- [ ] Build production data service with Firebase
- [ ] Create database schema in Firestore
- [ ] Set up security rules

### Phase 2: Core Features (Week 3-4)
- [ ] Implement real-time dashboard hooks
- [ ] Create earnings calculation Cloud Function
- [ ] Build subscription management system
- [ ] Implement access control middleware
- [ ] Add data validation utilities
- [ ] Create caching layer

### Phase 3: Monetization (Week 5-6)
- [ ] Integrate Google AdSense
- [ ] Build ad tracking system
- [ ] Implement credit earning mechanism
- [ ] Create subscription upgrade flow
- [ ] Add payment gateway (Razorpay/Stripe)
- [ ] Build admin dashboard for monitoring

### Phase 4: Testing & Optimization (Week 7-8)
- [ ] Test demo mode thoroughly
- [ ] Test production mode with real data
- [ ] Performance optimization
- [ ] Security audit
- [ ] Load testing
- [ ] User acceptance testing

### Phase 5: Deployment (Week 9-10)
- [ ] Set up Firebase hosting
- [ ] Configure custom domain
- [ ] Set up monitoring (Firebase Analytics)
- [ ] Configure error tracking (Sentry)
- [ ] Create deployment pipeline
- [ ] Launch beta version

---

## Cost Estimation

### Monthly Operating Costs (1000 users)

| Service | Usage | Cost (₹) |
|---------|-------|----------|
| Firebase Firestore | 50M reads, 10M writes | ₹3,000 |
| Firebase Cloud Functions | 2M invocations | ₹1,000 |
| Firebase Hosting | 10GB bandwidth | Free |
| Firebase Authentication | 10K MAU | Free |
| Google AdSense | Revenue | -₹2,000 |
| **Total** | | **₹2,000/month** |

### Revenue Projection (1000 users)

| Source | Users | Revenue (₹) |
|--------|-------|-------------|
| Paid Subscriptions (10%) | 100 | ₹25,000 |
| Ad Revenue (50%) | 500 | ₹2,000 |
| Commission (5% avg) | 500 bookings | ₹25,000 |
| **Total** | | **₹52,000/month** |

**Net Profit**: ₹50,000/month (96% margin)

---

## Conclusion

This marketplace dashboard system provides:
✅ Flexible demo/production mode switching
✅ Real-time earnings calculation
✅ Scalable monetization strategy
✅ Secure data handling
✅ Performance optimization
✅ Clear upgrade path from free to paid

The architecture is designed to scale from 100 to 100,000 users with minimal code changes.
