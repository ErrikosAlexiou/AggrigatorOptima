## Aggregator Optima Monorepo
MVP demonstrating CSV ingestion, auth, dashboards, and compliance docs for sustainability data.

### Structure
- `apps/api` – Express + Prisma (SQLite) REST API
- `apps/web` – React + Vite + Shopify Polaris frontend
- `packages/shared` – Shared Zod schemas/types
- `docs` – Compliance and architecture notes

### Prerequisites
- Node 18+ and pnpm (`npm install -g pnpm`)

### Setup
1. Copy `.env.example` to `.env` (root or `apps/api/.env`) and set secrets.
2. Install dependencies: `pnpm install`
3. Migrate DB: `pnpm --filter api prisma db push`
4. Seed users/data: `pnpm --filter api db:seed` (creates `admin@example.com` / `AdminPass123!` and `user@example.com` / `UserPass123!`)
5. Run dev servers: `pnpm dev` (starts API on 4000, web on 5173)

### API highlights
- Auth: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh`, `POST /api/v1/auth/logout`, `GET /api/v1/auth/me`
- Observations: `GET /api/v1/observations` with filters/pagination
- Metrics: `GET /api/v1/metrics/summary`
- Uploads: `POST /api/v1/uploads/csv` (multipart), `GET /api/v1/uploads` (admin)
- Contact: `POST /api/v1/contact`
- Admin: `GET/POST /api/v1/admin/users`, `DELETE /api/v1/admin/users/:id`

### Example curls
```bash
# login
curl -X POST http://localhost:4000/api/v1/auth/login -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"AdminPass123!"}'

# list observations (after copying access token)
curl -H "Authorization: Bearer $TOKEN" "http://localhost:4000/api/v1/observations?page=1&pageSize=5"
```

### Notes
- CORS is scoped via `WEB_ORIGIN` (defaults to Vite dev URL).
- Refresh tokens are HttpOnly cookies; access tokens are returned in JSON for the client to store.
- CSV uploads expect exact headers and trim whitespace automatically; failures return per-row examples.
