"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-card border border-line bg-white p-8 text-center shadow-card">
        <CheckCircle2 className="mx-auto text-teal2" size={40} />
        <h2 className="mt-3 font-display text-lg text-navy">Merci, votre message a bien été envoyé !</h2>
        <p className="mt-2 text-sm text-muted">
          Un conseiller Label Énergie vous recontacte dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-3 rounded-card border border-line bg-white p-6 shadow-card"
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
          await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
        } finally {
          setSubmitting(false);
          setDone(true);
        }
      }}
    >
      <input
        required
        placeholder="Nom complet"
        value={form.nom}
        onChange={(e) => setForm({ ...form, nom: e.target.value })}
        className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          type="email"
          placeholder="Adresse e-mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
        />
        <input
          required
          type="tel"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
          className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
        />
      </div>
      <textarea
        required
        placeholder="Votre message"
        rows={4}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
      />
      <button type="submit" disabled={submitting} className="btn btn-primary mt-1 justify-center disabled:opacity-50">
        {submitting ? "ENVOI EN COURS..." : "ENVOYER MON MESSAGE"} <ArrowRight size={16} />
      </button>
    </form>
  );
}
