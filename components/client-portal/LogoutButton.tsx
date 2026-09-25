"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="flex items-center gap-1 text-xs font-semibold text-muted hover:text-navy"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.replace("/connexion");
        router.refresh();
      }}
    >
      <LogOut size={14} /> Déconnexion
    </button>
  );
}
