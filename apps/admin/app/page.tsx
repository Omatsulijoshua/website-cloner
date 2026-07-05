import {
  Activity,
  AlertTriangle,
  Ban,
  BarChart3,
  CircleDollarSign,
  Database,
  Gauge,
  ShieldAlert,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@cloneforge/ui";

const metrics: Array<[string, string, string, LucideIcon]> = [
  ["Users", "1,284", "+18%", Users],
  ["Clone jobs", "4,912", "+31%", Activity],
  ["AI spend", "$3,842", "72% cap", CircleDollarSign],
  ["Failed jobs", "37", "-9%", AlertTriangle]
];

const users = [
  ["Owner", "owner@cloneforge.ai", "Agency", "Active", "1,840 AI calls"],
  ["Studio Ops", "studio@example.com", "Pro", "Active", "392 AI calls"],
  ["Review Queue", "risk@example.com", "Free", "Limited", "42 AI calls"]
];

const projects = [
  ["Acme Marketing", "Building", "Clear", "studio@example.com"],
  ["Nova Booking", "Paused For Verification", "Manual verification", "owner@cloneforge.ai"],
  ["Blocked Portal", "Failed", "Sensitive domain", "risk@example.com"]
];

export default function AdminPage() {
  return (
    <main className="min-h-screen px-5 py-6">
      <section className="mx-auto w-full max-w-7xl rounded-md bg-ink p-6 text-paper shadow-soft md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">Admin Console</p>
            <h1 className="mt-2 text-4xl font-semibold md:text-6xl">Platform control center</h1>
            <p className="mt-4 max-w-3xl text-paper/72">
              Manage users, plans, usage limits, failed clone logs, deployment quotas, and abuse reviews from one operational view.
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
            <p className="mt-1 text-sm text-moss">{trend}</p>
          </div>
        ))}
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
          <div className="overflow-hidden rounded-md border border-ink/10">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-paper text-steel">
                <tr>
                  <th className="p-3 font-semibold">User</th>
                  <th className="p-3 font-semibold">Plan</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="hidden p-3 font-semibold md:table-cell">Usage</th>
                </tr>
              </thead>
              <tbody>
                {users.map(([name, email, plan, status, usage]) => (
                  <tr key={email} className="border-t border-ink/10">
                    <td className="p-3">
                      <p className="font-semibold">{name}</p>
                      <p className="text-steel">{email}</p>
                    </td>
                    <td className="p-3">{plan}</td>
                    <td className="p-3"><span className="rounded-md bg-moss/12 px-2 py-1 text-xs font-semibold text-moss">{status}</span></td>
                    <td className="hidden p-3 text-steel md:table-cell">{usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <div className="mb-4 flex items-center gap-3">
            <Gauge className="text-gold" />
            <h2 className="text-2xl font-semibold">Usage statistics</h2>
          </div>
          {["Clone attempts", "AI corrections", "Vercel deployments", "Render builds"].map((item, index) => (
            <div key={item} className="mt-4">
              <div className="flex justify-between text-sm text-paper/76">
                <span>{item}</span>
                <span>{[128, 2234, 38, 18][index]}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-paper/15">
                <div className="h-2 rounded-full bg-gold" style={{ width: `${[64, 74, 38, 18][index]}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-md bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-3">
            <Database className="text-ember" />
            <h2 className="text-2xl font-semibold">Clone review queue</h2>
          </div>
          <div className="grid gap-3">
            {projects.map(([name, status, risk, owner]) => (
              <div key={name} className="grid gap-2 rounded-md border border-ink/10 p-4 md:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="mt-1 text-sm text-steel">{owner}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm font-semibold">{status}</p>
                  <p className="mt-1 text-sm text-ember">{risk}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
