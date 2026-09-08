"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useContractFunnel } from "@/components/funnel/FunnelContext";
import { contractPlans, equipmentTypes } from "@/lib/content/entretien";

export default function SouscrireConfirmationPage() {
  const router = useRouter();
  const { state, reset } = useContractFunnel();

  useEffect(() => {
    if (!state.email) {
      router.replace("/deja-client/entretien/souscrire");
    }
  }, [state.email, router]);

  const equipment = equipmentTypes.find((eq) => eq.slug === state.equipement);
  const plan = contractPlans.find((p) => p.slug === state.formule);

  if (!state.email) return null;

  return (
    <div className="mt-4 rounded-card border border-line bg-white p-8 text-center shadow-card">
      <CheckCircle2 className="mx-auto text-teal2" size={48} />
      <h1 className="mt-4 font-display text-2xl text-navy">
        Votre demande de contrat a bien été enregistrée !
      </h1>
      <p className="mt-3 text-sm text-muted">
        Merci {state.prenom}, un conseiller Label Énergie va confirmer votre contrat{" "}
        {plan ? <strong className="text-navy">{plan.name}</strong> : null} et vous recontacter
        sous 48h pour planifier votre premier entretien.
      </p>

      <div className="mx-auto mt-6 max-w-sm rounded-md bg-soft p-4 text-left text-xs text-muted">
        <p>
          <span className="font-bold text-navy">Équipement : </span>
          {equipment?.label ?? "—"}
        </p>
        <p className="mt-1">
          <span className="font-bold text-navy">Formule : </span>
          {plan ? `${plan.name} — ${plan.priceLabel}` : "—"}
        </p>
        <p className="mt-1">
          <span className="font-bold text-navy">Contact : </span>
          {state.email} · {state.telephone}
        </p>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/espace-client"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#0b5877] to-[#18b9a0] px-5 py-3 text-xs font-extrabold text-white shadow-lg"
        >
          ACCÉDER À MON ESPACE CLIENT
        </Link>
        <Link
          href="/"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-md border border-line px-5 py-3 text-xs font-extrabold text-navy"
        >
          RETOUR À L&apos;ACCUEIL
        </Link>
      </div>
    </div>
  );
}
