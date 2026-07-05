import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),
  APP_URL: z.string().url().default("http://localhost:3000"),
  API_URL: z.string().url().default("http://localhost:4000"),
  ENCRYPTION_KEY: z.string().min(24).optional(),
  OPENAI_API_KEY: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  VERCEL_TOKEN: z.string().optional(),
  RENDER_API_KEY: z.string().optional()
});

export type AppEnv = z.infer<typeof envSchema>;

export function readEnv(source: NodeJS.ProcessEnv = process.env): AppEnv {
  return envSchema.parse(source);
}

export const cloneStatuses = [
  "Draft",
  "Crawling",
  "Building",
  "AI Fixing",
  "Ready",
  "Deployed",
  "Failed",
  "Paused For Verification"
] as const;

export type CloneStatus = (typeof cloneStatuses)[number];

export const subscriptionPlans = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    cloneAttempts: 3,
    aiCorrections: 10,
    seats: 1,
    support: "Community",
    features: ["Public page capture", "Frontend export", "Manual verification logs"]
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 29,
    cloneAttempts: 40,
    aiCorrections: 250,
    seats: 3,
    support: "Priority",
    features: ["GitHub auto-push", "Vercel deploys", "Render backend generation", "Prompt correction history"]
  },
  {
    id: "agency",
    name: "Agency",
    priceMonthly: 149,
    cloneAttempts: 250,
    aiCorrections: 2500,
    seats: 15,
    support: "Dedicated",
    features: ["High-limit cloning", "Team seats", "Admin controls", "Deployment limits", "Abuse monitoring"]
  }
] as const;

export type SubscriptionPlanId = (typeof subscriptionPlans)[number]["id"];

export function getSubscriptionPlan(planId: SubscriptionPlanId) {
  return subscriptionPlans.find((plan) => plan.id === planId);
}

export const paymentMethods = [
  {
    id: "opay-bank",
    type: "bank-transfer",
    label: "Bank transfer",
    bankName: "Opay",
    accountNumber: "8158075936",
    accountName: "Joshua Toritseju Omatsuli",
    instructions: "Send payment, then upload or paste proof of payment for admin approval."
  },
  {
    id: "crypto-wallet",
    type: "crypto",
    label: "Crypto wallet",
    walletAddress: "Configure wallet address in admin",
    network: "Configure network in admin",
    instructions: "Send crypto payment only to the admin-configured wallet and include transaction hash."
  }
] as const;

export type PaymentMethodId = (typeof paymentMethods)[number]["id"];

export const sensitiveDomainRules = [
  "bank",
  "paypal",
  "stripe",
  "coinbase",
  "binance",
  "kraken",
  "gov",
  "gmail",
  "outlook",
  "facebook",
  "instagram",
  "x.com",
  "twitter",
  "linkedin",
  "appleid",
  "icloud"
];

export function isSensitiveCloneTarget(hostname: string) {
  const host = hostname.toLowerCase();
  return sensitiveDomainRules.some((rule) => host.includes(rule));
}
