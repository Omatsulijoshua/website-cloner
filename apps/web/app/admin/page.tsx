import { ExternalLink, ShieldAlert } from "lucide-react";
import { Button } from "@cloneforge/ui";

const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL ?? "http://localhost:3002";

export default function AdminMovedPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <section className="w-full max-w-2xl rounded-md bg-white p-6 text-center shadow-soft md:p-8">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-ink text-paper">
          <ShieldAlert size={24} />
        </div>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-ember">Admin moved</p>
        <h1 className="mt-2 text-3xl font-semibold">The admin dashboard now runs separately</h1>
        <p className="mt-4 leading-7 text-steel">
          Admin has been split into its own app folder for separate development and deployment.
        </p>
        <a className="mt-6 inline-flex" href={adminUrl}>
          <Button icon={<ExternalLink size={16} />}>Open admin app</Button>
        </a>
      </section>
    </main>
  );
}
