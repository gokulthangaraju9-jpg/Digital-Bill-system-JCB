# 🎯 Quick Setup & Testing Guide

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
# Frontend
cd jcb-platform
npm install

# Backend
cd server
npm install
```

### 2. Setup Environment
Create `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/jcb-platform
PORT=5000
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
RAZORPAY_KEY_SECRET=YOUR_SECRET
```

Create `jcb-platform/.env` (or update existing):
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
```

### 3. Start Services
```bash
# Terminal 1 - Backend
cd jcb-platform/server
npm run dev

# Terminal 2 - Frontend
cd jcb-platform
npm run dev
```

---

## 🧪 Test the System

### Test 1: Book a Machine (COD)
1. Go to "Book Machine" page
2. Click "Book Now" on any machine
3. Fill booking details
4. Select "Cash on Delivery"
5. Click "Continue to Payment"
6. ✅ Should show success immediately

### Test 2: Book a Machine (Online Payment)
1. Book a machine
2. Select "Online Payment"
3. Razorpay checkout will open
4. Use test card: `4111 1111 1111 1111`
5. Complete payment
6. ✅ Should show success after payment

### Test 3: View Owner Earnings
1. Add to your Dashboard:
```jsx
import OwnerEarningsPanel from '../components/dashboard/OwnerEarningsPanel';

// In Dashboard
<OwnerEarningsPanel />
```
2. View pending and paid earnings
3. ✅ Should show bookings with amounts

### Test 4: Admin Payout
1. Create admin route:
```jsx
import AdminPayoutManagement from './pages/admin/AdminPayoutManagement';

<Route path="/admin/payouts" element={<AdminPayoutManagement />} />
```
2. Navigate to `/admin/payouts`
3. Click "Pay Now" on any pending payout
4. Enter transaction reference
5. Click "Confirm Payout"
6. ✅ Should move to paid status

---

## 📁 Files Created

### Backend Models
- ✅ `server/models/Owner.js`
- ✅ `server/models/Booking.js`
- ✅ `server/models/OwnerEarnings.js`

### Backend Routes
- ✅ `server/routes/payments.js`
- ✅ `server/routes/bookings.js`
- ✅ `server/routes/earnings.js`
- ✅ `server/routes/owners.js`

### Frontend Components
- ✅ `src/components/booking/BookingModalNew.jsx`
- ✅ `src/components/dashboard/OwnerEarningsPanel.jsx`
- ✅ `src/pages/admin/AdminPayoutManagement.jsx`

### Updated Files
- ✅ `server/index.js` - Added routes
- ✅ `src/pages/BookMachine.jsx` - MongoDB integration
- ✅ `package.json` - Added axios

---

## 💰 Commission Breakdown Example

**Scenario:** User books JCB 3DX for 8 hours @ ₹1,200/hr

```
Hourly Rate:        ₹1,200
Hours:              8
─────────────────────────
Subtotal:           ₹9,600
Platform Fee (2%):  ₹192
─────────────────────────
User Pays:          ₹9,792

Platform Commission (5%): ₹480
Owner Receives:           ₹9,312
```

---

## 🔧 Common Issues & Solutions

### Issue 1: Axios not found
```bash
cd jcb-platform
npm install axios
```

### Issue 2: MongoDB connection failed
```bash
# Check if MongoDB is running
mongod

# Or use MongoDB Atlas connection string
```

### Issue 3: Razorpay not loading
- Check if Razorpay script is loaded (it loads automatically)
- Verify RAZORPAY_KEY_ID in both .env files
- Open browser console for errors

### Issue 4: Payment verification failed
- Check RAZORPAY_KEY_SECRET in server/.env
- Ensure signature verification logic is correct
- Check server logs for errors

### Issue 5: Machine not showing ownerId
Update existing machines:
```javascript
// In MongoDB shell
db.machines.updateMany(
  {},
  { $set: { ownerId: "your_firebase_uid" } }
);
```

---

## 📊 Complete Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    USER BOOKING FLOW                          │
└──────────────────────────────────────────────────────────────┘

1. User Browse Machines
         ↓
2. Click "Book Now"
         ↓
3. Fill Booking Details
   - Location
   - Date
   - Hours
   - Notes
         ↓
4. Select Payment Method
         ↓
   ┌─────┴─────┐
   │           │
Online        COD
   │           │
   ↓           ↓
Razorpay    Confirmed
Checkout    Immediately
   │
   ↓
5. Pay
   ↓
6. Verify Payment
   ↓
7. Create Booking
   ↓
8. Calculate Commission
   ↓
9. Create Owner Earnings
   ↓
10. Update Machine Status (booked)
   ↓
11. Show Success ✅


┌──────────────────────────────────────────────────────────────┐
│                    OWNER PAYOUT FLOW                          │
└──────────────────────────────────────────────────────────────┘

1. Booking Confirmed
         ↓
2. Owner Earnings Created (status: pending)
         ↓
3. Owner Views Dashboard
   - Sees pending earnings
         ↓
4. Admin Opens Payout Management
   - Sees all pending payouts
         ↓
5. Admin Clicks "Pay Now"
   - Enters transaction reference
   - Confirms payout
         ↓
6. Update Earnings (status: paid)
         ↓
7. Update Owner Balance
   - pendingEarnings decreased
   - paidEarnings increased
         ↓
8. Owner Sees Payment ✅


┌──────────────────────────────────────────────────────────────┐
│                    DATABASE STRUCTURE                         │
└──────────────────────────────────────────────────────────────┘

machines
   ├─ _id
   ├─ machineName
   ├─ hourlyRate
   ├─ ownerId (Firebase UID) ← Links to Owner
   └─ status (available/booked)

owners
   ├─ userId (Firebase UID)
   ├─ name, email, phone
   ├─ bank { accountNumber, ifsc, upiId }
   ├─ commissionPercent (default: 5)
   ├─ pendingEarnings
   └─ paidEarnings

bookings
   ├─ _id
   ├─ userId (customer)
   ├─ machineId (ref: machines)
   ├─ ownerId (ref: owners)
   ├─ totalAmount
   ├─ commissionAmount
   ├─ ownerAmount
   ├─ paymentMethod (online/cod)
   ├─ paymentStatus (pending/paid)
   ├─ razorpayOrderId
   ├─ razorpayPaymentId
   └─ bookingStatus (confirmed/completed)

ownerEarnings
   ├─ _id
   ├─ ownerId (ref: owners)
   ├─ bookingId (ref: bookings)
   ├─ amount (owner receives)
   ├─ commissionAmount
   ├─ status (pending/paid)
   ├─ payoutMethod (bank/upi)
   ├─ payoutReference
   └─ paidAt
```

---

## 🎯 Next Steps

1. **Get Razorpay Account**
   - Sign up: https://razorpay.com
   - Get test API keys
   - Test payments

2. **Add to Your Dashboard**
   ```jsx
   // In src/pages/Dashboard.jsx
   import OwnerEarningsPanel from '../components/dashboard/OwnerEarningsPanel';
   
   // Add a tab or section
   <OwnerEarningsPanel />
   ```

3. **Create Admin Route**
   ```jsx
   // In your router
   <Route path="/admin/payouts" element={<AdminPayoutManagement />} />
   ```

4. **Test Complete Flow**
   - Book → Pay → Confirm → Check Earnings → Process Payout

5. **Add Notifications** (Optional)
   - SMS to owner on new booking
   - Email confirmation to user
   - SMS to owner on payout

---

## 📞 API Testing with Postman/Thunder Client

### Create Booking
```http
POST http://localhost:5000/api/bookings/create
Content-Type: application/json

{
  "userId": "firebase_uid_here",
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "userPhone": "9876543210",
  "machineId": "machine_object_id_here",
  "startDate": "2026-01-15",
  "hours": 8,
  "deliveryLocation": "Mumbai Construction Site",
  "paymentMethod": "online",
  "notes": "Need by 9 AM"
}
```

### Get Owner Earnings
```http
GET http://localhost:5000/api/earnings/owner/firebase_uid_here
```

### Process Payout
```http
POST http://localhost:5000/api/earnings/payout/owner/firebase_uid_here
Content-Type: application/json

{
  "payoutMethod": "bank",
  "payoutReference": "TXN123456789",
  "payoutNotes": "Paid via NEFT",
  "processedBy": "admin_uid"
}
```

---

## ✅ Checklist

- [ ] MongoDB running
- [ ] Backend server running (port 5000)
- [ ] Frontend running (port 5173)
- [ ] Razorpay keys configured
- [ ] axios installed
- [ ] Test booking created
- [ ] Payment tested
- [ ] Owner earnings visible
- [ ] Admin payout tested

---

**You're all set! 🎉**

The complete booking and payment system is ready to use. Test it thoroughly before going live!
