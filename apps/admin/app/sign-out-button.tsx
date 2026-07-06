"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@cloneforge/ui";

export function SignOutButton() {
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <Button
      type="button"
      variant="secondary"
      icon={<LogOut size={16} />}
      disabled={loading}
      onClick={signOut}
    >
      {loading ? "Signing out..." : "Sign out"}
    </Button>
  );
}

