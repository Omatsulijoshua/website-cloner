import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  Database,
  Globe2,
  LayoutDashboard,
  LockKeyhole,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wand2
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@cloneforge/ui";

const features: Array<[string, string, LucideIcon]> = [
  ["Analyze", "Capture typography, colors, layouts, metadata, assets, forms, and responsive behavior.", Sparkles],
  ["Generate", "Rebuild authorized public pages into clean Next.js, TypeScript, and Tailwind code.", Code2],
  ["Backend", "Detect forms, products, blogs, bookings, auth, uploads, and admin CRUD needs.", Database],
  ["Deploy", "Prepare GitHub, Vercel, Render, database, queue, and worker deployment paths.", Rocket]
];

const safeguards = [
  "Legal permission is required before any clone starts",
  "Subscription must be approved by admin before cloning is unlocked",
  "Cloudflare, CAPTCHA, and login pages pause for manual verification",
  "Sensitive and phishing-risk domains are blocked by default"
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-ink text-paper">
            <Wand2 size={21} />
          </div>
          <div>
            <p className="text-lg font-semibold leading-tight">CloneForge AI</p>
            <p className="text-xs text-steel">Authorized website recreation</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <a href="/login"><Button variant="ghost" icon={<LockKeyhole size={16} />}>Login</Button></a>
          <a href="/signup"><Button icon={<ArrowRight size={16} />}>Sign up</Button></a>
        </div>
      </nav>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 pb-10 pt-3 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex min-h-[610px] flex-col justify-between rounded-md bg-ink p-6 text-paper shadow-soft md:p-8">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-md border border-paper/15 px-3 py-2 text-sm text-paper/80">
              <ShieldCheck size={16} />
              Permission-first cloning with admin-approved access
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
              CloneForge AI
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/76">
              Recreate websites you own or have permission to rebuild, generate editable frontend code, and create matching backend systems when the site needs dynamic features.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/signup"><Button icon={<ArrowRight size={16} />}>Create account</Button></a>
              <a href="/login"><Button variant="secondary" icon={<LockKeyhole size={16} />}>Login</Button></a>
            </div>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {features.map(([title, text, Icon]) => (
              <div key={title} className="rounded-md border border-paper/12 bg-paper/6 p-4">
                <Icon className="mb-4 text-gold" size={22} />
                <p className="font-semibold">{title}</p>
                <p className="mt-2 text-sm leading-6 text-paper/68">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="glass rounded-md p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember">How access works</p>
                <h2 className="mt-2 text-3xl font-semibold">Subscribe, submit proof, wait for admin approval</h2>
              </div>
              <LayoutDashboard className="text-moss" />
            </div>
            <div className="grid gap-3">
              {["Create your account", "Choose a subscription", "Pay by bank transfer or crypto", "Admin approves your subscription", "Clone tools unlock in your dashboard"].map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-md bg-white p-3 text-sm shadow-sm">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-ink font-semibold text-paper">{index + 1}</span>
                  <span className="font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-center gap-3">
              <Bot className="text-ember" />
              <h2 className="text-2xl font-semibold">Built-in safeguards</h2>
            </div>
            <div className="space-y-3">
              {safeguards.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-steel">
                  <CheckCircle2 className="mt-1 shrink-0 text-moss" size={16} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md bg-paper p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <Globe2 className="text-moss" />
              <p className="font-semibold">Dashboard preview</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-steel">
              The cloning workspace, configuration, and subscription payment instructions are inside the logged-in dashboard sidebar.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
