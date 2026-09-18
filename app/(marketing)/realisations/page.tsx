import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Home, Phone, ShieldCheck, Star, TrendingUp, Users } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/animation/Reveal";
import { SectionTitle } from "@/components/home/SectionTitle";
import { TestimonialsCarousel } from "@/components/solutions/TestimonialsCarousel";
import { RealisationsFilterGrid } from "@/components/solutions/RealisationsFilterGrid";
import { ctaTickIcon, ctaTickLabel } from "@/components/solutions/SolutionPageTemplate";
import { defaultCtaTicks } from "@/lib/content/solutions";
import { realisationCategories, realisationGallery, realisationItems, realisationTestimonials } from "@/lib/content/realisationsPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Réalisations & avis clients Label Énergie",
  description:
    "Découvrez nos installations de pompes à chaleur, panneaux solaires, chauffe-eau thermodynamique et poêles à granulés partout en France, ainsi que les avis de nos clients.",
  path: "/realisations",
});

export default function RealisationsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Réalisations", path: "/realisations" }]} />

      {/* Hero */}
      <section className="solution-hero">
        <div className="container solution-hero-grid">
          <div>
            <p className="eyebrow">RÉALISATIONS &amp; AVIS</p>
            <h1>
              Des installations performantes, des clients <span>100% satisfaits.</span> 
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Découvrez nos réalisations partout en France et les témoignages de nos clients. Performance, qualité
              et satisfaction sont au cœur de chacun de nos projets.
            </p>

            <div className="solution-ticks real-hero-ticks">
              <div className="solution-tick">
                <span className="solution-tick-icon">
                  <ShieldCheck size={20} />
                </span>
                <span className="solution-tick-label">
                  Installations
                  <br />
                  100% internes
                </span>
              </div>
              <div className="solution-tick">
                <span className="solution-tick-icon">
                  <Users size={20} />
                </span>
                <span className="solution-tick-label">
                  Équipes qualifiées
                  <br />
                  et expérimentées
                </span>
              </div>
              <div className="solution-tick">
                <span className="solution-tick-icon">
                  <Star size={20} />
                </span>
                <span className="solution-tick-label">
                  Plus de 5 000 clients
                  <br />
                  nous font confiance
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#realisations-grid" className="btn btn-primary">
                DÉCOUVRIR NOS RÉALISATIONS <ArrowRight size={16} />
              </Link>
              <Link href="#avis-clients" className="btn btn-outline">
                VOIR TOUS LES AVIS <Star size={16} />
              </Link>
            </div>
          </div>

          <div className="real-gallery">
            <div className="real-gallery-top">
              <div className="real-gallery-item">
                <Image
                  src={realisationGallery[0].image}
                  alt={realisationGallery[0].alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 30vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="real-gallery-top-stack">
                {realisationGallery.slice(1, 3).map((g) => (
                  <div className="real-gallery-item" key={g.image + g.alt}>
                    <Image src={g.image} alt={g.alt} fill sizes="15vw" style={{ objectFit: "cover" }} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
            <div className="real-gallery-bottom">
              {realisationGallery.slice(3).map((g) => (
                <div className="real-gallery-item" key={g.image + g.alt}>
                  <Image src={g.image} alt={g.alt} fill sizes="15vw" style={{ objectFit: "cover" }} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="container">
        <div className="real-trust-bar">
          <div className="real-trust-item">
            <span className="real-trust-icon">
              <Home size={22} />
            </span>
            <div>
              <p className="real-trust-value">+5 000</p>
              <p className="real-trust-label">clients satisfaits</p>
            </div>
          </div>
          <div className="real-trust-item">
            <span className="real-trust-icon">
              <TrendingUp size={22} />
            </span>
            <div>
              <p className="real-trust-value">+200</p>
              <p className="real-trust-label">installations / mois</p>
            </div>
          </div>
          <div className="real-trust-item">
            <span className="real-trust-icon">
              <Award size={22} />
            </span>
            <div>
              <p className="real-trust-value">+13 ans</p>
              <p className="real-trust-label">d&apos;expérience</p>
            </div>
          </div>
          <div className="real-trust-item real-trust-google">
            <div>
              <p className="real-trust-value">
                {siteConfig.rating.valueLabel}/5
                <span className="real-trust-stars" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </span>
              </p>
              <p className="real-trust-label">sur +{siteConfig.rating.count} avis Google</p>
            </div>
            <Image src="/images/google-logo.webp" alt="Google" width={22} height={22} />
          </div>
        </div>
      </div>

      {/* Filterable grid */}
      <Reveal as="section" className="section" id="realisations-grid">
        <div className="container">
          <SectionTitle title="Découvrez nos réalisations" />
          <div className="mt-8">
            <RealisationsFilterGrid categories={realisationCategories} items={realisationItems} />
          </div>
          <div className="mt-8 text-center">
            <Link href="/realisations" className="btn btn-outline">
              VOIR TOUTES NOS RÉALISATIONS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Testimonials */}
      <Reveal as="section" className="section bg-soft" id="avis-clients">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-3 text-center">
            <h2 className="text-2xl font-extrabold text-navy">Ils parlent de nous</h2>
            <span className="real-trust-stars" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </span>
            <span className="text-sm font-bold text-navy">
              {siteConfig.rating.valueLabel}/5 <span className="font-normal text-muted">sur +{siteConfig.rating.count} avis Google</span>
            </span>
          </div>
          <div className="mt-8">
            <TestimonialsCarousel items={realisationTestimonials} showAvatars showGoogleBadge showArrows />
          </div>
          <div className="mt-8 text-center">
            <Link href="/realisations" className="btn btn-outline">
              VOIR TOUS LES AVIS CLIENTS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Final CTA */}
      <Reveal as="section" className="section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-card-main">
              <span className="cta-card-icon">
                <Image src="/images/solutions/realisation.png" alt="" width={150} height={150} />
              </span>
              <div>
                <p className="cta-card-title">Un projet ? Parlons-en !</p>
                <p className="cta-card-subtitle">
                  Nos experts vous accompagnent gratuitement <br />
                  dans la réalisation de vos travaux.
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
          <ul className="cta-ticks">
            {defaultCtaTicks.map((tick) => {
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
        </div>
      </Reveal>
    </>
  );
}
