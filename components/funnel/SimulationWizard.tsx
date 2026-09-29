"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Droplet,
  Flame,
  Home,
  KeyRound,
  Loader2,
  Phone,
  Ruler,
  ShieldCheck,
  Trees,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { PROFILES } from "@/lib/mprBareme";
import {
  AGE_OPTIONS,
  CHAUFFAGE_OPTIONS,
  DISQUALIF,
  FOYER_OPTIONS,
  STATUT_OPTIONS,
  SURFACE_OPTIONS,
  computeAides,
  emptySimAnswers,
  fmt,
  isOutOfZone,
  revenuOptions,
  zoneFromPostalCode,
  type SimAnswers,
} from "@/lib/simulation";
import { siteConfig } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  maison: Home,
  immeuble: Building2,
  cle: KeyRound,
  fioul: Droplet,
  gaz: Flame,
  elec: Zap,
  bois: Trees,
};

type Step = "statut" | "age" | "chauffage" | "surface" | "foyer" | "cp" | "revenu" | "contact" | "calculating" | "result" | "disqualif";

const STEPPER_LABELS = ["Votre projet", "Votre logement", "Votre situation", "Résultats"];
const STEPPER_GROUP: Partial<Record<Step, number>> = {
  statut: 0,
  chauffage: 0,
  age: 1,
  surface: 1,
  foyer: 1,
  cp: 2,
  revenu: 2,
  contact: 3,
  calculating: 3,
  result: 3,
};

const CONFIRMATION_KEY = "label-energie-simulation-confirmation";
const inputClass = "h-11 w-full rounded-md border border-line px-3.5 text-[13px] text-ink outline-none focus:border-teal2";
const optionClass = (on: boolean) =>
  `flex w-full items-center gap-3 rounded-md border px-3.5 py-3.5 text-left text-[13.5px] font-medium transition-colors ${
    on ? "border-teal2 bg-soft text-navy" : "border-line text-navy hover:border-teal2"
  }`;

function Progress({ step }: { step: Step }) {
  if (step === "disqualif") return null;
  const group = STEPPER_GROUP[step] ?? 0;
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between text-[11px] font-semibold text-muted">
        <span className={group === 3 ? "text-teal2" : undefined}>{STEPPER_LABELS[group]}</span>
        <span>Étape {group + 1} sur {STEPPER_LABELS.length}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-soft">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#00b4f0] to-teal2 transition-all"
          style={{ width: `${Math.max(8, Math.round(((group + 1) / STEPPER_LABELS.length) * 100))}%` }}
        />
      </div>
    </div>
  );
}

function Option({ icon, label, on, onClick }: { icon?: LucideIcon; label: string; on: boolean; onClick: () => void }) {
  const Icon = icon;
  return (
    <button type="button" onClick={onClick} className={optionClass(on)}>
      {Icon && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-soft text-teal2">
          <Icon size={18} />
        </span>
      )}
      {label}
    </button>
  );
}

export function SimulationWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("statut");
  const [history, setHistory] = useState<Step[]>([]);
  const [a, setA] = useState<SimAnswers>(emptySimAnswers);
  const [disqualifType, setDisqualifType] = useState<"locataire" | "appartement" | "horszone">("locataire");
  const [cpError, setCpError] = useState(false);
  const [formErrors, setFormErrors] = useState<Set<string>>(new Set());
  const [consentError, setConsentError] = useState(false);
  const [calcLine, setCalcLine] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const cpInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof SimAnswers>(k: K, v: SimAnswers[K]) => setA((p) => ({ ...p, [k]: v }));

  const go = (next: Step) => {
    setHistory((h) => [...h, step]);
    setStep(next);
  };
  const back = () => {
    setHistory((h) => {
      if (h.length === 0) return h;
      setStep(h[h.length - 1]);
      return h.slice(0, -1);
    });
  };

  const zone = zoneFromPostalCode(a.cp);
  const result = useMemo(() => computeAides(a), [a]);

  function afterStatut(v: SimAnswers["statut"]) {
    set("statut", v);
    if (v === "locataire") {
      setDisqualifType("locataire");
      go("disqualif");
    } else if (v === "appartement") {
      setDisqualifType("appartement");
      go("disqualif");
    } else {
      go("age");
    }
  }

  function submitCp() {
    const cp = a.cp.replace(/\D/g, "");
    if (cp.length !== 5) {
      setCpError(true);
      cpInputRef.current?.focus();
      return;
    }
    set("cp", cp);
    if (isOutOfZone(cp)) {
      setDisqualifType("horszone");
      go("disqualif");
      return;
    }
    go("revenu");
  }

  function runCalculation() {
    go("calculating");
    setCalcLine(0);
    const lines = ["Analyse de votre logement", "Vérification du barème 2026", "Calcul de vos aides"];
    let i = 0;
    const it = setInterval(() => {
      i++;
      if (i < lines.length) {
        setCalcLine(i);
      } else {
        clearInterval(it);
        setStep("result");
      }
    }, 650);
  }

  async function submitContact() {
    const missing = new Set<string>();
    if (a.prenom.trim().length < 2) missing.add("prenom");
    if (a.nom.trim().length < 2) missing.add("nom");
    const telOk = /^0[1-9]\d{8}$/.test(a.telephone.replace(/\D/g, ""));
    if (!telOk) missing.add("telephone");
    if (a.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(a.email)) missing.add("email");
    setFormErrors(missing);
    setConsentError(!a.consentement);
    if (missing.size > 0 || !a.consentement) return;

    setSubmitting(true);
    const computed = computeAides(a);
    try {
      await fetch("/api/simulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...a, zone, estimationMin: computed.totalMin, estimationMax: computed.totalMax }),
      });
    } catch {
      // best-effort : on montre le résultat même si l'envoi échoue, le conseiller le retrouvera au rappel.
    } finally {
      setSubmitting(false);
      runCalculation();
    }
  }

  function goToConfirmation() {
    try {
      sessionStorage.setItem(
        CONFIRMATION_KEY,
        JSON.stringify({
          prenom: a.prenom,
          projet: "Pompe à chaleur air/eau",
          logement: [a.statut === "maison" ? "Maison individuelle" : "Appartement", SURFACE_LABEL[a.surface]].filter(Boolean),
          chauffage: CHAUFFAGE_LABEL[a.chauffage],
          mpr: result.mprEligible ? result.mpr : 0,
          ceeMin: result.cee[0],
          ceeMax: result.cee[1],
          totalMin: result.totalMin,
          totalMax: result.totalMax,
          profil: PROFILES[result.profileIndex].name,
        }),
      );
    } catch {
      // sessionStorage indisponible : la confirmation s'affichera sans détail
    }
    router.push("/simuler-mon-projet/confirmation");
  }

  return (
    <div>
      <Progress step={step} />
      <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-7">
        {step === "statut" && (
          <div>
            <h1 className="font-display text-xl text-navy">Vous êtes :</h1>
            <div className="mt-5 grid gap-2.5">
              {STATUT_OPTIONS.map((o) => (
                <Option key={o.v} icon={ICONS[o.icon]} label={o.label} on={a.statut === o.v} onClick={() => afterStatut(o.v)} />
              ))}
            </div>
          </div>
        )}

        {step === "age" && (
          <div>
            <h1 className="font-display text-xl text-navy">Votre logement a été construit il y a :</h1>
            <p className="mt-2 text-[13px] text-muted">MaPrimeRénov&apos; concerne les logements achevés depuis plus de 15 ans.</p>
            <div className="mt-5 grid gap-2.5">
              {AGE_OPTIONS.map((o) => (
                <Option key={o.v} label={o.label} on={a.age === o.v} onClick={() => (set("age", o.v), go("chauffage"))} />
              ))}
            </div>
          </div>
        )}

        {step === "chauffage" && (
          <div>
            <h1 className="font-display text-xl text-navy">Votre chauffage actuel :</h1>
            <p className="mt-2 text-[13px] text-muted">
              Le remplacement d&apos;une chaudière fioul ou gaz débloque la prime coup de pouce bonifiée.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {CHAUFFAGE_OPTIONS.map((o) => (
                <Option key={o.v} icon={ICONS[o.icon]} label={o.label} on={a.chauffage === o.v} onClick={() => (set("chauffage", o.v), go("surface"))} />
              ))}
            </div>
          </div>
        )}

        {step === "surface" && (
          <div>
            <h1 className="font-display text-xl text-navy">Surface chauffée de votre logement :</h1>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {SURFACE_OPTIONS.map((o) => (
                <Option key={o.v} icon={Ruler} label={o.label} on={a.surface === o.v} onClick={() => (set("surface", o.v), go("foyer"))} />
              ))}
            </div>
          </div>
        )}

        {step === "foyer" && (
          <div>
            <h1 className="font-display text-xl text-navy">Nombre de personnes dans votre foyer :</h1>
            <p className="mt-2 text-[13px] text-muted">Y compris les enfants. Cette information détermine votre barème d&apos;aides.</p>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {FOYER_OPTIONS.map((n) => (
                <Option
                  key={n}
                  icon={Users}
                  label={n === 5 ? "5 personnes ou plus" : `${n} personne${n > 1 ? "s" : ""}`}
                  on={a.foyer === n}
                  onClick={() => (set("foyer", n), go("cp"))}
                />
              ))}
            </div>
          </div>
        )}

        {step === "cp" && (
          <div>
            <h1 className="font-display text-xl text-navy">Le code postal de votre logement :</h1>
            <p className="mt-2 text-[13px] text-muted">Il détermine le barème applicable dans votre région.</p>
            <div className="mt-5">
              <input
                ref={cpInputRef}
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                placeholder="Ex : 77183"
                value={a.cp}
                onChange={(e) => {
                  set("cp", e.target.value.replace(/\D/g, ""));
                  setCpError(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && submitCp()}
                className={`${inputClass} ${cpError ? "border-red-500" : ""}`}
              />
              {cpError && <p className="mt-1.5 text-[12px] text-red-600">Entrez un code postal valide (5 chiffres).</p>}
            </div>
            <button type="button" onClick={submitCp} className="btn btn-primary mt-5 w-full justify-center">
              Continuer <ArrowRight size={15} />
            </button>
          </div>
        )}

        {step === "revenu" && (
          <div>
            <h1 className="font-display text-xl text-navy">Le revenu fiscal de référence de votre foyer :</h1>
            <p className="mt-2 text-[13px] text-muted">
              Indiqué en première page de votre dernier avis d&apos;imposition, encadré « Vos références ».
            </p>
            <div className="mt-5 grid gap-2.5">
              {revenuOptions(zone, a.foyer).map((o) => (
                <Option key={o.v} label={o.label} on={a.rfr === o.v} onClick={() => (set("rfr", o.v), go("contact"))} />
              ))}
            </div>
          </div>
        )}

        {step === "contact" && (
          <div>
            <h1 className="font-display text-xl text-navy">Où envoyer votre estimation ?</h1>
            <p className="mt-2 text-[13px] text-muted">
              Résultat immédiat à l&apos;écran. Notre équipe vous rappelle sous 24h ouvrées pour la visite technique
              gratuite.
            </p>
            <div className="mt-5 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1.5 text-[12.5px] font-semibold text-navy">
                  Prénom
                  <input
                    autoComplete="given-name"
                    value={a.prenom}
                    onChange={(e) => set("prenom", e.target.value)}
                    className={`${inputClass} ${formErrors.has("prenom") ? "border-red-500" : ""}`}
                  />
                </label>
                <label className="grid gap-1.5 text-[12.5px] font-semibold text-navy">
                  Nom
                  <input
                    autoComplete="family-name"
                    value={a.nom}
                    onChange={(e) => set("nom", e.target.value)}
                    className={`${inputClass} ${formErrors.has("nom") ? "border-red-500" : ""}`}
                  />
                </label>
              </div>
              <label className="grid gap-1.5 text-[12.5px] font-semibold text-navy">
                Téléphone
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="06 12 34 56 78"
                  value={a.telephone}
                  onChange={(e) => set("telephone", e.target.value)}
                  className={`${inputClass} ${formErrors.has("telephone") ? "border-red-500" : ""}`}
                />
              </label>
              <label className="grid gap-1.5 text-[12.5px] font-semibold text-navy">
                Email (facultatif)
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={a.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={`${inputClass} ${formErrors.has("email") ? "border-red-500" : ""}`}
                />
              </label>
              {/* Honeypot anti-spam : invisible et ignoré par les humains, rempli seulement par les robots. */}
              <input
                type="text"
                name="website"
                value={a.website}
                onChange={(e) => set("website", e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
              />

              <label className="mt-1 flex items-start gap-2.5 text-[12px] leading-relaxed text-muted">
                <input
                  type="checkbox"
                  checked={a.consentement}
                  onChange={(e) => (set("consentement", e.target.checked), setConsentError(false))}
                  className={`mt-0.5 h-4 w-4 shrink-0 accent-teal2 ${consentError ? "outline outline-2 outline-red-500" : ""}`}
                />
                Je demande à être recontacté(e) par téléphone par Label Énergie au sujet de ma demande d&apos;estimation.
              </label>
              {(formErrors.size > 0 || consentError) && (
                <p role="alert" className="text-[12.5px] text-red-600">
                  Vérifiez les champs signalés en rouge ci-dessus pour voir votre estimation.
                </p>
              )}
              <button type="button" disabled={submitting} onClick={submitContact} className="btn btn-primary w-full justify-center disabled:opacity-60">
                {submitting ? <Loader2 size={15} className="animate-spin" /> : null} Voir mon estimation
              </button>
              <p className="text-center text-[11.5px] text-muted">Gratuit et sans engagement. Vos données ne sont jamais revendues.</p>
            </div>
          </div>
        )}

        {step === "calculating" && (
          <div className="flex flex-col items-center gap-5 py-9 text-center">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-2.5 w-2.5 animate-pulse rounded-full"
                  style={{ background: i === 1 ? "#00b4f0" : "#08a88e", animationDelay: `${i * 0.18}s` }}
                />
              ))}
            </div>
            <p className="text-[13.5px] font-medium text-muted">{["Analyse de votre logement", "Vérification du barème 2026", "Calcul de vos aides"][calcLine]}</p>
          </div>
        )}

        {step === "result" && (
          <div>
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11.5px] font-bold" style={{ background: PROFILES[result.profileIndex].tint, color: PROFILES[result.profileIndex].color }}>
              <CheckCircle2 size={14} /> {PROFILES[result.profileIndex].name}
            </span>
            <p className="mt-3 font-display text-2xl text-navy">
              Jusqu&apos;à <span className="text-teal2">{fmt(result.totalMax)}</span> d&apos;aides estimées*
            </p>
            <p className="mt-2 text-[13px] text-muted">{a.prenom ? `${a.prenom}, voici` : "Voici"} le détail de votre estimation :</p>

            <div className="mt-4 overflow-hidden rounded-md border border-line">
              {result.mprEligible ? (
                <div className="flex items-center justify-between gap-3 px-4 py-3 text-[12.5px]">
                  <span>MaPrimeRénov&apos; ({PROFILES[result.profileIndex].name})</span>
                  <strong className="whitespace-nowrap text-navy">{fmt(result.mpr)}</strong>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 text-[12.5px]">
                  <span>MaPrimeRénov&apos; : réservée aux logements de plus de 15 ans</span>
                  <strong className="whitespace-nowrap text-navy">0 €</strong>
                </div>
              )}
              <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 text-[12.5px]">
                <span>Prime CEE estimée{a.chauffage === "fioul" || a.chauffage === "gaz" ? ", coup de pouce chauffage inclus" : ""}</span>
                <strong className="whitespace-nowrap text-navy">
                  {fmt(result.cee[0])} à {fmt(result.cee[1])}
                </strong>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 text-[12.5px]">
                <span>TVA réduite à 5,5 % sur matériel et pose</span>
                <strong className="text-navy">Incluse</strong>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-md bg-soft p-3.5">
              <ShieldCheck size={20} className="shrink-0 text-teal2" />
              <p className="text-[12.5px] leading-relaxed text-navy">
                Notre équipe vous rappelle sous 24h ouvrées pour organiser votre visite technique gratuite.
              </p>
            </div>

            <button type="button" onClick={goToConfirmation} className="btn btn-primary mt-4 w-full justify-center">
              Confirmer ma demande <ArrowRight size={15} />
            </button>
            <a href={`tel:${siteConfig.phone}`} className="btn btn-outline mt-2.5 w-full justify-center">
              <Phone size={15} /> Ou appelez-nous : {siteConfig.phoneDisplay}
            </a>
            <p className="mt-3.5 text-[11px] leading-relaxed text-muted">
              * Estimation indicative calculée à partir de vos réponses et des barèmes 2026 (MaPrimeRénov&apos;, prime CEE).
              Montants définitifs confirmés après visite technique gratuite et étude de votre dossier.
            </p>
          </div>
        )}

        {step === "disqualif" && (
          <div>
            <h1 className="font-display text-xl text-navy">{DISQUALIF[disqualifType].title}</h1>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">{DISQUALIF[disqualifType].text}</p>
            {DISQUALIF[disqualifType].showPhone && (
              <a href={`tel:${siteConfig.phone}`} className="btn btn-primary mt-5 w-full justify-center">
                <Phone size={15} /> Appeler un conseiller · {siteConfig.phoneDisplay}
              </a>
            )}
            <button type="button" onClick={back} className="btn btn-outline mt-3 w-full justify-center">
              <ArrowLeft size={15} /> Retour
            </button>
          </div>
        )}

        {step !== "statut" && step !== "calculating" && step !== "result" && step !== "disqualif" && (
          <button type="button" onClick={back} className="mt-5 flex items-center gap-1.5 text-[12.5px] font-medium text-muted hover:text-navy">
            <ArrowLeft size={14} /> Retour
          </button>
        )}
      </div>
    </div>
  );
}

const SURFACE_LABEL: Record<SimAnswers["surface"], string> = {
  "<70": "Moins de 70 m²",
  "70-100": "70 à 100 m²",
  "100-150": "100 à 150 m²",
  ">150": "Plus de 150 m²",
  "": "",
};

const CHAUFFAGE_LABEL: Record<SimAnswers["chauffage"], string> = {
  fioul: "Chaudière fioul",
  gaz: "Chaudière gaz",
  electrique: "Chauffage électrique",
  bois_autre: "Bois ou autre",
  "": "",
};
