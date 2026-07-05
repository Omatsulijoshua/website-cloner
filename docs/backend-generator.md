# Backend Generator

The generator is optional and editable for every clone project. It activates when captured pages include dynamic features.

| Detected feature | Generated backend |
| --- | --- |
| Contact form | Contact submission API, database model, email notification, admin inbox |
| Newsletter form | Subscriber API, database model, email event log, admin list |
| Booking form | Booking model, create/update routes, email notifications, admin calendar |
| Product listings | Product/category/image models, upload system, search API, product admin |
| Blog/news | Post/author/tag models, public API, CMS admin, upload system |
| Login/signup | Auth routes, user/session models, email verification |
| Dashboard/admin pages | Protected routes, user/admin dashboards, audit logs |
| Payment pages | Stripe and Paystack boundaries, order/payment models, webhooks |
| Search/filter | Search endpoint and search index model |

All generated backends target Render by default and include environment variables for database, Redis, email, storage, payments, and deployment keys.
