import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Clock,
  ClipboardCheck,
  Home,
  Leaf,
  Phone,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  ThermometerSun,
  Users,
  Waves,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SectionTitle } from "@/components/home/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, serviceJsonLd } from "@/lib/seo";
import type { SolutionContent } from "@/lib/content/solutions";
import { realizations } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";

function renderHighlighted(text: string) {
  const parts = text.split(/<span>(.*?)<\/span>/g);
  return parts.map((part, i) => (i % 2 === 1 ? <span key={i}>{part}</span> : part));
}

const icons: Record<string, LucideIcon> = {
  PiggyBank,
  ThermometerSun,
  Leaf,
  BadgePercent,
  Waves,
  Sun,
  ClipboardCheck,
  Clock,
  Sparkles,
  Wrench,
  Home,
};

export function SolutionPageTemplate({ solution }: { solution: SolutionContent }) {
  const BadgeIcon = solution.heroBadge ? icons[solution.heroBadge.icon] ?? Leaf : null;
  const hasSteps = solution.howItWorks.steps.length > 0;
  const isFigureImage = Boolean(solution.howItWorks.imageAspect);
  const showImageBadges = hasSteps && !isFigureImage;

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: solution.h1.replace(/<\/?span>/g, ""),
            description: solution.metaDescription,
            path: `/solutions/${solution.slug}`,
          }),
          faqJsonLd(solution.faq),
        ]}
      />
      <Breadcrumb items={[{ name: "Solutions", path: "/solutions" }, { name: solution.breadcrumbLabel, path: `/solutions/${solution.slug}` }]} />

      {/* Hero */}
      <section className="solution-hero">
        <div className="container solution-hero-grid">
          <div>
            <p className="eyebrow">{solution.category}</p>
            <h1>{renderHighlighted(solution.h1)}</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{solution.intro}</p>

            <div className="solution-ticks">
              {solution.quickBenefits.map((b) => {
                const Icon = icons[b.icon] ?? Leaf;
                return (
                  <div key={b.title} className="solution-tick">
                    <span className="solution-tick-icon">
                      <Icon size={20} />
                    </span>
                    <span className="solution-tick-label">{b.title}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/simuler-mon-projet" className="btn btn-primary">
                SIMULER MON PROJET <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                ÊTRE RAPPELÉ GRATUITEMENT <Phone size={16} />
              </Link>
            </div>

            <div className="solution-rating">
              <Image src="/images/google-logo.webp" alt="Google" width={16} height={16} />
              <strong>{siteConfig.rating.value}/5</strong>
              <span className="stars">★★★★★</span>
              <small>Basé sur +{siteConfig.rating.count} avis clients</small>
            </div>
          </div>

          <div className="solution-hero-media" style={{ aspectRatio: solution.heroImageAspect }}>
            <Image
              src={solution.heroImage}
              alt={solution.heroAlt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />
            {solution.heroBadge && BadgeIcon && (
              <div className="solution-hero-badge">
                <BadgeIcon size={22} />
                <span>{solution.heroBadge.text}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick benefits bar */}
      <div className="container">
        <div className="solution-quickbar grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {(solution.benefitCards ?? solution.quickBenefits).map((b) => {
            const Icon = icons[b.icon] ?? Leaf;
            return (
              <div key={b.title} className="flex items-start gap-3">
                <span className="quickbar-icon">
                  <Icon size={32} />
                </span>
                <div>
                  <p className="text-xs font-extrabold tracking-wide text-navy">{b.title}</p>
                  <p className="mt-1 text-xs text-muted">{b.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How it works */}
      <section className="section">
        <div className="container grid gap-10 md:grid-cols-[0.99fr_2.1fr] md:items-center">
          <div>
            <SectionTitle kicker="COMMENT ÇA MARCHE" title={<strong>{solution.howItWorks.title}</strong>} align="left" />
            <p className="mt-3 text-sm text-muted">{solution.howItWorks.intro}</p>
            {hasSteps && (
              <div className="mini-steps">
                {solution.howItWorks.steps.map((step) => (
                  <div key={step.n} className="mini-step">
                    <span>{step.n}</span>
                    <div>
                      {step.title && <p className="text-xs font-bold text-navy">{step.title}</p>}
                      <p className="text-xs text-muted">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="how-it-works-media" style={{ aspectRatio: solution.howItWorks.imageAspect }}>
            <Image
              src={solution.howItWorks.image}
              alt={solution.howItWorks.imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: isFigureImage ? "contain" : "cover" }}
              loading="lazy"
            />
            {showImageBadges && (
              <div className="how-it-works-badges">
                {solution.howItWorks.steps.slice(0, 4).map((step) => (
                  <div key={step.n} className="how-it-works-badge">
                    <strong>
                      <span>{step.n}</span> {step.title.toUpperCase()}
                    </strong>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Variants */}
      {solution.variants && (
        <section className="section bg-soft">
          <div className="container">
            <SectionTitle kicker="VARIANTES" title={solution.variants.title} />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {solution.variants.items.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-card bg-white shadow-card">
                  <div className="relative h-36">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 text-xs text-muted">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlights */}
      <section className="section bg-soft">
        <div className="container">
          <SectionTitle
            kicker="POURQUOI CHOISIR CETTE SOLUTION ?"
            title={`${solution.breadcrumbLabel}, les points forts`}
          />
          <div className="highlights-grid mt-8">
            {solution.highlights.map((h) => {
              const Icon = icons[h.icon] ?? Leaf;
              return (
                <div key={h.title} className="highlight-card">
                  <Icon size={26} className="highlight-card-icon" />
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Aides */}
      <section className="section">
        <div className="container aides-banner">
          <div>
            <h2>Combien d&apos;aides pouvez-vous obtenir pour votre projet ?</h2>
            <p className="mt-2 text-sm text-muted">
              Simulez gratuitement vos aides en quelques clics et réduisez le coût de votre
              installation.
            </p>
            <Link href="/aides-financement/calculer-mes-aides" className="btn btn-primary mt-4">
              CALCULER MES AIDES <ArrowRight size={16} />
            </Link>
          </div>
          <div>
            <p className="text-xs font-bold text-muted">Jusqu&apos;à</p>
            <p className="aides-banner-amount">{solution.aides.amount}</p>
            <p className="text-xs text-muted">{solution.aides.text}</p>
            <p className="mt-1 text-[10px] text-muted">
              *Montant indicatif selon votre situation et les aides en vigueur.
            </p>
          </div>
          <ul className="aides-banner-items">
            {solution.aides.items.map((item) => (
              <li key={item}>
                <BadgePercent size={16} /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Réalisations */}
      <section className="section bg-soft">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle kicker="NOS RÉALISATIONS" title="Ils ont choisi le confort et les économies" align="left" />
            <Link href="/realisations" className="inline-flex items-center gap-2 text-xs font-extrabold text-teal2">
              Voir toutes nos réalisations <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {realizations.map((r) => (
              <article key={r.location} className="overflow-hidden rounded-card border border-line bg-white shadow-card">
                <div className="relative h-32">
                  <Image
                    src={r.image}
                    alt={`${r.title} — ${r.location}`}
                    fill
                    sizes="(max-width: 900px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold text-teal2">{r.location}</p>
                  <h3 className="mt-1 text-sm font-bold text-navy">{r.title}</h3>
                  <p className="mt-1 text-xs text-muted">{r.details}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <div className="container">
        <div className="trust solution-trust">
          <div className="trust-item trust-inline">
            <Home className="trust-mark trust-icon" aria-hidden />
            <div className="trust-text">
              <strong>{siteConfig.stats.installations}</strong>
              <span className="trust-caption">Installations réalisées</span>
            </div>
          </div>
          <div className="trust-item trust-inline">
            <Star className="trust-mark trust-icon" aria-hidden />
            <div className="trust-text">
              <strong>{siteConfig.rating.value}/5</strong>
              <span className="trust-caption">+{siteConfig.rating.count} avis Google</span>
            </div>
          </div>
          <div className="trust-item trust-inline">
            <Users className="trust-mark trust-icon" aria-hidden />
            <div className="trust-text">
              <strong>{siteConfig.stats.collaborators}</strong>
              <span className="trust-caption">Collaborateurs à votre service</span>
            </div>
          </div>
          <div className="trust-item trust-inline">
            <Clock className="trust-mark trust-icon" aria-hidden />
            <div className="trust-text">
              <strong>{siteConfig.stats.experienceYears} ans</strong>
              <span className="trust-caption">D&apos;expérience à vos côtés</span>
            </div>
          </div>
          <div className="trust-item trust-inline">
            <ShieldCheck className="trust-mark trust-icon" aria-hidden />
            <div className="trust-text">
              <strong>RGE</strong>
              <span className="trust-caption">Entreprise certifiée</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="section">
        <div className="container max-w-3xl">
          <SectionTitle kicker="BESOIN D'AIDE ?" title="Questions fréquentes" />
          <div className="mt-6 grid gap-3">
            {solution.faq.map((item) => (
              <details key={item.question} className="rounded-card border border-line p-4">
                <summary className="cursor-pointer text-sm font-bold text-navy">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-gradient-to-r from-navy to-teal2 py-8 text-white">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-bold">
              Un projet {solution.breadcrumbLabel.toLowerCase()} ? Parlons-en !
            </p>
            <p className="text-xs text-white/80">
              Nos conseillers vous accompagnent gratuitement dans votre projet.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/simuler-mon-projet" className="btn" style={{ background: "#fff", color: "var(--navy)" }}>
              SIMULER MON PROJET <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn" style={{ border: "1px solid #fff", color: "#fff" }}>
              ÊTRE RAPPELÉ GRATUITEMENT <Phone size={16} />
            </Link>
          </div>
        </div>
        <div className="container cta-banner-ticks">
          {solution.ctaTicks.map((tick) => (
            <span key={tick}>
              <ClipboardCheck size={14} /> {tick}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
