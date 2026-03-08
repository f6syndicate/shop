<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# F6 Syndicate — Shop & Admin Guide

Premium themed T-shirt store with a full admin command centre.

---

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local` in the project root:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

---

## Deploying

Push to `master` branch — Vercel auto-deploys within 30 seconds.

```bash
git add .
git commit -m "your message"
git push origin master
```

---

## Admin Command Centre

The admin dashboard is accessible at:
```
yourdomain.com/#/admin
```

---

### Logging In

1. Go to `/#/admin`
2. Enter your admin email and password
3. These credentials are set in **Supabase → Authentication → Users**
4. Only authorised users can access the dashboard — all others are blocked

> To add a new admin user: Supabase → Authentication → Users → Invite User

---

### Dashboard Overview

Once logged in you will see the **Command Centre** with:

| Section | What it shows |
|---|---|
| Stats bar | Total orders, revenue, pending count, confirmed revenue |
| Search | Find orders by Order ID, customer name, or email |
| Filter buttons | Filter by status: All / Pending / Paid / Shipped / Delivered / Cancelled |
| Orders table (desktop) | Full order list with all details |
| Order cards (mobile) | Same data in a mobile-friendly card layout |

---

### Managing Orders

**Viewing order details:**
- Desktop: Click any row to expand full details including items, address and payment
- Click the 👁 eye icon to open the full order modal
- Mobile: Tap a card to see details, tap Details button for the full modal

**Updating order status:**

The recommended status flow is:
```
Pending → Paid → Shipped → Delivered
```

- Desktop: Use the status dropdown directly on the table row
- Mobile: Use the status dropdown on the order card
- Both update Supabase instantly with no page refresh needed

**Editing an order:**
- Click the ✏️ pencil/edit icon on any order
- You can update: Status, Payment Method, and add internal Notes
- Click Save — changes reflect immediately in the table
- Notes are internal only and not visible to customers

---

### Searching and Filtering

- Type in the search box to find by **Order ID**, **customer name**, or **email**
- Click a status button to filter to only those orders
- Combine both — e.g. search "Mumbai" while filtering by "Shipped"

---

### Exporting Orders

- Click the **Export CSV** button in the top bar
- Downloads a `.csv` file with all currently filtered orders
- Includes: Order ID, Date, Customer, Email, Phone, City, Total, Status, Payment

---

### Stats Bar Explained

| Stat | Meaning |
|---|---|
| Total Orders | All orders ever placed |
| Total Revenue | Sum of all order totals |
| Pending | Orders awaiting payment confirmation |
| Confirmed Revenue | Revenue only from Delivered orders |

---

### Customer Order Cancellations

When a customer cancels their order via the Track Order page:
- Status automatically updates to **Cancelled** in Supabase
- It will appear in the dashboard immediately on next refresh
- You can also manually set any order to Cancelled using the edit button

---

### Logging Out

Click the **Logout** button in the top right corner of the dashboard.

---

## Site Pages

| Route | Page |
|---|---|
| `/` | Homepage |
| `/shop` | All products |
| `/themes` | Browse by theme |
| `/theme/:name` | Individual theme collection |
| `/product/:id` | Product detail |
| `/cart` | Shopping bag |
| `/checkout` | Payment (UPI / Card / COD) |
| `/order-success/:id` | Order confirmation + invoice download |
| `/orders` | Customer order history |
| `/track` | Live order tracking + cancel |
| `/help` | FAQ |
| `/returns` | Returns & exchanges policy |
| `/shipping` | Shipping information |
| `/admin` | Admin command centre |

---

## Database Structure (Supabase)

```
customers
  customer_id (PK, UUID)
  contact (unique phone number)
  full_name, email, address fields
  created_at
      ↓
orders
  order_id (PK, text e.g. F6-XXXX)
  customer_id (FK → customers)
  items (JSONB), total, status
  payment_method, notes
      ↓
order_items
  item_id (PK, UUID)
  order_id (FK → orders)
  product_id, name, category
  size, colour, price, quantity
  line_total (computed)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Hosting | Vercel |
| CI/CD | GitHub → Vercel auto-deploy |
| AI Stylist | Google Gemini |
| Invoice | jsPDF |

---

*F6 Syndicate · Veni Vidi Vici*
