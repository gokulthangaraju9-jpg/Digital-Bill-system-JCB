# 🎉 JCB Platform - Complete Booking & Payment System

## Overview
A complete booking and payment system with Razorpay integration for the JCB Platform. This system allows users to book machines online, make secure payments, and automatically handles commission distribution to owners.

---

## 🚀 Features Implemented

### 1. **Database Models**
- ✅ **Owner Model** - Stores owner information with bank details
- ✅ **Booking Model** - Manages bookings with payment status and Razorpay fields
- ✅ **OwnerEarnings Model** - Tracks earnings and payout status for each owner
- ✅ **Machine Model** (Updated) - Links machines to owners

### 2. **Backend APIs**
- ✅ **Payment Routes** (`/api/payments`)
  - Create Razorpay order
  - Verify payment signature
  - Webhook handler for payment events
  
- ✅ **Booking Routes** (`/api/bookings`)
  - Create new booking (online/COD)
  - Get user/owner bookings
  - Update booking status
  
- ✅ **Earnings Routes** (`/api/earnings`)
  - Get owner earnings
  - Get pending payouts (Admin)
  - Process manual payout
  - Bulk payout for owner
  
- ✅ **Owner Routes** (`/api/owners`)
  - Create/update owner profile
  - Update bank details
  - Get all owners

### 3. **Frontend Components**
- ✅ **BookingModalNew** - Complete booking flow with Razorpay integration
- ✅ **OwnerEarningsPanel** - Owner dashboard to view earnings
- ✅ **AdminPayoutManagement** - Admin interface to manage payouts
- ✅ **Updated BookMachine** - Fetch machines from MongoDB

### 4. **Payment Flow**
```
User selects machine
   ↓
Fills booking details
   ↓
Selects payment method (Online/COD)
   ↓
[If Online]
   ↓
Razorpay checkout opens
   ↓
Payment processed
   ↓
Payment verified
   ↓
Booking confirmed
   ↓
Owner earnings created (5% commission deducted)
   ↓
Owner notified
   ↓
[Admin processes payout later]
```

---

## 📋 Setup Instructions

### Step 1: Install Dependencies

#### Frontend
```bash
cd jcb-platform
npm install
```

This will install axios and all other dependencies.

#### Backend
```bash
cd jcb-platform/server
npm install
```

Razorpay is already in package.json.

### Step 2: Configure Environment Variables

#### Backend (.env in server folder)
```env
MONGODB_URI=mongodb://localhost:27017/jcb-platform
PORT=5000

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

#### Frontend (.env in root jcb-platform folder)
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
```

### Step 3: Get Razorpay Credentials

1. **Sign up at Razorpay**
   - Go to https://razorpay.com/
   - Create an account
   - Complete KYC (for live mode)

2. **Get API Keys**
   - Dashboard → Settings → API Keys
   - Generate Test/Live Keys
   - Copy `Key ID` and `Key Secret`

3. **Setup Webhook (Optional but recommended)**
   - Dashboard → Webhooks
   - Add URL: `https://yourdomain.com/api/payments/webhook`
   - Select events: `payment.captured`, `payment.failed`, `order.paid`
   - Get webhook secret

### Step 4: Update Machine Model

Make sure existing machines in your database have the `ownerId` field. You can run this migration:

```javascript
// Run this in MongoDB shell or create a migration script
db.machines.updateMany(
  { ownerId: { $exists: false } },
  { $set: { ownerId: "default_owner_uid" } }
);
```

### Step 5: Start Services

#### Start MongoDB
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string
```

#### Start Backend Server
```bash
cd jcb-platform/server
npm run dev
```

Backend will run on http://localhost:5000

#### Start Frontend
```bash
cd jcb-platform
npm run dev
```

Frontend will run on http://localhost:5173

---

## 🎯 How to Use

### For Users (Booking a Machine)

1. **Browse Machines**
   - Go to "Book Machine" page
   - Browse available machines
   - Click "Book Now"

2. **Fill Booking Details**
   - Enter delivery location
   - Select start date
   - Choose duration (hours)
   - Add notes if any

3. **Select Payment Method**
   - **Online Payment**: Pay now via Razorpay (cards, UPI, netbanking)
   - **Cash on Delivery**: Pay at the site

4. **Complete Booking**
   - For online: Razorpay checkout will open
   - Complete payment
   - Get booking confirmation

### For Machine Owners (View Earnings)

Add `<OwnerEarningsPanel />` to your Dashboard component:

```jsx
import OwnerEarningsPanel from '../components/dashboard/OwnerEarningsPanel';

// In your Dashboard
<OwnerEarningsPanel />
```

Features:
- View total, pending, and paid earnings
- See all bookings with commission breakdown
- Filter by status (pending/paid)
- Download statements

### For Admins (Process Payouts)

Create an admin route and add:

```jsx
import AdminPayoutManagement from './pages/admin/AdminPayoutManagement';

// In your router
<Route path="/admin/payouts" element={<AdminPayoutManagement />} />
```

Features:
- View all pending payouts grouped by owner
- See owner bank details
- Process payouts with transaction reference
- Bulk payout to owners

---

## 💰 Commission System

**How it works:**

1. **User pays**: ₹10,000 (for 8 hours @ ₹1,200/hr + 2% platform fee)
2. **Platform keeps**: ₹500 (5% commission)
3. **Owner receives**: ₹9,500

**Commission is configurable** per owner in the Owner model:
```javascript
commissionPercent: { 
  type: Number, 
  default: 5,  // Can be changed per owner
  min: 0,
  max: 100
}
```

---

## 📊 Database Schema Reference

### Booking
```javascript
{
  userId: "firebase_uid",
  userName: "John Doe",
  machineId: ObjectId("..."),
  machineName: "JCB 3DX",
  ownerId: "owner_firebase_uid",
  hours: 8,
  totalAmount: 9600,
  commissionAmount: 480,
  ownerAmount: 9120,
  paymentMethod: "online", // or "cod"
  paymentStatus: "paid",
  razorpayOrderId: "order_...",
  razorpayPaymentId: "pay_...",
  bookingStatus: "confirmed"
}
```

### OwnerEarnings
```javascript
{
  ownerId: "owner_firebase_uid",
  bookingId: ObjectId("..."),
  amount: 9120,
  commissionAmount: 480,
  status: "pending", // pending, paid
  payoutMethod: "bank", // bank, upi, manual
  payoutReference: "TXN123456",
  paidAt: Date
}
```

### Owner
```javascript
{
  userId: "firebase_uid",
  name: "Ravi Kumar",
  phone: "9876543210",
  email: "ravi@gmail.com",
  bank: {
    accountNumber: "1234567890",
    ifsc: "HDFC0001234",
    holderName: "Ravi Kumar",
    upiId: "ravi@paytm"
  },
  commissionPercent: 5,
  pendingEarnings: 15000,
  paidEarnings: 50000
}
```

---

## 🔐 Security Features

1. **Payment Signature Verification**
   - All Razorpay payments are verified using HMAC SHA256
   - Prevents payment tampering

2. **Webhook Security**
   - Webhook signatures validated
   - Prevents fake payment notifications

3. **User Authentication**
   - Firebase authentication required
   - User must be logged in to book

4. **Admin Authorization**
   - Add admin role checks to payout routes
   - Recommended: Use Firebase custom claims

---

## 🧪 Testing

### Test Razorpay Integration

1. **Use Test Mode**
   - Use test API keys from Razorpay
   - No real money transactions

2. **Test Cards**
   ```
   Card Number: 4111 1111 1111 1111
   CVV: Any 3 digits
   Expiry: Any future date
   ```

3. **Test UPI**
   - Use `success@razorpay` for successful payment
   - Use `failure@razorpay` for failed payment

### Test COD Flow

1. Select "Cash on Delivery"
2. Booking should be confirmed immediately
3. Check earnings in owner dashboard
4. Status should be "pending"

---

## 🚨 Important Notes

### Before Going Live

1. **Switch to Live Keys**
   - Get live API keys from Razorpay
   - Complete KYC and business verification

2. **Setup Webhooks**
   - Configure webhook URL in Razorpay dashboard
   - Test webhook delivery

3. **Add Owner Bank Details**
   - Ensure all owners have bank details filled
   - Verify account details before payouts

4. **Configure HTTPS**
   - Use SSL certificate for production
   - Razorpay requires HTTPS for webhooks

5. **Add Error Logging**
   - Implement proper error logging
   - Monitor payment failures

### Recommended Additions

1. **SMS Notifications**
   - Integrate Twilio/MSG91 for SMS
   - Notify owners on new bookings
   - Notify users on confirmation

2. **Email Notifications**
   - Send booking confirmations
   - Send payout receipts to owners

3. **Auto Payout**
   - Implement Razorpay Payout API
   - Automatic transfers to owner accounts
   - Requires additional verification

4. **Booking Management**
   - Add booking cancellation
   - Add booking rescheduling
   - Add rating system

---

## 📱 API Endpoints Summary

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify-payment` - Verify payment
- `POST /api/payments/webhook` - Handle webhooks
- `GET /api/payments/payment/:paymentId` - Get payment details

### Bookings
- `POST /api/bookings/create` - Create booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `GET /api/bookings/owner/:ownerId` - Get owner bookings
- `GET /api/bookings/:bookingId` - Get booking by ID
- `PATCH /api/bookings/:bookingId/status` - Update status

### Earnings
- `GET /api/earnings/owner/:ownerId` - Get owner earnings
- `GET /api/earnings/pending` - Get pending payouts (Admin)
- `POST /api/earnings/payout/:earningId` - Process single payout
- `POST /api/earnings/payout/owner/:ownerId` - Bulk payout
- `GET /api/earnings/summary/all` - Get earnings summary

### Owners
- `POST /api/owners/profile` - Create/update profile
- `GET /api/owners/profile/:userId` - Get profile
- `GET /api/owners/all` - Get all owners (Admin)
- `PATCH /api/owners/bank/:userId` - Update bank details

---

## 🎉 What's Next?

The complete booking and payment system is now ready! Here's what you can add next:

1. **Integrate components into your dashboard**
2. **Test the complete flow end-to-end**
3. **Add SMS/Email notifications**
4. **Setup Razorpay account and get credentials**
5. **Deploy to production with HTTPS**

---

## 💡 Support

If you need help:
1. Check Razorpay documentation: https://razorpay.com/docs/
2. Check error logs in browser console and server terminal
3. Verify environment variables are set correctly
4. Ensure MongoDB is running and connected

---

**Built with ❤️ for JCB Platform**
