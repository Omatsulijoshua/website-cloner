import type { DetectedSiteFeature } from "@cloneforge/crawler";

export type BackendModule =
  | "contacts"
  | "newsletter"
  | "bookings"
  | "products"
  | "blog"
  | "auth"
  | "dashboard"
  | "admin"
  | "payments"
  | "search"
  | "uploads"
  | "email";

export type BackendGenerationPlan = {
  required: boolean;
  editable: true;
  deployTarget: "render";
  modules: BackendModule[];
  databaseModels: string[];
  apiRoutes: string[];
  adminScreens: string[];
  environmentVariables: string[];
};

const featureModuleMap: Record<DetectedSiteFeature, BackendModule[]> = {
  "contact-form": ["contacts", "email", "admin"],
  "newsletter-form": ["newsletter", "email", "admin"],
  "booking-form": ["bookings", "email", "admin"],
  "product-listings": ["products", "uploads", "search", "admin"],
  "blog-news": ["blog", "uploads", "admin"],
  "login-signup": ["auth"],
  dashboard: ["auth", "dashboard"],
  "admin-panel": ["auth", "admin"],
  payment: ["payments", "email", "admin"],
  "search-filter": ["search"],
  "file-upload": ["uploads", "admin"]
};

const modelMap: Record<BackendModule, string[]> = {
  contacts: ["ContactSubmission"],
  newsletter: ["Subscriber"],
  bookings: ["Booking"],
  products: ["Product", "ProductImage", "Category"],
  blog: ["Post", "Author", "Tag"],
  auth: ["User", "Session", "Account", "VerificationToken"],
  dashboard: ["DashboardMetric"],
  admin: ["AuditLog"],
  payments: ["Order", "Payment"],
  search: ["SearchIndex"],
  uploads: ["Asset"],
  email: ["EmailEvent"]
};

const routeMap: Record<BackendModule, string[]> = {
  contacts: ["POST /api/contact-submissions", "GET /api/admin/contact-submissions"],
  newsletter: ["POST /api/newsletter", "GET /api/admin/subscribers"],
  bookings: ["POST /api/bookings", "GET /api/admin/bookings", "PATCH /api/admin/bookings/:id"],
  products: ["GET /api/products", "POST /api/admin/products", "PATCH /api/admin/products/:id"],
  blog: ["GET /api/posts", "POST /api/admin/posts", "PATCH /api/admin/posts/:id"],
  auth: ["POST /api/auth/signup", "POST /api/auth/login", "POST /api/auth/google", "POST /api/auth/verify-email"],
  dashboard: ["GET /api/dashboard"],
  admin: ["GET /api/admin/overview", "GET /api/admin/audit-logs"],
  payments: ["POST /api/payments/stripe", "POST /api/payments/paystack", "POST /api/webhooks/payments"],
  search: ["GET /api/search"],
  uploads: ["POST /api/uploads/sign", "POST /api/admin/assets"],
  email: ["POST /api/internal/email-events"]
};

export function generateBackendPlan(features: DetectedSiteFeature[]): BackendGenerationPlan {
  const modules = [...new Set(features.flatMap((feature) => featureModuleMap[feature]))];

  return {
    required: modules.length > 0,
    editable: true,
    deployTarget: "render",
    modules,
    databaseModels: [...new Set(modules.flatMap((module) => modelMap[module]))],
    apiRoutes: modules.flatMap((module) => routeMap[module]),
    adminScreens: modules.includes("admin")
      ? ["Submissions", "Content", "Media", "Users", "Audit Logs", "Deployment"]
      : [],
    environmentVariables: [
      "DATABASE_URL",
      "REDIS_URL",
      "JWT_SECRET",
      "SMTP_URL",
      "S3_ENDPOINT",
      "S3_ACCESS_KEY_ID",
      "S3_SECRET_ACCESS_KEY",
      "STRIPE_SECRET_KEY",
      "PAYSTACK_SECRET_KEY",
      "RENDER_API_KEY"
    ]
  };
}
