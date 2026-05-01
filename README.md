# UrbanBloom — Interactive Urban Farming Platform

Full-stack platform connecting urban farmers, buyers, and garden spaces.

---

## Tech Stack

**Backend:** Node.js · Express.js · TypeScript · Prisma ORM · PostgreSQL  
**Frontend:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · TanStack Query · Zustand

---

## Quick Start

### Backend

```bash
cd urban-farming-backend
npm install
cp .env.example .env
# Edit .env — fill DATABASE_URL and JWT_SECRET
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

API runs at: `http://localhost:5000/api/v1`

### Frontend

```bash
cd urban-farming-frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1" > .env.local
npm run dev
```

App runs at: `http://localhost:3000`

---

## Frontend Folder Structure

```
urban-farming-frontend/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── users/page.tsx
│   │   │   │   ├── vendors/page.tsx
│   │   │   │   ├── certs/page.tsx
│   │   │   │   └── produce/page.tsx
│   │   │   ├── vendor/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── produce/page.tsx
│   │   │   │   ├── spaces/page.tsx
│   │   │   │   ├── orders/page.tsx
│   │   │   │   └── certs/page.tsx
│   │   │   └── customer/
│   │   │       ├── page.tsx
│   │   │       └── tracking/page.tsx
│   │   ├── marketplace/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── rentals/
│   │   │   └── page.tsx
│   │   ├── community/
│   │   │   └── page.tsx
│   │   ├── track/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── onboarding/
│   │   │   └── vendor/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── sections/                  ← Homepage sections only
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── MarqueeBand.tsx
│   │   │   ├── BentoFeatures.tsx
│   │   │   ├── SplitNarrative.tsx
│   │   │   ├── FullBleedGallery.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── CTABanner.tsx
│   │   │   └── FooterSection.tsx
│   │   ├── shared/                    ← Reusable across all pages
│   │   │   ├── Providers.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopNav.tsx
│   │   │   ├── DashboardShell.tsx
│   │   │   ├── BentoCard.tsx
│   │   │   └── StatCard.tsx
│   │   ├── ui/                        ← Base UI primitives
│   │   │   └── Badge.tsx
│   │   └── modules/                   ← Feature-specific components
│   │       ├── dashboard/
│   │       │   ├── CustomerDashboard.tsx
│   │       │   ├── VendorDashboard.tsx
│   │       │   └── AdminDashboard.tsx
│   │       ├── marketplace/
│   │       │   ├── ProductCard.tsx
│   │       │   ├── FilterSidebar.tsx
│   │       │   ├── CartDrawer.tsx
│   │       │   └── Skeletons.tsx
│   │       └── auth/
│   │           └── AuthPanel.tsx
│   ├── hooks/
│   │   ├── useApi.ts                  ← All TanStack Query hooks
│   │   └── useRoleRedirect.ts
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts              ← Axios instance + interceptors
│   │   │   └── services.ts            ← All API service functions
│   │   ├── stores/
│   │   │   ├── authStore.ts           ← Zustand auth + cookie sync
│   │   │   └── cartStore.ts           ← Zustand cart
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts                   ← All TypeScript interfaces
│   ├── config/
│   │   └── navigation.ts
│   └── middleware.ts                  ← Next.js route protection
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── components.json
└── package.json
```

---

## Environment Variables

### Backend — `urban-farming-backend/.env`

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT signing (min 32 chars) |
| `JWT_EXPIRES_IN` | Token expiry e.g. `7d` |
| `BCRYPT_SALT_ROUNDS` | Password hash rounds (default: `12`) |
| `PORT` | Server port (default: `5000`) |
| `NODE_ENV` | `development` or `production` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms (default: `900000`) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window (default: `100`) |
| `AUTH_RATE_LIMIT_MAX` | Auth route limit (default: `10`) |

### Frontend — `urban-farming-frontend/.env.local`

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

---

## Demo Login Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@urbanfarming.com | Admin@1234 |
| Customer | customer@urbanfarming.com | Customer@1234 |
| Vendor | (any seeded vendor in DB) | Vendor@1234 |

---

## Pages

### Public

| URL | Description |
|---|---|
| `/` | Landing page — UrbanBloom premium homepage |
| `/marketplace` | Produce marketplace with category, price & cert filters |
| `/marketplace/:id` | Product detail page with image gallery |
| `/rentals` | Garden space listings with location search & booking |
| `/community` | Community forum — browse and create posts with tags |
| `/track` | Plant growth tracker (requires login) |
| `/about` | Company overview — team, values, timeline |
| `/not-found` | Custom 404 page |

### Auth

| URL | Description |
|---|---|
| `/login` | Sign in with email & password |
| `/signup` | Register as Customer or Vendor |

### Customer Dashboard

| URL | Description |
|---|---|
| `/dashboard/customer` | Overview — plant timeline, eco score, recent orders |
| `/dashboard/customer/tracking` | Full plant growth manager |

### Vendor Dashboard

| URL | Description |
|---|---|
| `/dashboard/vendor` | Overview — revenue chart, inventory, cert status |
| `/dashboard/vendor/produce` | Produce listings CRUD |
| `/dashboard/vendor/spaces` | Rental space management |
| `/dashboard/vendor/orders` | Incoming order fulfilment |
| `/dashboard/vendor/certs` | Certification submission & history |

### Admin Dashboard

| URL | Description |
|---|---|
| `/dashboard/admin` | Overview — user stats, cert queue, platform health |
| `/dashboard/admin/users` | User management — suspend, activate, delete |
| `/dashboard/admin/vendors` | Vendor approval queue |
| `/dashboard/admin/certs` | Certification review — approve or reject |
| `/dashboard/admin/produce` | Produce moderation — approve or reject listings |

### Other

| URL | Description |
|---|---|
| `/checkout` | 3-step checkout — review, delivery, confirm |
| `/onboarding/vendor` | Guided 3-step vendor profile setup after signup |

---

## Authentication & Security

- JWT stored in Zustand (persisted to `localStorage`) and synced to a cookie for Next.js middleware
- Logout clears Zustand state, `localStorage`, and the cookie simultaneously
- `src/middleware.ts` protects all `/dashboard/*`, `/checkout/*`, `/onboarding/*` routes server-side
- Auth routes (`/login`, `/signup`) redirect already-authenticated users to their role dashboard
- Axios request interceptor auto-injects `Authorization: Bearer <token>` on every API call
- On 401 response: Axios interceptor clears auth state, removes cookie, redirects to `/login`
- Role-based redirect after login: Admin → `/dashboard/admin`, Vendor → `/dashboard/vendor` (or `/onboarding/vendor` if new), Customer → `/dashboard/customer`

---

## API Response Structure

All backend responses follow this consistent shape:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "...",
  "data": {},
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

## Default Ports

| Service | Port |
|---|---|
| Backend API | 5000 |
| Frontend | 3000 |
| PostgreSQL | 5432 |
| Prisma Studio | 5555 |