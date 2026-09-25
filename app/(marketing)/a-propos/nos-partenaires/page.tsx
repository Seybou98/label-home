import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Handshake,
  Headphones,
  Home,
  Leaf,
  Phone,
  ShieldCheck,
  Star,
  Truck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/animation/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Nos partenaires : EDF, Daikin, Atlantic, Mitsubishi Electric",
  description:
    "Label Énergie installe les plus grandes marques du marché : Daikin, Mitsubishi Electric, Atlantic, LG. Partenaire officiel EDF pour la revente d'électricité solaire.",
  path: "/a-propos/nos-partenaires",
});

const heroBadges: { icon: LucideIcon; label: string }[] = [
  { icon: Handshake, label: "Partenaires sélectionnés" },
  { icon: Zap, label: "Solutions performantes" },
  { icon: ShieldCheck, label: "Engagement qualité" },
  { icon: Leaf, label: "Accompagnement durable" },
];

const brandPartners = [
  { name: "Ariston", logo: "/images/solutions/ariston-logo-crop.png", width: 500, height: 82, text: "Chauffe-eau, pompes à chaleur et solutions thermiques" },
  { name: "Atlantic", logo: "/images/solutions/atlantic-logo.webp", width: 570, height: 152, text: "Confort thermique et eau chaude sanitaire" },
  { name: "Daikin", logo: "/images/solutions/daikin-logo-crop.png", width: 3840, height: 902, text: "Pompes à chaleur et climatisation" },
  { name: "LG", logo: "/images/solutions/lg-logo.webp", width: 3840, height: 1760, text: "Climatisation et pompes à chaleur" },
  { name: "Mitsubishi Electric", logo: "/images/solutions/Mitsubishi_Electric_logo.svg.webp", width: 3840, height: 1171, text: "Pompes à chaleur et solutions de confort" },
  { name: "Thaléos", logo: "/images/solutions/thaleos-logo-crop.png", width: 369, height: 96, text: "Solutions solaires thermiques et combinées" },
];

const financialPartners = [
  { name: "DOMOfinance", logo: "/images/domofinance-logo-trim.png", width: 787, height: 158, text: "Solutions de financement adaptées à vos projets" },
  { name: "Sofinco", logo: "/images/sofinco-logo-trim.png", width: 571, height: 127, text: "Crédit à la consommation et solutions de paiement" },
  { name: "Younited Crédit", logo: "/images/logo-younited-trim.webp", width: 1145, height: 325, text: "Financements responsables et accessibles" },
  { name: "Cetelem", logo: "/images/cetelem-logo-fixed.png", width: 733, height: 203, text: "Solutions de crédit sur mesure" },
  { name: "Cofidis", logo: "/images/logo-cofidis-fr.png", width: 609, height: 400, text: "Financement de vos projets en toute sérénité" },
];

const institutionalPartners = [
  { name: "MaPrimeRénov'", logo: "/images/Maprimerenov_logo.png", width: 1053, height: 237, text: "Aide financière de l'État pour vos travaux" },
  { name: "CEE", logo: "/images/logo-cee-trim.png", width: 350, height: 137, text: "Financement de vos travaux par les économies d'énergie" },
  { name: "RGE", logo: "/images/logo-rge.png", width: 660, height: 466, text: "Qualification garantissant notre expertise" },
  { name: "SynerCiel", logo: "/images/logo-synerciel-trim.webp", width: 593, height: 149, text: "Partenaire officiel EDF Solutions énergétiques" },
  { name: "France Rénov'", logo: "/images/France-renov-logo-trim.png", width: 3428, height: 1710, text: "Le service public pour mieux rénover votre habitat" },
];

const operationalPartners = [
  { icon: Users, text: "Réseau d'installateurs qualifiés et formés" },
  { icon: Truck, text: "Plateformes logistiques et fournisseurs" },
  { icon: ShieldCheck, text: "Assurances et garanties pour votre tranquillité" },
  { icon: Headphones, text: "Service après-vente réactif et local" },
  { icon: Leaf, text: "Engagés pour la planète et la transition énergétique" },
];

const bottomTrust = [
  { icon: ShieldCheck, value: "RGE", label: "Entreprise certifiée" },
  { icon: Home, value: siteConfig.stats.installations, label: "Installations réalisées" },
  { icon: Star, value: `${siteConfig.rating.valueLabel}/5`, label: `+${siteConfig.rating.count} avis Google` },
  { icon: Award, value: `${siteConfig.stats.experienceYears} ans`, label: "D'expérience à vos côtés" },
  { icon: Headphones, value: "A à Z", label: "Accompagnement de bout en bout" },
];

export default function NosPartenairesPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "À propos", path: "/a-propos/qui-sommes-nous" },
          { name: "Nos partenaires", path: "/a-propos/nos-partenaires" },
        ]}
      />

      {/* Hero */}
      <section className="pt-2">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">NOS PARTENAIRES</p>
            <h1 className="qsn-hero-title">
              Des partenaires de <span className="text-teal">confiance</span> à nos côtés.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Label Énergie s&apos;entoure des meilleurs partenaires pour vous proposer des
              solutions performantes, fiables et durables. Fabricants, financeurs, organismes et
              acteurs de l&apos;énergie : ensemble, nous construisons un avenir plus responsable.
            </p>

            <div className="pt-badges-row">
              {heroBadges.map((b) => (
                <div className="pt-badge" key={b.label}>
                  <b.icon size={34} />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-hero-media" style={{ aspectRatio: "1213 / 864" }}>
            <Image
              src="/images/pt1.jpg"
              alt="Siège Label Énergie et ses équipes"
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
          <ShieldCheck size={40} className="cert-highlight-icon" />
          <div className="cert-highlight-title">
            Un réseau de partenaires<br /> pour des solutions complètes
          </div>
          <p className="cert-highlight-text">
            Grâce à nos partenaires de confiance, nous vous garantissons des équipements<br /> de
            qualité, des aides optimisées et un accompagnement sur-mesure à chaque étape.
          </p>
          <Link href="/contact" className="btn btn-outline">
            NOUS CONTACTER <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Fabricants */}
      <Reveal as="section" className="section">
        <div className="container">
          <h2 className="pt-subheading">Nos partenaires fabricants</h2>
          <div className="pt-brand-grid mt-4">
            {brandPartners.map((b) => (
              <div className="pt-brand-card" key={b.name}>
                <div className="pt-brand-logo">
                  <Image src={b.logo} alt={b.name} width={b.width} height={b.height} style={{ objectFit: "contain", width: "auto", height: 46 }} />
                </div>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
          <div className="pt-see-more">
            <Link href="/solutions">
              Voir tous nos fabricants <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Financiers */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <h2 className="pt-subheading">Nos partenaires financiers</h2>
          <div className="pt-fin-grid mt-4">
            {financialPartners.map((f) => (
              <div className="pt-brand-card" key={f.name}>
                <div className="pt-brand-logo">
                  <Image src={f.logo} alt={f.name} width={f.width} height={f.height} style={{ objectFit: "contain", width: "auto", height: 46 }} />
                </div>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
          <div className="pt-see-more">
            <Link href="/aides-financement/financement">
              Voir toutes nos solutions de financement <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Institutionnels */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <h2 className="pt-subheading">Nos partenaires institutionnels &amp; aides</h2>
          <div className="pt-fin-grid mt-4">
            {institutionalPartners.map((p) => (
              <div className="pt-brand-card" key={p.name}>
                <div className="pt-brand-logo">
                  <Image src={p.logo} alt={p.name} width={p.width} height={p.height} style={{ objectFit: "contain", width: "auto", height: 46 }} />
                </div>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Opérationnels */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <h2 className="pt-subheading">Nos partenaires opérationnels</h2>
          <div className="pt-ops-grid mt-4">
            {operationalPartners.map((o, i) => (
              <div className="pt-ops-card" key={i}>
                <o.icon size={48} />
                <span>{o.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="section">
        <div className="container">
          <div className="pt-cta-banner">
            <span className="pt-cta-icon">
              <Handshake size={38} />
            </span>
            <div>
              <p className="pt-cta-title">
                Une alliance de compétences
                <br />
                au service de votre projet
              </p>
              <p className="pt-cta-text">
                Des partenaires engagés pour vous proposer le meilleur de la rénovation
                énergétique.
              </p>
            </div>
            <div className="pt-cta-actions">
              <Link href="/simuler-mon-projet" className="btn" style={{ background: "#fff", color: "#0b5c42" }}>
                SIMULER MON PROJET <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn" style={{ border: "1px solid #7fbfa6", color: "#fff" }}>
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
