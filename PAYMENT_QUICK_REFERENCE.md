# 🚀 Quick Reference Card - Payment System

## 30-Second Overview

**Complete booking & payment system for JCB Platform**
- ✅ Online payments via Razorpay
- ✅ Cash on Delivery option
- ✅ 5% automatic commission
- ✅ Owner earnings dashboard
- ✅ Admin payout management

---

## 📦 Installation (2 commands)

```bash
cd jcb-platform && npm install
cd server && npm install
```

---

## ⚙️ Configuration (2 files)

**server/.env:**
```env
MONGODB_URI=mongodb://localhost:27017/jcb-platform
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
RAZORPAY_KEY_SECRET=YOUR_SECRET
```

**.env:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
```

---

## 🎯 Start (2 terminals)

```bash
# Terminal 1
cd jcb-platform/server && npm run dev

# Terminal 2
cd jcb-platform && npm run dev
```

---

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/bookings/create | Create booking |
| POST | /api/payments/create-order | Create Razorpay order |
| POST | /api/payments/verify-payment | Verify payment |
| GET | /api/earnings/owner/:id | Get earnings |
| POST | /api/earnings/payout/owner/:id | Process payout |

---

## 💻 Component Usage

### Booking Modal
```jsx
import BookingModalNew from './components/booking/BookingModalNew';

<BookingModalNew machine={machine} isOpen={true} onClose={() => {}} />
```

### Earnings Panel
```jsx
import OwnerEarningsPanel from './components/dashboard/OwnerEarningsPanel';

<OwnerEarningsPanel />
```

### Admin Payouts
```jsx
import AdminPayoutManagement from './pages/admin/AdminPayoutManagement';

<Route path="/admin/payouts" element={<AdminPayoutManagement />} />
```

---

## 💰 Money Flow

```
User Pays:        ₹10,000
Platform Fee:     ₹200 (2%)
Commission:       ₹500 (5%)
────────────────────────
Platform Keeps:   ₹700
Owner Gets:       ₹9,300
```

---

## 🧪 Test Cards

**Success:** `4111 1111 1111 1111`  
**Failure:** `4000 0000 0000 0002`  
**UPI Success:** `success@razorpay`

---

## 🔗 Documentation

- `PAYMENT_SYSTEM_COMPLETE.md` - Full guide
- `QUICK_START_PAYMENT_SYSTEM.md` - Setup guide
- `IMPLEMENTATION_CHECKLIST.md` - Step-by-step
- `SYSTEM_FLOW_DIAGRAMS.md` - Visual flows

---

## ✅ Quick Test

- [ ] Backend running (:5000)
- [ ] Frontend running (:5173)
- [ ] MongoDB connected
- [ ] Book with COD ✓
- [ ] Book with Online payment ✓
- [ ] View earnings ✓
- [ ] Process payout ✓

---

**Status:** ✅ READY TO USE  
**Setup Time:** 15 minutes  
**Version:** 1.0.0
