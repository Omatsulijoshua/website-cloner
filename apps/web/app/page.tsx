import {
  Activity,
  Bot,
  CheckCircle2,
  CloudOff,
  Code2,
  CreditCard,
  Database,
  GitBranch,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wand2
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@cloneforge/ui";
import { CloneProjectForm } from "./ui/clone-project-form";
import { ProgressRail } from "./ui/progress-rail";
import { ProjectTable } from "./ui/project-table";

const features: Array<[string, string, LucideIcon]> = [
  ["Capture", "Fonts, colors, metadata, assets, sections, buttons, forms, responsive behavior.", Sparkles],
  ["Generate", "Next.js, TypeScript, Tailwind, reusable components, SEO, optimized images.", Code2],
  ["Backend", "Forms, products, blogs, bookings, auth, payments, search, uploads, admin CRUD.", Database],
  ["Deploy", "GitHub commits, Vercel frontend, Render API, environment variables, logs.", Rocket]
];

const policies = [
  "Legal permission required before every clone",
  "Cloudflare and CAPTCHA pause for manual verification",
  "No password, cookie, paywall, or protected data bypass",
  "Sensitive domains blocked by default"
];

export default function HomePage() {
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
          <a href="http://localhost:3002"><Button variant="ghost" icon={<LayoutDashboard size={16} />}>Admin</Button></a>
          <a href="/billing"><Button variant="ghost" icon={<CreditCard size={16} />}>Billing</Button></a>
          <Button variant="ghost" icon={<KeyRound size={16} />}>Settings</Button>
          <Button icon={<LockKeyhole size={16} />}>Sign in</Button>
        </div>
      </nav>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 pb-10 pt-3 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="flex min-h-[560px] flex-col justify-between rounded-md bg-ink p-6 text-paper shadow-soft md:p-8">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-md border border-paper/15 px-3 py-2 text-sm text-paper/80">
              <ShieldCheck size={16} />
              Built for websites you own or have permission to rebuild
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] md:text-7xl">
              CloneForge AI
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/76">
              Analyze public pages, capture authorized login-only pages with a browser assistant, generate clean frontend code, and create a matching backend only when the cloned site needs one.
            </p>
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

        <CloneProjectForm />
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 pb-12 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="glass rounded-md p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember">Live Pipeline</p>
              <h2 className="mt-1 text-2xl font-semibold">Progress tracking</h2>
            </div>
            <Activity className="text-moss" />
          </div>
          <ProgressRail />
        </div>
        <ProjectTable />
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 pb-16 lg:grid-cols-3">
        <div className="rounded-md bg-white p-5 shadow-soft lg:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <Bot className="text-ember" />
            <h2 className="text-2xl font-semibold">AI correction workspace</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_320px]">
            <div className="min-h-[250px] rounded-md border border-ink/10 bg-paper p-5">
              <p className="text-sm font-semibold text-steel">Preview</p>
              <div className="mt-5 rounded-md bg-white p-5 shadow-sm">
                <p className="text-3xl font-semibold">Generated hero section</p>
                <p className="mt-3 max-w-xl leading-7 text-steel">
                  Components are editable and regenerated from user prompts with commit history.
                </p>
                <button className="mt-5 rounded-md bg-ember px-4 py-2 font-semibold text-white transition hover:bg-ink">
                  Premium button
                </button>
              </div>
            </div>
            <div className="rounded-md border border-ink/10 p-4">
              <p className="font-semibold">Prompt correction</p>
              <textarea
                className="mt-3 h-32 w-full resize-none rounded-md border border-ink/10 bg-paper p-3 text-sm outline-none focus:border-ember"
                defaultValue="Make the hero darker and increase button contrast."
              />
              <Button className="mt-3 w-full" icon={<GitBranch size={16} />}>Apply and commit</Button>
            </div>
          </div>
        </div>
        <div className="rounded-md bg-ink p-5 text-paper shadow-soft">
          <CloudOff className="mb-4 text-gold" />
          <h2 className="text-2xl font-semibold">Verification policy</h2>
          <div className="mt-5 space-y-3">
            {policies.map((policy) => (
              <div key={policy} className="flex gap-3 text-sm leading-6 text-paper/76">
                <CheckCircle2 className="mt-1 shrink-0 text-gold" size={16} />
                <span>{policy}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}



