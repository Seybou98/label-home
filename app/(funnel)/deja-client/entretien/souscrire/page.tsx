"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useContractFunnel } from "@/components/funnel/FunnelContext";
import { equipmentTypes } from "@/lib/content/entretien";

function StepEquipement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, update } = useContractFunnel();

  useEffect(() => {
    const fromQuery = searchParams.get("equipement");
    if (fromQuery && !state.equipement) update({ equipement: fromQuery });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="mt-4 rounded-card border border-line bg-white p-6 shadow-card">
      <h1 className="font-display text-xl text-navy">Quel équipement souhaitez-vous entretenir ?</h1>
      <p className="mt-2 text-sm text-muted">
        Sélectionnez votre équipement pour vous proposer les formules les plus adaptées.
      </p>

      <form
        className="mt-6 grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/deja-client/entretien/souscrire/formule");
        }}
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {equipmentTypes.map((eq) => (
            <label
              key={eq.slug}
              className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 text-xs font-semibold ${
                state.equipement === eq.slug ? "border-teal2 bg-soft text-navy" : "border-line text-muted"
              }`}
            >
              <input
                type="radio"
                name="equipement"
                value={eq.slug}
                checked={state.equipement === eq.slug}
                onChange={() => update({ equipement: eq.slug })}
                className="accent-teal2"
              />
              {eq.label}
            </label>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Marque (optionnel)"
            value={state.marque}
            onChange={(e) => update({ marque: e.target.value })}
            className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
          />
          <input
            type="text"
            placeholder="Année d'installation (optionnel)"
            value={state.anneeInstallation}
            onChange={(e) => update({ anneeInstallation: e.target.value })}
            className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
          />
        </div>

        <button type="submit" disabled={!state.equipement} className="btn btn-primary mt-2 justify-center disabled:opacity-50">
          CONTINUER <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}

export default function SouscrireEquipementPage() {
  return (
    <Suspense>
      <StepEquipement />
    </Suspense>
  );
}
