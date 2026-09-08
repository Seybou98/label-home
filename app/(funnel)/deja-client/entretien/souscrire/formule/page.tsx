"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useContractFunnel } from "@/components/funnel/FunnelContext";
import { contractPlans } from "@/lib/content/entretien";

function StepFormule() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, update } = useContractFunnel();

  useEffect(() => {
    if (!state.equipement) {
      router.replace("/deja-client/entretien/souscrire");
      return;
    }
    const fromQuery = searchParams.get("formule");
    if (fromQuery && !state.formule) update({ formule: fromQuery });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, state.equipement]);

  return (
    <div className="mt-4">
      <h1 className="font-display text-xl text-navy">Choisissez votre formule d&apos;entretien</h1>
      <p className="mt-2 text-sm text-muted">
        Sélectionnez le contrat adapté à vos besoins et à votre budget.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {contractPlans.map((plan) => {
          const selected = state.formule === plan.slug;
          return (
            <button
              key={plan.slug}
              type="button"
              onClick={() => update({ formule: plan.slug })}
              className={`relative rounded-card border bg-white p-5 text-left shadow-card transition ${
                selected ? "border-teal2 ring-2 ring-teal2" : "border-line"
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal2 px-3 py-1 text-[10px] font-extrabold text-white">
                  RECOMMANDÉ
                </span>
              )}
              <h3 className="text-sm font-bold text-navy">{plan.name}</h3>
              <p className="mt-1 text-xs font-semibold text-teal2">{plan.tagline}</p>
              <ul className="mt-3 grid gap-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-muted">
                    <Check className="mt-0.5 shrink-0 text-teal2" size={14} />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-display text-xl text-navy">{plan.priceLabel}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => router.push("/deja-client/entretien/souscrire")}
          className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-xs font-extrabold text-navy"
        >
          <ArrowLeft size={16} /> RETOUR
        </button>
        <button
          type="button"
          disabled={!state.formule}
          onClick={() => router.push("/deja-client/entretien/souscrire/coordonnees")}
          className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#0b5877] to-[#18b9a0] px-5 py-3 text-xs font-extrabold text-white shadow-lg disabled:opacity-50"
        >
          CONTINUER <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function SouscrireFormulePage() {
  return (
    <Suspense>
      <StepFormule />
    </Suspense>
  );
}
