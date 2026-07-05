# Admin And Subscriptions

CloneForge AI now includes admin and billing surfaces plus API contracts for subscription management.

## Admin dashboard

The admin console now lives in `apps/admin` and runs separately at `http://localhost:3002` in development. The main web app keeps a small `/admin` hand-off page and covers:

- User and plan management
- Usage statistics
- AI spend and deployment limits
- Failed clone logs
- Abuse review queue
- Sensitive-domain and verification monitoring
- Disable-account action boundary

API endpoints:

- `GET /api/admin/overview`
- `PATCH /api/admin/users/:id/plan`
- `POST /api/admin/users/:id/disable`

## Subscriptions

The billing page lives at `/billing` and includes Free, Pro, and Agency plans.

Plan limits are defined in `packages/config/src/index.ts`:

- Free: 3 clone attempts, 10 AI corrections, 1 seat
- Pro: 40 clone attempts, 250 AI corrections, 3 seats
- Agency: 250 clone attempts, 2500 AI corrections, 15 seats

Payment provider boundaries are ready for Stripe and Paystack.

API endpoints:

- `GET /api/billing/plans`
- `POST /api/billing/checkout`
- `POST /api/billing/webhooks/:provider`

Before production, webhook endpoints must verify Stripe and Paystack signatures using provider secrets from environment variables.

