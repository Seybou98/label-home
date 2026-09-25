"use client";

import Link from "next/link";
import { PROFILES, fmt, profileIndex as computeProfile, zoneFromPostalCode } from "@/lib/mprBareme";
import { useState, type ReactNode } from "react";

function ArrowRight({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={(size * 10) / 16} viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M0 5h14" />
      <path d="M10 1l4 4-4 4" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M1 5l3.5 3.5L11 1" />
    </svg>
  );
}

function MapPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function Bulb() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
    </svg>
  );
}

const steps: { label: string; icon: ReactNode }[] = [
  {
    label: "Votre logement",
    icon: (
      <>
        <path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
        <path d="M10 21v-5h4v5" />
      </>
    ),
  },
  {
    label: "Votre projet",
    icon: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 5v14M12 5v14M16 5v14" />
      </>
    ),
  },
  {
    label: "Votre situation",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.6" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </>
    ),
  },
  {
    label: "Vos revenus",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
  },
  {
    label: "Résultat",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12l3 3 5-6" />
      </>
    ),
  },
];

const aidesList = ["MaPrimeRénov'", "CEE (Certificats d'Économie d'Énergie)", "Aides locales"];

const PROJECTS = [
  { id: "pac-eau", label: "Pompe à chaleur air/eau", cee: 5000, mprBareme: true },
  { id: "pac-air", label: "Pompe à chaleur air/air", cee: 1500, mprBareme: false },
  { id: "cesi", label: "Chauffe-eau solaire", cee: 4000, mprBareme: false },
  { id: "poele", label: "Poêle à granulés", cee: 2500, mprBareme: false },
  { id: "combles", label: "Isolation des combles", cee: 4000, mprBareme: false },
] as const;

const initial = {
  type: "Maison individuelle",
  surface: "",
  annee: "Entre 2006 et 2015",
  cp: "",
  projects: [] as string[],
  people: 2,
  statut: "Propriétaire occupant",
  rfr: "",
};

export function AidesSimulator() {
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [f, setF] = useState(initial);

  const set = <K extends keyof typeof initial>(k: K, v: (typeof initial)[K]) => setF((p) => ({ ...p, [k]: v }));
  const cpValid = /^\d{5}$/.test(f.cp);
  const zone = zoneFromPostalCode(f.cp);
  const rfrValid = f.rfr !== "" && parseFloat(f.rfr) >= 0;

  const canContinue = [cpValid, f.projects.length > 0, true, rfrValid][step] ?? false;

  function go(to: number) {
    setStep(to);
    setMaxStep((m) => Math.max(m, to));
  }

  const next = () => {
    if (canContinue) go(Math.min(steps.length - 1, step + 1));
  };

  const pi = computeProfile(zone, f.people, f.rfr);
  const selected = PROJECTS.filter((p) => f.projects.includes(p.id));
  const mprEligible = f.statut === "Propriétaire occupant" && f.annee !== "Après 2015" && pi >= 0 && pi < 3;
  const lines = selected.map((p) => ({
    ...p,
    mpr: p.mprBareme && mprEligible ? PROFILES[pi].primeAmount : null,
  }));
  const mprTotal = lines.reduce((sum, l) => sum + (l.mpr ?? 0), 0);
  const ceeTotal = lines.reduce((sum, l) => sum + l.cee, 0);

  const titles = ["1. Votre logement", "2. Votre projet", "3. Votre situation", "4. Vos revenus", "5. Résultat"];
  const subs = [
    "Informations sur votre habitation",
    "Quels travaux envisagez-vous ?",
    "Votre foyer et votre statut",
    "Indiqué sur votre avis d'imposition",
    "Estimation indicative de vos aides",
  ];

  return (
    <>
      <section className="section pb-0">
        <div className="container">
          <h2 className="ca-steps-title">
            Votre simulation en <span className="text-teal">5 étapes simples</span>
          </h2>
          <div className="ca-steps">
            {steps.map((s, i) => {
              const active = i === step;
              const reached = i <= step;
              return (
                <button
                  type="button"
                  className="ca-step"
                  key={s.label}
                  disabled={i > maxStep}
                  onClick={() => setStep(i)}
                  aria-current={active ? "step" : undefined}
                >
                  {i < steps.length - 1 && (
                    <span className={`ca-step-line${reached ? " is-solid" : ""}`} aria-hidden />
                  )}
                  <span className={`ca-step-circle${active ? " is-active" : ""}`}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                      {s.icon}
                    </svg>
                  </span>
                  <span className="ca-step-label">
                    <span className={`ca-step-num${reached ? " is-reached" : ""}`}>{i + 1}</span>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pt-6">
        <div className="container ca-form-row">
          <form
            className="ca-form-card"
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
          >
            <p className="ca-card-title">{titles[step]}</p>
            <p className="ca-card-sub">{subs[step]}</p>

            {step === 0 && (
              <div className="ca-form-grid">
                <label>
                  Type de logement
                  <select value={f.type} onChange={(e) => set("type", e.target.value)}>
                    <option>Maison individuelle</option>
                    <option>Appartement</option>
                  </select>
                </label>
                <label>
                  Surface habitable (m²)
                  <input type="text" inputMode="numeric" placeholder="Ex. : 120" value={f.surface} onChange={(e) => set("surface", e.target.value)} />
                </label>
                <label>
                  Année de construction
                  <select value={f.annee} onChange={(e) => set("annee", e.target.value)}>
                    <option>Avant 1975</option>
                    <option>Entre 1975 et 2005</option>
                    <option>Entre 2006 et 2015</option>
                    <option>Après 2015</option>
                  </select>
                </label>
                <label>
                  Localisation
                  <span className="ca-input-icon">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="Code postal"
                      value={f.cp}
                      onChange={(e) => set("cp", e.target.value.replace(/\D/g, ""))}
                    />
                    <MapPin />
                  </span>
                </label>
              </div>
            )}

            {step === 1 && (
              <div className="ca-choices">
                {PROJECTS.map((p) => {
                  const on = f.projects.includes(p.id);
                  return (
                    <button
                      type="button"
                      key={p.id}
                      className={on ? "is-on" : undefined}
                      aria-pressed={on}
                      onClick={() => set("projects", on ? f.projects.filter((x) => x !== p.id) : [...f.projects, p.id])}
                    >
                      <span aria-hidden>{on ? <Check /> : null}</span>
                      {p.label}
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div className="ca-form-grid">
                <label>
                  Personnes dans le foyer fiscal
                  <select value={f.people} onChange={(e) => set("people", parseInt(e.target.value, 10))}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n > 1 ? "personnes" : "personne"}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Votre statut
                  <select value={f.statut} onChange={(e) => set("statut", e.target.value)}>
                    <option>Propriétaire occupant</option>
                    <option>Propriétaire bailleur</option>
                    <option>Locataire</option>
                  </select>
                </label>
                <p className="ca-hint" style={{ gridColumn: "1 / -1" }}>
                  Zone géographique détectée à partir de votre code postal :{" "}
                  <strong>{zone === "idf" ? "Île-de-France" : "Hors Île-de-France"}</strong>.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="ca-form-grid">
                <label style={{ gridColumn: "1 / -1" }}>
                  Revenu fiscal de référence du foyer (€)
                  <input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    placeholder="Ex. : 38 000"
                    value={f.rfr}
                    onChange={(e) => set("rfr", e.target.value)}
                  />
                </label>
                <p className="ca-hint" style={{ gridColumn: "1 / -1" }}>
                  Vous le trouvez sur la première page de votre dernier avis d&apos;imposition.
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="ca-result">
                <div className="ca-result-profile">
                  <span style={{ background: PROFILES[Math.max(pi, 0)].color }} />
                  <div>
                    <small>Votre profil MaPrimeRénov&apos;</small>
                    <strong>{pi < 0 ? "—" : PROFILES[pi].est}</strong>
                  </div>
                </div>
                <ul className="ca-result-lines">
                  {lines.map((l) => (
                    <li key={l.id}>
                      <span>{l.label}</span>
                      <span>
                        <em>MaPrimeRénov&apos; : {l.mpr !== null ? fmt(l.mpr) : "à confirmer"}</em>
                        <em>CEE : jusqu&apos;à {fmt(l.cee)}</em>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="ca-result-total">
                  <span>Total estimé des aides</span>
                  <strong>
                    jusqu'à {fmt(mprTotal + ceeTotal)}
                  </strong>
                </div>
                {!mprEligible && (
                  <p className="ca-hint">
                    MaPrimeRénov&apos; n&apos;est pas retenue dans cette estimation (statut, ancienneté du
                    logement ou niveau de revenus). Seuls les CEE sont comptés.
                  </p>
                )}
                <p className="ca-hint">
                  Estimation indicative, non contractuelle. Les aides locales dépendent de votre commune.
                  Un conseiller confirme vos montants réels gratuitement.
                </p>
              </div>
            )}

            <div className="ca-actions">
              {step > 0 && (
                <button type="button" className="ca-back" onClick={() => setStep(step - 1)}>
                  RETOUR
                </button>
              )}
              {step < steps.length - 1 ? (
                <button type="submit" className="ca-continue" disabled={!canContinue}>
                  {step === steps.length - 2 ? "VOIR MON RÉSULTAT" : "CONTINUER"} <ArrowRight />
                </button>
              ) : (
                <>
                  <Link href="/contact" className="ca-continue">
                    ÊTRE RAPPELÉ GRATUITEMENT <ArrowRight />
                  </Link>
                  <button
                    type="button"
                    className="ca-back"
                    onClick={() => {
                      setF(initial);
                      setStep(0);
                      setMaxStep(0);
                    }}
                  >
                    RECOMMENCER
                  </button>
                </>
              )}
            </div>
          </form>

          <aside className="ca-info-card">
            <div className="ca-info-head">
              <span className="ca-info-icon">
                <Bulb />
              </span>
              <p>
                En quelques clics, obtenez une estimation précise des aides auxquelles vous avez
                droit.
              </p>
            </div>
            <ul className="ca-info-list">
              {aidesList.map((a) => (
                <li key={a}>
                  <Check /> {a}
                </li>
              ))}
            </ul>
            <Link href="/aides-financement/maprimerenov" className="ca-info-link">
              En savoir plus sur les aides disponibles <ArrowRight />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
