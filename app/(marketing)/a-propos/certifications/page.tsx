import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  CheckCircle2,
  Euro,
  HardHat,
  Headphones,
  Home,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/animation/Reveal";
import { SectionTitle } from "@/components/home/SectionTitle";

export const metadata: Metadata = buildMetadata({
  title: "Nos certifications : RGE, Qualibat et garanties",
  description:
    "Label Énergie est certifiée RGE (Reconnu Garant de l'Environnement) et Qualibat, des garanties de qualité indispensables pour bénéficier des aides de l'État.",
  path: "/a-propos/certifications",
});

const heroBadges: { icon: LucideIcon; label: string }[] = [
  { icon: BadgeCheck, label: "Certifications reconnues par l'État" },
  { icon: Users, label: "Équipes formées et qualifiées" },
  { icon: CheckCircle2, label: "Travaux conformes aux normes" },
  { icon: Award, label: "Qualité contrôlée et certifiée" },
];

const certifications = [
  {
    key: "rge",
    title: "Reconnu Garant de l'Environnement",
    text: "Qualification obligatoire pour réaliser des travaux de rénovation énergétique et faire bénéficier nos clients des aides de l'État.",
    org: "Organisme certificateur : Qualibat",
    logo: "/images/logo-rge.png",
    width: 660,
    height: 466,
  },
  {
    key: "qualipac",
    title: "QualiPAC",
    text: "Spécialiste des pompes à chaleur. Atteste de nos compétences pour l'installation de PAC air/eau et air/air dans les règles de l'art.",
    org: "Organisme certificateur : Qualit'EnR",
    logo: "/images/Logo-QualiPAC-RGE.png",
    width: 1200,
    height: 509,
  },
  {
    key: "qualisol",
    title: "QualiSol",
    text: "Spécialiste des systèmes solaires thermiques et combinés (SSC). Garantit notre savoir-faire pour des installations performantes.",
    org: "Organisme certificateur : Qualit'EnR",
    logo: "/images/Logo-QualiSOL-RGE.png",
    width: 1200,
    height: 509,
  },
  {
    key: "qualipv",
    title: "QualiPV",
    text: "Spécialiste du photovoltaïque. Certification des compétences pour l'installation de panneaux solaires et systèmes associés.",
    org: "Organisme certificateur : Qualit'EnR",
    logo: "/images/Logo-QualiPV-RGE.png",
    width: 1200,
    height: 509,
  },
  {
    key: "qualibat",
    title: "Qualibat",
    text: "Qualification des entreprises du bâtiment. Atteste de notre professionnalisme et de notre solidité financière.",
    org: "Organisme certificateur : Qualibat",
    logo: "/images/logo-Qualibat.png",
    width: 380,
    height: 285,
  },
];

const whyCertifications = [
  { icon: Euro, title: "Accès aux aides", text: "Nos certifications vous permettent de bénéficier de MaPrimeRénov', des CEE et autres aides financières." },
  { icon: ShieldCheck, title: "Qualité garantie", text: "Des installations réalisées dans le respect des normes en vigueur et des règles de l'art." },
  { icon: Sparkles, title: "Performance durable", text: "Des équipements bien installés pour des performances optimales et des économies d'énergie durables." },
  { icon: Users, title: "Sérénité", text: "Un accompagnement complet par des professionnels certifiés et à votre écoute à chaque étape." },
  { icon: RefreshCw, title: "Contrôles réguliers", text: "Nos certifications sont contrôlées chaque année par des organismes indépendants." },
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

export default function CertificationsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "À propos", path: "/a-propos/qui-sommes-nous" },
          { name: "Nos certifications", path: "/a-propos/certifications" },
        ]}
      />

      {/* Hero */}
      <section className="pt-2">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">NOS CERTIFICATIONS</p>
            <h1 className="qsn-hero-title">
              Des certifications qui garantissent{" "}
              <span className="text-teal">votre confiance.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Label Énergie est certifiée par les organismes reconnus d&apos;État pour la qualité
              de ses installations, le respect des normes en vigueur et la compétence de ses
              équipes.
            </p>

            <div className="cert-badges-row">
              {heroBadges.map((b) => (
                <div className="cert-badge" key={b.label}>
                  <b.icon size={40} className="cert-badge-icon" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cert-hero-media" style={{ aspectRatio: "1272 / 832" }}>
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

      {/* Bandeau confiance */}
      <div className="container mt-6">
        <div className="cert-highlight">
          <ShieldCheck size={50} className="cert-highlight-icon" />
          <div className="cert-highlight-title">
            Votre projet entre les mains d&apos;une entreprise certifiée RGE.
          </div>
          <p className="cert-highlight-text">
            Toutes nos certifications sont régulièrement contrôlées et renouvelées <br />pour vous
            garantir des installations fiables et durables.
          </p>
          <Link href="/contact" className="btn btn-outline">
            NOUS CONTACTER <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Certifications */}
      <Reveal as="section" className="section">
        <div className="container">
          <SectionTitle title="Nos certifications et qualifications" />
          <div className="cert-grid mt-6">
            {certifications.map((c) => (
              <div className="cert-card" key={c.key}>
                <div className="cert-card-logo">
                  <Image
                    src={c.logo}
                    alt={c.title}
                    width={c.width}
                    height={c.height}
                    style={{ objectFit: "contain", width: "auto", height: 56 }}
                  />
                </div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="cert-card-org">{c.org}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Pourquoi ces certifications */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <SectionTitle title="Pourquoi ces certifications sont importantes ?" />
          <div className="qsn-why-grid mt-6">
            {whyCertifications.map((w) => (
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

      {/* Équipe experte */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="cert-team-band">
            <div className="cert-team-media">
              <Image
                src="/images/technicien.png"
                alt="Techniciens Label Énergie devant leurs véhicules d'intervention"
                fill
                sizes="(max-width: 900px) 100vw, 30vw"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
            <div className="cert-team-text">
              <p className="cert-team-title">Une équipe experte et qualifiée</p>
              <p className="mt-3 text-xm leading-relaxed text-muted">
                Nos techniciens suivent régulièrement des formations pour rester<br/> à la pointe des
                dernières technologies et vous garantir un service<br /> de haute qualité.
              </p>
            </div>
            <div className="cert-team-stats">
              <div>
                <div className="cert-team-stat-value">
                  <Users size={34} /> +{siteConfig.stats.collaborators}
                </div>
                <span>collaborateurs</span>
              </div>
              <div>
                <div className="cert-team-stat-value">
                  <HardHat size={34 } /> +20
                </div>
                <span>équipes de pose</span>
              </div>
              <div>
                <div className="cert-team-stat-value">
                  <Home size={34} /> +200
                </div>
                <span>installations / mois</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Partenaires */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <SectionTitle title="Nos partenaires de confiance" />
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
              <Award size={72} className="cta-card-icon-generic" />
              <div>
                <p className="cta-card-title">Un projet ? Parlons-en !</p>
                <p className="cta-card-subtitle">
                  Nos experts certifiés vous accompagnent gratuitement <br />
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
