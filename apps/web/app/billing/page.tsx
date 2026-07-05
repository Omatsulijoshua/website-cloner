import { CheckCircle2, CreditCard, Crown, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import { subscriptionPlans } from "@cloneforge/config";
import { Button } from "@cloneforge/ui";

const providerRows = [
  ["Stripe", "Global cards, invoices, webhooks, customer portal"],
  ["Paystack", "Africa-focused cards, bank transfer, mobile money, webhooks"]
];

export default function BillingPage() {
  return (
    <main className="min-h-screen px-5 py-6">
      <section className="mx-auto w-full max-w-7xl rounded-md bg-ink p-6 text-paper shadow-soft md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">Subscriptions</p>
            <h1 className="mt-2 text-4xl font-semibold md:text-6xl">Plans and billing</h1>
            <p className="mt-4 max-w-3xl text-paper/72">
              Gate clone attempts, AI corrections, deployment automation, team seats, and support level without slowing down the creation workflow.
            </p>
          </div>
          <CreditCard size={34} className="text-gold" />
        </div>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-4 lg:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <div key={plan.id} className="rounded-md bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember">{plan.name}</p>
                <p className="mt-3 text-4xl font-semibold">${plan.priceMonthly}<span className="text-base text-steel">/mo</span></p>
              </div>
              {plan.id === "agency" ? <Crown className="text-gold" /> : <Sparkles className="text-moss" />}
            </div>
            <div className="mt-5 grid gap-2 text-sm text-steel">
              <p>{plan.cloneAttempts} clone attempts per month</p>
              <p>{plan.aiCorrections} AI corrections per month</p>
              <p>{plan.seats} seat{plan.seats === 1 ? "" : "s"}</p>
              <p>{plan.support} support</p>
            </div>
            <div className="mt-5 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex gap-2 text-sm leading-6">
                  <CheckCircle2 size={16} className="mt-1 shrink-0 text-moss" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button className="mt-6 w-full" icon={<CreditCard size={16} />}>
              {plan.id === "free" ? "Start free" : "Choose plan"}
            </Button>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-md bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-3">
            <Gauge className="text-ember" />
            <h2 className="text-2xl font-semibold">Usage controls</h2>
          </div>
          <div className="grid gap-3">
            {["Clone attempts", "AI corrections", "Deployment jobs", "Render backend builds"].map((item, index) => (
              <div key={item} className="rounded-md border border-ink/10 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{item}</span>
                  <span className="text-steel">{[68, 42, 24, 12][index]}% used</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-paper">
                  <div className="h-2 rounded-full bg-ember" style={{ width: `${[68, 42, 24, 12][index]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-3">
            <ShieldCheck className="text-moss" />
            <h2 className="text-2xl font-semibold">Payment providers</h2>
          </div>
          <div className="grid gap-3">
            {providerRows.map(([provider, details]) => (
              <div key={provider} className="flex items-center justify-between gap-4 rounded-md border border-ink/10 p-4">
                <div>
                  <p className="font-semibold">{provider}</p>
                  <p className="mt-1 text-sm text-steel">{details}</p>
                </div>
                <span className="rounded-md bg-moss/12 px-2 py-1 text-xs font-semibold text-moss">Ready</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
