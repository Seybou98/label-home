import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  Bird,
  Droplet,
  Euro,
  Gift,
  GraduationCap,
  Home,
  Leaf,
  Lightbulb,
  MessageCircle,
  ShieldCheck,
  Star,
  Sun,
  Thermometer,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/animation/Reveal";
import { SectionTitle } from "@/components/home/SectionTitle";
import { siteConfig } from "@/lib/site";
import {
  conseilsArticles,
  conseilsCategories,
  conseilsGuides,
  conseilsHeroTicks,
  conseilsTips,
} from "@/lib/content/conseilsPage";

export const metadata: Metadata = buildMetadata({
  title: "Conseils énergie : guides pompe à chaleur, solaire, aides",
  description:
    "Retrouvez nos guides et conseils pratiques sur le chauffage, la climatisation, le solaire et les aides à la rénovation énergétique.",
  path: "/conseils",
});

const icons: Record<string, LucideIcon> = {
  GraduationCap,
  Leaf,
  Euro,
  ShieldCheck,
  Gift,
  Lightbulb,
  BarChart3,
  Wrench,
  Thermometer,
  Sun,
  Droplet,
};

export default function ConseilsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Conseils", path: "/conseils" }]} />

      {/* Hero */}
      <section className="conseils-hero">
        <div className="container">
          <div className="conseils-hero-copy">
            <p className="eyebrow">CONSEILS &amp; GUIDES</p>
            <h1>
              Des conseils clairs
              <br />
              pour faire les bons <span>choix</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Nos experts vous accompagnent pour comprendre les technologies, les aides et les solutions les plus
              adaptées à votre logement. Informez-vous, comparez, économisez.
            </p>

            <div className="conseils-ticks">
              {conseilsHeroTicks.map((t) => {
                const Icon = icons[t.icon] ?? Leaf;
                return (
                  <div key={t.label} className="conseils-tick">
                    <Icon size={40} />
                    <span className="conseils-tick-label">
                      {t.label.split("\n").map((line, i) => (
                        <span key={i}>
                          {i > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="conseils-hero-media">
            <Image
              src="/images/solutions/conseil.jpg"
              alt="Conseiller Label Énergie disponible pour répondre à vos questions"
              fill
              sizes="(max-width: 900px) 100vw, 56vw"
              style={{ objectFit: "cover" }}
              priority
            />
            <span className="conseils-hero-media-fade" aria-hidden />
          </div>
        </div>
      </section>

      {/* Category quickbar */}
      <div className="container">
        <div className="solution-quickbar grid sm:grid-cols-2 md:grid-cols-4">
          {conseilsCategories.map((c) => {
            const Icon = icons[c.icon] ?? Leaf;
            return (
              <Link key={c.title} href={c.href} className="quickbar-item conseils-category">
                <span className="conseils-category-icon">
                  <Icon size={22} />
                </span>
                <div>
                  <p className="text-sm font-extrabold tracking-wide text-navy">{c.title}</p>
                  <p className="mt-1 text-sm text-muted">{c.text}</p>
                  <ArrowRight size={16} className="conseils-category-arrow" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Guides populaires */}
      <Reveal as="section" className="section">
        <div className="container">
          <SectionTitle title="Guides populaires" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {conseilsGuides.map((g) => (
              <article key={g.title} className="guide-card">
                <div className="relative h-32">
                  <Image src={g.image} alt={g.title} fill sizes="(max-width: 900px) 50vw, 20vw" style={{ objectFit: "cover" }} loading="lazy" />
                </div>
                <div className="p-4">
                  <span className={`guide-card-badge guide-badge-${g.categoryColor}`}>{g.category}</span>
                  <h3 className="mt-3 text-sm font-bold text-navy">{g.title}</h3>
                  <p className="mt-2 text-xs text-muted">{g.text}</p>
                  <Link href={g.href} className="variant-link mt-4">
                    Lire le guide <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/conseils" className="btn btn-outline">
              VOIR TOUS NOS GUIDES <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Articles + tips */}
      <Reveal as="section" className="section">
        <div className="container grid gap-8 lg:grid-cols-[3fr_1fr]">
          <div>
            <SectionTitle title="Articles &amp; conseils récents" align="left" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {conseilsArticles.map((a) => (
                <article key={a.title} className="article-card">
                  <div className="relative h-32">
                    <Image src={a.image} alt={a.title} fill sizes="(max-width: 900px) 50vw, 20vw" style={{ objectFit: "cover" }} loading="lazy" />
                  </div>
                  <div className="p-4">
                    <p className="article-card-date">{a.date}</p>
                    <h3 className="mt-2 text-sm font-bold text-navy">{a.title}</h3>
                    <p className="mt-2 text-xs text-muted">{a.text}</p>
                    <Link href="/conseils" className="variant-link mt-4">
                      Lire l&apos;article <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="tips-card">
            <h2 className="tips-card-title">Astuces rapides</h2>
            <ul className="tips-list">
              {conseilsTips.map((t) => {
                const Icon = icons[t.icon] ?? Leaf;
                return (
                  <li key={t.title}>
                    <span className="tips-icon">
                      <Icon size={22} />
                    </span>
                    <div>
                      <p className="tips-item-title">
                        {t.title.split("\n").map((line, i) => (
                          <span key={i}>
                            {i > 0 && <br />}
                            {line}
                          </span>
                        ))}
                      </p>
                      <p className="tips-item-text">{t.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link href="/conseils" className="variant-link">
              Voir toutes nos astuces <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Final CTA */}
      <Reveal as="section" className="section">
        <div className="container">
          <div className="cta-card cta-card-green">
            <div className="cta-card-main">
              <span className="cta-card-icon cta-card-icon-ring">
                <MessageCircle size={28} className="cta-card-icon-generic" />
              </span>
              <div>
                <p className="cta-card-title">Besoin d&apos;un conseil personnalisé ?</p>
                <p className="cta-card-subtitle">
                  Nos experts réalisent gratuitement une étude de votre projet <br />
                  et vous aident à trouver la solution la plus adaptée à vos besoins.
                </p>
              </div>
            </div>
            <div className="cta-card-actions cta-card-actions-single">
              <Link href="/contact" className="btn" style={{ background: "#fff" }}>
                <span className="btn-gradient-text">DEMANDER UN CONSEIL GRATUIT</span>{" "}
                <ArrowRight size={16} className="btn-gradient-icon" />
              </Link>
              <div className="cta-experts">
                <span className="cta-experts-avatars">
                  <User size={14} />
                  <User size={14} />
                  <User size={14} />
                </span>
                <span>Plus de 20 experts à votre écoute</span>
              </div>
            </div>
          </div>
          <div className="pac-final-cta-stats mt-8">
            <div className="pac-final-cta-stat">
              <ShieldCheck size={42} />
              <div>
                <p className="pac-stat-label">Entreprise RGE</p>
                <p className="pac-stat-sublabel">certifiée</p>
              </div>
            </div>
            <div className="pac-final-cta-stat">
              <Home size={42} />
              <div>
                <p className="pac-stat-label">{siteConfig.stats.installations}</p>
                <p className="pac-stat-sublabel">installations réalisées</p>
              </div>
            </div>
            <div className="pac-final-cta-stat">
              <Star size={42} />
              <div>
                <p className="pac-stat-label">{siteConfig.rating.valueLabel}/5</p>
                <p className="pac-stat-sublabel">sur +{siteConfig.rating.count} avis Google</p>
              </div>
            </div>
            <div className="pac-final-cta-stat">
              <Award size={42} />
              <div>
                <p className="pac-stat-label">Plus de {siteConfig.stats.experienceYears} ans</p>
                <p className="pac-stat-sublabel">d&apos;expérience</p>
              </div>
            </div>
            <div className="pac-final-cta-stat">
              <Bird size={42} />
              <div>
                <p className="pac-stat-label">Accompagnement</p>
                <p className="pac-stat-sublabel">de A à Z</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
}
