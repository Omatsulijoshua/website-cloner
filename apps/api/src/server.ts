import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { generateBackendPlan } from "@cloneforge/ai";
import { createAutoDeployPlan } from "@cloneforge/deployment";
import { paymentMethods, subscriptionPlans } from "@cloneforge/config";
import { analyzeHtmlForFeatures, buildAssetPipelinePlan, createVisualAnalysisFromDomSnapshot, validateClonePermission } from "@cloneforge/crawler";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.APP_URL ?? "http://localhost:3000" }));
app.use(express.json({ limit: "2mb" }));
app.use(rateLimit({ windowMs: 60_000, limit: 90 }));

const createProjectSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(2),
  targetUrl: z.string().url(),
  framework: z.enum(["nextjs", "vite"]).default("nextjs"),
  styling: z.enum(["tailwind", "tailwind-shadcn"]).default("tailwind"),
  backendMode: z.enum(["auto", "frontend-only", "always"]).default("auto"),
  permissionAccepted: z.literal(true)
});

const generatedProjects = new Map<string, unknown>();

const adminSnapshot = {
  users: [],
  projects: [],
  subscriptionApprovals: [],
  usage: {
    cloneAttempts: 0,
    aiCorrections: 0,
    deploys: 0,
    failedJobs: 0,
    manualVerifications: 0
  },
  limits: {
    freeCloneAttempts: 3,
    proCloneAttempts: 40,
    agencyCloneAttempts: 250,
    aiCostCeilingUsd: 750
  }
};

app.post("/api/auth/signup", (req, res) => {
  const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8) });
  const input = schema.safeParse(req.body);
  if (!input.success) return res.status(422).json({ error: "Invalid signup request", issues: input.error.flatten() });

  return res.status(201).json({
    user: { id: `user_${Date.now()}`, name: input.data.name, email: input.data.email, subscriptionStatus: "pending" },
    message: "Account created. Subscription approval is required before cloning unlocks."
  });
});

app.post("/api/auth/login", (req, res) => {
  const schema = z.object({ email: z.string().email(), password: z.string().min(1) });
  const input = schema.safeParse(req.body);
  if (!input.success) return res.status(422).json({ error: "Invalid login request" });

  return res.json({
    user: { id: `user_${Date.now()}`, email: input.data.email, subscriptionStatus: "pending" },
    message: "Logged in. Subscription approval is required before cloning unlocks."
  });
});
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "cloneforge-api" });
});

app.get("/api/billing/plans", (_req, res) => {
  res.json({ plans: subscriptionPlans });
});

app.get("/api/billing/payment-methods", (_req, res) => {
  res.json({ methods: paymentMethods });
});

app.patch("/api/admin/payment-methods/:id", (req, res) => {
  const schema = z.object({
    label: z.string().min(2).optional(),
    bankName: z.string().min(2).optional(),
    accountNumber: z.string().min(4).optional(),
    accountName: z.string().min(2).optional(),
    walletAddress: z.string().min(4).optional(),
    network: z.string().min(2).optional(),
    instructions: z.string().min(5).optional()
  });
  const input = schema.safeParse(req.body);
  if (!input.success) return res.status(422).json({ error: "Invalid payment method configuration" });

  return res.json({
    id: req.params.id,
    updates: input.data,
    audit: { action: "ADMIN_PAYMENT_METHOD_UPDATED", at: new Date().toISOString() }
  });
});

app.post("/api/admin/subscriptions/:id/approve", (req, res) => {
  const schema = z.object({ adminId: z.string().min(1), note: z.string().optional() });
  const input = schema.safeParse(req.body);
  if (!input.success) return res.status(422).json({ error: "Admin id is required" });

  return res.json({
    subscriptionId: req.params.id,
    status: "Approved",
    approvedBy: input.data.adminId,
    audit: { action: "ADMIN_SUBSCRIPTION_APPROVED", note: input.data.note, at: new Date().toISOString() }
  });
});
app.post("/api/billing/checkout", (req, res) => {
  const schema = z.object({
    userId: z.string().min(1),
    planId: z.enum(["free", "pro", "agency"]),
    provider: z.enum(["stripe", "paystack"])
  });
  const input = schema.safeParse(req.body);
  if (!input.success) return res.status(422).json({ error: "Invalid checkout request" });

  if (input.data.planId === "free") {
    return res.json({ status: "active", planId: "free", checkoutUrl: null });
  }

  return res.json({
    status: "checkout_required",
    provider: input.data.provider,
    planId: input.data.planId,
    checkoutUrl: `/billing/checkout/${input.data.provider}/${input.data.planId}`,
    message: "Connect the provider secret key to create a hosted checkout session."
  });
});

app.post("/api/billing/webhooks/:provider", (req, res) => {
  const provider = z.enum(["stripe", "paystack"]).safeParse(req.params.provider);
  if (!provider.success) return res.status(404).json({ error: "Unknown payment provider" });

  return res.json({
    received: true,
    provider: provider.data,
    action: "WEBHOOK_RECORDED",
    message: "Verify provider signatures before enabling this endpoint in production."
  });
});

app.get("/api/admin/overview", (_req, res) => {
  res.json(adminSnapshot);
});

app.patch("/api/admin/users/:id/plan", (req, res) => {
  const schema = z.object({ plan: z.enum(["Free", "Pro", "Agency"]) });
  const input = schema.safeParse(req.body);
  if (!input.success) return res.status(422).json({ error: "Invalid plan" });

  return res.json({
    userId: req.params.id,
    plan: input.data.plan,
    audit: { action: "ADMIN_PLAN_UPDATED", at: new Date().toISOString() }
  });
});

app.post("/api/admin/users/:id/disable", (req, res) => {
  const schema = z.object({ reason: z.string().min(8) });
  const input = schema.safeParse(req.body);
  if (!input.success) return res.status(422).json({ error: "A clear disable reason is required" });

  return res.json({
    userId: req.params.id,
    status: "Disabled",
    audit: { action: "ADMIN_USER_DISABLED", reason: input.data.reason, at: new Date().toISOString() }
  });
});

app.post("/api/projects", (req, res) => {
  const input = createProjectSchema.safeParse(req.body);
  if (!input.success) {
    return res.status(422).json({ error: "Invalid project request", issues: input.error.flatten() });
  }

  const permission = validateClonePermission({
    url: input.data.targetUrl,
    hasPermission: input.data.permissionAccepted
  });

  if (!permission.allowed) {
    return res.status(403).json({ error: permission.reason });
  }

  const id = `project_${Date.now()}`;
  const project = {
    id,
    ...input.data,
    status: "Draft",
    permissionAcceptedAt: new Date().toISOString(),
    progress: ["Validating URL", "Checking permission"],
    audit: [{ action: "PERMISSION_ACCEPTED", at: new Date().toISOString() }]
  };
  generatedProjects.set(id, project);

  return res.status(201).json(project);
});

app.post("/api/projects/:id/assets/plan", (req, res) => {
  const schema = z.object({ url: z.string().url(), html: z.string().min(1) });
  const input = schema.safeParse(req.body);
  if (!input.success) return res.status(422).json({ error: "URL and HTML are required" });

  const assetPlan = buildAssetPipelinePlan([
    {
      url: input.data.url,
      html: input.data.html,
      metadata: createVisualAnalysisFromDomSnapshot({}),
      features: []
    }
  ]);

  return res.json({ projectId: req.params.id, assetPlan });
});

app.post("/api/projects/:id/deployments/auto", (req, res) => {
  const schema = z.object({
    projectName: z.string().min(2),
    github: z.object({
      owner: z.string().min(1),
      repo: z.string().min(1),
      branch: z.string().optional(),
      tokenConfigured: z.boolean().default(false)
    }),
    vercel: z.object({
      projectName: z.string().min(1),
      teamSlug: z.string().optional(),
      tokenConfigured: z.boolean().default(false)
    }),
    render: z.object({
      serviceName: z.string().min(1),
      tokenConfigured: z.boolean().default(false),
      includeBackend: z.boolean().default(false)
    }).optional()
  });
  const input = schema.safeParse(req.body);
  if (!input.success) return res.status(422).json({ error: "Invalid auto-deploy request", issues: input.error.flatten() });

  return res.json(createAutoDeployPlan({ projectId: req.params.id, ...input.data }));
});
app.post("/api/projects/:id/analyze-html", (req, res) => {
  const schema = z.object({ html: z.string().min(1) });
  const input = schema.safeParse(req.body);
  if (!input.success) return res.status(422).json({ error: "HTML is required" });

  const features = analyzeHtmlForFeatures(input.data.html);
  const backendPlan = generateBackendPlan(features);

  return res.json({ features, backendPlan });
});

app.post("/api/projects/:id/manual-verification", (req, res) => {
  const schema = z.object({
    protection: z.string(),
    result: z.enum(["passed", "failed"])
  });
  const input = schema.safeParse(req.body);
  if (!input.success) return res.status(422).json({ error: "Invalid verification result" });

  if (input.data.result === "failed") {
    return res.status(409).json({
      status: "Failed",
      error: "Manual verification failed. Clone stopped without bypassing website protections."
    });
  }

  return res.json({
    status: "Crawling",
    audit: {
      action: "MANUAL_VERIFICATION_COMPLETED",
      protection: input.data.protection,
      at: new Date().toISOString()
    }
  });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`CloneForge API listening on ${port}`);
});




