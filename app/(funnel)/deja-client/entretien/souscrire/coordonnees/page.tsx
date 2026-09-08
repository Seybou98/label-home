"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useContractFunnel } from "@/components/funnel/FunnelContext";

export default function SouscrireCoordonneesPage() {
  const router = useRouter();
  const { state, update } = useContractFunnel();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!state.equipement || !state.formule) {
      router.replace("/deja-client/entretien/souscrire");
    }
  }, [state.equipement, state.formule, router]);

  return (
    <div className="mt-4 rounded-card border border-line bg-white p-6 shadow-card">
      <h1 className="font-display text-xl text-navy">Vos coordonnées</h1>
      <p className="mt-2 text-sm text-muted">
        Ces informations nous permettent d&apos;établir votre contrat et de vous contacter pour
        planifier l&apos;entretien.
      </p>

      <form
        className="mt-6 grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!state.email || !state.telephone || !state.nom || !state.prenom) {
            setError("Merci de renseigner tous les champs obligatoires.");
            return;
          }
          setError(null);
          setSubmitting(true);
          try {
            await fetch("/api/contrats-entretien", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(state),
            });
          } catch {
            // best-effort submission for this scaffold; contract details/backend to be finalized
          } finally {
            setSubmitting(false);
            router.push("/deja-client/entretien/souscrire/confirmation");
          }
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            required
            placeholder="Prénom"
            value={state.prenom}
            onChange={(e) => update({ prenom: e.target.value })}
            className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
          />
          <input
            required
            placeholder="Nom"
            value={state.nom}
            onChange={(e) => update({ nom: e.target.value })}
            className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            required
            type="email"
            placeholder="Adresse e-mail"
            value={state.email}
            onChange={(e) => update({ email: e.target.value })}
            className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
          />
          <input
            required
            type="tel"
            placeholder="Téléphone"
            value={state.telephone}
            onChange={(e) => update({ telephone: e.target.value })}
            className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
          />
        </div>
        <input
          placeholder="Adresse de l'installation"
          value={state.adresse}
          onChange={(e) => update({ adresse: e.target.value })}
          className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Code postal"
            value={state.codePostal}
            onChange={(e) => update({ codePostal: e.target.value })}
            className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
          />
          <input
            placeholder="Ville"
            value={state.ville}
            onChange={(e) => update({ ville: e.target.value })}
            className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
          />
        </div>
        <input
          placeholder="Numéro client (si déjà équipé par Label Énergie)"
          value={state.numeroClient}
          onChange={(e) => update({ numeroClient: e.target.value })}
          className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
        />

        {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

        <div className="mt-2 flex justify-between">
          <button
            type="button"
            onClick={() => router.push("/deja-client/entretien/souscrire/formule")}
            className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-xs font-extrabold text-navy"
          >
            <ArrowLeft size={16} /> RETOUR
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#0b5877] to-[#18b9a0] px-5 py-3 text-xs font-extrabold text-white shadow-lg disabled:opacity-50"
          >
            {submitting ? "ENVOI EN COURS..." : "CONFIRMER MA SOUSCRIPTION"} <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
