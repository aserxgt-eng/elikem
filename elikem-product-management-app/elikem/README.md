# Elikem — Premium Product Management Web App

A modern, fully responsive product management platform: a corporate/healthcare-inspired
marketing site plus an authenticated dashboard for full product CRUD, inventory analytics,
reporting, and team management.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**,
**Firebase (Auth + Firestore)**, **React Hook Form + Zod**, and **Recharts**.

---

## 1. Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in your Firebase project keys
npm run dev
```

Open http://localhost:3000.

### Firebase setup

1. Create a project at https://console.firebase.google.com.
2. Enable **Authentication → Email/Password**.
3. Enable **Firestore Database** (start in production mode).
4. Copy your web app config into `.env.local` (Project Settings → General → Your apps).
5. Deploy the included security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```
   (or paste the contents of `firestore.rules` into the Firestore Rules tab in console).
6. Optional: seed sample products —
   ```bash
   npm run seed
   ```

Once you register your first account (`/register`), that user is created with the `admin`
role automatically (see `lib/services/auth.ts`) so you can access every dashboard feature
immediately.

---

## 2. Project structure

```
app/
  page.tsx                     Landing page
  (auth)/login, register, forgot-password
  dashboard/                   Protected app shell (auth-gated in layout.tsx)
    page.tsx                   Overview: stats + charts + recent products
    products/                  List, create, edit
    categories/                Category breakdown
    reports/                   PDF / Excel / print / backup
    users/                     Role management
    settings/                  Account settings
  products/[id]/                Public product details page (QR + related items)

components/
  ui/                          Button, Input, Select, Textarea, Card, Badge, Modal, Skeleton
  layout/                      Navbar, Footer, Sidebar, DashboardTopbar, AuthLayout
  landing/                     Hero, Stats, Features, TrustedQuality, ProductHighlights, Contact
  products/                    ProductCard, ProductForm, ProductTable, SearchBar, FilterPanel,
                                Pagination, ProductQRCode
  dashboard/                   StatCard, charts/ (Inventory, Category, Expiry)

lib/
  firebase.ts                  Firebase app/auth/firestore/storage singletons
  types.ts                     Shared TypeScript domain types
  utils.ts                     Formatting + product-status helpers
  exports.ts                   PDF / Excel / print report generation
  validations/                 Zod schemas (product, auth)
  services/                    Firestore + Auth data access (products.ts, auth.ts)
  hooks/                       useAuth, useToast, useProducts

firestore.rules                Firestore security rules
scripts/seed.mjs               Sample data seeder
```

---

## 3. Design system

| Token | Value |
|---|---|
| Primary | `#0066CC` |
| Secondary | `#00AEEF` |
| Surface | White / `#F5F7FA` light gray |
| Ink (text) | `#1A2332` dark gray, with `-soft` / `-muted` variants |
| Display font | Plus Jakarta Sans |
| Body font | Inter |
| Mono (batch/barcode) | JetBrains Mono |

All tokens live in `tailwind.config.ts`. The visual language (rounded 2xl cards, soft
shadows, generous whitespace, blue-accented corporate feel) is an **original interpretation**
inspired by professional healthcare-sector sites — no graphics, icons, logos, or code were
copied from any existing company.

The landing page's signature element is an animated "vitals pulse" line in the hero that
draws itself on load, reinforcing the health/quality positioning without borrowing any
specific brand's iconography.

---

## 4. Feature coverage

- **Landing page**: animated hero, stats, product highlights, features grid, trusted-quality
  section, contact form, full footer.
- **Auth**: login, register, forgot password (Firebase Auth, Zod-validated forms).
- **Dashboard**: total/active/expired/near-expiry product counts, inventory value, recent
  products, line/bar/donut charts (Recharts).
- **Products**: full CRUD, image URL, category, price, description, manufacturing/expiry
  dates, origin, batch number, stock, availability status, generated QR code.
- **Product list**: search, category/status/availability filters, sorting, pagination,
  grid or table view.
- **Product details page**: large image, full description, related products, QR code.
- **Admin**: category breakdown, user role management, reports (PDF/Excel/print export,
  JSON backup download).
- **Notifications**: toast system (success/error/info/warning) via `useToast`.
- **Animations**: Framer Motion fade-in/slide-up on scroll, card hover lift, button ripple,
  loading skeletons, animated mobile nav.
- **Responsive**: mobile-first Tailwind layout throughout; sidebar collapses to a top bar
  pattern below `lg`.

## 5. Notes & next steps

- **Images**: the product form accepts a hosted image URL. To support direct uploads, wire
  a file input to Firebase Storage (`lib/firebase.ts` already exports `storage`) and save the
  resulting download URL as `imageUrl`.
- **Barcodes**: `ProductQRCode` encodes product ID + batch number + canonical URL as a QR
  code (via `qrcode.react`). Swap in a barcode library (e.g. `react-barcode`) if you
  specifically need linear barcodes (e.g. Code128) for warehouse scanners.
- **Backups**: the in-app "Backup database" button exports a JSON snapshot client-side. For
  scheduled server-side backups, add a Firebase Cloud Function that exports Firestore to
  Cloud Storage on a cron trigger.
- **Currency**: `formatCurrency` defaults to GHS — change the default in `lib/utils.ts` if
  you're deploying for a different market.
- **Categories**: currently derived from products (no separate collection) to keep the data
  model simple. Promote to a `categories` collection if you need per-category metadata.

## 6. Scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # start production server
npm run lint     # lint
npm run seed     # populate Firestore with sample products
```

---

© 2026 Elikem. Developed by Ramdas.
