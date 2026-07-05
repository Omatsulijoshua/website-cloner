import { ExternalLink, Settings } from "lucide-react";
import { Button } from "@cloneforge/ui";

const projects = [
  ["Acme Marketing", "Building", "github.com/acme/rebuild", "vercel.app"],
  ["Nova Booking", "AI Fixing", "github.com/nova/site", "preview pending"],
  ["Studio Shop", "Ready", "github.com/studio/shop", "studio-shop.vercel.app"]
];

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
      <div className="overflow-hidden rounded-md border border-ink/10">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-paper text-steel">
            <tr>
              <th className="p-3 font-semibold">Project</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="hidden p-3 font-semibold md:table-cell">Repository</th>
              <th className="p-3 font-semibold">Deploy</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(([name, status, repo, deploy]) => (
              <tr className="border-t border-ink/10" key={name}>
                <td className="p-3 font-semibold">{name}</td>
                <td className="p-3">
                  <span className="rounded-md bg-moss/12 px-2 py-1 text-xs font-semibold text-moss">{status}</span>
                </td>
                <td className="hidden p-3 text-steel md:table-cell">{repo}</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 text-steel">
                    {deploy}
                    <ExternalLink size={13} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
