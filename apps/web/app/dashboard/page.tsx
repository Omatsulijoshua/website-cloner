import {
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Home,
  KeyRound,
  LockKeyhole,
  Settings,
  ShieldCheck,
  Wand2
} from "lucide-react";
import { paymentMethods } from "@cloneforge/config";
import { Button } from "@cloneforge/ui";
import { CloneProjectForm } from "../ui/clone-project-form";
import { ProgressRail } from "../ui/progress-rail";
import { ProjectTable } from "../ui/project-table";

const subscriptionApproved = false;

export default function DashboardPage() {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="bg-ink p-5 text-paper lg:min-h-screen">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-paper text-ink">
            <Wand2 size={20} />
          </div>
          <div>
            <p className="font-semibold">CloneForge AI</p>
            <p className="text-xs text-paper/60">User dashboard</p>
          </div>
        </div>
        <nav className="mt-8 grid gap-2">
          <a href="#home" className="flex items-center gap-3 rounded-md bg-paper/10 px-3 py-3 text-sm font-semibold"><Home size={17} /> Home</a>
          <a href="#configuration" className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-paper/72 hover:bg-paper/10"><Settings size={17} /> Configuration</a>
          <a href="#subscription" className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-paper/72 hover:bg-paper/10"><CreditCard size={17} /> Subscription</a>
        </nav>
        <div className="mt-8 rounded-md border border-paper/12 bg-paper/6 p-4">
          <p className="text-sm font-semibold">Subscription status</p>
          <p className="mt-2 inline-flex rounded-md bg-gold/15 px-2 py-1 text-xs font-semibold text-gold">Pending admin approval</p>
          <p className="mt-3 text-xs leading-5 text-paper/62">Cloning unlocks only after admin approves your payment.</p>
        </div>
      </aside>

      <section className="px-5 py-6">
        <section id="home" className="mx-auto max-w-7xl">
          <div className="rounded-md bg-white p-5 shadow-soft md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember">Home</p>
                <h1 className="mt-2 text-3xl font-semibold">Clone workspace</h1>
                <p className="mt-2 max-w-2xl leading-7 text-steel">Create authorized clone projects after your subscription is approved.</p>
              </div>
              <ShieldCheck className="text-moss" />
            </div>
          </div>

          {!subscriptionApproved && (
            <div className="mt-5 rounded-md border border-ember/25 bg-white p-5 shadow-soft">
              <div className="flex gap-3">
                <LockKeyhole className="mt-1 shrink-0 text-ember" />
                <div>
                  <h2 className="text-xl font-semibold">Cloning is locked</h2>
                  <p className="mt-2 leading-7 text-steel">Submit your subscription payment details below. Admin must approve the subscription before you can use website cloning, AI correction, backend generation, deployment, or export tools.</p>
                </div>
              </div>
            </div>
          )}

          <div className={subscriptionApproved ? "mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]" : "pointer-events-none mt-5 grid gap-5 opacity-45 xl:grid-cols-[0.95fr_1.05fr]"}>
            <CloneProjectForm />
            <div className="grid gap-5">
              <div className="glass rounded-md p-5 shadow-soft">
                <h2 className="text-2xl font-semibold">Progress</h2>
                <div className="mt-4"><ProgressRail /></div>
              </div>
              <ProjectTable />
            </div>
          </div>
        </section>

        <section id="configuration" className="mx-auto mt-8 max-w-7xl rounded-md bg-white p-5 shadow-soft md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <KeyRound className="text-ember" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember">Configuration</p>
              <h2 className="text-2xl font-semibold">Connection settings</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {["OpenAI API key", "GitHub token", "Vercel token", "Render API key"].map((label) => (
              <label key={label} className="grid gap-2 text-sm font-medium">
                {label}
                <input className="rounded-md border border-ink/10 bg-paper px-3 py-3 outline-none focus:border-ember" placeholder="Encrypted after saving" />
              </label>
            ))}
          </div>
          <Button className="mt-5" icon={<Settings size={16} />}>Save configuration</Button>
        </section>

        <section id="subscription" className="mx-auto mt-8 max-w-7xl rounded-md bg-white p-5 shadow-soft md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <CreditCard className="text-moss" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember">Subscription</p>
              <h2 className="text-2xl font-semibold">Payment methods and approval</h2>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {paymentMethods.map((method) => (
              <div key={method.id} className="rounded-md border border-ink/10 bg-paper p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-steel">{method.label}</p>
                {method.type === "bank-transfer" ? (
                  <div className="mt-4 grid gap-2 text-sm">
                    <p><span className="font-semibold">Bank:</span> {method.bankName}</p>
                    <p><span className="font-semibold">Account number:</span> {method.accountNumber}</p>
                    <p><span className="font-semibold">Account name:</span> {method.accountName}</p>
                  </div>
                ) : (
                  <div className="mt-4 grid gap-2 text-sm">
                    <p><span className="font-semibold">Wallet:</span> {method.walletAddress}</p>
                    <p><span className="font-semibold">Network:</span> {method.network}</p>
                  </div>
                )}
                <p className="mt-4 text-sm leading-6 text-steel">{method.instructions}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-md border border-ink/10 p-4">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="text-ember" />
              <h3 className="font-semibold">Submit payment proof</h3>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input className="rounded-md border border-ink/10 bg-paper px-3 py-3 outline-none focus:border-ember" placeholder="Payment reference or transaction hash" />
              <select className="rounded-md border border-ink/10 bg-paper px-3 py-3 outline-none focus:border-ember">
                <option>Bank transfer</option>
                <option>Crypto wallet</option>
              </select>
            </div>
            <textarea className="mt-4 h-24 w-full resize-none rounded-md border border-ink/10 bg-paper p-3 outline-none focus:border-ember" placeholder="Notes for admin" />
            <Button className="mt-4" icon={<CheckCircle2 size={16} />}>Submit for admin approval</Button>
          </div>
        </section>
      </section>
    </main>
  );
}
