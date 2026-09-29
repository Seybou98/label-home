"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "label-energie-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Stockage indisponible (navigation privée...) : on n'affiche pas la bannière plutôt que de bloquer la page.
    }
  }, []);

  const choose = (value: "accepted" | "refused") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // best-effort
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white p-4 shadow-[0_-4px_20px_rgba(11,39,71,0.1)] sm:p-5">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3 sm:items-center">
          <Cookie size={26} className="hidden shrink-0 text-teal2 sm:block" strokeWidth={1.4} />
          <p className="min-w-0 flex-1 text-[13px] leading-relaxed text-navy">
            Nous utilisons des cookies strictement nécessaires au fonctionnement du site (connexion à
            votre espace client) et, sous réserve de votre accord, des cookies de mesure d&apos;audience.{" "}
            <Link href="/cookies" className="font-semibold text-teal2 underline">
              En savoir plus
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => choose("refused")} className="btn btn-outline flex-1 justify-center py-2.5 text-[13px] sm:flex-none">
            REFUSER
          </button>
          <button type="button" onClick={() => choose("accepted")} className="btn btn-primary flex-1 justify-center py-2.5 text-[13px] sm:flex-none">
            ACCEPTER
          </button>
        </div>
      </div>
    </div>
  );
}
