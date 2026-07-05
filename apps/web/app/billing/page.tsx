import { CheckCircle2, CreditCard, Crown, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import { paymentMethods, subscriptionPlans } from "@cloneforge/config";
import { Button } from "@cloneforge/ui";

export default function BillingPage() {
  return (
    <main className="min-h-screen px-5 py-6">
      <section className="mx-auto w-full max-w-7xl rounded-md bg-ink p-6 text-paper shadow-soft md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">Subscriptions</p>
            <h1 className="mt-2 text-4xl font-semibold md:text-6xl">Plans and payment</h1>
            <p className="mt-4 max-w-3xl text-paper/72">
              Choose a plan, pay with an admin-configured payment method, then wait for admin approval before cloning unlocks.
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
            <a href="/dashboard#subscription" className="mt-6 block"><Button className="w-full" icon={<CreditCard size={16} />}>Pay and request approval</Button></a>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-md bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-3">
            <Gauge className="text-ember" />
            <h2 className="text-2xl font-semibold">Approval flow</h2>
          </div>
          <div className="grid gap-3">
            {["Pick a plan", "Pay through bank transfer or crypto", "Submit proof in dashboard", "Admin reviews payment", "Cloning unlocks after approval"].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-md border border-ink/10 p-3">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-ink text-sm font-semibold text-paper">{index + 1}</span>
                <span className="text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-3">
            <ShieldCheck className="text-moss" />
            <h2 className="text-2xl font-semibold">Payment methods</h2>
          </div>
          <div className="grid gap-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="rounded-md border border-ink/10 p-4">
                <p className="font-semibold">{method.label}</p>
                {method.type === "bank-transfer" ? (
                  <p className="mt-2 text-sm text-steel">{method.bankName} - {method.accountNumber} - {method.accountName}</p>
                ) : (
                  <p className="mt-2 text-sm text-steel">{method.walletAddress} - {method.network}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
