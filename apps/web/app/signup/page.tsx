"use client";

import { useState } from "react";
import { ArrowRight, UserPlus, Wand2 } from "lucide-react";
import { Button } from "@cloneforge/ui";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function createAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name || !email || password.length < 8) {
      setError("Enter your name, email, and a password with at least 8 characters.");
      return;
    }

    window.localStorage.setItem("cloneforge_user", JSON.stringify({ name, email, subscriptionStatus: "pending" }));
    window.location.href = "/dashboard";
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-md bg-white shadow-soft lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-ink p-6 text-paper md:p-8">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-paper text-ink"><Wand2 size={22} /></div>
          <h1 className="mt-8 text-4xl font-semibold">Create your account</h1>
          <p className="mt-4 leading-7 text-paper/72">After signup, choose a subscription method and wait for admin approval before cloning unlocks.</p>
        </div>
        <form className="p-6 md:p-8" onSubmit={createAccount}>
          <div className="mb-6 flex items-center gap-3"><UserPlus className="text-ember" /><h2 className="text-2xl font-semibold">Sign up</h2></div>
          <label className="grid gap-2 text-sm font-medium">
            Full name
            <input value={name} onChange={(event) => setName(event.target.value)} className="rounded-md border border-ink/10 bg-paper px-3 py-3 outline-none focus:border-ember" placeholder="Your name" />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-medium">
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-md border border-ink/10 bg-paper px-3 py-3 outline-none focus:border-ember" placeholder="you@example.com" />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-medium">
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="rounded-md border border-ink/10 bg-paper px-3 py-3 outline-none focus:border-ember" placeholder="Create password" />
          </label>
          {error ? <p className="mt-4 rounded-md bg-ember/10 p-3 text-sm font-semibold text-ember">{error}</p> : null}
          <Button className="mt-6 w-full" icon={<ArrowRight size={16} />}>Create account</Button>
          <p className="mt-5 text-center text-sm text-steel">Already have an account? <a className="font-semibold text-ember" href="/login">Login</a></p>
        </form>
      </section>
    </main>
  );
}
