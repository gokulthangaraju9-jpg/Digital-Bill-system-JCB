# 📊 System Flow Diagrams

## 1. Complete User Booking Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER JOURNEY - BOOKING                        │
└─────────────────────────────────────────────────────────────────┘

Start: User Login
   │
   ├─→ Browse Machines (Book Machine Page)
   │   ├─ View all available machines
   │   ├─ Filter by location/type
   │   └─ Search by name
   │
   ├─→ Select Machine & Click "Book Now"
   │   │
   │   └─→ BookingModalNew Opens
   │       │
   │       ├─ Step 1: Fill Details
   │       │   ├─ Delivery location *
   │       │   ├─ Start date *
   │       │   ├─ Duration (hours) *
   │       │   ├─ Notes (optional)
   │       │   └─ View price breakdown
   │       │
   │       ├─ Select Payment Method
   │       │   ├─ Online Payment (Razorpay)
   │       │   └─ Cash on Delivery
   │       │
   │       └─→ Click "Continue to Payment"
   │
   ├─→ POST /api/bookings/create
   │   │
   │   ├─ Create booking record
   │   ├─ Calculate commission
   │   ├─ Calculate owner amount
   │   │
   │   └─→ If COD:
   │       ├─ Set status: "confirmed"
   │       ├─ Create owner earnings
   │       ├─ Update machine status
   │       └─→ Show Success ✅
   │
   └─→ If Online Payment:
       │
       ├─ Step 2: Payment Screen
       │   │
       │   ├─→ POST /api/payments/create-order
       │   │   └─ Create Razorpay Order
       │   │
       │   ├─→ Open Razorpay Checkout
       │   │   ├─ User enters card details
       │   │   ├─ Or selects UPI/Netbanking
       │   │   └─ Completes payment
       │   │
       │   └─→ Payment Success Callback
       │       │
       │       └─→ POST /api/payments/verify-payment
       │           ├─ Verify signature
       │           ├─ Update booking status: "paid"
       │           ├─ Create owner earnings
       │           ├─ Update machine status: "booked"
       │           └─→ Return updated booking
       │
       └─ Step 3: Success Screen ✅
           ├─ Show booking confirmation
           ├─ Display booking ID
           ├─ Show amount paid
           └─ Close modal

End: Booking Complete
```

---

## 2. Owner Earnings & Payout Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              OWNER EARNINGS & PAYOUT SYSTEM                      │
└─────────────────────────────────────────────────────────────────┘

Booking Confirmed
   │
   ├─→ System Auto-Creates OwnerEarnings Record
   │   ├─ ownerId: "firebase_uid"
   │   ├─ bookingId: ObjectId
   │   ├─ totalBookingAmount: ₹9,792
   │   ├─ commissionAmount: ₹480 (5%)
   │   ├─ amount: ₹9,312 (owner receives)
   │   └─ status: "pending"
   │
   ├─→ Update Owner Balance
   │   └─ pendingEarnings += ₹9,312
   │
   │
   ┌─────────────────────────────────────────┐
   │         OWNER VIEW                      │
   └─────────────────────────────────────────┘
   │
   ├─→ Owner Opens Dashboard
   │   └─→ Clicks "Earnings" Tab
   │       │
   │       └─→ OwnerEarningsPanel Component
   │           │
   │           ├─→ GET /api/earnings/owner/:ownerId
   │           │   └─ Fetch all earnings records
   │           │
   │           ├─ Display Summary
   │           │   ├─ Total Earnings: ₹50,000
   │           │   ├─ Pending: ₹9,312 (1 booking)
   │           │   └─ Paid: ₹40,688
   │           │
   │           └─ Show Earnings Table
   │               ├─ Booking ID
   │               ├─ Machine Name
   │               ├─ Date
   │               ├─ Amount: ₹9,312
   │               ├─ Commission: ₹480
   │               └─ Status: "pending" 🟡
   │
   │
   ┌─────────────────────────────────────────┐
   │         ADMIN PAYOUT PROCESS            │
   └─────────────────────────────────────────┘
   │
   ├─→ Admin Opens Payout Management
   │   └─→ AdminPayoutManagement Component
   │       │
   │       ├─→ GET /api/earnings/pending
   │       │   └─ Fetch all pending payouts
   │       │       └─ Grouped by owner
   │       │
   │       └─ Display Pending Payouts
   │           ├─ Owner Name: Ravi Kumar
   │           ├─ Total Pending: ₹9,312
   │           ├─ Bank Details: ••••7890
   │           └─ [Pay Now] Button
   │
   ├─→ Admin Clicks "Pay Now"
   │   │
   │   └─→ Payout Modal Opens
   │       ├─ Select Payment Method
   │       │   ├─ Bank Transfer
   │       │   ├─ UPI
   │       │   └─ Manual
   │       │
   │       ├─ Enter Transaction ID *
   │       │   └─ "TXN123456789"
   │       │
   │       ├─ Add Notes (optional)
   │       │   └─ "Paid via NEFT"
   │       │
   │       └─ Click "Confirm Payout"
   │
   ├─→ POST /api/earnings/payout/owner/:ownerId
   │   │
   │   ├─ Update all pending earnings to "paid"
   │   ├─ Set paidAt: current date
   │   ├─ Set payoutReference: "TXN123456789"
   │   │
   │   └─→ Update Owner Balance
   │       ├─ pendingEarnings -= ₹9,312
   │       └─ paidEarnings += ₹9,312
   │
   └─→ Show Success Message ✅
       └─ "Successfully processed payout of ₹9,312"

Owner Dashboard Updates
   └─→ Earnings now show status: "paid" 🟢
```

---

## 3. Payment Processing Detail

```
┌─────────────────────────────────────────────────────────────────┐
│                RAZORPAY PAYMENT PROCESSING                       │
└─────────────────────────────────────────────────────────────────┘

Frontend: BookingModalNew
   │
   ├─ User clicks "Continue to Payment"
   │   └─ Booking created with status: "pending"
   │
   ├─→ handlePayment() function
   │   │
   │   └─→ POST /api/payments/create-order
   │       ├─ Request: { amount: 9792, bookingId: "..." }
   │       │
   │       └─→ Backend: Razorpay.orders.create()
   │           ├─ amount: 979200 (in paise)
   │           ├─ currency: "INR"
   │           └─ receipt: "receipt_1234"
   │
   ├─ Receive Order Response
   │   ├─ orderId: "order_xyz123"
   │   ├─ amount: 979200
   │   └─ key: "rzp_test_..."
   │
   ├─→ Open Razorpay Checkout
   │   │
   │   └─→ new window.Razorpay(options)
   │       ├─ key: from response
   │       ├─ amount: from response
   │       ├─ order_id: from response
   │       ├─ prefill: user details
   │       └─ handler: success callback
   │
   ├─ User Completes Payment
   │   └─ Razorpay returns:
   │       ├─ razorpay_order_id
   │       ├─ razorpay_payment_id
   │       └─ razorpay_signature
   │
   ├─→ handler() Success Callback
   │   │
   │   └─→ POST /api/payments/verify-payment
   │       ├─ Request: {
   │       │   razorpay_order_id: "...",
   │       │   razorpay_payment_id: "...",
   │       │   razorpay_signature: "...",
   │       │   bookingId: "..."
   │       │ }
   │       │
   │       └─→ Backend Verification
   │           │
   │           ├─ Create Signature
   │           │   └─ HMAC SHA256(order_id|payment_id, secret)
   │           │
   │           ├─ Compare Signatures
   │           │   └─ If match: Valid payment ✅
   │           │
   │           ├─ Update Booking
   │           │   ├─ paymentStatus: "paid"
   │           │   ├─ bookingStatus: "confirmed"
   │           │   ├─ razorpayOrderId: "..."
   │           │   ├─ razorpayPaymentId: "..."
   │           │   └─ confirmedAt: Date
   │           │
   │           ├─ Create OwnerEarnings
   │           │   ├─ Calculate commission
   │           │   └─ Set status: "pending"
   │           │
   │           ├─ Update Owner
   │           │   └─ pendingEarnings += amount
   │           │
   │           └─ Update Machine
   │               ├─ status: "booked"
   │               └─ currentBookingId: "..."
   │
   └─→ Show Success Screen ✅

Payment Complete
```

---

## 4. Database Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                   DATABASE SCHEMA RELATIONS                      │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   users      │ (Firebase Auth)
│ (Firebase)   │
└──────┬───────┘
       │
       │ userId (Firebase UID)
       │
       ├─────────────────────────────┐
       │                             │
       ▼                             ▼
┌──────────────┐              ┌──────────────┐
│   machines   │              │    owners    │
│ (MongoDB)    │◄─────────────│  (MongoDB)   │
└──────┬───────┘   ownerId    └──────┬───────┘
       │                              │
       │ machineId                    │ ownerId
       │                              │
       ▼                              │
┌──────────────┐                     │
│   bookings   │─────────────────────┘
│ (MongoDB)    │     ownerId
└──────┬───────┘
       │
       │ bookingId
       │
       ▼
┌─────────────────┐
│ ownerEarnings   │
│   (MongoDB)     │
└─────────────────┘


FIELD MAPPINGS:

Machine
├─ userId → Owner.userId (Firebase UID)
├─ ownerName → Owner.name
└─ hourlyRate → Used in booking calculation

Booking
├─ userId → Firebase user (customer)
├─ machineId → Machine._id
├─ ownerId → Owner.userId
├─ totalAmount → Calculated (rate × hours + platform fee)
├─ commissionAmount → totalAmount × owner.commissionPercent
└─ ownerAmount → totalAmount - commissionAmount

OwnerEarnings
├─ ownerId → Owner.userId
├─ bookingId → Booking._id
├─ machineId → Machine._id
├─ amount → ownerAmount from booking
└─ status → "pending" or "paid"

Owner
├─ userId → Firebase UID
├─ pendingEarnings → Sum of pending earnings
├─ paidEarnings → Sum of paid earnings
└─ bank → Bank details for payout
```

---

## 5. Commission Flow

```
┌─────────────────────────────────────────────────────────────────┐
│               COMMISSION CALCULATION FLOW                        │
└─────────────────────────────────────────────────────────────────┘

User Books Machine
   │
   ├─ Machine Rate: ₹1,200/hr
   ├─ Duration: 8 hours
   └─ Location: Mumbai
   │
   ▼
STEP 1: Calculate Subtotal
   ├─ Subtotal = Rate × Hours
   └─ = ₹1,200 × 8 = ₹9,600
   │
   ▼
STEP 2: Add Platform Fee (User pays)
   ├─ Platform Fee = Subtotal × 2%
   ├─ = ₹9,600 × 0.02 = ₹192
   └─ Total User Pays = ₹9,600 + ₹192 = ₹9,792
   │
   ▼
STEP 3: Calculate Commission (Platform keeps)
   ├─ Commission = Subtotal × 5%
   ├─ = ₹9,600 × 0.05 = ₹480
   └─ Platform Keeps = ₹192 + ₹480 = ₹672
   │
   ▼
STEP 4: Calculate Owner Amount
   ├─ Owner Amount = Subtotal - Commission
   ├─ = ₹9,600 - ₹480 = ₹9,120
   └─ Owner Receives = ₹9,120
   │
   ▼
SUMMARY:
┌─────────────────────────────────┐
│ User Pays:        ₹9,792        │
│ Platform Keeps:   ₹672  (6.9%)  │
│ Owner Receives:   ₹9,120 (93.1%)│
└─────────────────────────────────┘

SAVED IN DATABASE:
booking: {
  totalAmount: 9792,
  commissionAmount: 480,
  ownerAmount: 9120,
  commissionPercent: 5
}

ownerEarnings: {
  totalBookingAmount: 9792,
  commissionAmount: 480,
  amount: 9120,  // What owner gets
  status: "pending"
}
```

---

## 6. Status Transitions

```
┌─────────────────────────────────────────────────────────────────┐
│                    BOOKING STATUS FLOW                           │
└─────────────────────────────────────────────────────────────────┘

Booking Creation
   │
   ├─ If COD:
   │   └─ bookingStatus: "confirmed" ✅
   │      paymentStatus: "pending" 🟡
   │
   └─ If Online:
       └─ bookingStatus: "pending" 🟡
          paymentStatus: "pending" 🟡
          │
          ├─ Payment Success:
          │   └─ bookingStatus: "confirmed" ✅
          │      paymentStatus: "paid" ✅
          │
          └─ Payment Failed:
              └─ bookingStatus: "cancelled" ❌
                 paymentStatus: "failed" ❌

Booking Lifecycle:
pending → confirmed → ongoing → completed
   └─────────────────┘
           or
        cancelled


┌─────────────────────────────────────────────────────────────────┐
│                  EARNINGS STATUS FLOW                            │
└─────────────────────────────────────────────────────────────────┘

Booking Confirmed
   │
   └─→ Create OwnerEarnings
       └─ status: "pending" 🟡
          │
          ├─ Admin Processing:
          │   └─ status: "processing" 🔵
          │      │
          │      ├─ Payout Success:
          │      │   └─ status: "paid" ✅
          │      │      paidAt: Date
          │      │
          │      └─ Payout Failed:
          │          └─ status: "failed" ❌
          │             (back to pending)
          │
          └─ Or stays pending until admin action


┌─────────────────────────────────────────────────────────────────┐
│                   MACHINE STATUS FLOW                            │
└─────────────────────────────────────────────────────────────────┘

Initial State
   │
   └─ status: "available" 🟢
      │
      ├─ Booking Confirmed:
      │   └─ status: "booked" 🔴
      │      currentBookingId: "..."
      │      │
      │      └─ Booking Completed:
      │          └─ status: "available" 🟢
      │             currentBookingId: null
      │
      └─ Or Manual Update:
          ├─ status: "maintenance" 🟠
          └─ status: "unavailable" ⚫
```

---

## 7. API Request Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPLETE API FLOW                             │
└─────────────────────────────────────────────────────────────────┘

Frontend                    Backend                     Database
   │                           │                            │
   │  1. GET /api/machines     │                            │
   ├─────────────────────────→ │                            │
   │                           ├─ Find available machines   │
   │                           ├───────────────────────────→│
   │                           │←───────────────────────────│
   │←───── machines[] ─────────│                            │
   │                           │                            │
   │  2. POST /api/bookings/create                          │
   ├─────────────────────────→ │                            │
   │    { userId, machineId,   │                            │
   │      hours, location }    │                            │
   │                           ├─ Validate machine          │
   │                           ├───────────────────────────→│
   │                           │←─── machine ───────────────│
   │                           │                            │
   │                           ├─ Get owner details         │
   │                           ├───────────────────────────→│
   │                           │←─── owner ─────────────────│
   │                           │                            │
   │                           ├─ Calculate amounts         │
   │                           ├─ Create booking            │
   │                           ├───────────────────────────→│
   │                           │←─── booking ───────────────│
   │←───── booking ────────────│                            │
   │                           │                            │
   │  3. POST /api/payments/create-order                    │
   ├─────────────────────────→ │                            │
   │    { amount, bookingId }  │                            │
   │                           ├─ Create Razorpay order     │
   │                           │                            │
   │                           ├─ Update booking            │
   │                           ├───────────────────────────→│
   │←───── orderId ────────────│                            │
   │                           │                            │
   │  [User pays via Razorpay] │                            │
   │                           │                            │
   │  4. POST /api/payments/verify-payment                  │
   ├─────────────────────────→ │                            │
   │    { orderId, paymentId,  │                            │
   │      signature }          │                            │
   │                           ├─ Verify signature          │
   │                           │                            │
   │                           ├─ Update booking            │
   │                           ├───────────────────────────→│
   │                           │                            │
   │                           ├─ Create ownerEarnings      │
   │                           ├───────────────────────────→│
   │                           │                            │
   │                           ├─ Update owner balance      │
   │                           ├───────────────────────────→│
   │                           │                            │
   │                           ├─ Update machine status     │
   │                           ├───────────────────────────→│
   │←───── success ────────────│                            │
   │                           │                            │
   │  5. GET /api/earnings/owner/:ownerId                   │
   ├─────────────────────────→ │                            │
   │                           ├─ Find earnings             │
   │                           ├───────────────────────────→│
   │                           │←─── earnings[] ────────────│
   │←───── earnings[] ─────────│                            │
   │                           │                            │
   │  6. POST /api/earnings/payout/owner/:ownerId (Admin)   │
   ├─────────────────────────→ │                            │
   │    { payoutMethod,        │                            │
   │      payoutReference }    │                            │
   │                           ├─ Update earnings           │
   │                           ├───────────────────────────→│
   │                           │                            │
   │                           ├─ Update owner balance      │
   │                           ├───────────────────────────→│
   │←───── success ────────────│                            │
```

---

**End of Flow Diagrams**

These diagrams show the complete system flow from user booking to owner payout. Use them as reference for understanding and debugging the system.
