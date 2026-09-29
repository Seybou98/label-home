"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  FileText,
  FolderOpen,
  Headphones,
  HelpCircle,
  Home,
  LifeBuoy,
  Mail,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import heroImage from "@/public/images/equipe/t2.jpg";
import advisorImage from "@/public/images/equipe/E4.png";
import { siteConfig } from "@/lib/site";

type CategoryKey = "sol" | "aide" | "inst" | "sav" | "compte" | "gen";

const categories: { key: CategoryKey; label: string; text: string; icon: typeof Home }[] = [
  { key: "sol", label: "Nos solutions", text: "Tout savoir sur nos équipements et leur fonctionnement.", icon: Home },
  { key: "aide", label: "Aides & financement", text: "MaPrimeRénov', CEE, financement : comprendre les dispositifs.", icon: ShieldCheck },
  { key: "inst", label: "Installation", text: "Déroulement du chantier, délais, préparation, mise en service.", icon: Wrench },
  { key: "sav", label: "Entretien & SAV", text: "Entretien, dépannage, garanties et maintenance.", icon: LifeBuoy },
  { key: "compte", label: "Compte & documents", text: "Espace client, documents, factures et suivi.", icon: FolderOpen },
  { key: "gen", label: "Généralités", text: "Autres questions fréquentes sur Label Énergie.", icon: HelpCircle },
];

const faqItems: { category: CategoryKey; q: string; a: string }[] = [
  {
    category: "aide",
    q: "Quelles aides puis-je obtenir pour mon projet ?",
    a: "Selon votre projet et vos revenus, vous pouvez cumuler MaPrimeRénov', les certificats d'économies d'énergie (CEE), l'éco-prêt à taux 0 et une TVA réduite à 5,5 %. Notre simulateur en ligne vous permet d'estimer rapidement le montant de vos aides.",
  },
  {
    category: "aide",
    q: "Label Énergie est-elle certifiée RGE ?",
    a: "Oui, Label Énergie est une entreprise certifiée RGE (Reconnu Garant de l'Environnement), condition indispensable pour bénéficier des aides de l'État.",
  },
  {
    category: "aide",
    q: "Puis-je financer mon projet en plusieurs fois ?",
    a: "Oui : prêt travaux à taux fixe de 12 à 120 mois, paiement en 3 ou 4 fois sans frais, ou éco-prêt à taux zéro selon votre projet. Votre conseiller vous oriente vers la solution la plus adaptée.",
  },
  {
    category: "sol",
    q: "Une pompe à chaleur air/eau convient-elle à ma maison ?",
    a: "Elle remplace très bien une chaudière fioul ou gaz sur un réseau de radiateurs ou un plancher chauffant. Une étude thermique gratuite permet de dimensionner l'équipement adapté à votre logement.",
  },
  {
    category: "sol",
    q: "Quelle est la différence entre une PAC air/air et air/eau ?",
    a: "La PAC air/air diffuse l'air chauffé (ou rafraîchi) directement dans les pièces, comme une climatisation réversible. La PAC air/eau chauffe l'eau de vos radiateurs, plancher chauffant ou ballon d'eau chaude.",
  },
  {
    category: "inst",
    q: "Quels sont les délais d'installation ?",
    a: "Comptez généralement quelques semaines entre la signature du devis et la pose, selon l'équipement et l'obtention des aides. L'installation elle-même dure 1 à 2 jours pour une pompe à chaleur ou une climatisation, et 1 jour pour des panneaux photovoltaïques.",
  },
  {
    category: "inst",
    q: "Dois-je être présent le jour de l'installation ?",
    a: "Votre présence est souhaitée au début et à la fin du chantier, pour l'accès au logement puis la mise en service et la prise en main de votre équipement.",
  },
  {
    category: "sav",
    q: "Les équipements sont-ils garantis ?",
    a: "Oui. Nos équipements bénéficient de la garantie constructeur, de notre garantie de pose et de l'assurance décennale.",
  },
  {
    category: "sav",
    q: "Comment se déroule l'entretien de mon équipement ?",
    a: "Un technicien intervient une fois par an pour contrôler, nettoyer et optimiser votre installation. Avec un contrat d'entretien Standard, Premium ou VIP, la visite est planifiée automatiquement.",
  },
  {
    category: "compte",
    q: "Comment suivre l'avancement de mon projet ?",
    a: "Depuis votre espace client, rubrique « Mon projet » : chaque étape, vos documents et vos rendez-vous sont mis à jour en temps réel.",
  },
  {
    category: "compte",
    q: "Où retrouver mes factures et documents ?",
    a: "Toutes vos factures et tous vos documents (devis, contrat, attestations) sont disponibles à tout moment dans votre espace client, rubrique « Documents ».",
  },
  {
    category: "gen",
    q: "Intervenez-vous partout en France ?",
    a: "Oui. Avec plus de 20 équipes techniques internes, nous intervenons sur tout le territoire métropolitain, avec une intervention rapide en Île-de-France, où se trouve notre siège.",
  },
];

const inputClass =
  "h-11 w-full rounded-md border border-line pl-10 pr-4 text-[13px] text-ink outline-none focus:border-teal2";

export function FaqExperience() {
  const [tab, setTab] = useState<"all" | CategoryKey>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqItems.filter(
      (f) => (tab === "all" || f.category === tab) && (!q || `${f.q} ${f.a}`.toLowerCase().includes(q)),
    );
  }, [tab, query]);

  const pickCategory = (key: CategoryKey) => {
    setTab(key);
    setOpen(0);
    document.getElementById("faq-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Hero : la photo a un fondu doux sur le bord gauche (masque en dégradé), pas une découpe en diagonale. */}
      <section className="relative overflow-hidden pt-6">
        <div
          className="pointer-events-none absolute right-0 top-0 hidden h-[600px] w-[58%] overflow-hidden lg:block"
          style={{
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 28%)",
            maskImage: "linear-gradient(90deg, transparent 0%, #000 28%)",
          }}
          aria-hidden
        >
          <Image src={heroImage} alt="" fill sizes="50vw" style={{ objectFit: "cover" }} priority />
        </div>

        <div className="container relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_230px] lg:items-start">
          <div>
            <p className="eyebrow">BESOIN D&apos;AIDE ?</p>
            <h1 className="mt-3 font-display text-[32px] font-bold leading-[1.2] text-navy sm:text-[38px]">
              FAQ &amp; Centre d&apos;aide
            </h1>
            <p className="mt-2 text-[16px] font-semibold text-[#0b5c42]">Toutes les réponses à vos questions.</p>
            <p className="mt-4 max-w-[420px] text-[13px] leading-relaxed text-navy">
              Retrouvez ici les réponses aux questions les plus fréquentes sur nos solutions, les aides
              financières, l&apos;installation et le suivi. Vous ne trouvez pas votre réponse ? Notre équipe est
              là pour vous aider.
            </p>

            <div className="relative mt-6 max-w-[430px]">
              <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(0);
                }}
                placeholder="Rechercher une question, une aide..."
                className={inputClass}
              />
            </div>

            <div className="mt-8 inline-flex max-w-[560px] flex-wrap gap-y-3 rounded-[8px] bg-white/90 py-2.5">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 border-r border-line pr-5 text-navy">
                <Phone size={22} className="shrink-0 text-teal2" strokeWidth={1.4} />
                <span className="text-[13px] leading-snug">
                  Nous appeler
                  <br />
                  <b className="font-semibold text-[#0b5c42]">{siteConfig.phoneDisplay}</b>
                </span>
              </a>
              <div className="flex items-center gap-3 border-r border-line px-5 text-navy">
                <MessageSquare size={22} className="shrink-0 text-teal2" strokeWidth={1.4} />
                <span className="text-[13px] leading-snug">
                  Discuter avec nous
                  <br />
                  <b className="font-semibold text-[#0b5c42]">WhatsApp</b>
                </span>
              </div>
              <Link href="/contact" className="flex items-center gap-3 border-r border-line px-5 text-navy">
                <Mail size={22} className="shrink-0 text-teal2" strokeWidth={1.4} />
                <span className="text-[13px] leading-snug">
                  Nous écrire
                  <br />
                  <b className="font-semibold text-[#0b5c42]">Formulaire de contact</b>
                </span>
              </Link>
              <div className="flex items-center gap-3 pl-5 text-navy">
                <Clock size={22} className="shrink-0 text-teal2" strokeWidth={1.4} />
                <span className="text-[13px] leading-snug">
                  Horaires
                  <br />
                  <b className="font-semibold text-[#0b5c42]">Lun - Ven : 8h à 18h</b>
                </span>
              </div>
            </div>
          </div>

          {/* Carte flottante sur la photo, comme dans la maquette */}
          <div className="hidden flex-col gap-5 rounded-[10px] bg-white p-5 shadow-card lg:mt-[110px] lg:flex">
            {[
              { icon: Clock, title: "Réponses rapides", text: "à vos questions" },
              { icon: Headphones, title: "Experts à votre écoute", text: "conseils personnalisés" },
              { icon: CheckCircle2, title: "Accompagnement", text: "de A à Z" },
              { icon: Sparkles, title: "Satisfaction garantie", text: "+ 5 000 clients accompagnés" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3.5">
                <item.icon size={22} className="mt-0.5 shrink-0 text-[#0b5c42]" strokeWidth={1.4} />
                <p className="text-[13px] leading-relaxed text-navy">
                  <b className="font-semibold">{item.title}</b>
                  <br />
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rubriques */}
      <section className="section pt-10">
        <div className="container">
          <h2 className="text-center font-display text-xl font-bold text-navy">Parcourez nos rubriques</h2>
          <div className="mx-auto mt-2.5 h-[2px] w-7 bg-teal2" />
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => {
              const count = faqItems.filter((f) => f.category === c.key).length;
              const on = tab === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => pickCategory(c.key)}
                  className={`flex flex-col items-start rounded-md border p-4 text-left transition-colors hover:border-teal2 ${
                    on ? "border-teal2 bg-soft" : "border-line bg-white"
                  }`}
                >
                  <c.icon size={26} className="text-[#0b5c42]" strokeWidth={1.3} />
                  <span className="mt-3.5 text-[13px] font-semibold leading-snug text-[#0b5c42]">{c.label}</span>
                  <span className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{c.text}</span>
                  <span className="mt-3 text-[13px] font-semibold text-[#0b5c42]">
                    {count} question{count > 1 ? "s" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Questions fréquentes */}
      <section id="faq-list" className="section pt-0">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold text-navy">Questions fréquentes</h2>
              <div className="mt-3.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTab("all");
                    setOpen(0);
                  }}
                  className={`rounded-md border px-4 py-2 text-[13px] font-semibold ${
                    tab === "all" ? "border-[#0b5c42] bg-[#0b5c42] text-white" : "border-line bg-white text-navy"
                  }`}
                >
                  Toutes
                </button>
                {categories.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => pickCategory(c.key)}
                    className={`rounded-md border px-4 py-2 text-[13px] font-semibold ${
                      tab === c.key ? "border-[#0b5c42] bg-[#0b5c42] text-white" : "border-line bg-white text-navy"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[13px] text-navy">Vous ne trouvez pas votre réponse ?</span>
              <Link href="/contact" className="btn btn-outline">
                CONTACTEZ-NOUS <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-start gap-5">
            <div className="min-w-0 flex-[3_1_480px] overflow-hidden rounded-md border border-line">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-[13px] text-muted">
                  Aucune question ne correspond à « {query} ».{" "}
                  <Link href="/contact" className="font-semibold text-teal2">
                    Posez-nous la vôtre
                  </Link>
                  .
                </div>
              ) : (
                filtered.map((f, i) => {
                  const isOpen = open === i;
                  return (
                    <div key={f.q} className={i ? "border-t border-line" : ""}>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className={`flex w-full items-center justify-between gap-4 px-4 py-4 text-left ${
                          isOpen ? "bg-soft" : "bg-white"
                        }`}
                      >
                        <span className={`text-[13px] font-semibold leading-relaxed ${isOpen ? "text-[#0b5c42]" : "text-navy"}`}>
                          {f.q}
                        </span>
                        {isOpen ? (
                          <Minus size={16} className="shrink-0 text-navy" />
                        ) : (
                          <Plus size={16} className="shrink-0 text-navy" />
                        )}
                      </button>
                      {isOpen && <p className="px-4 pb-4 text-[13px] leading-relaxed text-navy">{f.a}</p>}
                    </div>
                  );
                })
              )}
            </div>

            <div className="grid min-w-0 flex-[2_1_280px] grid-cols-[minmax(0,1fr)_38%] overflow-hidden rounded-[10px] bg-[#f1f5f3]">
              <div className="min-w-0 p-6">
                <p className="text-[16px] font-bold leading-snug text-navy">Besoin d&apos;aide personnalisée ?</p>
                <p className="mt-4 text-[13px] leading-relaxed text-navy">
                  Nos conseillers sont à votre écoute pour vous accompagner dans votre projet.
                </p>
                <div className="mt-4 grid gap-2.5 text-[13px] font-medium text-navy">
                  {["Conseils sur mesure", "Réponse rapide", "Accompagnement de A à Z"].map((t) => (
                    <div key={t} className="flex items-center gap-2.5">
                      <CheckCircle2 size={14} className="shrink-0 text-teal2" />
                      {t}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="btn btn-primary mt-5 w-full justify-center">
                  CONTACTEZ-NOUS <ArrowRight size={14} />
                </Link>
                <p className="mt-5 text-[13px] text-navy">ou appelez-nous au</p>
                <a href={`tel:${siteConfig.phone}`} className="mt-1 block text-[19px] font-bold text-[#0b5c42]">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
              <div className="relative min-h-[260px]">
                <Image src={advisorImage} alt="Conseillère Label Énergie" fill sizes="140px" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Espace client / Conseils */}
      <section className="section pt-0">
        <div className="container grid gap-5 rounded-[10px] bg-[#f5f7f6] p-6 sm:grid-cols-2">
          <div className="flex gap-5 sm:border-r sm:border-line sm:pr-8">
            <FileText size={38} className="shrink-0 text-[#0b5c42]" strokeWidth={1.2} />
            <div>
              <p className="text-[15px] font-bold text-navy">Accédez à votre espace client</p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-navy">
                Suivez votre projet, consultez vos documents et échangez avec nos équipes en toute simplicité.
              </p>
              <Link href="/connexion" className="btn btn-outline mt-4">
                SE CONNECTER <ArrowRight size={13} />
              </Link>
            </div>
          </div>
          <div className="flex gap-5">
            <Sparkles size={38} className="shrink-0 text-[#0b5c42]" strokeWidth={1.2} />
            <div>
              <p className="text-[15px] font-bold text-navy">Consultez nos guides &amp; conseils</p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-navy">
                Découvrez nos articles pratiques pour faire des économies d&apos;énergie et bien entretenir vos
                équipements.
              </p>
              <Link href="/conseils" className="btn btn-outline mt-4">
                VOIR LES ARTICLES <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container">
          <div className="grid items-center gap-6 rounded-[10px] bg-gradient-to-r from-[#0a4d38] to-[#0e7a55] px-6 py-6 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:px-10">
            <span className="hidden h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full border border-[#cfe9da] sm:flex">
              <Sparkles size={28} className="text-white" strokeWidth={1.2} />
            </span>
            <div>
              <p className="text-[17px] font-bold text-white">Prêt à concrétiser votre projet ?</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#e3f1eb]">
                Simulez vos aides en 2 minutes et obtenez votre estimation personnalisée.
              </p>
            </div>
            <Link href="/simuler-mon-projet" className="btn justify-center bg-white text-[#0b5c42] hover:bg-[#eaf5f0]">
              SIMULER MON PROJET <ArrowRight size={14} />
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="btn justify-center border border-[#cfe9da] bg-transparent text-white hover:border-white"
            >
              ÊTRE RAPPELÉ GRATUITEMENT <Phone size={14} />
            </a>
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
