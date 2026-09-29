"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import type { ContractPlan, FormulaId, ProductId } from "@/lib/content/entretien";
import { totalMonthly } from "@/lib/content/entretien";

// Couleurs reprises telles quelles du CRM Entretien (variables --cyan/--teal/--text/--text-secondary/--text-muted)
// pour que cette carte rende à l'identique de la maquette.
const cyan = "#00B8DC";
const teal = "#00C9A7";
const textSecondary = "#4A5568";
const textMuted = "#8896A6";

type FormulaCardProps = {
  plan: ContractPlan;
  /** Équipements déjà choisis (étape suivante) : affiche l'estimation globale pour cette formule, comme dans le CRM. */
  products?: ProductId[];
} & (
  | { onSelect: (id: FormulaId) => void; active: boolean; href?: undefined }
  | { href: string; onSelect?: undefined; active?: undefined }
);

/**
 * Carte de formule d'entretien (Standard / Premium / VIP), copie fidèle du CRM Entretien.
 * Deux modes : `onSelect`/`active` pour le tunnel (carte cliquable, sélection en place),
 * `href` pour la page marketing (simple lien vers le tunnel, rien à sélectionner ici).
 */
export function FormulaCard({ plan, products, ...rest }: FormulaCardProps) {
  const estimate = products && products.length > 0 ? totalMonthly(products, plan.slug) : null;
  const active = "active" in rest && rest.active;

  const body = (
    <>
      <span
        className="inline-flex w-fit items-center rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide"
        style={
          plan.recommended
            ? { background: "rgba(0,184,220,0.12)", border: "1px solid rgba(0,184,220,0.18)", color: cyan }
            : { background: "rgba(13,27,42,0.04)", border: "1px solid rgba(13,27,42,0.06)", color: textMuted }
        }
      >
        {plan.kicker}
      </span>

      <h3 className="mt-2.5 text-lg font-black text-navy">{plan.name}</h3>
      <p className="mt-1 text-base font-black text-navy">{plan.priceLabel}</p>
      {plan.priceNote && (
        <p className="text-xs" style={{ color: textMuted }}>
          {plan.priceNote}
        </p>
      )}
      <p className="mt-3 text-[13px] leading-relaxed" style={{ color: textSecondary }}>
        {plan.tagline}
      </p>

      <div className="mt-3.5" style={{ height: 1, background: "rgba(13,27,42,0.08)" }} />

      <div className="mt-3 grid gap-2.5">
        {plan.highlightIntro && (
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold"
            style={{ background: "rgba(0,184,220,0.06)", border: "1px solid rgba(0,184,220,0.12)", color: cyan }}
          >
            <span aria-hidden className="text-sm">
              ✓
            </span>
            {plan.highlightIntro}
          </div>
        )}
        {plan.features.map((f) => (
          <div key={f} className="flex items-start gap-2.5 text-[13px] leading-snug" style={{ color: textSecondary }}>
            <span
              aria-hidden
              className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
              style={{ background: "rgba(0,201,167,0.12)", border: "1px solid rgba(0,201,167,0.25)", color: teal }}
            >
              <Check size={11} strokeWidth={3} />
            </span>
            {f}
          </div>
        ))}
      </div>

      <div className="mt-3 text-[13px]" style={{ color: textSecondary }}>
        {estimate !== null ? (
          <div
            className="rounded-xl px-3 py-2.5"
            style={{ background: "rgba(13,27,42,0.03)", border: "1px solid rgba(13,27,42,0.06)" }}
          >
            <strong className="text-navy">{estimate.toFixed(2).replace(".", ",")} €</strong> /mois (global)
          </div>
        ) : (
          <span style={{ color: textMuted }}>Sélectionnez ensuite vos produits pour calculer une estimation.</span>
        )}
      </div>

      {"href" in rest && rest.href ? (
        <Link
          href={rest.href}
          className={plan.recommended ? "cta-primary-premium" : "cta-secondary-premium"}
          style={{ width: "100%", marginTop: 14 }}
        >
          Choisir {plan.name}
        </Link>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            rest.onSelect?.(plan.slug);
          }}
          className={plan.recommended ? "cta-primary-premium" : "cta-secondary-premium"}
          style={{ width: "100%", marginTop: 14 }}
        >
          {active ? "Formule sélectionnée" : `Choisir ${plan.name}`}
        </button>
      )}
    </>
  );

  const className = `formula-card ${plan.recommended ? "is-recommended" : ""} ${active ? "is-active" : ""}`;

  if ("href" in rest && rest.href) {
    return <div className={className}>{body}</div>;
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={`Choisir la formule ${plan.name}`}
      onClick={() => rest.onSelect?.(plan.slug)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          rest.onSelect?.(plan.slug);
        }
      }}
      className={className}
    >
      {body}
    </div>
  );
}
