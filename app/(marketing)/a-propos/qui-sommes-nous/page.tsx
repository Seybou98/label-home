import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Clock,
  HardHat,
  HeartHandshake,
  Headphones,
  Home,
  Leaf,
  MapPin,
  Medal,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/animation/Reveal";
import { Counter } from "@/components/animation/Counter";
import { SectionTitle } from "@/components/home/SectionTitle";

export const metadata: Metadata = buildMetadata({
  title: "Qui sommes-nous ? L'histoire de Label Énergie",
  description:
    "Découvrez l'histoire, les valeurs et l'engagement de Label Énergie, entreprise RGE spécialisée dans les solutions énergétiques depuis plus de 13 ans.",
  path: "/a-propos/qui-sommes-nous",
});

const heroStats: {
  icon: LucideIcon;
  value?: number;
  prefix?: string;
  suffix?: string;
  label: React.ReactNode;
}[] = [
  { icon: Home, value: 5000, prefix: "+ ", label: "clients satisfaits" },
  { icon: Users, value: 90, prefix: "+ ", label: "collaborateurs" },
  { icon: HardHat, value: 20, prefix: "+ ", label: "équipes de pose" },
  {
    icon: TrendingUp,
    value: 200,
    prefix: "+ ",
    label: (
      <>
        installations
        <br />
        par mois
      </>
    ),
  },
  { icon: Clock, value: 13, suffix: " ans", label: "d'expérience" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Fiabilité",
    text: "Des installations réalisées dans les règles de l'art par nos propres équipes qualifiées.",
  },
  {
    icon: Leaf,
    title: "Durabilité",
    text: "Des solutions respectueuses de l'environnement et conçues pour durer.",
  },
  {
    icon: HeartHandshake,
    title: "Proximité",
    text: "Un accompagnement humain et réactif, avant, pendant et après votre projet.",
  },
  {
    icon: Medal,
    title: "Exigence",
    text: "Un haut niveau de qualité, des matériaux sélectionnés et un SAV réactif.",
  },
];

const whyUs = [
  {
    icon: Users,
    title: "100 % interne",
    text: "Pas de sous-traitance : nos propres équipes assurent la pose et le suivi.",
  },
  {
    icon: BadgeCheck,
    title: "Entreprise RGE",
    text: "Des qualifications reconnues pour vous garantir l'accès aux aides.",
  },
  {
    icon: Headphones,
    title: "Accompagnement de A à Z",
    text: "Étude, aides, installation, contrôle, entretien : on s'occupe de tout.",
  },
  {
    icon: Award,
    title: "Qualité & performance",
    text: "Nous sélectionnons les meilleurs équipements pour votre confort et vos économies.",
  },
  {
    icon: MessageCircle,
    title: "SAV réactif",
    text: "Un service après-vente disponible et efficace pour votre tranquillité d'esprit.",
  },
];

function IconPompeAChaleur({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="11" height="16" rx="1.5" />
      <circle cx="8.5" cy="12" r="3.4" />
      <path d="M17 8h4M17 12h4M17 16h4" />
    </svg>
  );
}

function IconSolaireCombine({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="10" r="3.2" />
      <path d="M12 3v2M12 15v2M5 10H3M21 10h-2M7 5L5.6 3.6M17 5l1.4-1.4M7 15l-1.4 1.4M17 15l1.4 1.4" />
      <path d="M6 21h12" />
    </svg>
  );
}

function IconPhotovoltaique({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="11" rx="1" />
      <path d="M3 11h18M3 14.5h18M9 7v11M15 7v11" />
      <path d="M12 7V3" />
    </svg>
  );
}

function IconPoeleAGranules({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="7" width="14" height="14" rx="2" />
      <path d="M9 7V4h6v3" />
      <circle cx="12" cy="14" r="3" />
    </svg>
  );
}

function IconChauffeEauThermo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="3" width="10" height="18" rx="4" />
      <path d="M12 8v5" />
      <circle cx="12" cy="16" r="1.4" />
    </svg>
  );
}

function IconChauffeEauSolaire({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="4" width="8" height="17" rx="2" />
      <path d="M8 9h8" />
      <path d="M12 13v4" />
    </svg>
  );
}

const expertise = [
  { icon: IconPompeAChaleur, label: "Pompes à chaleur (air/eau & air/air)", href: "/solutions/pompe-a-chaleur" },
  { icon: IconSolaireCombine, label: "Systèmes solaires combinés", href: "/solutions/systeme-solaire-combine" },
  { icon: IconPhotovoltaique, label: "Panneaux photovoltaïques", href: "/solutions/panneaux-photovoltaiques" },
  { icon: IconPoeleAGranules, label: "Poêles & chaudières à granulés", href: "/solutions/poele-a-granules" },
  { icon: IconChauffeEauThermo, label: "Chauffe-eau thermodynamiques", href: "/solutions/chauffe-eau-thermodynamique" },
  { icon: IconChauffeEauSolaire, label: "Chauffe-eau solaires (CESI)", href: "/solutions/chauffe-eau-solaire-individuel" },
];

const partners = [
  { name: "Daikin", logo: "/images/solutions/daikin-logo-crop.png", width: 3840, height: 902 },
  { name: "Atlantic", logo: "/images/solutions/atlantic-logo.webp", width: 570, height: 152 },
  { name: "Ariston", logo: "/images/solutions/ariston-logo-crop.png", width: 500, height: 82 },
  { name: "LG", logo: "/images/solutions/lg-logo.webp", width: 3840, height: 1760 },
  {
    name: "Mitsubishi Electric",
    logo: "/images/solutions/Mitsubishi_Electric_logo.svg.webp",
    width: 3840,
    height: 1171,
  },
  { name: "Thaléos", logo: "/images/solutions/thaleos-logo-crop.png", width: 369, height: 96 },
];

const bottomTrust = [
  { icon: ShieldCheck, value: "RGE", label: "Entreprise certifiée" },
  { icon: Home, value: siteConfig.stats.installations, label: "Installations réalisées" },
  { icon: Star, value: `${siteConfig.rating.valueLabel}/5`, label: `+${siteConfig.rating.count} avis Google` },
  { icon: Award, value: `${siteConfig.stats.experienceYears} ans`, label: "D'expérience à vos côtés" },
  { icon: Headphones, value: "A à Z", label: "Accompagnement de bout en bout" },
];

export default function QuiSommesNousPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "À propos", path: "/a-propos/qui-sommes-nous" },
          { name: "Qui sommes-nous ?", path: "/a-propos/qui-sommes-nous" },
        ]}
      />

      {/* Hero */}
      <section className="pt-2">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">QUI SOMMES-NOUS ?</p>
            <h1 className="qsn-hero-title">
              Notre énergie au service de votre{" "}
              <span className="text-teal">confort et de la planète.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Label Énergie est spécialiste des solutions de rénovation énergétique pour les
              particuliers. Nous vous accompagnons de A à Z avec des installations performantes,
              des équipes expertes et un service 100 % interne.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/realisations" className="btn btn-primary">
                DÉCOUVRIR NOS RÉALISATIONS <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                NOUS CONTACTER <Phone size={16} />
              </Link>
            </div>

            <div className="solution-rating">
              <Image src="/images/google-logo.webp" alt="Google" width={16} height={16} />
              <strong>{siteConfig.rating.valueLabel}/5</strong>
              <span className="stars">★★★★★</span>
              <small>Basé sur +{siteConfig.rating.count} avis clients</small>
            </div>
          </div>

          <div className="qsn-hero-media" style={{ aspectRatio: "1272 / 832" }}>
            <Image
              src="/images/qui-somme-nous.jpg"
              alt="Siège et équipes Label Énergie devant leurs véhicules d'intervention"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="container mt-8">
        <Reveal className="qsn-stats">
          {heroStats.map((s, i) => (
            <div className="qsn-stat" key={i}>
              <s.icon size={34} className="qsn-stat-icon" />
              <strong>
                {s.value !== undefined ? (
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                ) : null}
              </strong>
              <span>{s.label}</span>
            </div>
          ))}
          <div className="qsn-stat">
            <MapPin size={34} className="qsn-stat-icon" />
            <span className="qsn-stat-label-only">
              Intervention dans
              <br />
              toute la France
            </span>
          </div>
        </Reveal>
      </div>

      {/* Mission & valeurs */}
      <Reveal as="section" className="section">
        <div className="container grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">NOTRE MISSION</p>
            <h2 className="qsn-section-heading">
              Rendre la rénovation énergétique simple, fiable et accessible à tous.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Nous croyons qu&apos;une maison plus confortable et plus économe est à la portée de
              chacun. C&apos;est pourquoi nous vous proposons des solutions performantes, durables
              et adaptées à vos besoins, avec un accompagnement personnalisé à chaque étape.
            </p>
            <Link href="/a-propos/certifications" className="btn btn-outline mt-7">
              EN SAVOIR PLUS SUR NOS ENGAGEMENTS <ArrowRight size={16} />
            </Link>
          </div>
          <div>
            <p className="eyebrow">NOS VALEURS</p>
            <div className="qsn-values-grid mt-4">
              {values.map((v) => (
                <div className="qsn-value-card" key={v.title}>
                  <span className="qsn-value-icon">
                    <v.icon size={20} />
                  </span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Pourquoi choisir Label Énergie */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <SectionTitle kicker="POURQUOI CHOISIR LABEL ÉNERGIE ?" align="left" />
          <div className="qsn-why-grid mt-6">
            {whyUs.map((w) => (
              <div className="qsn-why-item" key={w.title}>
                <w.icon size={34} className="qsn-why-icon" />
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Expertise & équipe */}
      <Reveal as="section" className="section">
        <div className="container grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">NOTRE EXPERTISE</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Nous installons les solutions les plus performantes pour améliorer votre confort et
              réduire vos factures.
            </p>
            <div className="qsn-expertise-grid">
              {expertise.map((e) => (
                <Link href={e.href} className="qsn-expertise-item" key={e.label}>
                  <span className="qsn-expertise-icon">
                    <e.icon size={100} />
                  </span>
                  <span>{e.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">UNE ÉQUIPE PASSIONNÉE À VOTRE SERVICE</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Techniciens, conseillers, chargés de projets, service client&hellip; Chacun met son
              expertise et son énergie au service de votre satisfaction.
            </p>
            <div className="qsn-team-media" style={{ aspectRatio: "1939 / 528" }}>
              <Image
                src="/images/qui-somme-nous2.jpg"
                alt="Équipe de techniciens Label Énergie réunie en montagne"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <Link href="/a-propos/recrutement" className="btn btn-primary">
                REJOINDRE NOS ÉQUIPES <ArrowRight size={16} />
              </Link>
              <Link
                href="/a-propos/recrutement"
                className="inline-flex items-center gap-2 text-xs font-extrabold text-teal2"
              >
                Voir nos offres d&apos;emploi <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Partenaires */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <p className="eyebrow">NOS PARTENAIRES DE CONFIANCE</p>
          <div className="qsn-partners mt-6">
            {partners.map((p) => (
              <div className="qsn-partner" key={p.name}>
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={p.width}
                  height={p.height}
                  style={{ objectFit: "contain", width: "auto", height: 28 }}
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="section">
        <div className="container">
          <div className="cta-card cta-card-green">
            <div className="cta-card-main">
              <Home size={72} className="cta-card-icon-generic" />
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
                <span className="btn-gradient-text">SIMULER MON PROJET</span>{" "}
                <ArrowRight size={16} className="btn-gradient-icon" />
              </Link>
              <Link href="/contact" className="btn" style={{ border: "1px solid #fff", color: "#fff" }}>
                ÊTRE RAPPELÉ GRATUITEMENT <Phone size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Trust bar */}
      <div className="container pb-10">
        <div className="trust solution-trust">
          {bottomTrust.map((t) => (
            <div className="trust-item trust-inline" key={t.label}>
              <t.icon className="trust-mark trust-icon" aria-hidden />
              <div className="trust-text">
                <strong>{t.value}</strong>
                <span className="trust-caption">{t.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
