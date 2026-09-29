"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Facebook,
  Handshake,
  Headphones,
  HelpCircle,
  Home,
  Instagram,
  LifeBuoy,
  Linkedin,
  Lock,
  Mail,
  Map as MapIcon,
  MapPin,
  MessagesSquare,
  Phone,
  ShieldCheck,
  User,
  Users,
  Wrench,
} from "lucide-react";
import heroImage from "@/public/images/solutions/r3.jpg";
import { siteConfig } from "@/lib/site";

type FormState = { name: string; phone: string; email: string; who: string; subject: string; message: string; website: string };
const emptyForm: FormState = { name: "", phone: "", email: "", who: "", subject: "", message: "", website: "" };
const REQUIRED = ["name", "phone", "email", "who", "subject", "message"] as const;

const whoOptions = [
  "Particulier propriétaire",
  "Particulier locataire",
  "Déjà client Label Énergie",
  "Professionnel / entreprise",
  "Partenaire / apporteur d'affaires",
];

const subjects: { label: string; sub: string; icon: typeof Home }[] = [
  { label: "Nouveau projet", sub: "Étude, devis, conseils", icon: Home },
  { label: "SAV", sub: "Dépannage, réparation", icon: LifeBuoy },
  { label: "Entretien", sub: "Contrat, maintenance", icon: Wrench },
  { label: "Aides & financement", sub: "MaPrimeRénov', CEE...", icon: ShieldCheck },
  { label: "Partenariat", sub: "Régies, apporteurs d'affaires", icon: Handshake },
  { label: "Autre demande", sub: "Informations générales", icon: HelpCircle },
];

const socials = [
  { name: "Facebook", icon: Facebook },
  { name: "Instagram", icon: Instagram },
  { name: "LinkedIn", icon: Linkedin },
] as const;

const inputClass = "h-11 w-full rounded-md border pl-9 pr-3.5 text-[13px] text-ink outline-none focus:border-teal2";
const labelClass = "grid gap-1.5 text-[13px] font-semibold text-navy";
const fieldIcon = "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted";

const addr = siteConfig.address;
const addressLines = [addr.streetAddress, `${addr.postalCode} ${addr.addressLocality}`];
const mapsQuery = encodeURIComponent(`${addr.streetAddress}, ${addr.postalCode} ${addr.addressLocality}`);

export function ContactExperience() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim());
  const phoneOk = /^0[1-9](\d{2}){4}$/.test(form.phone.replace(/[\s.-]/g, ""));
  const missing = REQUIRED.filter((k) => {
    if (!form[k].trim()) return true;
    if (k === "email") return !emailOk;
    if (k === "phone") return !phoneOk;
    return false;
  });
  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const errBorder = (k: (typeof REQUIRED)[number]) => (tried && missing.includes(k) ? "border-[#d0342c]" : "border-line");

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const pickSubject = (label: string) => {
    setForm((f) => ({ ...f, subject: label }));
    scrollToForm();
  };

  const callback = () => {
    setSent(false);
    setForm((f) => ({ ...f, subject: "Nouveau projet", message: f.message || "Je souhaite être rappelé(e) gratuitement." }));
    scrollToForm();
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (missing.length) {
      setTried(true);
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } finally {
      setSubmitting(false);
      setSent(true);
      setTried(false);
    }
  }

  const firstName = form.name.trim().split(/\s+/)[0] || "";

  return (
    <>
      {/* Hero : l'image décorative est un fond détouré derrière la section (comme dans la maquette),
          pas une photo dans la carte du formulaire. */}
      <section className="relative overflow-hidden pt-6">
        <div
          className="pointer-events-none absolute right-0 top-0 hidden h-[660px] w-[60%] overflow-hidden xl:h-[620px] lg:block"
          style={{ clipPath: "polygon(12% 0,100% 0,100% 100%,22% 100%,14% 70%,10% 30%)" }}
          aria-hidden
        >
          <Image src={heroImage} alt="" fill sizes="52vw" style={{ objectFit: "cover" }} priority />
        </div>

        <div className="container relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start">
          <div>
            <p className="eyebrow">CONTACTEZ-NOUS</p>
            <h1 className="mt-3 font-display text-[32px] font-bold leading-[1.25] text-navy sm:text-[37px]">
              Une question, un projet ?
              <br />
              <span className="text-[#0b5c42]">
                Notre équipe est là
                <br />
                pour vous accompagner.
              </span>
            </h1>
            <p className="mt-5 max-w-[440px] text-[13.5px] leading-relaxed text-navy">
              Que vous ayez besoin d&apos;informations, d&apos;un devis ou d&apos;une assistance, nos conseillers vous
              répondent rapidement et vous guident tout au long de votre projet.
            </p>

            <div className="mt-8 grid max-w-[520px] grid-cols-2 gap-5 sm:grid-cols-4">
              {[
                { icon: Headphones, title: "Réponse rapide", text: "sous 24h" },
                { icon: CalendarCheck, title: "Conseils gratuits", text: "et personnalisés" },
                { icon: ShieldCheck, title: "Experts certifiés", text: "à votre écoute" },
                { icon: MapIcon, title: "Intervention", text: "partout en France" },
              ].map((p) => (
                <div key={p.title}>
                  <p.icon size={26} className="text-teal2" strokeWidth={1.4} />
                  <p className="mt-3 text-[13px] leading-relaxed text-navy">
                    <b className="font-semibold">{p.title}</b>
                    <br />
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex max-w-[520px] flex-wrap items-center gap-4 rounded-[10px] bg-[#eef5f1] px-5 py-4">
              <div className="min-w-0 flex-1 basis-[180px] border-r border-[#d6e5dc] pr-4">
                <p className="text-[13px] font-semibold text-navy">Besoin d&apos;un conseil immédiat ?</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-navy">
                  Appelez-nous directement, nos conseillers sont disponibles du lundi au vendredi.
                </p>
              </div>
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3.5 text-navy">
                <Phone size={24} className="shrink-0 text-teal2" strokeWidth={1.4} />
                <span>
                  <span className="block text-[17px] font-semibold text-[#0b5c42]">{siteConfig.phoneDisplay}</span>
                  <span className="text-[13px]">Du lundi au vendredi de 8h à 18h</span>
                </span>
              </a>
            </div>
          </div>

          <div ref={formRef} className="relative rounded-[10px] border border-line bg-white p-6 shadow-card lg:mt-9">
            {!sent ? (
              <form onSubmit={submit} className="grid gap-4">
                <div>
                  <p className="text-[17px] font-semibold text-navy">Envoyez-nous un message</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-navy">
                    Remplissez le formulaire, nous vous recontactons dans les plus brefs délais.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <User size={14} className={fieldIcon} />
                    <input
                      placeholder="Nom et prénom*"
                      value={form.name}
                      onChange={set("name")}
                      className={`${inputClass} ${errBorder("name")}`}
                    />
                  </div>
                  <div className="relative">
                    <Phone size={14} className={fieldIcon} />
                    <input
                      type="tel"
                      placeholder="Téléphone*"
                      value={form.phone}
                      onChange={set("phone")}
                      className={`${inputClass} ${errBorder("phone")}`}
                    />
                  </div>
                </div>
                <div className="relative">
                  <Mail size={14} className={fieldIcon} />
                  <input
                    type="email"
                    placeholder="Email*"
                    value={form.email}
                    onChange={set("email")}
                    className={`${inputClass} ${errBorder("email")}`}
                  />
                </div>

                <label className={labelClass}>
                  Vous êtes ?*
                  <select value={form.who} onChange={set("who")} className={`h-11 rounded-md border px-3.5 text-[13px] text-ink outline-none focus:border-teal2 bg-white ${errBorder("who")}`}>
                    <option value="">Sélectionnez une option</option>
                    {whoOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>

                <label className={labelClass}>
                  Objet de votre demande*
                  <select value={form.subject} onChange={set("subject")} className={`h-11 rounded-md border px-3.5 text-[13px] text-ink outline-none focus:border-teal2 bg-white ${errBorder("subject")}`}>
                    <option value="">Sélectionnez un sujet</option>
                    {subjects.map((s) => (
                      <option key={s.label}>{s.label}</option>
                    ))}
                  </select>
                </label>

                <label className={labelClass}>
                  Votre message*
                  <textarea
                    placeholder="Décrivez votre projet ou votre demande..."
                    value={form.message}
                    onChange={set("message")}
                    rows={3}
                    className={`rounded-md border px-3.5 py-3 text-[13px] text-ink outline-none focus:border-teal2 ${errBorder("message")}`}
                  />
                </label>

                {/* Honeypot anti-spam : invisible et ignoré par les humains, rempli seulement par les robots. */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={set("website")}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
                />

                <p className="flex items-center gap-2 text-[13px] text-navy">
                  <Lock size={13} className="shrink-0 text-teal2" />
                  Vos données sont sécurisées et confidentielles.
                </p>

                {tried && missing.length > 0 && (
                  <p role="alert" className="text-[13px] text-[#b03a2e]">
                    Merci de compléter les champs obligatoires (*).
                  </p>
                )}

                <button type="submit" disabled={submitting} className="btn btn-primary mt-1 justify-center disabled:opacity-60">
                  {submitting ? "ENVOI EN COURS..." : "ENVOYER MA DEMANDE"} <ArrowRight size={15} />
                </button>
              </form>
            ) : (
              <div className="flex min-h-[380px] flex-col items-center justify-center gap-3.5 px-4 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf6ef]">
                  <CheckCircle2 size={28} className="text-teal2" />
                </span>
                <p className="text-[17px] font-semibold text-navy">Merci {firstName || ""} !</p>
                <p className="text-[13px] leading-relaxed text-muted">
                  Votre demande « {form.subject} » a bien été envoyée.
                  <br />
                  Un conseiller vous recontacte sous 24h.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm(emptyForm);
                  }}
                  className="text-[13px] font-semibold text-teal2"
                >
                  Envoyer une autre demande
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sujets */}
      <section className="section pt-10">
        <div className="container">
          <h2 className="text-center font-display text-xl text-navy">
            Comment pouvons-nous <span className="text-teal2">vous aider</span> ?
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {subjects.map((s) => {
              const on = form.subject === s.label;
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => pickSubject(s.label)}
                  className={`flex flex-col items-center rounded-md border px-3 py-5 text-center transition-colors hover:border-teal2 ${
                    on ? "border-teal2 bg-soft" : "border-line bg-white"
                  }`}
                >
                  <s.icon size={28} className="text-teal2" strokeWidth={1.3} />
                  <span className="mt-3.5 text-[13px] font-semibold text-navy">{s.label}</span>
                  <span className="mt-1.5 text-[13px] text-muted">{s.sub}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coordonnées + carte */}
      <section className="section pt-0">
        <div className="container grid gap-5 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)]">
          <div className="rounded-[10px] border border-line bg-soft p-5">
            <h2 className="text-sm font-semibold text-navy">Nos coordonnées</h2>
            <div className="mt-5 grid gap-5">
              <a href={`tel:${siteConfig.phone}`} className="flex gap-4 text-navy">
                <Phone size={22} className="shrink-0 text-teal2" strokeWidth={1.3} />
                <span className="text-[13px] leading-relaxed">
                  <b className="block font-semibold">{siteConfig.phoneDisplay}</b>
                  Du lundi au vendredi de 8h à 18h
                </span>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex gap-4 text-navy">
                <Mail size={22} className="shrink-0 text-teal2" strokeWidth={1.3} />
                <span className="break-all text-[13px] leading-relaxed">
                  <b className="font-semibold">{siteConfig.email}</b>
                  <br />
                  Réponse sous 24h
                </span>
              </a>
              <div className="flex gap-4 text-navy">
                <MapPin size={22} className="shrink-0 text-teal2" strokeWidth={1.3} />
                <span className="text-[13px] leading-relaxed">
                  <b className="font-semibold">Label Énergie</b>
                  <br />
                  {addressLines[0]}
                  <br />
                  {addressLines[1]}, France
                </span>
              </div>
            </div>

            <div className="mt-5 border-t border-[#e4ebe7] pt-4">
              <p className="text-[13px] font-semibold text-navy">Suivez-nous</p>
              <div className="mt-3.5 flex gap-3">
                {socials.map((s) => {
                  const href = siteConfig.sameAs.find((u) => u.toLowerCase().includes(s.name.toLowerCase()));
                  if (!href) return null;
                  return (
                    <a
                      key={s.name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-navy hover:border-teal2"
                    >
                      <s.icon size={15} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-[10px] border border-line bg-soft">
            <iframe
              title="Carte du siège Label Énergie"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.6288%2C48.8211%2C2.6438%2C48.8291&layer=mapnik&marker=48.8250815%2C2.6362564"
              className="absolute inset-0 h-full w-full border-0"
              style={{ filter: "grayscale(0.55) contrast(0.95)" }}
              loading="lazy"
            />
            <div className="absolute left-3.5 top-1/2 w-[230px] -translate-y-1/2 rounded-md bg-white p-4 shadow-card">
              <div className="flex gap-3.5">
                <MapPin size={20} className="mt-0.5 shrink-0 text-navy" strokeWidth={1.4} />
                <div>
                  <p className="text-[13px] font-semibold text-navy">Notre siège social</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-navy">
                    {addressLines[0]}
                    <br />
                    {addressLines[1]}
                  </p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline mt-4 w-full justify-center py-2.5 text-[13px]"
              >
                VOIR L&apos;ITINÉRAIRE <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau équipe : chiffres propres à cette section (distincts de la bande de réassurance plus bas). */}
      <section className="section pt-0">
        <div className="container">
          <div className="grid items-center gap-6 rounded-[10px] bg-[#f5f7f6] p-6 sm:grid-cols-[auto_minmax(0,1.3fr)_repeat(3,minmax(0,0.8fr))]">
            <Headphones size={44} className="text-[#0b5c42]" strokeWidth={1} />
            <div>
              <p className="text-[15px] font-semibold text-navy">Une équipe proche de vous</p>
              <p className="mt-2 text-[13px] leading-relaxed text-navy">
                Plus de {siteConfig.stats.collaborators} collaborateurs et plus de 20 équipes techniques à votre
                service partout en France.
              </p>
            </div>
            {[
              { icon: Users, value: "+20", label: "Équipes techniques sur toute la France" },
              { icon: User, value: "+5 000", label: "Clients accompagnés depuis 2016" },
              { icon: Home, value: "+200", label: "Installations réalisées chaque mois" },
            ].map((s) => (
              <div key={s.label} className="flex gap-3.5">
                <s.icon size={26} className="shrink-0 text-teal2" strokeWidth={1.3} />
                <div>
                  <p className="text-[19px] font-semibold text-[#0b5c42]">{s.value}</p>
                  <p className="text-[13px] leading-snug text-navy">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rappel gratuit */}
      <section className="section pt-0">
        <div className="container">
          <div className="grid items-center gap-8 rounded-[10px] bg-gradient-to-r from-[#0a4d38] to-[#0e7a55] px-6 py-6 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,0.75fr)] sm:px-10">
            <span className="hidden h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full border border-[#cfe9da] sm:flex">
              <MessagesSquare size={32} className="text-white" strokeWidth={1} />
            </span>
            <div>
              <p className="text-[19px] font-semibold text-white">Vous préférez être rappelé ?</p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-[#e3f1eb]">
                Laissez-nous vos coordonnées, nous vous appelons gratuitement au moment qui vous convient.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <button
                type="button"
                onClick={callback}
                className="btn w-full justify-center bg-white text-[#0b5c42] hover:bg-[#eaf5f0]"
              >
                ÊTRE RAPPELÉ GRATUITEMENT <ArrowRight size={14} />
              </button>
              <span className="flex items-center gap-2 text-[13px] text-white">
                <CheckCircle2 size={14} /> Sans engagement
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Réassurance */}
      <section className="container pb-10 pt-0">
        <div className="trust solution-trust">
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
            <CalendarCheck className="trust-mark trust-icon" aria-hidden />
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
          <div className="trust-item trust-inline">
            <CheckCircle2 className="trust-mark trust-icon" aria-hidden />
            <div className="trust-text">
              <strong>A à Z</strong>
              <span className="trust-caption" style={{ fontSize: 13 }}>
                Accompagnement
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
