# lieferando

A full-stack food-ordering web application — customer storefront plus shop-owner dashboard on one Next.js/Prisma data model — built as a personal learning project inspired by the Lieferando product category (not client work for that brand).

## Overview

lieferando is a two-sided food-ordering app: customers browse restaurants, search globally, fill a persisted cart, check out, and rate shops; shop owners register with a store location, manage products and menus, set a minimum order value, and view incoming orders and dashboard statistics (Recharts). Everything runs in a single Next.js 15 application backed by MySQL via Prisma, with NextAuth credentials auth (bcrypt-hashed passwords, JWT sessions). It is an archived learning project whose value is demonstrating a complete CRUD-heavy full-stack product with two distinct user roles sharing one data model.

## Why I Built It

To practice building a complete two-sided marketplace-style product — the kind of app where customers and merchants see different surfaces over the same database — rather than another single-purpose demo. The Lieferando category (browsing, carts, orders, ratings, merchant dashboards) covers authentication, authorization by role, relational data modeling, and payment/checkout flow shape in one scope. [TODO: confirm whether a specific course/tutorial influenced the structure]

## My Role

I built the entire application solo: Prisma schema, API routes, both user experiences, auth, and the owner dashboard. Next.js, Prisma, NextAuth, shadcn/ui conventions, and Recharts are third-party technologies I configured and used — the engineering is the data model, the role-separated flows, and the order lifecycle on top of them.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 15 (App Router), React 18, TypeScript | Application framework |
| MySQL + Prisma | Persistence (7 models: User, Shop, Product, Menu, Order, Location, Rating) |
| NextAuth.js | Credentials auth, JWT sessions |
| Tailwind CSS, shadcn/ui, Radix primitives | UI |
| Recharts | Owner dashboard charts |

## Implementation

- **Shared data model:** seven Prisma models link users and shops to structured `Location` records (street, number, ZIP, country), with orders referencing shops, products, and users; ratings include driver ratings.
- **Customer side:** store browsing with per-store pages, global search, a React-context cart with quantity controls, and a checkout → payment → confirmation flow (order confirmation screen was built incrementally — see git history).
- **Owner side:** registration with store location, product/menu management, minimum order value, incoming order views with customer profile data, and a stats dashboard.
- **Security work:** a later pass (2026) migrated NextAuth v4 to Auth.js v5 with React 19 compatibility and removed ESLint tooling behind an advisory-noise chain — visible in the git log.

## What I Learned

- Designing one relational schema that serves two roles cleanly instead of two divergent read paths.
- The practical shape of a checkout flow: cart persistence, order creation, and confirmation as separate states.
- Auth migration cost: upgrading NextAuth v4 → v5 touched async params and session handling across the app, a realistic maintenance exercise.

## Performance / Scale / Results

No formal performance measurements were recorded for this project. Metrics worth adding: page-load time on a seeded database, order-creation latency.

## Testing

No automated tests; verification was manual. The highest-value additions would be integration tests over the order lifecycle (cart → order → confirmation) and role-based access checks on owner routes.

## Current Status

🟡 Archived. Built mainly November 2024 (initial commits through "finish"), with a documentation and security-migration pass in October 2026. No further development planned.

## Portfolio Relevance

- **What this project demonstrates:** end-to-end full-stack product building with role separation — schema design, auth, CRUD surfaces, and a dashboard — in one deployable app.
- **Why it is interesting:** it models a real two-sided product category (customer + merchant) rather than a single-user demo.
- **Limitations:** a learning recreation of a well-known product category, not original product thinking; no tests, no measured performance, and Stripe-style payments are simulated in shape only.
- **Best thing to show a recruiter:** the Prisma schema plus screenshots of the storefront and owner dashboard side by side.

## Interview Discussion

1. How did you model one schema for two roles, and where did that cause friction?
2. How is cart state persisted across navigation, and what breaks on refresh?
3. How would you prevent a customer from calling owner-only endpoints?
4. What happens to an order record if payment confirmation never arrives?
5. What did the NextAuth v4→v5 migration actually change in your code?

## Honest Assessment

Internal portfolio-evaluation ratings (1–10, not objective measurements):

| Aspect | Score | Notes |
|---|---|---|
| Technical Depth | 4 | Solid full-stack CRUD with two roles; no unusual engineering problems |
| Engineering Quality | 4 | Working feature-complete app; no tests, i18n is German-leaning in places |
| Uniqueness | 2 | A well-trodden tutorial-adjacent category; the two-sided model is the only differentiator |
| Real-World Value | 3 | Demonstrates hireable full-stack competence, but is not deployed or used |
| Portfolio Value | 3.2 | Archive line: breadth evidence for junior/mid full-stack roles |

## Recruiter Summary

- **In one sentence:** A complete two-sided food-ordering app (customer storefront + shop-owner dashboard) on Next.js 15, Prisma/MySQL, and NextAuth, built solo as a full-stack learning project.
- **The strongest signal this project sends:** I can build and finish an entire full-stack product with role-based surfaces over one relational data model.
- **The biggest weakness:** it is a recreation of a common product category with no tests, users, or measurements.
- **What I would improve before showcasing it:** either add the order-lifecycle tests and seed data for a live demo, or keep it as a one-line archive entry behind stronger projects.

## Evidence & Missing Information

- **Evidence:** repository inspection (README.md, `prisma/schema.prisma` with 7 models, `app/` routes, package.json), git history (64 commits, 2024-11-19 → 2026-10-07, including the Auth.js v5 migration commits), and the project dossier.
- **Missing Information:**
  - [TODO: whether any course/tutorial guided the project structure]
  - [TODO: screenshots of the owner dashboard]
  - [TODO: whether checkout payment is fully simulated or partially real]
