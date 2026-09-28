"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Loader2, LogIn, ShieldCheck } from "lucide-react";
import { useContractFunnel, type SouscrireStep } from "@/components/funnel/FunnelContext";
import { Stepper } from "@/components/funnel/Stepper";
import {
  contractPlans,
  equipmentTypes,
  formatEuro,
  isFormulaId,
  isProductId,
  productPrice,
  totalMonthly,
  type ProductId,
} from "@/lib/content/entretien";
import { addOneYear, equipmentLabel, type SubscriptionPayload } from "@/lib/entretien/types";
import { todayIso } from "@/lib/portal/format";

export type WizardPrefill = {
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  /** Inscrit du site (sans fiche CRM) : le téléphone est obligatoire pour créer son dossier. */
  needsPhone: boolean;
};

const STEPS: { key: SouscrireStep; label: string }[] = [
  { key: "formule", label: "Formule" },
  { key: "produit", label: "Produit" },
  { key: "equipement", label: "Équipement" },
  { key: "recap", label: "Récap" },
  { key: "paiement", label: "Paiement" },
  { key: "notes", label: "Notes" },
  { key: "apercu", label: "Aperçu" },
];

const CONFIRMATION_KEY = "label-energie-souscription-confirmation";
const inputClass = "rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2";
const labelClass = "grid gap-1.5 text-[11px] font-bold text-navy";
const card = "mt-4 rounded-card border border-line bg-white p-6 shadow-card";

const productLabel = (id: string) => equipmentTypes.find((e) => e.slug === id)?.label ?? id;

export function SouscrireWizard({ prefill }: { prefill: WizardPrefill | null }) {
  const router = useRouter();
  const params = useSearchParams();
  const { state, ready, update, reset } = useContractFunnel();
  const loggedIn = prefill !== null;
  const presetApplied = useRef(false);

  // Formule / équipement pré-choisis depuis les pages du site (?formule=premium&equipement=pompe-air-eau).
  useEffect(() => {
    if (!ready || presetApplied.current) return;
    presetApplied.current = true;
    const patch: Parameters<typeof update>[0] = {};
    const f = params.get("formule");
    const e = params.get("equipement");
    if (isFormulaId(f) && !state.formule) patch.formule = f;
    if (isProductId(e) && state.products.length === 0) patch.products = [e];
    if (Object.keys(patch).length) update(patch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // Coordonnées du titulaire pré-remplies depuis la fiche client (sans écraser une saisie).
  useEffect(() => {
    if (!ready || !prefill) return;
    const patch: Parameters<typeof update>[0] = {};
    if (!state.holderName && prefill.name) patch.holderName = prefill.name;
    if (!state.address && prefill.address) patch.address = prefill.address;
    if (!state.postalCode && prefill.postalCode) patch.postalCode = prefill.postalCode;
    if (!state.city && prefill.city) patch.city = prefill.city;
    if (!state.phone && prefill.phone) patch.phone = prefill.phone;
    if (Object.keys(patch).length) update(patch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, prefill?.name]);

  // Garde-fous : on ne peut pas être sur une étape dont les données manquent.
  useEffect(() => {
    if (!ready) return;
    const idx = STEPS.findIndex((s) => s.key === state.step);
    if (idx > 0 && !state.formule) update({ step: "formule" });
    else if (idx > 1 && state.products.length === 0) update({ step: "produit" });
    else if (idx > 3 && !loggedIn) update({ step: "recap" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, state.step, state.formule, state.products.length, loggedIn]);

  const stepIndex = Math.max(0, STEPS.findIndex((s) => s.key === state.step));
  const go = (step: SouscrireStep, extra: Parameters<typeof update>[0] = {}) => {
    update({ step, ...extra });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const monthly = state.formule ? totalMonthly(state.products, state.formule) : 0;

  if (!ready) return <div className="mt-10 text-center text-xs text-muted">Chargement…</div>;

  return (
    <>
      <Stepper steps={STEPS.map((s) => s.label)} current={stepIndex + 1} />

      {state.step === "formule" && (
        <FormuleStep
          selected={state.formule}
          onSelect={(f) => update({ formule: f })}
          onNext={() => go("produit")}
        />
      )}

      {state.step === "produit" && (
        <ProduitStep
          formule={state.formule || "standard"}
          selected={state.products}
          onToggle={(id) =>
            update({
              products: state.products.includes(id) ? state.products.filter((p) => p !== id) : [...state.products, id],
            })
          }
          onBack={() => go("formule")}
          onNext={() => go("equipement", { equipmentIdx: 0 })}
        />
      )}

      {state.step === "equipement" && state.products[state.equipmentIdx] && (
        <EquipementStep
          key={state.products[state.equipmentIdx]}
          productId={state.products[state.equipmentIdx]}
          index={state.equipmentIdx}
          total={state.products.length}
          value={state.equipment[state.products[state.equipmentIdx]]}
          onChange={(v) => update({ equipment: { ...state.equipment, [state.products[state.equipmentIdx]]: v } })}
          onBack={() =>
            state.equipmentIdx > 0 ? update({ equipmentIdx: state.equipmentIdx - 1 }) : go("produit")
          }
          onNext={() =>
            state.equipmentIdx < state.products.length - 1
              ? update({ equipmentIdx: state.equipmentIdx + 1 })
              : go("recap")
          }
        />
      )}

      {state.step === "recap" && (
        <RecapStep
          state={state}
          monthly={monthly}
          loggedIn={loggedIn}
          onBack={() => go("equipement", { equipmentIdx: Math.max(0, state.products.length - 1) })}
          onNext={() => go("paiement")}
          onEdit={(idx) => go("equipement", { equipmentIdx: idx })}
        />
      )}

      {state.step === "paiement" && (
        <PaiementStep
          state={state}
          monthly={monthly}
          needsPhone={prefill?.needsPhone ?? false}
          email={prefill?.email ?? ""}
          onChange={update}
          onBack={() => go("recap")}
          onNext={() => go("notes")}
        />
      )}

      {state.step === "notes" && (
        <NotesStep notes={state.notes} onChange={(notes) => update({ notes })} onBack={() => go("paiement")} onNext={() => go("apercu")} />
      )}

      {state.step === "apercu" && prefill && (
        <ApercuStep
          state={state}
          monthly={monthly}
          email={prefill.email}
          onBack={() => go("notes")}
          onDone={(summary) => {
            try {
              sessionStorage.setItem(CONFIRMATION_KEY, JSON.stringify(summary));
            } catch {
              // ignoré : la confirmation s'affichera sans détail
            }
            reset();
            router.push("/deja-client/entretien/souscrire/confirmation");
            router.refresh();
          }}
        />
      )}
    </>
  );
}

/* ─────────────────────────── Étapes ─────────────────────────── */

function NavButtons({
  onBack,
  onNext,
  nextLabel = "CONTINUER",
  disabled,
  busy,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  disabled?: boolean;
  busy?: boolean;
}) {
  return (
    <div className="mt-6 flex items-center justify-between gap-3">
      {onBack ? (
        <button type="button" onClick={onBack} disabled={busy} className="btn btn-outline">
          <ArrowLeft size={16} /> PRÉCÉDENT
        </button>
      ) : (
        <span />
      )}
      <button type="button" onClick={onNext} disabled={disabled || busy} className="btn btn-primary disabled:opacity-50">
        {busy ? <Loader2 size={16} className="animate-spin" /> : null}
        {nextLabel} {!busy && <ArrowRight size={16} />}
      </button>
    </div>
  );
}

function FormuleStep({
  selected,
  onSelect,
  onNext,
}: {
  selected: string;
  onSelect: (f: "standard" | "premium" | "vip") => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-4">
      <h1 className="font-display text-xl text-navy">Choisissez votre formule d&apos;entretien</h1>
      <p className="mt-2 text-sm text-muted">Le tarif s&apos;applique par équipement et par mois, sur un contrat d&apos;un an.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {contractPlans.map((plan) => {
          const on = selected === plan.slug;
          return (
            <button
              key={plan.slug}
              type="button"
              onClick={() => onSelect(plan.slug)}
              className={`relative rounded-card border bg-white p-5 text-left shadow-card transition ${
                on ? "border-teal2 ring-2 ring-teal2" : "border-line"
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal2 px-3 py-1 text-[10px] font-extrabold text-white">
                  RECOMMANDÉ
                </span>
              )}
              <h3 className="text-sm font-bold text-navy">{plan.name}</h3>
              <ul className="mt-3 grid gap-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-muted">
                    <Check className="mt-0.5 shrink-0 text-teal2" size={14} />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-display text-lg text-navy">{plan.priceLabel}</p>
            </button>
          );
        })}
      </div>
      <NavButtons onNext={onNext} disabled={!selected} />
    </div>
  );
}

function ProduitStep({
  formule,
  selected,
  onToggle,
  onBack,
  onNext,
}: {
  formule: "standard" | "premium" | "vip";
  selected: ProductId[];
  onToggle: (id: ProductId) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className={card}>
      <h1 className="font-display text-xl text-navy">Quels équipements souhaitez-vous entretenir ?</h1>
      <p className="mt-2 text-sm text-muted">Sélectionnez un ou plusieurs équipements.</p>
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {equipmentTypes.map((eq) => {
          const on = selected.includes(eq.slug);
          return (
            <button
              key={eq.slug}
              type="button"
              onClick={() => onToggle(eq.slug)}
              aria-pressed={on}
              className={`flex items-center justify-between gap-3 rounded-md border p-3 text-left text-xs font-semibold ${
                on ? "border-teal2 bg-soft text-navy" : "border-line text-muted"
              }`}
            >
              <span>
                {eq.label}
                <span className="mt-0.5 block text-[11px] font-medium text-teal2">
                  {formatEuro(productPrice(eq.slug, formule))} TTC / mois
                </span>
              </span>
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  on ? "border-teal2 bg-teal2 text-white" : "border-line"
                }`}
              >
                {on && <Check size={12} />}
              </span>
            </button>
          );
        })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} disabled={selected.length === 0} />
    </div>
  );
}

function EquipementStep({
  productId,
  index,
  total,
  value,
  onChange,
  onBack,
  onNext,
}: {
  productId: ProductId;
  index: number;
  total: number;
  value?: { marque: string; modele: string; dateMiseEnService: string };
  onChange: (v: { marque: string; modele: string; dateMiseEnService: string }) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const today = todayIso();
  const v = value ?? { marque: "", modele: "", dateMiseEnService: today };
  const [showErrors, setShowErrors] = useState(false);
  const missing = !v.marque.trim() || !v.modele.trim() || !v.dateMiseEnService;
  const err = (bad: boolean) => (showErrors && bad ? "border-red-500" : "");

  return (
    <div className={card}>
      <p className="text-[11px] font-bold text-teal2">
        ÉQUIPEMENT {index + 1} / {total}
      </p>
      <h1 className="mt-1 font-display text-xl text-navy">{productLabel(productId)}</h1>
      <p className="mt-2 text-sm text-muted">Ces informations figureront sur votre contrat.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Marque *
          <input
            className={`${inputClass} ${err(!v.marque.trim())}`}
            placeholder="ex. Daikin, Mitsubishi"
            maxLength={80}
            value={v.marque}
            onChange={(e) => onChange({ ...v, marque: e.target.value })}
          />
        </label>
        <label className={labelClass}>
          Modèle *
          <input
            className={`${inputClass} ${err(!v.modele.trim())}`}
            maxLength={80}
            value={v.modele}
            onChange={(e) => onChange({ ...v, modele: e.target.value })}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Date de mise en service *
          <input
            type="date"
            max={today}
            className={`${inputClass} ${err(!v.dateMiseEnService)}`}
            value={v.dateMiseEnService}
            onChange={(e) => onChange({ ...v, dateMiseEnService: e.target.value })}
          />
        </label>
      </div>
      {showErrors && missing && (
        <p role="alert" className="mt-3 text-xs text-red-600">
          Renseignez la marque, le modèle et la date de mise en service.
        </p>
      )}
      <NavButtons
        onBack={onBack}
        onNext={() => (missing ? setShowErrors(true) : (onChange(v), onNext()))}
      />
    </div>
  );
}

function RecapStep({
  state,
  monthly,
  loggedIn,
  onBack,
  onNext,
  onEdit,
}: {
  state: ReturnType<typeof useContractFunnel>["state"];
  monthly: number;
  loggedIn: boolean;
  onBack: () => void;
  onNext: () => void;
  onEdit: (idx: number) => void;
}) {
  const plan = contractPlans.find((p) => p.slug === state.formule);
  return (
    <div className={card}>
      <h1 className="font-display text-xl text-navy">Récapitulatif de votre contrat</h1>
      <p className="mt-2 text-sm text-muted">
        Formule <strong className="text-navy">{plan?.name}</strong> · contrat d&apos;un an
      </p>

      <ul className="mt-5 grid gap-3">
        {state.products.map((id, idx) => {
          const d = state.equipment[id];
          return (
            <li key={id} className="flex items-start justify-between gap-3 rounded-md border border-line p-3">
              <div className="text-xs">
                <p className="font-bold text-navy">{productLabel(id)}</p>
                <p className="mt-1 text-muted">
                  {d?.marque} {d?.modele} · mise en service le {d?.dateMiseEnService.split("-").reverse().join("/")}
                </p>
                <button type="button" onClick={() => onEdit(idx)} className="mt-1 text-[11px] font-bold text-teal2">
                  Modifier
                </button>
              </div>
              <p className="whitespace-nowrap text-xs font-bold text-navy">
                {formatEuro(productPrice(id, state.formule as "standard"))} / mois
              </p>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex items-center justify-between rounded-md bg-soft p-4">
        <span className="text-xs font-bold text-navy">Total mensuel TTC</span>
        <span className="font-display text-xl text-navy">{formatEuro(monthly)}</span>
      </div>

      {loggedIn ? (
        <NavButtons onBack={onBack} onNext={onNext} />
      ) : (
        <div className="mt-6 rounded-md border border-teal2 bg-soft p-4">
          <p className="flex items-center gap-2 text-xs font-bold text-navy">
            <LogIn size={16} className="text-teal2" /> Connexion requise pour continuer
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Déjà client ? Connectez-vous avec le code reçu par e-mail. Nouveau client ? Créez votre espace en quelques
            secondes (onglet « Inscription »). Votre sélection est conservée.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={onBack} className="btn btn-outline">
              <ArrowLeft size={16} /> PRÉCÉDENT
            </button>
            <Link href="/connexion?next=/deja-client/entretien/souscrire" className="btn btn-primary">
              SE CONNECTER POUR CONTINUER <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function PaiementStep({
  state,
  monthly,
  needsPhone,
  email,
  onChange,
  onBack,
  onNext,
}: {
  state: ReturnType<typeof useContractFunnel>["state"];
  monthly: number;
  needsPhone: boolean;
  email: string;
  onChange: (patch: Partial<ReturnType<typeof useContractFunnel>["state"]>) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [showErrors, setShowErrors] = useState(false);
  const errors = {
    name: state.holderName.trim().length < 2,
    address: state.address.trim().length < 3,
    postalCode: !/^\d{5}$/.test(state.postalCode.trim()),
    city: state.city.trim().length < 2,
    phone: needsPhone && state.phone.replace(/\D/g, "").length < 10,
  };
  const invalid = Object.values(errors).some(Boolean);
  const err = (bad: boolean) => (showErrors && bad ? "border-red-500" : "");

  return (
    <div className={card}>
      <h1 className="font-display text-xl text-navy">Planification &amp; paiement</h1>
      <p className="mt-2 text-sm text-muted">
        Le contrat démarre aujourd&apos;hui pour une durée d&apos;un an. Le paiement se fait par prélèvement mensuel.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className={labelClass}>
          Montant mensuel (calculé)
          <div className="rounded-md border border-line bg-soft px-3 py-3 text-xs text-ink">{formatEuro(monthly)} TTC</div>
        </div>
        <label className={labelClass}>
          Jour de prélèvement *
          <select
            className={inputClass}
            value={state.paymentDate}
            onChange={(e) => onChange({ paymentDate: Number(e.target.value) })}
          >
            {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                Le {d} de chaque mois
              </option>
            ))}
          </select>
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          Titulaire du contrat (nom et prénom) *
          <input
            className={`${inputClass} ${err(errors.name)}`}
            autoComplete="name"
            maxLength={100}
            value={state.holderName}
            onChange={(e) => onChange({ holderName: e.target.value })}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Adresse *
          <input
            className={`${inputClass} ${err(errors.address)}`}
            autoComplete="street-address"
            maxLength={150}
            value={state.address}
            onChange={(e) => onChange({ address: e.target.value })}
          />
        </label>
        <label className={labelClass}>
          Code postal *
          <input
            className={`${inputClass} ${err(errors.postalCode)}`}
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={state.postalCode}
            onChange={(e) => onChange({ postalCode: e.target.value.replace(/\D/g, "") })}
          />
        </label>
        <label className={labelClass}>
          Ville *
          <input
            className={`${inputClass} ${err(errors.city)}`}
            autoComplete="address-level2"
            maxLength={80}
            value={state.city}
            onChange={(e) => onChange({ city: e.target.value })}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Téléphone {needsPhone ? "*" : "(facultatif)"}
          <input
            className={`${inputClass} ${err(errors.phone)}`}
            type="tel"
            autoComplete="tel"
            maxLength={20}
            value={state.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
          />
        </label>
      </div>

      <p className="mt-5 flex items-start gap-2 rounded-md bg-soft p-3 text-xs leading-relaxed text-muted">
        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-teal2" />
        <span>
          Vous ne saisissez pas votre IBAN ici. Après la signature du contrat, un lien sécurisé GoCardless est envoyé à{" "}
          <strong className="text-navy">{email}</strong> pour mettre en place votre prélèvement SEPA.
        </span>
      </p>

      {showErrors && invalid && (
        <p role="alert" className="mt-3 text-xs text-red-600">
          Complétez les champs signalés pour continuer.
        </p>
      )}
      <NavButtons onBack={onBack} onNext={() => (invalid ? setShowErrors(true) : onNext())} />
    </div>
  );
}

function NotesStep({
  notes,
  onChange,
  onBack,
  onNext,
}: {
  notes: string;
  onChange: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className={card}>
      <h1 className="font-display text-xl text-navy">Une remarque pour notre équipe ?</h1>
      <p className="mt-2 text-sm text-muted">Facultatif : accès au logement, disponibilités, précisions sur vos équipements…</p>
      <textarea
        className={`${inputClass} mt-5 min-h-[140px] w-full`}
        maxLength={1000}
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Votre message"
      />
      <p className="mt-1 text-right text-[10px] text-muted">{notes.length} / 1000</p>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

function ApercuStep({
  state,
  monthly,
  email,
  onBack,
  onDone,
}: {
  state: ReturnType<typeof useContractFunnel>["state"];
  monthly: number;
  email: string;
  onBack: () => void;
  onDone: (summary: { number: string; formule: string; products: string[]; monthly: number; email: string }) => void;
}) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const blobRef = useRef<Blob | null>(null);

  const key = useMemo(
    () =>
      JSON.stringify([
        state.contractNumber,
        state.formule,
        state.products,
        state.equipment,
        state.paymentDate,
        state.holderName,
        state.address,
        state.postalCode,
        state.city,
        state.phone,
      ]),
    [state],
  );

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;
    setGenerating(true);
    setError("");
    setPdfUrl(null);
    blobRef.current = null;

    (async () => {
      try {
        const { downloadContractPdf } = await import("@/lib/entretien/contract-pdf");
        const formule = state.formule as "standard" | "premium" | "vip";
        const [firstName = "", ...rest] = state.holderName.trim().split(/\s+/);
        const names = state.products.map((id) => equipmentTypes.find((e) => e.slug === id)!.crmName);
        const blob = await downloadContractPdf(
          {
            contractNumber: state.contractNumber,
            clientName: state.holderName.trim(),
            clientContact: { firstName, lastName: rest.join(" "), email, phone: state.phone },
            equipmentName: equipmentLabel(names),
            createdAt: new Date(),
            contractEndDate: new Date(`${addOneYear(todayIso())}T00:00:00`),
            monthlyAmount: monthly,
            equipment: state.products.map((id, idx) => {
              const d = state.equipment[id];
              return {
                id: `equipment-${idx}`,
                name: equipmentTypes.find((e) => e.slug === id)!.crmName,
                price: productPrice(id, formule),
                selected: true,
                typeId: id,
                fields: [
                  { label: "Marque", value: d.marque.trim() },
                  { label: "Modèle", value: d.modele.trim() },
                  { label: "Date de mise en service", value: d.dateMiseEnService },
                ],
              };
            }),
            clientAddress: { street: state.address, postalCode: state.postalCode, city: state.city, country: "France" },
            gocardlessAccountHolder: state.holderName.trim(),
            gocardlessAddress: state.address,
            gocardlessPostalCode: state.postalCode,
            gocardlessCity: state.city,
            gocardlessCountry: "France",
            gocardlessIban: "",
            paymentMethod: "gocardless",
            paymentDate: state.paymentDate,
            paymentStatus: "pending",
            signatureStatus: "pending",
          },
          false,
        );
        if (cancelled) return;
        blobRef.current = blob;
        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Impossible de générer le contrat.");
      } finally {
        if (!cancelled) setGenerating(false);
      }
    })();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  async function send() {
    if (!blobRef.current) return;
    setSending(true);
    setError("");
    try {
      const payload: SubscriptionPayload = {
        contractNumber: state.contractNumber,
        formule: state.formule as SubscriptionPayload["formule"],
        products: state.products,
        equipment: state.equipment,
        paymentDate: state.paymentDate,
        notes: state.notes,
        holder: {
          name: state.holderName.trim(),
          address: state.address.trim(),
          postalCode: state.postalCode.trim(),
          city: state.city.trim(),
          phone: state.phone.trim(),
        },
      };
      const form = new FormData();
      form.set("payload", JSON.stringify(payload));
      form.set("pdf", blobRef.current, `${state.contractNumber}.pdf`);
      const res = await fetch("/api/entretien/souscrire", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue. Réessayez.");
        return;
      }
      onDone({
        number: state.contractNumber,
        formule: state.formule,
        products: state.products,
        monthly,
        email,
      });
    } catch {
      setError("Connexion impossible. Vérifiez votre réseau et réessayez.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={card}>
      <h1 className="font-display text-xl text-navy">Aperçu de votre contrat</h1>
      <p className="mt-2 text-sm text-muted">
        Relisez votre contrat n° {state.contractNumber}. En l&apos;envoyant, vous le recevrez par e-mail pour signature
        électronique.
      </p>

      <div className="mt-5 overflow-hidden rounded-md border border-line bg-soft">
        {generating && (
          <div className="flex h-[300px] items-center justify-center gap-2 text-xs text-muted">
            <Loader2 size={16} className="animate-spin" /> Génération du contrat…
          </div>
        )}
        {pdfUrl && <iframe title="Aperçu du contrat" src={pdfUrl} className="hidden h-[560px] w-full bg-white sm:block" />}
        {pdfUrl && (
          <div className="p-4 text-center text-xs sm:hidden">
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              OUVRIR L&apos;APERÇU DU CONTRAT (PDF)
            </a>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 text-xs text-red-700">
          {error}
        </p>
      )}

      <NavButtons
        onBack={onBack}
        onNext={send}
        nextLabel="ENVOYER MON CONTRAT POUR SIGNATURE"
        disabled={generating || !pdfUrl}
        busy={sending}
      />
    </div>
  );
}
