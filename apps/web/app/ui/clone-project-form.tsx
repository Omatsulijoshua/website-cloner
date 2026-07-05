"use client";

import { useState } from "react";
import { Globe2, Play, ShieldCheck } from "lucide-react";
import { Button } from "@cloneforge/ui";

export function CloneProjectForm() {
  const [permission, setPermission] = useState(false);

  return (
    <form className="glass rounded-md p-5 shadow-soft md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember">New Clone Project</p>
          <h2 className="mt-2 text-3xl font-semibold">Start an authorized rebuild</h2>
        </div>
        <Globe2 className="text-moss" />
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium">
          Website URL
          <input className="rounded-md border border-ink/10 bg-white px-3 py-3 outline-none focus:border-ember" placeholder="https://example.com" />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Project name
          <input className="rounded-md border border-ink/10 bg-white px-3 py-3 outline-none focus:border-ember" placeholder="Example rebuild" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Framework
            <select className="rounded-md border border-ink/10 bg-white px-3 py-3 outline-none focus:border-ember">
              <option>Next.js + TypeScript</option>
              <option>React + Vite</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Styling
            <select className="rounded-md border border-ink/10 bg-white px-3 py-3 outline-none focus:border-ember">
              <option>Tailwind CSS</option>
              <option>Tailwind + shadcn/ui</option>
            </select>
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Frontend deploy
            <select className="rounded-md border border-ink/10 bg-white px-3 py-3 outline-none focus:border-ember">
              <option>Vercel</option>
              <option>Export only</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Backend
            <select className="rounded-md border border-ink/10 bg-white px-3 py-3 outline-none focus:border-ember">
              <option>Auto-generate if needed, Render default</option>
              <option>Frontend only</option>
              <option>Always generate backend</option>
            </select>
          </label>
        </div>
        <label className="flex gap-3 rounded-md border border-ink/10 bg-white p-4 text-sm leading-6">
          <input
            type="checkbox"
            checked={permission}
            onChange={(event) => setPermission(event.target.checked)}
            className="mt-1 h-4 w-4 accent-ember"
          />
          <span>I own this website or have permission to recreate it.</span>
        </label>
        <Button disabled={!permission} icon={<Play size={16} />} className="w-full">
          Validate and start clone
        </Button>
        <p className="flex items-center gap-2 text-xs leading-5 text-steel">
          <ShieldCheck size={14} />
          Protected pages require manual login or verification in the capture assistant.
        </p>
      </div>
    </form>
  );
}
