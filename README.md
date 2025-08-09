# Picture Magnet & Badge — Next.js Starter

This is a production‑grade starter implementing the spec:
- 2×2" magnet and circular badge ordering
- Image upload + crop UI
- Admin‑managed PH payment connectors (PayMongo/Xendit/PayPal) + Manual QR fallback
- Orders, payments, events (Prisma/Postgres)

## Quick Start

```bash
pnpm i
pnpm db:generate
pnpm db:migrate
pnpm dev
```

Create a Postgres DB and set `DATABASE_URL` in `.env` (see `.env.example`).

Open: 
- `http://localhost:3000/` — products
- `http://localhost:3000/checkout` — checkout demo
- `http://localhost:3000/admin/settings/payments` — manage connectors

> Gateways are **simulated** in this starter. Replace `server/payments/connectors.ts` with real PayMongo/Xendit/PayPal API calls and add webhook routes. Manual QR path works out‑of‑the‑box.

## Env

Copy `.env.example` to `.env` and set values.

## Notes
- S3 upload is stubbed; add presign logic in `/api/upload` and client upload.
- Email receipts are not wired in this starter; add Resend/SES handlers.
- Protect admin routes by integrating NextAuth middleware and role checks.
