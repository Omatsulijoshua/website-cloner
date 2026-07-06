import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  Ban,
  Banknote,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Database,
  Gauge,
  ShieldAlert,
  Wallet,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { paymentMethods } from "@cloneforge/config";
import { Button } from "@cloneforge/ui";

const metrics: Array<[string, string, string, LucideIcon]> = [
  ["Users", "0", "No accounts yet", Users],
  ["Clone jobs", "0", "No jobs yet", Activity],
  ["AI spend", "$0", "No usage yet", CircleDollarSign],
  ["Pending subs", "0", "Queue empty", AlertTriangle]
];

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="grid min-h-40 place-items-center rounded-md border border-dashed border-ink/15 bg-paper p-6 text-center">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-2 max-w-md text-sm leading-6 text-steel">{text}</p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  if (cookies().get("cloneforge_admin")?.value !== "authenticated") {
    redirect("/login");
  }

  return (
    <main className="min-h-screen px-5 py-6">
      <section className="mx-auto w-full max-w-7xl rounded-md bg-ink p-6 text-paper shadow-soft md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">Admin Console</p>
            <h1 className="mt-2 text-4xl font-semibold md:text-6xl">Platform control center</h1>
            <p className="mt-4 max-w-3xl text-paper/72">
              Approve subscriptions, configure payment methods, manage users, review clone activity, and control platform limits.
            </p>
          </div>
          <ShieldAlert size={36} className="text-gold" />
        </div>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([label, value, trend, Icon]) => (
          <div key={label} className="rounded-md bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-steel">{label}</p>
              <Icon className="text-ember" size={20} />
            </div>
            <p className="mt-4 text-3xl font-semibold">{value}</p>
            <p className="mt-1 text-sm text-steel">{trend}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-md bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-moss" />
              <h2 className="text-2xl font-semibold">Subscription approvals</h2>
            </div>
            <Button icon={<CheckCircle2 size={16} />}>Approve selected</Button>
          </div>
          <EmptyState title="No subscription requests" text="When users submit payment proof, requests will appear here for approval." />
        </div>

        <div className="rounded-md bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-3">
            <Wallet className="text-ember" />
            <h2 className="text-2xl font-semibold">Payment configuration</h2>
          </div>
          <div className="grid gap-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="rounded-md border border-ink/10 p-4">
                <div className="mb-3 flex items-center gap-2">
                  {method.type === "bank-transfer" ? <Banknote size={18} className="text-moss" /> : <Wallet size={18} className="text-moss" />}
                  <p className="font-semibold">{method.label}</p>
                </div>
                {method.type === "bank-transfer" ? (
                  <div className="grid gap-2">
                    <input className="rounded-md border border-ink/10 bg-paper px-3 py-2 text-sm" defaultValue={method.bankName} />
                    <input className="rounded-md border border-ink/10 bg-paper px-3 py-2 text-sm" defaultValue={method.accountNumber} />
                    <input className="rounded-md border border-ink/10 bg-paper px-3 py-2 text-sm" defaultValue={method.accountName} />
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <input className="rounded-md border border-ink/10 bg-paper px-3 py-2 text-sm" defaultValue={method.walletAddress} />
                    <input className="rounded-md border border-ink/10 bg-paper px-3 py-2 text-sm" defaultValue={method.network} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <Button className="mt-4" icon={<Wallet size={16} />}>Save payment methods</Button>
        </div>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-md bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users className="text-ember" />
              <h2 className="text-2xl font-semibold">Users and plans</h2>
            </div>
            <Button variant="secondary" icon={<Ban size={16} />}>Disable selected</Button>
          </div>
          <EmptyState title="No users yet" text="Registered users will appear here with plan and approval status." />
        </div>

        <div className="rounded-md bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-3">
            <BarChart3 className="text-moss" />
            <h2 className="text-2xl font-semibold">Limits and abuse controls</h2>
          </div>
          <div className="grid gap-3">
            {["Free clone attempts: 3", "Pro clone attempts: 40", "Agency clone attempts: 250", "AI spend cap: $750", "Sensitive domain blocklist: on"].map((setting) => (
              <div key={setting} className="flex items-center justify-between rounded-md border border-ink/10 p-3">
                <span className="text-sm font-semibold">{setting}</span>
                <span className="rounded-md bg-paper px-2 py-1 text-xs text-steel">Editable</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-md bg-ink p-5 text-paper shadow-soft">
          <div className="mb-4 flex items-center gap-3"><Gauge className="text-gold" /><h2 className="text-2xl font-semibold">Usage statistics</h2></div>
          {["Clone attempts", "AI corrections", "Vercel deployments", "Render builds"].map((item) => (
            <div key={item} className="mt-4">
              <div className="flex justify-between text-sm text-paper/76"><span>{item}</span><span>0</span></div>
              <div className="mt-2 h-2 rounded-full bg-paper/15"><div className="h-2 rounded-full bg-gold" style={{ width: "0%" }} /></div>
            </div>
          ))}
        </div>
        <div className="rounded-md bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-3"><Database className="text-ember" /><h2 className="text-2xl font-semibold">Clone review queue</h2></div>
          <EmptyState title="No clone reviews" text="Flagged jobs, manual verification events, and sensitive-domain review items will appear here." />
        </div>
      </section>
    </main>
  );
}
