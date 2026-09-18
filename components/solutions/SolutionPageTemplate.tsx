import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BadgePercent,
  Clock,
  ClipboardCheck,
  Droplet,
  Euro,
  Gem,
  Home,
  Leaf,
  Phone,
  PiggyBank,
  Recycle,
  Search,
  Settings,
  ShieldCheck,
  ShowerHead,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  ThermometerSun,
  TrendingUp,
  Users,
  Waves,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/animation/Reveal";
import { SectionTitle } from "@/components/home/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { InstallationsCarousel } from "@/components/solutions/InstallationsCarousel";
import { TestimonialsCarousel } from "@/components/solutions/TestimonialsCarousel";
import { TrustTestimonialCard } from "@/components/solutions/TrustTestimonialCard";
import { serviceJsonLd } from "@/lib/seo";
import type { SolutionContent } from "@/lib/content/solutions";
import { realizations } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";

function renderHighlighted(text: string) {
  const parts = text.split(/<span>(.*?)<\/span>/g);
  return parts.map((part, i) => (i % 2 === 1 ? <span key={i}>{part}</span> : part));
}

function aidesItemIcon(item: string) {
  if (item.includes("MaPrimeRénov")) return "/images/logo-prime-removebg-preview.png";
  if (item.includes("CEE") || item.toLowerCase().includes("certificats d'économies")) return "/images/solutions/certificat.png";
  if (item.toLowerCase().includes("prêt")) return null;
  if (item.toLowerCase().includes("tva") || item.includes("%")) return "/images/solutions/pourcentage.png";
  return null;
}

function aidesFallbackIcon(item: string): LucideIcon {
  if (item.toLowerCase().includes("prêt")) return PiggyBank;
  if (item.toLowerCase().includes("cumulable") || item.toLowerCase().includes("revente")) return TrendingUp;
  return BadgePercent;
}

function teamTrustIcon(item: string): LucideIcon {
  if (item.includes("Étude")) return Search;
  if (item.includes("Matériel")) return Settings;
  if (item.includes("Installation")) return Users;
  if (item.includes("Mise en service")) return BadgeCheck;
  if (item.includes("SAV")) return ShieldCheck;
  return ClipboardCheck;
}

export function ctaTickIcon(tick: string): LucideIcon {
  if (tick.includes("Étude")) return Star;
  if (tick.includes("Installation")) return Wrench;
  if (tick.includes("Matériel")) return ShieldCheck;
  if (tick.includes("Garantie")) return BadgeCheck;
  if (tick.includes("Accompagnement")) return Gem;
  return ClipboardCheck;
}

const ctaTickLineBreaks: Record<string, [string, string]> = {
  "Étude gratuite et personnalisée": ["Étude gratuite", "et personnalisée"],
  "Installation par nos équipes RGE": ["Installation par", "nos équipes RGE"],
  "Matériel de qualité": ["Matériel de", "qualité"],
  "Garantie et SAV assurés": ["Garantie et", "SAV assurés"],
  "Accompagnement de A à Z": ["Accompagnement", "de A à Z"],
};

export function ctaTickLabel(tick: string) {
  const lines = ctaTickLineBreaks[tick];
  if (!lines) return tick;
  return (
    <>
      {lines[0]}
      <br />
      {lines[1]}
    </>
  );
}

const quickBenefitLineBreaks: Record<string, [string, string]> = {
  "Jusqu'à 70 % d'économies": ["Jusqu'à 70 %", "d'économies"],
  "Confort optimal été comme hiver": ["Confort optimal été", "comme hiver"],
  "Énergie renouvelable et écologique": ["Énergie renouvelable", "et écologique"],
  "Éligible aux aides de l'État": ["Éligible aux aides", "de l'État"],
  "Énergie solaire gratuite": ["Énergie solaire", "gratuite"],
  "Confort en eau chaude toute l'année": ["Confort en eau", "chaude toute l'année"],
  "Énergie propre et renouvelable": ["Énergie propre", "et renouvelable"],
  "Valorisation de votre bien": ["Valorisation de", "votre bien"],
  "Technologie fiable et silencieuse": ["Technologie fiable", "et silencieuse"],
};

function quickBenefitLabel(title: string) {
  const lines = quickBenefitLineBreaks[title];
  if (!lines) return title;
  return (
    <>
      {lines[0]}
      <br />
      {lines[1]}
    </>
  );
}

const variantTextLineBreaks: Record<string, [string, string]> = {
  "Idéale pour remplacer une chaudière et alimenter vos radiateurs ou votre plancher chauffant.": [
    "Idéale pour remplacer une chaudière et alimenter",
    "vos radiateurs ou votre plancher chauffant.",
  ],
  "Parfaite pour chauffer ou rafraîchir votre logement avec des unités intérieures (climatisation réversible).": [
    "Parfaite pour chauffer ou rafraîchir votre logement",
    "avec des unités intérieures (climatisation réversible).",
  ],
  "Utilise la chaleur du sol pour un rendement optimal et des économies maximales.": [
    "Utilise la chaleur du sol pour un rendement optimal",
    "et des économies maximales.",
  ],
};

function variantTextLabel(text: string) {
  const lines = variantTextLineBreaks[text];
  if (!lines) return text;
  return (
    <>
      {lines[0]}
      <br />
      {lines[1]}
    </>
  );
}

const ctaTitleLineBreaks: Record<string, [string, string]> = {
  "Produisez votre propre électricité et reprenez le contrôle de votre énergie.": [
    "Produisez votre propre électricité",
    "et reprenez le contrôle de votre énergie.",
  ],
  "Passez à une eau chaude plus économique et plus respectueuse de l'environnement.": [
    "Passez à une eau chaude plus économique",
    "et plus respectueuse de l'environnement.",
  ],
};

function ctaTitleLabel(title: string) {
  const lines = ctaTitleLineBreaks[title];
  if (!lines) return title;
  return (
    <>
      {lines[0]}
      <br />
      {lines[1]}
    </>
  );
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
  Droplet,
  Sparkles,
  Wrench,
  Home,
  Award,
  Euro,
  Snowflake,
  Recycle,
  Zap,
  Settings,
  ShowerHead,
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
                  <div
                    key={b.title}
                    className={`solution-tick${solution.quickBenefitsStacked ? " solution-tick-stacked" : ""}`}
                  >
                    <span className="solution-tick-icon">
                      <Icon size={20} />
                    </span>
                    <span className="solution-tick-label">
                      {quickBenefitLabel(b.title)}
                    </span>
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
              <strong>{siteConfig.rating.valueLabel}/5</strong>
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
        <div className="solution-quickbar grid sm:grid-cols-2 md:grid-cols-4">
          {(solution.benefitCards ?? solution.quickBenefits).map((b) => {
            const Icon = icons[b.icon] ?? Leaf;
            return (
              <div key={b.title} className="quickbar-item flex items-start gap-3">
                <span className="quickbar-icon">
                  <Icon size={22} />
                </span>
                <div>
                  <p className="text-sm font-extrabold tracking-wide text-navy">{b.title}</p>
                  <p className="mt-1 text-sm text-muted">{b.text}</p>
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
            <SectionTitle
              kicker={solution.howItWorks.kicker ?? "COMMENT ÇA MARCHE"}
              title={<strong>{solution.howItWorks.title}</strong>}
              align="left"
            />
            <p className="mt-3 text-base text-muted">{solution.howItWorks.intro}</p>
            {hasSteps && (
              <div className="mini-steps">
                {solution.howItWorks.steps.map((step) => (
                  <div key={step.n} className="mini-step">
                    <span>{step.n}</span>
                    <div>
                      {step.title && <p className="text-sm font-bold text-navy">{step.title}</p>}
                      <p className="text-sm text-muted">{step.text}</p>
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
            {solution.variants.compact ? (
              <p className="variants-heading">{solution.variants.title}</p>
            ) : (
              <SectionTitle kicker="VARIANTES" title={solution.variants.title} />
            )}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {solution.variants.items.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-card bg-white shadow-card">
                  <div className="relative h-36">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 800px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-navy">{item.title}</h3>
                    <p className="mt-6 text-sm text-muted">
                      {solution.variants?.compact ? variantTextLabel(item.text) : item.text}
                    </p>
                    {item.href && (
                      <Link href={item.href} className="variant-link mt-8">
                        En savoir plus <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlights */}
      {!solution.teamTrust && !solution.hideHighlights && (
        <Reveal as="section" className="section ">
          <div className="container">
            {solution.highlightsTitle ? (
              <SectionTitle title={solution.highlightsTitle} />
            ) : (
              <SectionTitle kicker={solution.highlightsKicker ?? "POURQUOI CHOISIR CETTE SOLUTION ?"} />
            )}
            <div className="highlights-grid mt-8">
              {solution.highlights.map((h) => {
                const Icon = icons[h.icon] ?? Leaf;
                return (
                  <div key={h.title} className="highlight-card">
                    <span className="highlight-card-icon-wrap">
                      <Icon size={22} className="highlight-card-icon" />
                    </span>
                    <h3>{h.title}</h3>
                    <p>{h.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      )}

      {/* Aides */}
      <Reveal as="section" className="section">
        <div className="container aides-banner">
          <div>
            <h2>{solution.aides.heading ?? "Combien d'aides pouvez-vous obtenir ?"}</h2>
            <p className="mt-2 aides-banner-lead">
              Simulez vos aides en quelques clics et réduisez le coût de votre installation.
            </p>
            <Link href="/aides-financement/calculer-mes-aides" className="btn btn-primary mt-4">
              CALCULER MES AIDES <ArrowRight size={16} />
            </Link>
          </div>
          <div>
            <p className="aides-banner-label">Jusqu&apos;à</p>
            <p className="aides-banner-amount" style={solution.aides.amountColor ? { color: solution.aides.amountColor } : undefined}>
              {solution.aides.amount}
              <span className="aides-banner-amount-star">*</span>
            </p>
            <p className="aides-banner-text">{solution.aides.text}</p>
            <p className="mt-1 aides-banner-disclaimer">
              *Montant indicatif selon votre situation et les aides en vigueur.
            </p>
          </div>
          <ul className="aides-banner-items">
            {solution.aides.items.map((item) => {
              const icon = aidesItemIcon(item);
              const FallbackIcon = aidesFallbackIcon(item);
              const accent = !item.includes("MaPrimeRénov");
              return (
                <li key={item} className={accent ? "aides-banner-item-accent" : undefined}>
                  {icon ? (
                    <Image src={icon} alt="" width={38} height={38} className="aides-banner-icon" />
                  ) : (
                    <FallbackIcon size={24} />
                  )}
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>

      {!solution.teamTrust && !solution.installations && (
        <>
          {/* Réalisations */}
          <Reveal as="section" className="section bg-soft">
            <div className="container">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionTitle kicker="NOS RÉALISATIONS" title="Ils ont choisi le confort et les économies" align="left" />
                <Link href="/realisations" className="inline-flex items-center gap-2 text-xs font-extrabold text-teal2">
                  Voir toutes nos réalisations <ArrowRight size={14} />
                </Link>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
                {realizations.map((r) => (
                  <article
                    key={r.location}
                    className="overflow-hidden rounded-card border border-line bg-white shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={r.image}
                        alt={`${r.title} — ${r.location}`}
                        fill
                        sizes="(max-width: 900px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 hover:scale-105"
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
          </Reveal>
        </>
      )}

      {/* Installations (CESI-specific carousel) */}
      {solution.installations && (
        <Reveal as="section" className="section bg-soft">
          <div className="container">
            <InstallationsCarousel
              kicker={solution.installations.kicker}
              title={solution.installations.title}
              items={solution.installations.items}
            />
          </div>
        </Reveal>
      )}

      {!solution.teamTrust && !solution.testimonials?.combined && (
        <>
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
                  <strong>{siteConfig.rating.valueLabel}/5</strong>
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
        </>
      )}

      {/* Trust + testimonial combined card */}
      {solution.testimonials?.combined && (
        <Reveal as="section" className="section pb-0">
          <div className="container">
            <TrustTestimonialCard items={solution.testimonials.items} />
          </div>
        </Reveal>
      )}

      {/* Team trust */}
      {solution.teamTrust && (
        <Reveal as="section" className="section">
          <div className="container">
            <div className="team-trust-card">
              <div className="team-trust-content">
                <h2>{siteConfig.stats.installations} foyers nous font déjà confiance</h2>
                <p>{solution.teamTrust.subtitle}</p>
                <ul className="team-trust-ticks">
                  {solution.teamTrust.items.map((item) => {
                    const Icon = teamTrustIcon(item);
                    return (
                      <li key={item}>
                        <Icon size={26} />
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="team-trust-media">
                <Image
                  src={solution.teamTrust.image}
                  alt={solution.teamTrust.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 44vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* Testimonials */}
      {solution.testimonials && !solution.testimonials.combined && (
        <Reveal as="section" className="section">
          <div className="container">
            <SectionTitle title={solution.testimonials.title} />
            <div className="mt-8">
              <TestimonialsCarousel items={solution.testimonials.items} />
            </div>
          </div>
        </Reveal>
      )}

      {/* CTA */}
      <Reveal as="section" className={`section${solution.testimonials?.combined ? " pt-10" : ""}`}>
        <div className="container">
          <div className={`cta-card${solution.ctaTheme === "green" ? " cta-card-green" : ""}`}>
            <div className="cta-card-main">
              <span className="cta-card-icon">
                {solution.ctaIcon ? (
                  <Image src={solution.ctaIcon} alt="" width={150} height={150} />
                ) : (
                  (() => {
                    const FallbackIcon = solution.ctaIconFallback ? icons[solution.ctaIconFallback] ?? Home : Home;
                    return <FallbackIcon size={72} className="cta-card-icon-generic" />;
                  })()
                )}
              </span>
              <div>
                <p className="cta-card-title">
                  {solution.ctaTitle
                    ? ctaTitleLabel(solution.ctaTitle)
                    : `Un projet ${solution.breadcrumbLabel.toLowerCase()} ? Parlons-en !`}
                </p>
                <p className="cta-card-subtitle">
                  Nos conseillers vous accompagnent gratuitement <br />dans votre projet.
                </p>
              </div>
            </div>
            <div className="cta-card-actions">
              <Link href="/simuler-mon-projet" className="btn" style={{ background: "#fff" }}>
                <span className="btn-gradient-text">SIMULER MON PROJET</span> <ArrowRight size={16} className="btn-gradient-icon" />
              </Link>
              <Link href="/contact" className="btn" style={{ border: "1px solid #fff", color: "#fff" }}>
                ÊTRE RAPPELÉ GRATUITEMENT <Phone size={16} />
              </Link>
            </div>
          </div>
          {!solution.hideCtaTicks && (
            <ul className="cta-ticks">
              {solution.ctaTicks.map((tick) => {
                const TickIcon = ctaTickIcon(tick);
                return (
                  <li key={tick}>
                    <span className="cta-tick-icon">
                      <TickIcon size={26} />
                    </span>
                    <span className="cta-tick-label">{ctaTickLabel(tick)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Reveal>
    </>
  );
}
