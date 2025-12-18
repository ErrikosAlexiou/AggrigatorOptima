# Architecture

## Overview
Aggregator Optima is a pnpm workspace monorepo with:
- `apps/api`: Express + TypeScript + Prisma (SQLite) REST API
- `apps/web`: React + Vite + Polaris frontend
- `packages/shared`: Shared Zod schemas/types for request/response validation
- `docs`: Compliance and architecture notes

### Diagram
```
[React Vite + Polaris] --(HTTPS JSON, credentials)--> [Express API]
       |                                                    |
       |                               [Prisma ORM + SQLite DB]
       |                                                    |
   JWT access (Authorization header)           Observations, Users, Tokens,
   Refresh token cookie (HttpOnly)             Upload history, Contacts
```

## Data flow
1. Users register/login -> API issues access JWT + refresh cookie. Access token is attached to requests; refresh rotates on use.
2. CSV uploads (multipart) stream through `csv-parse`, headers/values trimmed, validated with shared Zod schema, inserted via Prisma `createMany`. Upload history captures success/failure counts and examples.
3. Observations are queried with pagination and filters; metrics endpoints use Prisma aggregations (`groupBy`, `aggregate`) for dashboard charts.
4. Contact form posts to `/api/v1/contact` and stores minimal details.

## Key components
- **Auth middleware:** Verifies Bearer tokens, enforces roles, rotates refresh tokens, revokes on logout.
- **Prisma schema:** Models for `User`, `RefreshToken`, `Observation`, `UploadHistory`, `ContactMessage`; `Role` enum for authorization.
- **Frontend shell:** Polaris `Frame` with role-aware navigation, dashboard KPIs/charts (Recharts), data table with filters, CSV upload dropzone, admin user management.
- **Shared validation:** Zod schemas define observation fields and auth/contact payloads to keep frontend/backend aligned.

## Running locally
1. Copy `.env.example` to `.env` (root or `apps/api/.env`) and set secrets.
2. `pnpm install`
3. `pnpm --filter api prisma db push && pnpm --filter api db:seed`
4. `pnpm dev` (runs web and api workspaces)

## Deployment notes
- Replace SQLite URL with your managed database in `DATABASE_URL`.
- Set `WEB_ORIGIN` to your frontend domain to lock down CORS/cookies.
- Serve API behind HTTPS so refresh cookies stay secure; adjust `secure` flag if terminating TLS upstream.
- Run `pnpm --filter shared build && pnpm --filter api build && pnpm --filter web build` for production artifacts.
