# CloneForge AI

CloneForge AI is a secure AI website recreation platform for websites a user owns or has permission to rebuild. It combines URL capture, human-assisted browser sessions, AI code generation, prompt corrections, GitHub/Vercel deployment, and optional Render backends.

## What is included

- Premium SaaS landing page, dashboard, project workspace, settings, and admin surfaces.
- Permission-first clone flow with phishing-sensitive domain protection.
- Capture contracts for public pages and login-assisted sessions.
- Cloudflare/CAPTCHA/manual verification pause handling.
- Backend feature detector and generator for forms, products, blogs, bookings, auth, dashboards, payments, search, uploads, email notifications, CRUD, and Render deployment.
- Prisma schema, Express API, BullMQ worker outline, and integration boundaries for OpenAI, GitHub, Vercel, Render, Stripe, Paystack, S3-compatible storage, and email.

## Local setup

1. Copy `.env.example` to `.env` and fill in the services you want to test.
2. Install dependencies with `npm install`.
3. Generate Prisma client with `npm run db:generate`.
4. Start development with `npm run dev`.

The generated backend is optional for each clone project and is deployable to Render by default.
