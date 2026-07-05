import { ArrowRight, UserPlus, Wand2 } from "lucide-react";
import { Button } from "@cloneforge/ui";

export default function SignupPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-md bg-white shadow-soft lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-ink p-6 text-paper md:p-8">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-paper text-ink">
            <Wand2 size={22} />
          </div>
          <h1 className="mt-8 text-4xl font-semibold">Create your account</h1>
          <p className="mt-4 leading-7 text-paper/72">
            After signup, choose a subscription method and wait for admin approval before cloning unlocks.
          </p>
        </div>
        <form className="p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <UserPlus className="text-ember" />
            <h2 className="text-2xl font-semibold">Sign up</h2>
          </div>
          <label className="grid gap-2 text-sm font-medium">
            Full name
            <input className="rounded-md border border-ink/10 bg-paper px-3 py-3 outline-none focus:border-ember" placeholder="Your name" />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-medium">
            Email
            <input className="rounded-md border border-ink/10 bg-paper px-3 py-3 outline-none focus:border-ember" placeholder="you@example.com" />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-medium">
            Password
            <input type="password" className="rounded-md border border-ink/10 bg-paper px-3 py-3 outline-none focus:border-ember" placeholder="Create password" />
          </label>
          <a href="/dashboard" className="mt-6 block">
            <Button className="w-full" icon={<ArrowRight size={16} />}>Create account</Button>
          </a>
          <p className="mt-5 text-center text-sm text-steel">
            Already have an account? <a className="font-semibold text-ember" href="/login">Login</a>
          </p>
        </form>
      </section>
    </main>
  );
}
