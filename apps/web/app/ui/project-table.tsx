import { FolderOpen, Settings } from "lucide-react";
import { Button } from "@cloneforge/ui";

export function ProjectTable() {
  return (
    <div className="rounded-md bg-white p-5 shadow-soft">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember">Dashboard</p>
          <h2 className="mt-1 text-2xl font-semibold">Clone projects</h2>
        </div>
        <Button icon={<Settings size={16} />}>Project settings</Button>
      </div>
      <div className="grid min-h-48 place-items-center rounded-md border border-dashed border-ink/15 bg-paper p-6 text-center">
        <div>
          <FolderOpen className="mx-auto text-steel" size={34} />
          <p className="mt-4 font-semibold">No clone projects yet</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-steel">
            After subscription approval, created clone projects will appear here with GitHub, Vercel, and Render deployment links.
          </p>
        </div>
      </div>
    </div>
  );
}
