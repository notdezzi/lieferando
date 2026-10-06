# lieferando

A food-ordering web application inspired by [Lieferando](https://www.lieferando.de/), built as a fullstack learning project. Customers can browse restaurants, fill a cart, place orders and check out, while shop owners get their own dashboard to manage products, menus and settings. Everything runs on a single Next.js app backed by MySQL via Prisma.

## Features

- **Customer experience**
  - Browse all stores and open a store page with its products and menus
  - Global search across stores
  - Cart with quantity controls (add/remove items), persisted via React context
  - Checkout flow with a payment page and order confirmation screen
  - Rate shops (driver ratings included in the data model)
- **Shop owner experience**
  - Register as a shop owner with a store location
  - Dashboard with shop stats (charts via Recharts)
  - Create and manage products and menus
  - Configure a minimum order value
  - View incoming orders and customer profile data
- **Accounts & security**
  - Email/password registration and login (NextAuth.js credentials provider)
  - Passwords hashed with bcrypt, JWT-based sessions
  - Users and shops are linked to structured location records (street, number, ZIP, country)

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 15 (App Router), React 18 |
| Language | TypeScript |
| Database | MySQL + Prisma ORM |
| Auth | NextAuth.js (credentials provider, JWT sessions) |
| Styling | Tailwind CSS 3, CSS Modules |
| UI | Radix UI primitives, shadcn/ui conventions, lucide-react, sonner |
| Charts | Recharts |

## Prerequisites

- Node.js 18+
- A MySQL database

## Getting Started

1. Install dependencies:

   ```bash
   npm i --force
   ```

2. Create a `.env` file in the project root:

   ```env
   DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/lieferando"
   NEXTAUTH_SECRET="some-long-random-string"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. Apply the database migrations and (optionally) seed data:

   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **As a customer:** register a normal account, browse `/stores`, add products to your cart, go to `/order`, pick a payment method and confirm your order. Past orders are visible under `/settings/orders`.
- **As a shop owner:** register a shop, then use `/dashboard` to add products (`/dashboard/products/new`), menus (`/dashboard/menus/new`) and set a minimum order value.
- **Search:** use the search bar on the landing page to find stores.

## Project Structure

```
lieferando/
├── app/
│   ├── api/                # API routes (auth, orders, register, search, profile, ...)
│   ├── dashboard/          # Shop owner dashboard (products, menus)
│   ├── login/ register/    # Authentication pages
│   ├── order/              # Cart review, payment and confirmation flow
│   ├── settings/           # User profile and order history
│   ├── stores/             # Store listing, store detail and ratings
│   └── page.tsx            # Landing page with search
├── components/             # Shared UI components (header, searchbar, shop dashboard, ...)
├── context/                # CartContext (client-side cart state)
├── lib/                    # Prisma client, NextAuth config, utilities
├── providers/              # Client-side NextAuth provider
└── prisma/                 # Schema, migrations and seed script
```

## Notes

This project was built for learning purposes — it is not affiliated with Lieferando or Takeaway.com.
