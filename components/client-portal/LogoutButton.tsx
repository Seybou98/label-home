"use client";

import { LogOut } from "lucide-react";

/** Termine la session (cookie supprimé côté serveur) puis recharge la page de connexion. */
export async function logout() {
  try {
    await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
  } finally {
    // Navigation complète : purge le cache du routeur, la session ne peut pas rester affichée.
    window.location.assign("/connexion");
  }
}

export function LogoutButton() {
  return (
    <button
      type="button"
      aria-label="Déconnexion"
      className="flex items-center gap-1 text-xs font-semibold text-muted hover:text-navy"
      onClick={logout}
    >
      <LogOut size={14} aria-hidden /> <span className="hidden sm:inline">Déconnexion</span>
    </button>
  );
}
