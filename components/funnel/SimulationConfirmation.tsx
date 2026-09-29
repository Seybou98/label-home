"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  Download,
  FileCheck2,
  Home,
  MessageSquare,
  Pencil,
  Phone,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { fmt } from "@/lib/simulation";
import { addDays, todayIso } from "@/lib/portal/format";

// Résumé enregistré par le simulateur juste avant la redirection ici.
const CONFIRMATION_KEY = "label-energie-simulation-confirmation";

type Summary = {
  prenom: string;
  projet: string;
  logement: string[];
  chauffage: string;
  mpr: number;
  ceeMin: number;
  ceeMax: number;
  totalMin: number;
  totalMax: number;
  profil: string;
};

const HOURS = ["entre 9h et 11h", "entre 11h et 13h", "entre 14h et 16h", "entre 16h et 18h"];
const STEPS = ["Votre projet", "Votre logement", "Votre situation", "Résultats", "Être rappelé", "Demande envoyée"];

const NEXT_STEPS = [
  { icon: FileCheck2, title: "Simulation terminée", text: "Vous avez répondu à toutes les questions", done: true },
  { icon: Search, title: "Demande transmise", text: "Nous avons bien reçu vos informations", done: true },
  { icon: UserCheck, title: "Conseiller Label Énergie", text: "Un expert analyse votre projet et vérifie vos aides", done: false },
  { icon: Home, title: "Visite technique gratuite", text: "Vous recevez nos conseils et le chiffrage définitif sur place", done: false },
];

/** Les 5 prochains jours ouvrés, à partir de demain. */
function nextBusinessDays(n: number): string[] {
  const out: string[] = [];
  let d = addDays(todayIso(), 1);
  while (out.length < n) {
    const weekday = new Date(`${d}T12:00:00Z`).getUTCDay();
    if (weekday !== 0 && weekday !== 6) out.push(d);
    d = addDays(d, 1);
  }
  return out;
}

const frWeekday = (iso: string) => {
  const label = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T12:00:00Z`),
  );
  return label.charAt(0).toUpperCase() + label.slice(1);
};

export function SimulationConfirmation() {
  const [summary, setSummary] = useState<Summary | null | undefined>(undefined);
  const days = useMemo(() => nextBusinessDays(5), []);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [editing, setEditing] = useState(false);
  const [draftDay, setDraftDay] = useState(0);
  const [draftHour, setDraftHour] = useState(0);
  const [copied, setCopied] = useState(false);
  const [ref] = useState(() => `LE-${todayIso().replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CONFIRMATION_KEY);
      setSummary(raw ? (JSON.parse(raw) as Summary) : null);
    } catch {
      setSummary(null);
    }
  }, []);

  if (summary === undefined) return null;

  async function downloadPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    let y = 22;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Label Énergie — Récapitulatif de votre demande", 20, y);
    y += 10;
    doc.setFontSize(10);
    doc.setTextColor(90);
    doc.text(`N° de demande : ${ref}`, 20, y);
    y += 5;
    doc.text(`Date : ${new Date().toLocaleDateString("fr-FR")}`, 20, y);
    y += 10;
    doc.setTextColor(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Votre projet", 20, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    if (summary) {
      doc.text(summary.projet, 20, y);
      y += 5;
      doc.text(summary.logement.join(" · "), 20, y);
      y += 5;
      doc.text(summary.chauffage, 20, y);
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Aides estimées", 20, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      if (summary.mpr > 0) {
        doc.text(`MaPrimeRénov' (profil ${summary.profil}) : ${fmt(summary.mpr)}`, 20, y);
        y += 5;
      }
      doc.text(`Prime CEE estimée : ${fmt(summary.ceeMin)} à ${fmt(summary.ceeMax)}`, 20, y);
      y += 8;
      doc.setFont("helvetica", "bold");
      doc.text(`Total estimé : jusqu'à ${fmt(summary.totalMax)}`, 20, y);
      y += 10;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text("Estimation indicative, non contractuelle. Montants confirmés après visite technique gratuite.", 20, y);
    doc.save(`Label-Energie-${ref}.pdf`);
  }

  return (
    <div className="souscription-shell py-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">SIMULATEUR D&apos;AIDES</p>
        <h1 className="mt-2 font-display text-2xl text-navy sm:text-[28px]">
          Votre demande est <span className="text-teal2">bien envoyée</span> !
        </h1>
        <p className="mt-2 text-[13px] text-muted">
          Merci ! Un conseiller Label Énergie va maintenant vérifier votre projet et vos aides.
        </p>
      </div>

      {/* Fil d'étapes */}
      <div className="mt-7 rounded-card border border-line bg-white p-4 shadow-card">
        <ol className="grid grid-cols-3 gap-y-4 sm:grid-cols-6">
          {STEPS.map((label, i) => {
            const done = i < STEPS.length - 1;
            const current = i === STEPS.length - 1;
            return (
              <li key={label} className="flex flex-col items-center gap-2 text-center">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                    done ? "bg-teal2 text-white" : current ? "border-2 border-teal2 text-teal2" : "border border-line text-muted"
                  }`}
                >
                  {done ? <Check size={13} /> : i + 1}
                </span>
                <span className={`text-[10.5px] leading-tight ${current ? "font-semibold text-teal2" : "text-navy"}`}>{label}</span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Merci */}
      <div className="mt-4 rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
        <div className="grid gap-6 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-center">
          <span className="mx-auto flex h-[110px] w-[110px] items-center justify-center rounded-full bg-soft text-teal2">
            <CheckCircle2 size={52} strokeWidth={1.6} />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-navy">Merci pour votre confiance !</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-navy">
              Votre étude personnalisée est en cours de traitement.
              <br />
              Nous vous rappelons dans le créneau que vous avez choisi.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 rounded-md bg-soft p-4">
              <Phone size={20} className="shrink-0 text-teal2" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-muted">Vous serez rappelé le</p>
                <p className="mt-0.5 text-[13px] font-semibold text-navy">
                  {frWeekday(days[day])} {HOURS[hour]}
                </p>
              </div>
              {!editing && (
                <button
                  type="button"
                  onClick={() => {
                    setDraftDay(day);
                    setDraftHour(hour);
                    setEditing(true);
                  }}
                  className="btn btn-outline py-2 text-[11px]"
                >
                  <Pencil size={12} /> Modifier
                </button>
              )}
            </div>

            {editing && (
              <div className="mt-2.5 flex flex-wrap items-end gap-3 rounded-md border border-line p-3.5">
                <label className="grid min-w-[160px] flex-1 gap-1.5 text-[11.5px] font-semibold text-navy">
                  Jour
                  <select value={draftDay} onChange={(e) => setDraftDay(Number(e.target.value))} className="h-9 rounded-md border border-line px-2.5 text-[12px] text-navy outline-none focus:border-teal2">
                    {days.map((d, i) => (
                      <option key={d} value={i}>
                        {frWeekday(d)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid min-w-[140px] flex-1 gap-1.5 text-[11.5px] font-semibold text-navy">
                  Créneau
                  <select value={draftHour} onChange={(e) => setDraftHour(Number(e.target.value))} className="h-9 rounded-md border border-line px-2.5 text-[12px] text-navy outline-none focus:border-teal2">
                    {HOURS.map((h, i) => (
                      <option key={h} value={i}>
                        {h}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setDay(draftDay);
                    setHour(draftHour);
                    setEditing(false);
                  }}
                  className="btn btn-primary py-2 text-[11px]"
                >
                  Valider
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="my-7 h-px bg-line" />

        <h2 className="text-center text-sm font-semibold text-navy">Voici les prochaines étapes</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-4">
          {NEXT_STEPS.map((s) => (
            <div key={s.title} className="flex flex-col items-center text-center">
              <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-line bg-white text-teal2">
                <s.icon size={26} strokeWidth={1.4} />
              </span>
              <p className="mt-3.5 flex items-center gap-1.5 text-[12px] font-semibold text-navy">
                {s.done && <Check size={12} className="text-teal2" />} {s.title}
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Récapitulatif */}
        <div className="mt-7 rounded-md border border-line">
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-line px-5 py-3.5">
            <h3 className="text-[13px] font-semibold text-navy">Récapitulatif de votre demande</h3>
            <div className="flex items-center gap-3 text-[11.5px] text-navy">
              N° de demande : <span className="font-semibold">{ref}</span>
              <button
                type="button"
                title="Copier"
                onClick={() => {
                  navigator.clipboard?.writeText(ref).catch(() => {});
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1600);
                }}
                className="text-teal2"
              >
                <Copy size={14} />
              </button>
              {copied && <span className="text-[10.5px] font-semibold text-teal2">Copié !</span>}
            </div>
          </div>
          <div className="grid gap-5 p-5 sm:grid-cols-3 sm:divide-x sm:divide-line sm:gap-0">
            <div className="sm:pr-5">
              <p className="text-[11.5px] font-semibold text-navy">Votre projet</p>
              <p className="mt-2.5 text-[12px] leading-relaxed text-navy">{summary?.projet ?? "Pompe à chaleur air/eau"}</p>
            </div>
            <div className="sm:px-5">
              <p className="text-[11.5px] font-semibold text-navy">Votre logement</p>
              <div className="mt-2.5 grid gap-2 text-[11.5px] text-navy">
                {(summary?.logement ?? []).map((l) => (
                  <p key={l} className="flex items-center gap-2">
                    <Home size={13} className="shrink-0 text-muted" /> {l}
                  </p>
                ))}
                {summary?.chauffage && (
                  <p className="flex items-center gap-2">
                    <ShieldCheck size={13} className="shrink-0 text-muted" /> {summary.chauffage}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:pl-5">
              <p className="text-[11.5px] font-semibold text-navy">Aides estimées</p>
              <div className="mt-2.5 grid gap-2 text-[11.5px] text-navy">
                {summary && summary.mpr > 0 && (
                  <p className="flex justify-between gap-3">
                    <span>MaPrimeRénov&apos;</span> <b className="text-teal2">{fmt(summary.mpr)}</b>
                  </p>
                )}
                {summary && (
                  <p className="flex justify-between gap-3">
                    <span>CEE</span>{" "}
                    <b className="text-teal2">
                      {fmt(summary.ceeMin)} – {fmt(summary.ceeMax)}
                    </b>
                  </p>
                )}
              </div>
              {summary && (
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-[11.5px] font-semibold text-navy">Total estimé</span>
                  <b className="text-[16px] font-semibold text-teal2">jusqu&apos;à {fmt(summary.totalMax)}</b>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button type="button" onClick={downloadPdf} className="btn btn-outline min-w-[260px] justify-center">
            <Download size={15} /> Voir mon récapitulatif (PDF)
          </button>
          <Link href="/" className="btn btn-primary min-w-[260px] justify-center">
            <Home size={15} /> Retourner à l&apos;accueil
          </Link>
        </div>

        <div className="mt-6 grid gap-4 rounded-md bg-soft p-5 sm:grid-cols-3">
          <div className="flex items-center gap-3.5 sm:border-r sm:border-line sm:pr-4">
            <ClipboardCheck size={26} className="shrink-0 text-teal2" strokeWidth={1.3} />
            <div>
              <p className="text-[11.5px] font-semibold text-navy">Une question en attendant notre appel ?</p>
              <p className="mt-1 text-[11px] text-muted">Nos conseillers sont là pour vous aider.</p>
            </div>
          </div>
          <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3.5 text-navy sm:border-r sm:border-line sm:pl-4 sm:pr-4">
            <Phone size={22} className="shrink-0 text-teal2" strokeWidth={1.3} />
            <span className="text-[12px]">
              <b className="block font-semibold">{siteConfig.phoneDisplay}</b>
              Lun. - Ven. 8h - 18h
            </span>
          </a>
          <div className="flex items-center gap-3.5 text-navy sm:pl-4">
            <MessageSquare size={22} className="shrink-0 text-teal2" strokeWidth={1.3} />
            <span className="text-[12px]">
              <b className="block font-semibold">WhatsApp</b>
              Réponse rapide
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 trust solution-trust">
        <div className="trust-item trust-inline">
          <ShieldCheck className="trust-mark trust-icon" aria-hidden />
          <div className="trust-text">
            <strong>RGE</strong>
            <span className="trust-caption" style={{ fontSize: 13 }}>
              Entreprise certifiée
            </span>
          </div>
        </div>
        <div className="trust-item trust-inline">
          <Home className="trust-mark trust-icon" aria-hidden />
          <div className="trust-text">
            <strong>{siteConfig.stats.installations}</strong>
            <span className="trust-caption" style={{ fontSize: 13 }}>
              Installations réalisées
            </span>
          </div>
        </div>
        <div className="trust-item trust-inline">
          <Calendar className="trust-mark trust-icon" aria-hidden />
          <div className="trust-text">
            <strong>{siteConfig.rating.valueLabel}/5</strong>
            <span className="trust-caption" style={{ fontSize: 13 }}>
              Sur +{siteConfig.rating.count} avis Google
            </span>
          </div>
        </div>
        <div className="trust-item trust-inline">
          <ShieldCheck className="trust-mark trust-icon" aria-hidden />
          <div className="trust-text">
            <strong>{siteConfig.stats.experienceYears} ans</strong>
            <span className="trust-caption" style={{ fontSize: 13 }}>
              D&apos;expérience
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
