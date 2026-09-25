"use client";

import { useState, type ReactNode } from "react";

const equipments = [
  "Pompe à chaleur air/eau",
  "Pompe à chaleur air/air",
  "Chauffe-eau thermodynamique",
  "Système solaire combiné",
  "Panneaux photovoltaïques",
  "Poêle / chaudière à granulés",
];

const problems = ["Panne / arrêt", "Code erreur", "Bruit anormal", "Fuite", "Performance insuffisante", "Autre"];

const empty = { nom: "", telephone: "", email: "", client: "", equipement: "", probleme: "", description: "" };

function Field({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="sav-field">
      <span aria-hidden>{icon}</span>
      {children}
    </div>
  );
}

const iconProps = { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 } as const;

export function SavForm() {
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  if (sent) {
    return (
      <div className="sav-form sav-form-done" id="declarer">
        <span className="sav-done-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0e8a5f" strokeWidth="2" aria-hidden>
            <path d="M5 12l5 5 9-10" />
          </svg>
        </span>
        <p className="sav-done-title">Demande envoyée</p>
        <p className="sav-done-text">Un conseiller SAV vous recontacte sous 2h ouvrées.</p>
        <button
          type="button"
          className="sav-done-reset"
          onClick={() => {
            setForm(empty);
            setSent(false);
          }}
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form
      className="sav-form"
      id="declarer"
      onSubmit={async (e) => {
        e.preventDefault();
        setSending(true);
        try {
          await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "sav", ...form }),
          });
        } finally {
          setSending(false);
          setSent(true);
        }
      }}
    >
      <p className="sav-form-title">
        Déclarez votre
        <br />
        demande SAV
      </p>
      <p className="sav-form-sub">Nous vous recontactons dans les plus brefs délais.</p>

      <div className="sav-fields">
        <Field
          icon={
            <svg {...iconProps}>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
          }
        >
          <input required placeholder="Nom et prénom" autoComplete="name" value={form.nom} onChange={set("nom")} />
        </Field>
        <Field
          icon={
            <svg {...iconProps}>
              <path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z" />
            </svg>
          }
        >
          <input required type="tel" placeholder="Téléphone" autoComplete="tel" value={form.telephone} onChange={set("telephone")} />
        </Field>
        <Field
          icon={
            <svg {...iconProps}>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          }
        >
          <input required type="email" placeholder="Email" autoComplete="email" value={form.email} onChange={set("email")} />
        </Field>
        <Field
          icon={
            <svg {...iconProps}>
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M8 9h8M8 13h8M8 17h4" />
            </svg>
          }
        >
          <input placeholder="Numéro de client" value={form.client} onChange={set("client")} />
        </Field>
        <select className="sav-select" required value={form.equipement} onChange={set("equipement")} aria-label="Type d'équipement">
          <option value="">Type d&apos;équipement</option>
          {equipments.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <select className="sav-select" required value={form.probleme} onChange={set("probleme")} aria-label="Nature du problème">
          <option value="">Nature du problème</option>
          {problems.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <textarea placeholder="Décrivez votre problème" value={form.description} onChange={set("description")} />
      </div>

      <button type="submit" className="sav-submit" disabled={sending}>
        {sending ? "ENVOI EN COURS…" : "ENVOYER MA DEMANDE"}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" aria-hidden>
          <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
        </svg>
      </button>
      <p className="sav-secure">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="#0e8a5f" aria-hidden>
          <path d="M6 10V7a6 6 0 0 1 12 0v3h1v12H5V10zm2 0h8V7a4 4 0 0 0-8 0z" />
        </svg>
        Vos données sont sécurisées et confidentielles.
      </p>
    </form>
  );
}
