# AndiSoft - Instagram DM Automation SaaS (MVP+)

Production-oriented monorepo implementing a LinkDM-like SaaS with multi-tenant backend and Next.js frontend.

## Monorepo structure

- `apps/api`: Express + Prisma + BullMQ API.
- `apps/web`: Next.js 14 App Router frontend with Tailwind and Recharts.
- `packages/shared`: shared typings/utilities placeholder.

## Features implemented

- Meta OAuth flow for Instagram Business/Creator connection with short-lived to long-lived token exchange and encrypted token persistence.
- Webhook verification (challenge + signature), logging, trigger matching, and queued follow-up scheduling.
- Trigger engine (global/post/story scope, keyword matching, priority, enabled flag).
- DM queue worker with hourly rate limiting, retries with exponential backoff, and job persistence.
- URL shortener + redirect tracking (IP anonymization hash, user-agent, trigger attribution).
- Multi-tenant data model (`User -> Workspace -> InstagramAccount`) with RBAC roles.
- White-label theme entity and frontend branding controls.
- Admin overview endpoint with user/account usage, queue stats, and webhook errors.

## Quick start

1. Install dependencies from root:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env
   ```
3. Start infra and apps:
   ```bash
   docker compose up --build
   ```
4. Apply Prisma migrations (inside API container or locally):
   ```bash
   npm run prisma:migrate --workspace=@andisoft/api
   npm run prisma:generate --workspace=@andisoft/api
   ```
5. Run locally without Docker:
   ```bash
   npm run dev
   ```

## Security notes

- Tokens are encrypted with AES-256-GCM before storage.
- Webhook signatures verified with `x-hub-signature-256`.
- Zod request validation for auth/trigger inputs.
- Pino redaction avoids logging secrets.
- API-level rate limiter enabled.

## Core API routes

- `POST /api/auth/register`, `POST /api/auth/login`
- `POST /api/oauth/instagram`
- `GET /api/webhooks/meta`, `POST /api/webhooks/meta`
- `GET/POST /api/triggers`
- `GET /api/analytics/overview`
- `POST /api/links/shorten`, `GET /r/:shortCode`
- `GET /api/admin/overview`, `POST /api/admin/users/:userId/suspend`
