import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Bird,
  Calculator,
  CalendarCheck,
  Check,
  CheckCircle2,
  ClipboardList,
  Fan,
  FileCheck2,
  Home,
  Leaf,
  Lightbulb,
  Phone,
  Quote,
  ShieldCheck,
  Smartphone,
  Star,
  UserSearch,
  Users,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceJsonLd } from "@/lib/seo";
import type { PacAirAirContent } from "@/lib/content/pacAirAir";

const icons: Record<string, LucideIcon> = {
  Home,
  ClipboardList,
  Wrench,
  BadgeCheck,
  Zap,
  Fan,
  Wind,
  Smartphone,
  ShieldCheck,
  Calculator,
  UserSearch,
  FileCheck2,
  CalendarCheck,
  CheckCircle2,
  Users,
  Star,
  Award,
  Bird,
};

const h1LineBreaks: Record<string, [string, string]> = {
  "PAC Air/Air, le confort sur mesure en toute saison": [
    "PAC Air/Air, le confort",
    "sur mesure en toute saison",
  ],
};

function renderH1(text: string) {
  const lines = h1LineBreaks[text];
  if (!lines) return text;
  return (
    <>
      {lines[0]}
      <br />
      {lines[1]}
    </>
  );
}

const twoToneTitles: Record<string, [string, string]> = {
  "Une solution adaptée à tous vos besoins": ["Une solution adaptée", "à tous vos besoins"],
};

function renderTwoToneTitle(text: string) {
  const parts = twoToneTitles[text];
  if (!parts) return <span className="pac-title-navy">{text}</span>;
  return (
    <>
      <span className="pac-title-navy">{parts[0]}</span> <span className="pac-title-teal">{parts[1]}</span>
    </>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function PacAirAirPageTemplate({ content }: { content: PacAirAirContent }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: content.h1,
            description: content.intro,
            path: "/solutions/pompe-a-chaleur-air-air",
          }),
        ]}
      />
      <Breadcrumb items={[{ name: "Solutions", path: "/solutions" }, { name: content.breadcrumbLabel, path: "/solutions/pompe-a-chaleur-air-air" }]} />

      {/* Hero */}
      <section className="pac-hero">
        <div className="container">
          <div className="pac-hero-copy">
            <p className="pac-eyebrow">{content.category}</p>
            <h1 className="pac-h1">{renderH1(content.h1)}</h1>
            <p className="pac-subtitle">{content.subtitle}</p>
            <p className="pac-intro">{content.intro}</p>

            <div className="pac-hero-ticks">
              {content.ticks.map((tick) => (
                <div key={tick} className="pac-hero-tick">
                  <Check size={16} />
                  <span>{tick}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/simuler-mon-projet" className="pac-btn pac-btn-primary">
                SIMULER MON PROJET <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="pac-btn pac-btn-outline">
                ÊTRE RAPPELÉ GRATUITEMENT <Phone size={16} />
              </Link>
            </div>
          </div>

          <div className="pac-hero-media">
            <Image
              src={content.heroImage}
              alt={content.heroImageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 56vw"
              style={{ objectFit: "cover" }}
              priority
            />
            <span className="pac-hero-media-fade" aria-hidden />
          </div>
        </div>
      </section>

      {/* Brands */}
      <div className="container">
        <div className="pac-brands">
          <p className="pac-brands-label">
            Nous installons les plus
            <br />
            grandes marques
          </p>
          <div className="pac-brands-logos">
            {content.brands.map((b) => (
              <Image
                key={b.name}
                src={b.logo}
                alt={b.name}
                width={b.width}
                height={b.height}
                style={{ objectFit: "contain", width: "auto", height: 32 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Variants */}
      <section className="section">
        <div className="container">
          <h2 className="pac-section-title-plain">{renderTwoToneTitle(content.variantsTitle)}</h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {content.variants.map((v) => {
              const Icon = icons[v.icon] ?? Home;
              return (
                <article key={v.title} className="pac-variant-card">
                  <div className="relative h-60">
                    <Image src={v.image} alt={v.title} fill sizes="(max-width: 900px) 50vw, 25vw" style={{ objectFit: "cover" }} loading="lazy" />
                    <span className="pac-variant-icon">
                      <Icon size={24} />
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy">{v.title}</h3>
                    <p className="mt-5 text-sm text-muted">{v.text}</p>
                    <p className="mt-5 text-sm">
                      <span className="pac-ideal-for">Idéal pour :</span> {v.idealFor}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages + Aides */}
      <section className="section">
        <div className="container">
          <div className="pac-advantages-row">
            <div className="pac-advantages-panel">
              <h2 className="pac-advantages-title">{content.advantagesTitle}</h2>
              <div className="pac-advantages-grid">
                {content.advantages.map((a) => {
                  const Icon = icons[a.icon] ?? Zap;
                  return (
                    <div key={a.title} className="pac-advantage-item font-bold">
                      <span className="pac-advantage-icon mt-5">
                        <Icon size={26} />
                      </span>
                      <div>
                        <p className="pac-advantage-title mt-6">{a.title}</p>
                        <p className="pac-advantage-text">{a.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pac-advantages-photo">
              <Image
                src={content.aidesCard.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>

            <div className="pac-aides-panel">
              <p className="pac-aides-badge">
                <Lightbulb size={16} /> {content.aidesCard.badge}
              </p>
              <p className="pac-aides-amount">{content.aidesCard.title}</p>
              <p className="pac-aides-subtitle">{content.aidesCard.subtitle}</p>
              <p className="pac-aides-text">{content.aidesCard.text}</p>
              <Link href={content.aidesCard.ctaHref} className="pac-btn pac-btn-primary">
                {content.aidesCard.ctaLabel} <ArrowRight size={16} />
              </Link>
              <p className="pac-aides-disclaimer">{content.aidesCard.disclaimer}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <h2 className="pac-section-title">{content.stepsTitle}</h2>
          <div className="pac-steps mt-10">
            {content.steps.map((step, i) => {
              const Icon = icons[step.icon] ?? CheckCircle2;
              const isLast = i === content.steps.length - 1;
              return (
                <div key={step.n} className="pac-step">
                  <div className="pac-step-row">
                    <span className="pac-step-number">{step.n}</span>
                    <span className="pac-step-icon-inline">
                      <Icon size={isLast ? 34 : 30} />
                    </span>
                    {!isLast && <span className="pac-step-connector" aria-hidden />}
                  </div>
                  <p className="pac-step-title">{step.title}</p>
                  <p className="pac-step-text">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section ">
        <div className="container">
          <div className="pac-testimonials-row">
            <div className="pac-rating-block">
              <h2 className="pac-section-title pac-section-title-left">Ils nous font confiance</h2>
              <div className="pac-rating">
                <strong>{content.rating.value}</strong>
                <span className="pac-rating-stars" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </span>
              </div>
              <p className="pac-rating-count">sur {content.rating.count}</p>
              <Link href="/realisations" className="pac-link">
                Voir tous les avis <ArrowRight size={14} />
              </Link>
            </div>
            {content.testimonials.map((t) => (
              <article key={t.name} className="testimonial-card">
                <Quote className="testimonial-quote-icon" aria-hidden />
                <p className="testimonial-quote">{t.quote}</p>
                <div className="pac-testimonial-person">
                  <span className="pac-avatar">{initials(t.name)}</span>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-location">{t.location}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section pac-final-cta-section">
        <div className="container">
          <div className="pac-final-cta-card">
            <span className="pac-final-cta-icon">
              <Leaf size={26} />
            </span>
            <div>
              <p className="pac-final-cta-title">{content.finalCta.title}</p>
              <p className="pac-final-cta-subtitle">{content.finalCta.subtitle}</p>
            </div>
            <div className="pac-final-cta-actions">
              <Link href={content.finalCta.ctaPrimaryHref} className="pac-btn pac-btn-white">
                {content.finalCta.ctaPrimaryLabel} <ArrowRight size={16} />
              </Link>
              <Link href={content.finalCta.ctaSecondaryHref} className="pac-btn pac-btn-outline-white">
                {content.finalCta.ctaSecondaryLabel} <Phone size={16} />
              </Link>
            </div>
          </div>
          <div className="pac-final-cta-stats">
            {content.finalCta.stats.map((s) => {
              const Icon = icons[s.icon] ?? ShieldCheck;
              return (
                <div key={s.label} className="pac-final-cta-stat">
                  <Icon size={44} />
                  <div>
                    <p className="pac-stat-label">{s.label}</p>
                    <p className="pac-stat-sublabel">{s.sublabel}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
