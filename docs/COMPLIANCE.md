# Compliance and Data Governance

## Stored data and validation
- **User accounts:** `email`, `passwordHash`, `role`, timestamps. Passwords are bcrypt hashed (10 rounds) and never logged.
- **Observations:** Numeric and categorical environmental attributes from CSV uploads. Each row is validated against a Zod schema and rejected if required columns are missing or unparseable. Leading/trailing whitespace is trimmed for headers and values; blank rows are ignored.
- **Upload history:** Filename, row counts, failure examples (max 20), uploader reference, timestamp for auditability.
- **Refresh tokens:** JWT refresh tokens tied to a user, with rotation and revocation flags for logout.
- **Contact messages:** Name, email, company, message, timestamp for responses.

## Security controls
- **Authentication:** Email/password with bcrypt hashing, JWT access tokens (15m), refresh tokens (7d) in HttpOnly, sameSite=lax cookies. Refresh tokens are rotated on use and stored in the database for revocation.
- **Authorization:** Role-based checks (ADMIN, USER) enforced on protected routes. Admin-only access to user management and upload history.
- **Transport/cookies:** CORS is limited to `WEB_ORIGIN` (defaults to `http://localhost:5173`). Cookies are HttpOnly and marked secure in production.
- **API hardening:** Helmet for sensible headers, Prisma parameterization to avoid SQL injection, structured error responses.
- **Environment secrets:** JWT secrets and database URL are loaded from `.env`; example values live in `.env.example` only.

## Privacy-by-design
- **Data minimization:** Only fields needed for authentication, observability, and contact responses are stored. Failure samples are truncated to 20 rows.
- **Retention suggestion:** For prototypes, periodically clear refresh tokens and contact messages after resolution. Archive or purge old upload histories as policies dictate.
- **Access review:** Admin role is seeded separately; registration creates USER roles only. Admin endpoints allow periodic cleanup of accounts.

## Accessibility & usability
- Polaris components ensure keyboard navigation, focus management, and color contrast. Forms provide inline validation banners and clear calls to action. Empty and loading states are present on dashboard widgets and tables.

## Running securely
- Use unique `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`.
- Set `WEB_ORIGIN` to the deployed frontend origin.
- In production, run behind HTTPS so refresh cookies stay secure.
- Keep the SQLite database file outside of any publicly served directory and apply OS-level permissions.
