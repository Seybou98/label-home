"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Stepper } from "@/components/funnel/Stepper";

const needs = [
  { slug: "pompe-a-chaleur", label: "Réduire ma facture de chauffage" },
  { slug: "climatisation", label: "Climatiser mon logement" },
  { slug: "panneaux-photovoltaiques", label: "Produire mon électricité" },
  { slug: "chauffe-eau-thermodynamique", label: "Réduire le coût de mon eau chaude" },
  { slug: "renovation-energetique-globale", label: "Rénovation énergétique globale" },
  { slug: "autre", label: "Je ne sais pas, je souhaite être conseillé" },
];

export default function SimulerMonProjetPage() {
  const [step, setStep] = useState(1);
  const [need, setNeed] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [contact, setContact] = useState({ prenom: "", email: "", telephone: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container max-w-2xl py-4">
      <p className="text-center text-[11px] font-extrabold tracking-wide text-teal2">
        SIMULATION GRATUITE
      </p>
      <Stepper current={step} />

      {step === 1 && (
        <div className="mt-4 rounded-card border border-line bg-white p-6 shadow-card">
          <h1 className="font-display text-xl text-navy">Quel est votre projet ?</h1>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {needs.map((n) => (
              <label
                key={n.slug}
                className={`flex min-h-[140px] cursor-pointer items-center gap-4 rounded-lg border p-5 text-sm font-semibold ${
                  need === n.slug ? "border-teal2 bg-soft text-navy" : "border-line text-muted"
                }`}
              >
                <input
                  type="radio"
                  name="need"
                  value={n.slug}
                  checked={need === n.slug}
                  onChange={() => setNeed(n.slug)}
                  className="h-4 w-4 accent-teal2"
                />
                {n.label}
              </label>
            ))}
          </div>
          <button
            type="button"
            disabled={!need}
            onClick={() => setStep(2)}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#0b5877] to-[#18b9a0] px-5 py-3 text-xs font-extrabold text-white shadow-lg disabled:opacity-50"
          >
            CONTINUER <ArrowRight size={16} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-4 rounded-card border border-line bg-white p-6 shadow-card">
          <h1 className="font-display text-xl text-navy">Où se situe votre logement ?</h1>
          <input
            placeholder="Code postal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            inputMode="numeric"
            className="mt-5 w-full rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
          />
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-xs font-extrabold text-navy"
            >
              <ArrowLeft size={16} /> RETOUR
            </button>
            <button
              type="button"
              disabled={postalCode.length < 4}
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#0b5877] to-[#18b9a0] px-5 py-3 text-xs font-extrabold text-white shadow-lg disabled:opacity-50"
            >
              CONTINUER <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && !submitted && (
        <div className="mt-4 rounded-card border border-line bg-white p-6 shadow-card">
          <h1 className="font-display text-xl text-navy">Vos coordonnées</h1>
          <p className="mt-2 text-sm text-muted">
            Pour vous envoyer votre estimation personnalisée et les aides auxquelles vous avez
            droit.
          </p>
          <form
            className="mt-5 grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              required
              placeholder="Prénom"
              value={contact.prenom}
              onChange={(e) => setContact({ ...contact, prenom: e.target.value })}
              className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
            />
            <input
              required
              type="email"
              placeholder="Adresse e-mail"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
            />
            <input
              required
              type="tel"
              placeholder="Téléphone"
              value={contact.telephone}
              onChange={(e) => setContact({ ...contact, telephone: e.target.value })}
              className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
            />
            <div className="mt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-xs font-extrabold text-navy"
              >
                <ArrowLeft size={16} /> RETOUR
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#0b5877] to-[#18b9a0] px-5 py-3 text-xs font-extrabold text-white shadow-lg"
              >
                VOIR MON ESTIMATION <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 3 && submitted && (
        <div className="mt-4 rounded-card border border-line bg-white p-8 text-center shadow-card">
          <CheckCircle2 className="mx-auto text-teal2" size={48} />
          <h1 className="mt-4 font-display text-2xl text-navy">Merci {contact.prenom} !</h1>
          <p className="mt-3 text-sm text-muted">
            Un conseiller Label Énergie va étudier votre projet et vous recontacter très
            prochainement avec une estimation personnalisée et le détail des aides disponibles.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#0b5877] to-[#18b9a0] px-5 py-3 text-xs font-extrabold text-white shadow-lg"
          >
            RETOUR À L&apos;ACCUEIL
          </Link>
        </div>
      )}
    </div>
  );
}
