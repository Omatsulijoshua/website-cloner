import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CloneForge Admin | Platform Control Center",
  description: "Admin dashboard for CloneForge AI users, plans, usage, abuse reviews, and deployment limits."
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
