"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { equipmentTypes } from "@/lib/content/entretien";

export function EquipmentFinder() {
  const router = useRouter();
  const [equipment, setEquipment] = useState("");

  return (
    <div className="rounded-card border border-line bg-white p-6 shadow-card">
      <h2 className="text-sm font-bold text-navy">Votre installation</h2>
      <p className="mt-1 text-xs text-muted">
        Indiquez votre type d&apos;équipement pour voir nos offres d&apos;entretien adaptées.
      </p>

      <form
        className="mt-4 grid gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const params = equipment ? `?equipement=${encodeURIComponent(equipment)}` : "";
          router.push(`/deja-client/entretien/souscrire${params}`);
        }}
      >
        <select
          required
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
        >
          <option value="">Type d&apos;équipement</option>
          {equipmentTypes.map((eq) => (
            <option key={eq.slug} value={eq.slug}>
              {eq.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Marque (optionnel)"
          className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
        />
        <input
          type="text"
          placeholder="Année d'installation (optionnel)"
          className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
        />
        <button type="submit" className="btn btn-primary mt-1 justify-center">
          VOIR LES OFFRES ADAPTÉES <ArrowRight size={16} />
        </button>
      </form>

      <p className="mt-3 flex items-center gap-2 text-[10px] text-muted">
        <ShieldCheck size={14} /> Vos données sont sécurisées et confidentielles.
      </p>
    </div>
  );
}
