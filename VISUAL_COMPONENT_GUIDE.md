# 📸 Visual Component Guide

This guide shows what each component looks like and how to use them.

---

## 1. BookingModalNew Component

### Overview
A 3-step modal for booking machines with payment integration.

### Step 1: Booking Details
```
┌─────────────────────────────────────────────────────────────┐
│  ✕                     Book JCB 3DX                         │
│           ₹1,200/hour • Mumbai, Maharashtra                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Delivery Location *                                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 📍 Enter site/work location                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Start Date *                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 📅 01/15/2026                                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Duration (Hours) *                                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🕐 8                                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Additional Notes (Optional)                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Any special requirements...                           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Payment Method *                                           │
│  ┌────────────────────┐  ┌────────────────────┐           │
│  │  💳                │  │  💵                │           │
│  │  Online Payment    │  │  Cash on Delivery  │           │
│  │  Pay securely now  │  │  Pay at site       │           │
│  └────────────────────┘  └────────────────────┘           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Price Breakdown                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  ₹1,200/hr × 8 hours              ₹9,600           │   │
│  │  Platform Fee (2%)                ₹192             │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  Total                            ₹9,792           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │        [Continue to Payment]                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step 2: Payment (Online Only)
```
┌─────────────────────────────────────────────────────────────┐
│  ✕                 Complete Payment                         │
│                  Booking ID: #abc12345                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Payment Summary                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  Machine            JCB 3DX                         │   │
│  │  Duration           8 hours                         │   │
│  │  Location           Mumbai Construction Site        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  Total Amount       ₹9,792                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          [Pay ₹9,792]                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  🔒 Secure payment powered by Razorpay                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step 3: Success
```
┌─────────────────────────────────────────────────────────────┐
│  ✕                                                          │
│                                                             │
│                     ✓                                       │
│                   ╱   ╲                                     │
│                  │  ✓  │                                    │
│                   ╲   ╱                                     │
│                     ˙                                       │
│                                                             │
│           Booking Confirmed! 🎉                             │
│                                                             │
│    Your booking has been confirmed. The machine             │
│    owner will contact you shortly.                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Booking ID        #abc12345                        │   │
│  │  Machine           JCB 3DX                          │   │
│  │  Duration          8 hours                          │   │
│  │  Amount Paid       ₹9,792                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                [Done]                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. OwnerEarningsPanel Component

### Overview
Dashboard for owners to view their earnings and payout status.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ 📈           │  │ 🕐           │  │ ✓            │     │
│  │Total Earnings│  │Pending Payout│  │ Paid Out     │     │
│  │              │  │              │  │              │     │
│  │  ₹50,000     │  │  ₹15,000     │  │  ₹35,000     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🔍 [All Earnings ▼]          [↓ Download Statement]│   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Booking ID │ Machine │ Date      │ Amount │ Status  │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ #abc12345  │ JCB 3DX │ 15 Jan 26 │ ₹9,312 │ 🟡 Pend│   │
│  │ #def67890  │ JCB 4DX │ 14 Jan 26 │ ₹5,688 │ 🟢 Paid│   │
│  │ #ghi13579  │ Excavtr │ 13 Jan 26 │ ₹4,750 │ 🟢 Paid│   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 💵 Payout Information                               │   │
│  │                                                     │   │
│  │ Pending earnings will be paid out to your          │   │
│  │ registered bank account within 3-5 business days   │   │
│  │ after booking completion.                          │   │
│  │                                                     │   │
│  │ Commission: 5% • Payment: Bank Transfer/UPI        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. AdminPayoutManagement Component

### Overview
Admin interface to manage owner payouts.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ ⚠️           │  │ ✓            │  │ 💰           │     │
│  │Pending Payouts│  │ Paid Out    │  │Total Commissn│     │
│  │              │  │              │  │              │     │
│  │  ₹45,000     │  │  ₹125,000    │  │  ₹8,500      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Pending Payouts               [🔄 Refresh]         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 👤  Ravi Kumar                                      │   │
│  │     ravi@gmail.com                                  │   │
│  │     9876543210                                      │   │
│  │     A/C: ••••7890 | HDFC0001234                     │   │
│  │     UPI: ravi@paytm                                 │   │
│  │                                                     │   │
│  │     Total Pending                                   │   │
│  │     ₹15,000                     [📤 Pay Now]        │   │
│  │     2 bookings                                      │   │
│  │                                                     │   │
│  │     Bookings:                                       │   │
│  │     ┌──────────┐ ┌──────────┐                      │   │
│  │     │JCB 3DX   │ │JCB 4DX   │                      │   │
│  │     │₹9,312    │ │₹5,688    │                      │   │
│  │     │15 Jan 26 │ │14 Jan 26 │                      │   │
│  │     └──────────┘ └──────────┘                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 👤  Sharma Contractors                              │   │
│  │     sharma@gmail.com                                │   │
│  │     9988776655                                      │   │
│  │     A/C: ••••4321 | ICICI0005678                    │   │
│  │                                                     │   │
│  │     Total Pending                                   │   │
│  │     ₹30,000                     [📤 Pay Now]        │   │
│  │     3 bookings                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Payout Modal
```
┌─────────────────────────────────────────┐
│  ✕    Process Payout                   │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Paying to:                      │   │
│  │ Ravi Kumar                      │   │
│  │ ravi@gmail.com                  │   │
│  │                                 │   │
│  │ ₹15,000                         │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Payment Method                         │
│  ┌─────────────────────────────────┐   │
│  │ Bank Transfer ▼                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Transaction ID / Reference *           │
│  ┌─────────────────────────────────┐   │
│  │ Enter transaction ID            │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Notes (Optional)                       │
│  ┌─────────────────────────────────┐   │
│  │ Any additional notes...         │   │
│  │                                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌────────────┐  ┌─────────────────┐   │
│  │  [Cancel]  │  │[Confirm Payout] │   │
│  └────────────┘  └─────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 4. DashboardWithEarnings Component

### Overview
Complete dashboard with tabs including earnings.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Dashboard                                                  │
│                                                             │
│  ┌────────┐ ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌──────┐│
│  │Overview│ │Earnings │ │My Machines│ │Bookings │ │Settngs││
│  └────────┘ └─────────┘ └──────────┘ └─────────┘ └──────┘│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Content based on selected tab]                           │
│                                                             │
│  When "Earnings" tab selected:                             │
│  → Shows OwnerEarningsPanel component                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. BookMachine Page (Updated)

### Overview
Browse and book machines with MongoDB integration.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Find a Machine                                             │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🔍 Search by machine name, location or type...      │  │
│  └──────────────────────────────────────────────────────┘  │
│  [🔧 Filters]                                              │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │  [Image]    │  │  [Image]    │  │  [Image]    │       │
│  │             │  │             │  │             │       │
│  │  JCB 3DX    │  │  JCB 4DX    │  │  Excavator  │       │
│  │  ₹1,200/hr  │  │  ₹1,500/hr  │  │  ₹950/hr    │       │
│  │  Mumbai     │  │  Delhi      │  │  Bangalore  │       │
│  │             │  │             │  │             │       │
│  │[Book Now]   │  │[Book Now]   │  │[Book Now]   │       │
│  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │  [Image]    │  │  [Image]    │  │  [Image]    │       │
│  │             │  │             │  │             │       │
│  │  Dozer      │  │  Loader     │  │  Crane      │       │
│  │  ₹1,800/hr  │  │  ₹1,100/hr  │  │  ₹2,500/hr  │       │
│  │  Chennai    │  │  Pune       │  │  Hyderabad  │       │
│  │             │  │             │  │             │       │
│  │[Book Now]   │  │[Book Now]   │  │[Book Now]   │       │
│  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Color Scheme

### Primary Colors
- **Amber/Yellow**: `#FCD34D` - Primary brand color
- **Green**: `#10B981` - Success, paid status
- **Yellow**: `#F59E0B` - Pending status
- **Red**: `#EF4444` - Error, failed status
- **Blue**: `#3B82F6` - Info, processing status

### Status Badges
- **Pending**: 🟡 Yellow background
- **Paid**: 🟢 Green background
- **Processing**: 🔵 Blue background
- **Failed**: 🔴 Red background

### Typography
- **Headings**: Bold, Inter font
- **Body**: Regular, Inter font
- **Numbers**: Medium weight for amounts
- **Mono**: For IDs and references

---

## Responsive Behavior

### Desktop (≥1024px)
- 4 column grid for machine cards
- Side-by-side payment options
- Table layout for earnings
- Full-width modals (max 2xl)

### Tablet (768px - 1023px)
- 2-3 column grid for machine cards
- Stacked payment options
- Table with horizontal scroll
- Medium modals

### Mobile (<768px)
- 1 column grid
- Full-width cards
- Card layout instead of table
- Full-screen modals
- Sticky headers

---

## Component Props

### BookingModalNew
```jsx
<BookingModalNew
  machine={{
    _id: "...",
    machineName: "JCB 3DX",
    hourlyRate: 1200,
    baseLocation: "Mumbai",
    userId: "owner_uid"
  }}
  isOpen={true}
  onClose={() => {}}
/>
```

### OwnerEarningsPanel
```jsx
<OwnerEarningsPanel />
// Uses currentUser from AuthContext
```

### AdminPayoutManagement
```jsx
<AdminPayoutManagement />
// No props needed
```

---

## Usage Examples

### 1. Add Booking Modal to Any Page
```jsx
const [selectedMachine, setSelectedMachine] = useState(null);

<button onClick={() => setSelectedMachine(machine)}>
  Book Now
</button>

<BookingModalNew
  machine={selectedMachine}
  isOpen={!!selectedMachine}
  onClose={() => setSelectedMachine(null)}
/>
```

### 2. Add Earnings to Dashboard
```jsx
import OwnerEarningsPanel from '../components/dashboard/OwnerEarningsPanel';

function Dashboard() {
  return (
    <div>
      <h1>My Dashboard</h1>
      <OwnerEarningsPanel />
    </div>
  );
}
```

### 3. Create Admin Route
```jsx
import AdminPayoutManagement from './pages/admin/AdminPayoutManagement';

<Route 
  path="/admin/payouts" 
  element={<AdminPayoutManagement />} 
/>
```

---

## Accessibility Features

- ✅ Keyboard navigation
- ✅ ARIA labels
- ✅ Focus management
- ✅ Screen reader support
- ✅ Color contrast compliance
- ✅ Error announcements

---

## Animation & Transitions

- **Modal**: Scale and fade in
- **Cards**: Hover lift effect
- **Buttons**: Color transition on hover
- **Success**: Checkmark animation
- **Loading**: Spinner animation
- **List items**: Stagger fade in

---

**End of Visual Guide**

These are ASCII representations of what the components look like. The actual components have proper styling with Tailwind CSS and are fully responsive.
