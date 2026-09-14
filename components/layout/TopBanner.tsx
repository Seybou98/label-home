"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function TopBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <Image
          src="/images/logo-prime-removebg-preview.png"
          alt=""
          width={20}
          height={20}
          className="topbar-home"
        />
        <strong>MaPrimeRénov&apos;</strong> évolue en 2026 : nouvelles aides, nouveaux montants.
        <span className="topbar-green">Vérifiez votre éligibilité en 2 minutes.</span>
        <Link href="/aides-financement/calculer-mes-aides" className="topbar-btn">
          Simuler mes aides <ArrowRight size={13} />
        </Link>
        <button
          className="topbar-close"
          aria-label="Fermer le bandeau"
          onClick={() => setVisible(false)}
        >
          ×
        </button>
      </div>
    </div>
  );
}
