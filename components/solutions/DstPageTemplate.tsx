"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Gauge,
  Home,
  Leaf,
  Phone,
  ShieldCheck,
  Star,
  Sun,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { DstContent } from "@/lib/content/dst";

const icons: Record<string, LucideIcon> = { Leaf, Gauge, Home, Sun, Wrench, ClipboardList, ShieldCheck, Star, Award, CheckCircle2 };

const faq = [
  {
    question: "Le Dispositif Solaire Thermique est-il éligible aux aides ?",
    answer:
      "Oui, il est éligible aux certificats d'économies d'énergie selon la fiche BAR-TH-168, pour les maisons individuelles existantes de plus de 2 ans en France métropolitaine.",
  },
  {
    question: "Quelle configuration choisir, ECS ou chauffage + ECS ?",
    answer:
      "Pour l'eau chaude sanitaire seule, une surface minimale de 2 m² de capteurs suffit. Pour couvrir aussi une partie du chauffage, il faut au moins 8 m² de capteurs. Nos experts étudient gratuitement la configuration adaptée à votre logement.",
  },
];

export function DstPageTemplate({ content }: { content: DstContent }) {
  const [openConfig, setOpenConfig] = useState(-1);
  const [slide, setSlide] = useState(0);
  const visible = 4;
  const max = Math.max(0, content.realisations.length - visible);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: content.h1,
            description: content.intro,
            path: "/solutions/solaire-thermique",
          }),
          faqJsonLd(faq),
        ]}
      />
      <Breadcrumb
        items={[
          { name: "Solutions", path: "/solutions" },
          { name: content.breadcrumbLabel, path: "/solutions/solaire-thermique" },
        ]}
      />

      {/* Hero : le badge "Éligible aux CEE" est déjà incrusté dans la photo, pas besoin de le dupliquer en overlay. */}
      <section className="relative overflow-hidden pt-2 lg:min-h-[560px]">
        <div
          className="pointer-events-none absolute right-0 top-0 hidden h-[560px] w-[55%] overflow-hidden lg:block"
          style={{
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 22%)",
            maskImage: "linear-gradient(90deg, transparent 0%, #000 22%)",
          }}
          aria-hidden
        >
          <Image src={content.heroImage} alt="" fill sizes="50vw" style={{ objectFit: "cover" }} priority />
        </div>

        <div className="container relative pb-10">
          <span className="mt-4 inline-block max-w-[440px] rounded-[4px] bg-[#eaf2ed] px-3 py-1.5 text-[13px] font-semibold tracking-wide text-[#0b5c42]">
            {content.category}
          </span>
          <h1 className="mt-4 max-w-[440px] font-display text-[34px] font-bold leading-[1.15] text-navy sm:text-[40px]">
            Dispositif Solaire Thermique <span className="text-teal2">(DST)</span>
          </h1>
          <p className="mt-5 max-w-[420px] text-[17px] font-semibold leading-snug text-[#0b5c42]">{content.subtitle}</p>
          <p className="mt-5 max-w-[420px] text-[13px] leading-relaxed text-navy">{content.intro}</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/aides-financement/calculer-mes-aides" className="btn btn-primary">
              SIMULER MA PRIME CEE <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              ÊTRE RAPPELÉ GRATUITEMENT <Phone size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bandeau bénéfices */}
      <section className="container pb-2">
        <div className="grid gap-5 rounded-[10px] bg-[#f5f7f6] p-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.benefits.map((b) => {
            const Icon = icons[b.icon] ?? Leaf;
            return (
              <div key={b.title} className="flex items-center gap-4">
                <Icon size={30} className="shrink-0 text-[#0b5c42]" strokeWidth={1.2} />
                <div className="text-[13px] font-semibold leading-snug text-[#0b5c42]">
                  {b.title}
                  {b.sub && <span className="mt-1 block text-[13px] font-normal text-muted">{b.sub}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="section">
        <div className="container grid items-center gap-9 lg:grid-cols-2">
          <div className="relative h-[320px] overflow-hidden rounded-card sm:h-[380px]">
            <Image src={content.howItWorks.image} alt={content.howItWorks.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: "cover" }} loading="lazy" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold leading-tight text-navy">{content.howItWorks.title}</h2>
            <p className="mt-4 text-[13px] leading-relaxed text-navy">{content.howItWorks.text}</p>
            <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {content.howItWorks.steps.map((s, i) => (
                <div key={s.n} className="relative">
                  <div className="flex h-[54px] items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b5c42] text-[13px] font-bold text-white">
                      {s.n}
                    </span>
                    {i < content.howItWorks.steps.length - 1 && (
                      <span className="ml-1 hidden h-px flex-1 border-t border-dashed border-[#9fb1bb] sm:block" aria-hidden />
                    )}
                  </div>
                  <p className="mt-2.5 text-[13px] font-semibold leading-snug text-navy">{s.title}</p>
                  <p className="mt-1 text-[13px] leading-snug text-muted">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deux configurations */}
      <section className="section pt-0">
        <div className="container">
          <div className="rounded-[12px] bg-[#f3f7f5] p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-navy">Deux configurations selon vos besoins</h2>
            <p className="mt-2 text-[13px] text-navy">Le dispositif solaire thermique s&apos;adapte à votre logement et à vos usages.</p>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {content.configs.map((c, i) => {
                const open = openConfig === i;
                return (
                  <div
                    key={c.title}
                    className={`grid grid-cols-[130px_minmax(0,1fr)] overflow-hidden rounded-[10px] border bg-white sm:grid-cols-[150px_minmax(0,1fr)] ${open ? "border-teal2" : "border-line"}`}
                  >
                    <div className="relative min-h-[200px]">
                      <Image src={c.image} alt={c.imageAlt} fill sizes="150px" style={{ objectFit: "cover" }} loading="lazy" />
                    </div>
                    <div className="flex flex-col p-5">
                      <p className="text-[15px] font-bold text-navy">{c.title}</p>
                      <div className="mt-4 grid gap-2.5">
                        {c.items.map((it) => (
                          <div key={it} className="flex items-start gap-2.5 text-[13px] leading-snug text-navy">
                            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-teal2" />
                            <span>{it}</span>
                          </div>
                        ))}
                      </div>
                      {open && (
                        <>
                          <p className="mt-3.5 text-[13px] leading-relaxed text-muted">{c.more}</p>
                          <Link href={c.href} className="mt-3 text-[13px] font-semibold text-teal2 underline">
                            {c.linkLabel}
                          </Link>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => setOpenConfig(open ? -1 : i)}
                        className="btn btn-outline mt-auto justify-center pt-4 text-[13px]"
                      >
                        {open ? "MASQUER LES DÉTAILS" : "VOIR LES DÉTAILS"} <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Avantages + CEE */}
      <section className="section pt-0">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Les avantages du solaire thermique</h2>
            <p className="mt-2 text-[13px] text-navy">Une solution performante pour votre confort et vos économies.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {content.advantages.map((a) => {
                const Icon = icons[a.icon] ?? Leaf;
                return (
                  <div key={a.title} className="rounded-md border border-line p-5 shadow-card">
                    <Icon size={28} className="text-[#0b5c42]" strokeWidth={1.3} />
                    <p className="mt-3.5 text-[13px] font-semibold text-[#0b5c42]">{a.title}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-navy">{a.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[12px] bg-[#f3f7f5] p-6">
            <div className="flex gap-4">
              <Award size={28} className="shrink-0 text-[#0b5c42]" strokeWidth={1.3} />
              <div>
                <p className="text-[13px] font-semibold leading-snug text-[#0b5c42]">{content.cee.title}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-navy">{content.cee.text}</p>
              </div>
            </div>
            <div className="mt-5 border-t border-[#dfe8e3] pt-5">
              <div className="flex gap-4">
                <CalendarCheck size={28} className="shrink-0 text-[#0b5c42]" strokeWidth={1.3} />
                <div>
                  <p className="text-[13px] font-semibold text-[#0b5c42]">{content.cee.bonusTitle}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-navy">{content.cee.bonusText}</p>
                  <ul className="mt-2 grid gap-1.5">
                    {content.cee.bonusItems.map((it) => (
                      <li key={it} className="text-[13px] leading-relaxed text-navy">
                        <b className="font-semibold">{it.split(" pour ")[0]}</b> pour {it.split(" pour ")[1]}
                      </li>
                    ))}
                  </ul>
                  <Link href={content.cee.bonusHref} className="mt-2.5 inline-flex items-center gap-2 text-[13px] font-medium text-[#0b5c42] underline">
                    Voir les conditions d&apos;éligibilité <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-md bg-[#e8eeeb] p-4">
              <p className="text-[13px] font-semibold text-navy">À savoir</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-navy">{content.cee.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quelle configuration */}
      <section className="section pt-0">
        <div className="container grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Quelle configuration pour votre logement ?</h2>
            <p className="mt-2 text-[13px] text-navy">Nos experts vous conseillent la solution la plus adaptée à votre habitation et à vos besoins.</p>
            <div className="mt-5 grid gap-3.5 sm:grid-cols-3">
              {content.criteria.map((c) => {
                const Icon = icons[c.icon] ?? Home;
                return (
                  <div key={c.title} className="flex items-center gap-4 rounded-md border border-line p-4">
                    <Icon size={28} className="shrink-0 text-[#0b5c42]" strokeWidth={1.3} />
                    <p className="text-[13px] leading-snug text-navy">
                      <b className="font-semibold">{c.title}</b>
                      <br />
                      <span className="text-muted">{c.sub}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative hidden h-[180px] overflow-hidden rounded-card lg:block">
            <Image src={content.criteriaImage} alt={content.criteriaImageAlt} fill sizes="280px" style={{ objectFit: "cover" }} loading="lazy" />
          </div>
        </div>
      </section>

      {/* Réalisations */}
      <section className="section pt-0">
        <div className="container">
          <h2 className="text-center font-display text-xl font-bold text-navy">Nos réalisations</h2>
          <p className="mt-2 text-center text-[13px] text-navy">Plus de 3 000 installations de solaire thermique partout en France.</p>
          <div className="relative mt-6 px-10">
            <div className="overflow-hidden">
              <div
                className="flex gap-3 transition-transform duration-300 ease-out"
                style={{ transform: `translateX(calc(${-slide} * (100% / ${visible} + 0.75rem)))` }}
              >
                {content.realisations.map((r) => (
                  <div key={r.alt} className="relative h-[220px] shrink-0 overflow-hidden rounded-md" style={{ flexBasis: `calc((100% - 2.25rem) / ${visible})` }}>
                    <Image src={r.image} alt={r.alt} fill sizes="25vw" style={{ objectFit: "cover" }} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
            {max > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => setSlide(slide <= 0 ? max : slide - 1)}
                  aria-label="Précédent"
                  className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-card"
                >
                  <ChevronLeft size={18} className="text-[#0b5c42]" />
                </button>
                <button
                  type="button"
                  onClick={() => setSlide(slide >= max ? 0 : slide + 1)}
                  aria-label="Suivant"
                  className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-card"
                >
                  <ChevronRight size={18} className="text-[#0b5c42]" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Avis */}
      <section className="section pt-0">
        <div className="container">
          <h2 className="font-display text-xl font-bold text-navy">Ils nous font confiance</h2>
          <p className="mt-2 text-[13px] text-navy">Des centaines de foyers nous ont déjà confié leur projet solaire thermique.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {content.reviews.map((r) => (
              <div key={r.name} className="rounded-md border border-line p-5 shadow-card">
                <div className="flex gap-0.5 text-[#f2b01e]">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-3 min-h-[80px] text-[13px] leading-relaxed text-navy">{r.text}</p>
                <div className="mt-4 flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d6e5dc] text-[13px] font-semibold text-[#0b5c42]">
                    {r.initials}
                  </span>
                  <p className="text-[13px] leading-snug text-navy">
                    <b className="font-semibold">{r.name}</b>
                    <br />
                    <span className="text-muted">{r.place}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container">
          <div className="grid items-center gap-6 rounded-[10px] bg-gradient-to-r from-[#0a4d38] to-[#0e7a55] px-6 py-6 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:px-10">
            <span className="hidden h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border border-[#cfe9da] sm:flex">
              <Leaf size={28} className="text-white" strokeWidth={1.2} />
            </span>
            <div>
              <p className="text-[17px] font-bold text-white">{content.finalCta.title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#e3f1eb]">{content.finalCta.subtitle}</p>
            </div>
            <Link href="/contact" className="btn justify-center bg-white text-[#0b5c42] hover:bg-[#eaf5f0]">
              ÊTRE RAPPELÉ GRATUITEMENT <Phone size={14} />
            </Link>
            <Link
              href="/aides-financement/calculer-mes-aides"
              className="btn justify-center border border-[#cfe9da] bg-transparent text-white hover:border-white"
            >
              SIMULER MA PRIME CEE <ArrowRight size={14} />
            </Link>
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
            <Star className="trust-mark trust-icon" aria-hidden />
            <div className="trust-text">
              <strong>{siteConfig.rating.valueLabel}/5</strong>
              <span className="trust-caption" style={{ fontSize: 13 }}>
                Sur +{siteConfig.rating.count} avis Google
              </span>
            </div>
          </div>
          <div className="trust-item trust-inline">
            <Award className="trust-mark trust-icon" aria-hidden />
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
