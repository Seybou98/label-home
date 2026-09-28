"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { contractPlans, equipmentTypes, formatEuro } from "@/lib/content/entretien";

type Summary = { number: string; formule: string; products: string[]; monthly: number; email: string };

// Résumé enregistré par l'assistant juste après l'envoi du contrat (le contexte du tunnel est alors vidé).
const CONFIRMATION_KEY = "label-energie-souscription-confirmation";

export default function SouscrireConfirmationPage() {
  const [summary, setSummary] = useState<Summary | null | undefined>(undefined);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CONFIRMATION_KEY);
      setSummary(raw ? (JSON.parse(raw) as Summary) : null);
    } catch {
      setSummary(null);
    }
  }, []);

  if (summary === undefined) return null;

  const plan = contractPlans.find((p) => p.slug === summary?.formule);

  return (
    <div className="mt-4 rounded-card border border-line bg-white p-8 text-center shadow-card">
      <CheckCircle2 className="mx-auto text-teal2" size={48} />
      <h1 className="mt-4 font-display text-2xl text-navy">Votre contrat a bien été envoyé !</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {summary ? (
          <>
            Vous allez recevoir votre contrat à <strong className="text-navy">{summary.email}</strong> pour signature
            électronique. Une fois signé, un lien sécurisé GoCardless vous permettra de mettre en place votre prélèvement
            mensuel.
          </>
        ) : (
          <>Vous allez recevoir votre contrat par e-mail pour signature électronique.</>
        )}
      </p>

      {summary && (
        <div className="mx-auto mt-6 max-w-sm rounded-md bg-soft p-4 text-left text-xs text-muted">
          <p>
            <span className="font-bold text-navy">Contrat : </span>
            {summary.number}
          </p>
          <p className="mt-1">
            <span className="font-bold text-navy">Formule : </span>
            {plan?.name ?? summary.formule}
          </p>
          <p className="mt-1">
            <span className="font-bold text-navy">Équipements : </span>
            {summary.products.map((id) => equipmentTypes.find((e) => e.slug === id)?.label ?? id).join(", ")}
          </p>
          <p className="mt-1">
            <span className="font-bold text-navy">Mensualité : </span>
            {formatEuro(summary.monthly)} TTC
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/espace-client/contrats" className="btn btn-primary justify-center">
          VOIR MES CONTRATS
        </Link>
        <Link href="/" className="btn btn-outline justify-center">
          RETOUR À L&apos;ACCUEIL
        </Link>
      </div>
    </div>
  );
}
