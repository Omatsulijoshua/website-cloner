"use client";

import { useState } from "react";
import { LockKeyhole, ShieldAlert, Wand2 } from "lucide-react";
import { Button } from "@cloneforge/ui";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("joshuaomatsuli01@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    setLoading(false);
    if (!response.ok) {
      setError("Invalid admin email or password.");
      return;
    }

    window.location.href = "/";
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-md bg-white shadow-soft lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-ink p-6 text-paper md:p-8">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-paper text-ink"><Wand2 size={22} /></div>
          <h1 className="mt-8 text-4xl font-semibold">Admin login</h1>
          <p className="mt-4 leading-7 text-paper/72">Only approved administrators can manage subscriptions, payment methods, users, and deployments.</p>
          <div className="mt-8 rounded-md border border-paper/12 bg-paper/6 p-4 text-sm text-paper/70">
            <ShieldAlert className="mb-3 text-gold" />
            Keep this login private. In production, move the password to `ADMIN_PASSWORD` in Vercel environment variables.
          </div>
        </div>
        <form className="p-6 md:p-8" onSubmit={login}>
          <div className="mb-6 flex items-center gap-3"><LockKeyhole className="text-ember" /><h2 className="text-2xl font-semibold">Login</h2></div>
          <label className="grid gap-2 text-sm font-medium">
            Admin email
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-md border border-ink/10 bg-paper px-3 py-3 outline-none focus:border-ember" />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-medium">
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="rounded-md border border-ink/10 bg-paper px-3 py-3 outline-none focus:border-ember" placeholder="Enter admin password" />
          </label>
          {error ? <p className="mt-4 rounded-md bg-ember/10 p-3 text-sm font-semibold text-ember">{error}</p> : null}
          <Button className="mt-6 w-full" icon={<LockKeyhole size={16} />} disabled={loading}>{loading ? "Checking..." : "Login to admin"}</Button>
        </form>
      </section>
    </main>
  );
}
