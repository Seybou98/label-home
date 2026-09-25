import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/animation/Reveal";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";

export const metadata: Metadata = buildMetadata({
  title: "CEE : certificats d'économies d'énergie",
  description:
    "Les certificats d'économies d'énergie (CEE) permettent de financer une partie de vos travaux de rénovation énergétique. Découvrez comment en bénéficier avec Label Énergie.",
  path: "/aides-financement/cee",
});

function Ico({ size, sw = 1.3, children }: { size: number; sw?: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      {children}
    </svg>
  );
}

function Arrow({ color, w = 15 }: { color?: string; w?: number }) {
  return (
    <svg width={w} height={(w * 9) / 15} viewBox="0 0 16 10" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.4" aria-hidden>
      <path d="M0 5h14" />
      <path d="M10 1l4 4-4 4" />
    </svg>
  );
}

function Phone({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

const shield = (
  <>
    <path d="M12 2.5 20 5v7c0 5-3.4 8.3-8 9.5C7.4 20.3 4 17 4 12V5z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </>
);
const leaf = (
  <>
    <path d="M20 4C10 4 4 9 4 15a5 5 0 0 0 5 5c6 0 11-6 11-16z" />
    <path d="M7 19C9.5 13.5 13 9.5 18 7" />
  </>
);
const person = (
  <>
    <circle cx="12" cy="9" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    <path d="M7 9a5 5 0 0 1 10 0" />
  </>
);
const piggy = (
  <>
    <path d="M5 11a7 6 0 0 1 13-2h2v4h-2l-1 3v3h-3v-2h-4v2H7v-3a6 6 0 0 1-2-5z" />
    <path d="M10 6.5a2 2 0 1 1 3-1.5" />
  </>
);
const houseCheck = (
  <>
    <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
    <path d="M8.5 13l2.5 2.5 4.5-5" />
  </>
);

const heroBadges: { icon: ReactNode; lines: ReactNode }[] = [
  { icon: shield, lines: <>Jusqu&apos;à<br />5 000 € d&apos;aide</> },
  {
    icon: (
      <>
        <rect x="5" y="3" width="12" height="16" rx="1.5" />
        <path d="M8 7h6M8 10h6M8 13h3" />
        <circle cx="17" cy="17" r="3.5" fill="#fff" />
        <path d="M15.5 17h3" />
      </>
    ),
    lines: <>Déduction directe<br />sur votre devis</>,
  },
  { icon: leaf, lines: <>Toutes nos solutions<br />éligibles</> },
  {
    icon: (
      <>
        <path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
        <path d="M9 14l2 2 4-4" />
      </>
    ),
    lines: <>Démarches 100 %<br />prises en charge</>,
  },
];

const benefits: { icon: ReactNode; title: string; text: string }[] = [
  { icon: piggy, title: "Un coup de pouce immédiat", text: "Réduction directe sur le montant de vos travaux." },
  { icon: leaf, title: "Une énergie plus responsable", text: "Moins de consommation, moins d'émissions de CO₂." },
  { icon: shield, title: "Un dispositif réglementé", text: "Encadré par l'État et contrôlé par l'ADEME." },
  { icon: person, title: "Label Énergie s'occupe de tout", text: "Constitution du dossier, demande et versement de la prime." },
];

const howSteps: { title: string; text: string; icon: ReactNode; green: boolean }[] = [
  {
    title: "Choix de votre solution",
    text: "Vous choisissez votre équipement éligible (PAC, chaudière, isolation, poêle, etc.).",
    green: true,
    icon: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="1.5" />
        <rect x="9" y="2.5" width="6" height="3" rx="1" />
        <path d="M8.5 13l2.5 2.5 4.5-5" />
      </>
    ),
  },
  {
    title: "Nous montons le dossier",
    text: "Nous vérifions votre éligibilité et constituons votre dossier CEE.",
    green: true,
    icon: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4M9 11h6M9 14h6M9 17h4" />
      </>
    ),
  },
  {
    title: "Validation et accord",
    text: "Le dossier est validé par notre partenaire délégataire.",
    green: false,
    icon: (
      <>
        <path d="M6 10a6 6 0 0 1 12 0" />
        <path d="M5 10h14" />
        <path d="M12 4v3" />
        <circle cx="12" cy="13" r="3" />
        <path d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6" />
      </>
    ),
  },
  {
    title: "Déduction de la prime",
    text: "Le montant de la prime CEE est déduit directement de votre devis.",
    green: false,
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15 9a3.5 3.5 0 1 0 0 6M8 11h5M8 13h5" />
      </>
    ),
  },
  {
    title: "Travaux réalisés",
    text: "Vous profitez d'un logement plus confortable et plus économe en énergie.",
    green: true,
    icon: (
      <>
        <path d="M3 11 11 4l8 7" />
        <path d="M5 10v10h6" />
        <circle cx="17" cy="17" r="4" />
        <path d="M15.5 17l1 1 2-2" />
      </>
    ),
  },
];

const works = [
  { image: "/images/cee2.jpg", alt: "Pompe à chaleur air/eau", amount: "5 000 €", title: "Pompe à chaleur air/eau", text: "Très haute performance énergétique" },
  { image: "/images/cee3.jpg", alt: "Isolation des combles", amount: "4 000 €", title: "Isolation des combles", text: "Isolation performante" },
  { image: "/images/cee4.jpg", alt: "Poêle à granulés", amount: "2 500 €", title: "Poêle à granulés", text: "Chauffage performant et écologique" },
  { image: "/images/cee5.jpg", alt: "Chauffe-eau solaire", amount: "4 000 €", title: "Chauffe-eau solaire", text: "Eau chaude économique et renouvelable" },
  { image: "/images/cee6.jpg", alt: "Pompe à chaleur air/air", amount: "1 500 €", title: "Pompe à chaleur air/air", text: "Confort été comme hiver, faible consommation" },
];

const supportPoints = [
  "Vérification de votre éligibilité",
  "Constitution et dépôt du dossier",
  "Suivi jusqu'au versement de la prime",
  "Déduction directe sur votre devis",
];

const faq = [
  {
    q: "Qu'est-ce que les CEE ?",
    a: "Un dispositif national qui oblige les fournisseurs d'énergie à financer des travaux d'économies d'énergie chez les particuliers, sous forme de prime.",
  },
  {
    q: "Les CEE sont-ils cumulables avec MaPrimeRénov' ?",
    a: "Oui, la prime CEE est cumulable avec MaPrimeRénov' et d'autres aides, dans la limite d'un plafond global.",
  },
  {
    q: "Qui peut bénéficier de la prime CEE ?",
    a: "Tous les ménages, propriétaires ou locataires, pour un logement de plus de 2 ans. Le montant est bonifié pour les ménages modestes.",
  },
  {
    q: "Quand la prime est-elle déduite ?",
    a: "Chez Label Énergie, la prime est déduite directement de votre devis : vous n'avancez pas son montant.",
  },
  {
    q: "Le montant de la prime CEE est-il fixe ?",
    a: "Non, il dépend du type de travaux, de votre zone climatique, de vos revenus et du volume d'énergie économisé (kWh cumac).",
  },
  {
    q: "Quels documents sont nécessaires ?",
    a: "Votre devis signé, votre dernier avis d'imposition et l'attestation sur l'honneur fournie avec votre dossier.",
  },
];

const trustItems: { icon: ReactNode; lines: ReactNode }[] = [
  { icon: shield, lines: <>Entreprise RGE<br />certifiée</> },
  {
    icon: (
      <>
        <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
    lines: (
      <>
        <strong>+12 000</strong>
        <br />
        installations réalisées
      </>
    ),
  },
  {
    icon: <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z" />,
    lines: (
      <>
        <strong>4,6/5</strong>
        <br />
        sur +800 avis Google
      </>
    ),
  },
  {
    icon: houseCheck,
    lines: (
      <>
        <strong>13 ans</strong>
        <br />
        d&apos;expérience
      </>
    ),
  },
  {
    icon: (
      <>
        <path d="M3 13l4-4 4 3 5-5 5 4" />
        <path d="M3 13l6 6 4-3 3 2 5-6" />
      </>
    ),
    lines: <>Accompagnement<br />de A à Z</>,
  },
];

export default function CeePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Aides & financement", path: "/aides-financement" },
          { name: "Certificats d'Économies d'Énergie (CEE)", path: "/aides-financement/cee" },
        ]}
      />

      {/* Hero */}
      <section className="pt-2">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">CERTIFICATS D&apos;ÉCONOMIES D&apos;ÉNERGIE (CEE)</p>
            <h1 className="qsn-hero-title">
              Les CEE,
              <br />
              <span style={{ fontSize: 32 }}>une aide concrète pour</span>
              <br />
              <span className="text-teal" style={{ fontSize: 32 }}>
                réduire le coût de vos travaux.
              </span>
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-ink" style={{ maxWidth: 470 }}>
              Les Certificats d&apos;Économies d&apos;Énergie (CEE) sont une aide financée par les
              fournisseurs d&apos;énergie pour encourager les économies d&apos;énergie. Nous
              déduisons cette prime directement de votre devis.
            </p>

            <div className="mpr-badges" style={{ marginTop: 26 }}>
              {heroBadges.map((b, i) => (
                <div className="mpr-badge" key={i}>
                  <span className="mpr-badge-icon" style={{ color: "#0e8a5f" }}>
                    <Ico size={20} sw={1.4}>{b.icon}</Ico>
                  </span>
                  <span>{b.lines}</span>
                </div>
              ))}
            </div>

            <div className="mpr-hero-actions" style={{ marginTop: 30 }}>
              <Link href="/aides-financement/calculer-mes-aides" className="btn btn-primary">
                CALCULER MON AIDE CEE <Arrow color="#fff" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                ÊTRE RAPPELÉ GRATUITEMENT <Phone />
              </Link>
            </div>
          </div>

          <div className="cee-hero-media">
            <Image
              src="/images/cee1.jpg"
              alt="Maison avec pompe à chaleur et panneaux solaires, aide CEE"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Avantages */}
      <div className="container mt-6">
        <div className="mpr-stats cee-benefits">
          {benefits.map((b) => (
            <div className="mpr-stat" key={b.title}>
              <span className="cee-benefit-icon">
                <Ico size={28} sw={1.2}>{b.icon}</Ico>
              </span>
              <div>
                <strong>{b.title}</strong>
                <span>{b.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment fonctionnent les CEE */}
      <Reveal as="section" className="section">
        <div className="container">
          <h2 className="cee-kicker">COMMENT FONCTIONNENT LES CEE ?</h2>
          <div className="fin-how" style={{ marginTop: 22 }}>
            {howSteps.map((h, i) => (
              <div className="fin-how-step" key={h.title}>
                {i < howSteps.length - 1 && (
                  <>
                    <span className="fin-how-line" aria-hidden />
                    <svg className="fin-how-arrow" width="6" height="8" viewBox="0 0 6 8" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
                      <path d="M1 1l4 3-4 3" />
                    </svg>
                  </>
                )}
                <span className="fin-how-circle" style={{ color: h.green ? "#0e8a5f" : "var(--navy)" }}>
                  <Ico size={32} sw={1.2}>{h.icon}</Ico>
                </span>
                <p className="mpr-how-title" style={{ marginTop: 14 }}>
                  <span>{i + 1}</span>
                  {h.title}
                </p>
                <p className="fin-how-text">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Travaux éligibles */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="cee-works">
            <div className="cee-works-grid">
              <div className="cee-works-intro">
                <h2 className="cee-kicker" style={{ textAlign: "left", color: "var(--navy)", lineHeight: 1.5 }}>
                  DES TRAVAUX ÉLIGIBLES,
                  <br />
                  DES AIDES CONCRÈTES
                </h2>
                <p>Le montant de la prime CEE dépend du type de travaux et de vos revenus.</p>
                <Link href="/solutions" className="cee-works-link">
                  VOIR TOUS LES ÉQUIPEMENTS ÉLIGIBLES <Arrow w={12} />
                </Link>
              </div>
              {works.map((w) => (
                <div className="cee-work" key={w.title}>
                  <div className="cee-work-media">
                    <Image src={w.image} alt={w.alt} fill sizes="(max-width: 900px) 45vw, 12vw" style={{ objectFit: "cover" }} />
                  </div>
                  <p className="cee-work-upto">Jusqu&apos;à</p>
                  <p className="cee-work-amount">{w.amount}</p>
                  <p className="cee-work-title">{w.title}</p>
                  <p className="cee-work-text">{w.text}</p>
                </div>
              ))}
            </div>
            <p className="cee-works-note">
              * Montants indicatifs donnés à titre d&apos;exemple et susceptibles d&apos;évoluer
              selon votre situation et les kWh cumac.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Accompagnement */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="cee-support">
            <div>
              <p className="cee-support-title">
                On vous accompagne
                <br />
                de A à Z
              </p>
              <p className="cee-support-text">
                Nos experts vous accompagnent gratuitement dans toutes les démarches pour obtenir
                votre prime CEE.
              </p>
            </div>
            <ul className="cee-support-list">
              {supportPoints.map((p) => (
                <li key={p}>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                    <circle cx="12" cy="12" r="10" fill="#2fb872" />
                    <path d="M7.5 12l3 3 6-6" fill="none" stroke="#fff" strokeWidth="2.2" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
            <div className="cee-support-rating">
              <div>
                <p>
                  <strong>4,6/5</strong>
                  <span aria-hidden>★★★★★</span>
                </p>
                <small>+800 avis Google</small>
              </div>
              <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden>
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
              </svg>
            </div>
          </div>
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <h2 className="cee-kicker" style={{ textAlign: "left" }}>QUESTIONS FRÉQUENTES</h2>
          <div style={{ marginTop: 14 }}>
            <FaqAccordion items={faq} />
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="pt-cta-banner fin-cta">
            <svg width="62" height="62" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="0.8" aria-hidden>
              <path d="M3 11 12 3l9 8" />
              <path d="M5 9.5V21h14V9.5" />
              <path d="M16 11c-4.5 0-7 2.5-7 5.5A2.5 2.5 0 0 0 11.5 19c3 0 4.5-3.5 4.5-8z" />
              <path d="M9.5 19c1.5-3 3.5-5 6-6.5" />
              <path d="M5 5l1-1M3 7l1-.5" />
            </svg>
            <div>
              <p className="pt-cta-title">
                Profitez des CEE pour réduire
                <br />
                le coût de vos travaux dès aujourd&apos;hui.
              </p>
              <p className="pt-cta-text">Simulez votre aide gratuite en 2 minutes.</p>
            </div>
            <div className="pt-cta-actions">
              <Link href="/aides-financement/calculer-mes-aides" className="btn" style={{ background: "#fff", color: "#0b5c42" }}>
                CALCULER MON AIDE CEE <Arrow color="#0b5c42" />
              </Link>
              <Link href="/contact" className="btn" style={{ border: "1px solid #cfe9da", color: "#fff" }}>
                ÊTRE RAPPELÉ GRATUITEMENT <Phone size={12} />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Réassurance */}
      <div className="container pb-10">
        <div className="mpr-trust">
          {trustItems.map((t, i) => (
            <div key={i}>
              <Ico size={44}>{t.icon}</Ico>
              <div>{t.lines}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
