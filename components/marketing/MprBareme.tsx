"use client";

import { useState } from "react";

import { BAREME, PROFILES, fmt, profileIndex as computeProfile, type Zone } from "@/lib/mprBareme";

const ZONES: { key: Zone; label: string }[] = [
  { key: "hors", label: "Hors Île-de-France" },
  { key: "idf", label: "Île-de-France" },
];

export function MprBareme() {
  const [zone, setZone] = useState<Zone>("hors");
  const [people, setPeople] = useState(2);
  const [rfr, setRfr] = useState("");

  const b = BAREME[zone];

  const profileIndex = computeProfile(zone, people, rfr);

  const activeRow = people <= 5 ? people : 6;
  const est =
    profileIndex < 0
      ? { profile: "Votre prime estimée", amount: "—", dot: "#dfe6e2" }
      : { profile: PROFILES[profileIndex].est, amount: PROFILES[profileIndex].prime, dot: PROFILES[profileIndex].color };

  const cell = (rowNo: number, j: number, text: string) => {
    const active = profileIndex === j && activeRow === rowNo;
    return (
      <div
        key={j}
        className="bar-cell"
        style={{ fontWeight: active ? 700 : 400, background: active ? PROFILES[j].tint : "transparent" }}
      >
        {text}
      </div>
    );
  };

  return (
    <div className="bar" id="bareme">
      <div className="bar-head">
        <div>
          <p className="bar-kicker">BARÈME 2026 · POMPE À CHALEUR AIR/EAU</p>
          <h2 className="bar-title">
            Combien pouvez-vous recevoir pour votre{" "}
            <span className="text-teal">pompe à chaleur air/eau</span> ?
          </h2>
          <p className="bar-intro">
            Le montant de la prime dépend du revenu fiscal de référence (RFR) de votre foyer,
            indiqué sur votre avis d&apos;imposition, et du nombre de personnes qui le composent.
          </p>
        </div>
        <div className="bar-tabs" role="tablist" aria-label="Zone géographique">
          {ZONES.map((z) => (
            <button
              key={z.key}
              type="button"
              role="tab"
              aria-selected={zone === z.key}
              className={zone === z.key ? "is-on" : undefined}
              onClick={() => setZone(z.key)}
            >
              {z.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bar-scroll">
        <div className="bar-table">
          <div className="bar-row bar-row-head">
            <div className="bar-corner">Personnes dans le foyer fiscal</div>
            {PROFILES.map((p) => (
              <div key={p.name} className="bar-profile" style={{ background: p.color, color: p.fg }}>
                <strong>{p.name}</strong>
                <span>{p.sub}</span>
              </div>
            ))}
          </div>

          {b.base.map((l, i) => (
            <div className="bar-row" key={i} style={{ background: i % 2 ? "#fafbfa" : "#fff" }}>
              <div className="bar-label">{i + 1}</div>
              {[...l.map((v) => "≤ " + fmt(v)), "> " + fmt(l[2])].map((t, j) => cell(i + 1, j, t))}
            </div>
          ))}
          <div className="bar-row" style={{ background: "#fff" }}>
            <div className="bar-label">Par personne supplémentaire</div>
            {[...b.extra.map((v) => "+ " + fmt(v)), "+ " + fmt(b.extra[2])].map((t, j) => cell(6, j, t))}
          </div>

          <div className="bar-row bar-row-prime">
            <div className="bar-prime-label">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0e8a5f" strokeWidth="1.3" aria-hidden>
                <rect x="3" y="4" width="11" height="16" rx="1.5" />
                <circle cx="8.5" cy="12" r="3.4" />
                <path d="M17 8h4M17 12h4M17 16h4" />
              </svg>
              <span>
                Prime MaPrimeRénov&apos;
                <br />
                PAC air/eau
              </span>
            </div>
            {PROFILES.map((p, j) => (
              <div className="bar-prime" key={p.name}>
                {j < 3 ? (
                  <strong>{p.prime}</strong>
                ) : (
                  <>
                    <b>Non éligible</b>
                    <small>à l&apos;aide par geste</small>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bar-estimator">
        <p className="bar-est-title">
          Estimez votre prime
          <br />
          <span>en 10 secondes</span>
        </p>
        <label>
          Personnes dans le foyer
          <select value={people} onChange={(e) => setPeople(parseInt(e.target.value, 10))}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} {n > 1 ? "personnes" : "personne"}
              </option>
            ))}
          </select>
        </label>
        <label>
          Revenu fiscal de référence (€)
          <input
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="Ex. : 38 000"
            value={rfr}
            onChange={(e) => setRfr(e.target.value)}
          />
        </label>
        <div className="bar-est-result" aria-live="polite">
          <span style={{ background: est.dot }} />
          <div>
            <small>{est.profile}</small>
            <strong>{est.amount}</strong>
          </div>
        </div>
      </div>

      <div className="bar-notes">
        <span>
          Plafonds de ressources au 1er janvier 2026 · Montants forfaitaires MaPrimeRénov&apos;
          « par geste » pour une PAC air/eau installée par un professionnel RGE. Source :
          MaPrimeRénov&apos;, mode d&apos;emploi, Anah.
        </span>
        <span>Aides cumulables avec les CEE, dans la limite du montant total des travaux.</span>
      </div>
    </div>
  );
}
