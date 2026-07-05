import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CloneForge AI | Secure AI Website Recreation",
  description:
    "Clone authorized websites into clean Next.js apps with optional Render backends, GitHub push, Vercel deploys, and human-assisted capture.",
  openGraph: {
    title: "CloneForge AI",
    description:
      "A permission-first AI website cloner for frontend recreation, backend generation, and deployment automation.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
