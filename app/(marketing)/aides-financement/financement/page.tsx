import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Headphones } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/animation/Reveal";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";

export const metadata: Metadata = buildMetadata({
  title: "Financement de vos travaux : éco-prêt et paiement facilité",
  description:
    "Éco-prêt à taux 0, financement en plusieurs fois : découvrez les solutions pour financer votre projet énergétique sans avancer les fonds.",
  path: "/aides-financement/financement",
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

function Arrow({ color }: { color?: string }) {
  return (
    <svg width="15" height="9" viewBox="0 0 16 10" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.4" aria-hidden>
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

const starPath = "M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.8 5.5 21l2-7.5L2 9h7z";
const calendarCheck = (
  <>
    <rect x="3" y="5" width="18" height="15" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4" />
    <path d="M9 14l2 2 4-4" />
  </>
);
const shield = (
  <>
    <path d="M12 2.5 20 5v7c0 5-3.4 8.3-8 9.5C7.4 20.3 4 17 4 12V5z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </>
);
const person = (
  <>
    <circle cx="12" cy="9" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    <path d="M7 9a5 5 0 0 1 10 0" />
  </>
);
const houseCheck = (
  <>
    <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
    <path d="M8.5 13l2.5 2.5 4.5-5" />
  </>
);
const chat = (
  <>
    <path d="M4 20l1.5-4.5A8 8 0 1 1 9 19z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </>
);

const heroBadges: { icon: ReactNode; label: string }[] = [
  { icon: shield, label: "Solutions 100% sécurisées" },
  {
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 12l3 3 5-6" />
      </>
    ),
    label: "Réponse de principe immédiate",
  },
  { icon: calendarCheck, label: "Mensualités adaptées à votre budget" },
  { icon: person, label: "Accompagnement personnalisé" },
];

const stats: { icon: ReactNode; title: string; sub: ReactNode }[] = [
  { icon: calendarCheck, title: "Jusqu'à 120 mois", sub: "pour financer vos travaux" },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="5" />
        <path d="M10 14l4-4M10 10h.01M14 14h.01M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
      </>
    ),
    title: "Des taux compétitifs",
    sub: "négociés pour vous",
  },
  {
    icon: (
      <>
        <path d="M4 4h16v10l-8 6-8-6z" />
        <path d="M8 10l3 3 5-5" />
      </>
    ),
    title: "Aucune avance",
    sub: (
      <>
        de frais<sup>(1)</sup> possible
      </>
    ),
  },
  {
    icon: (
      <>
        <path d="M5 3h14v14l-7 4-7-4z" />
        <path d="M9 11l2 2 4-4" />
      </>
    ),
    title: "Partenaire de confiance",
    sub: "labels et agréés",
  },
];

const solutions: {
  title: string;
  text: string;
  points: string[];
  bg: string;
  accent: string;
  icon: ReactNode;
}[] = [
  {
    title: "Prêt travaux à taux fixe",
    text: "Une solution simple et avantageuse pour financer vos travaux en toute tranquillité.",
    points: ["De 12 à 120 mois", "Taux fixe et connu à l'avance", "Remboursements mensuels constants"],
    bg: "#eef5f1",
    accent: "#0e8a5f",
    icon: chat,
  },
  {
    title: "Paiement en plusieurs fois",
    text: "Réglez vos travaux en 3 ou 4 fois sans frais.",
    points: ["3x ou 4x sans frais", "Par carte bancaire", "Réponse immédiate"],
    bg: "#eef3f8",
    accent: "#1e6fd0",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 13c1-2 2-2 3 0s2 2 3 0" />
      </>
    ),
  },
  {
    title: "Éco-prêt à taux zéro (Éco-PTZ)",
    text: "Un prêt sans intérêt pour financer vos travaux d'économies d'énergie.",
    points: ["Jusqu'à 50 000 €", "Sans condition de ressources", "Cumulable avec d'autres aides"],
    bg: "#f3f1f8",
    accent: "#7a4fc9",
    icon: (
      <>
        <path d="M3 12l5 5 5-3 8-8" />
        <path d="M3 20h18" />
      </>
    ),
  },
  {
    title: "Financement sur-mesure pour professionnels",
    text: "Des solutions dédiées aux professionnels et investisseurs.",
    points: ["Étude personnalisée", "Solutions adaptées", "Accompagnement dédié"],
    bg: "#fbf6ef",
    accent: "#d98a1c",
    icon: (
      <>
        <path d="M3 10 12 4l9 6" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-5h6v5M9 12h6" />
      </>
    ),
  },
];

const howSteps: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Simulez votre projet",
    text: "Indiquez le montant de vos travaux et la durée souhaitée.",
    icon: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <rect x="8" y="5" width="8" height="4" rx="0.5" />
        <path d="M8 12h2v2H8zM11 12h2v2h-2zM14 12h2v2h-2zM8 16h2v2H8zM11 16h2v2h-2zM14 16h2v2h-2z" />
      </>
    ),
  },
  {
    title: "Recevez une réponse",
    text: "Obtenez une réponse de principe immédiate et sans engagement.",
    icon: chat,
  },
  {
    title: "Constituez votre dossier",
    text: "Nos conseillers vous accompagnent dans les démarches.",
    icon: (
      <>
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M3 11h18" />
      </>
    ),
  },
  {
    title: "Signez en ligne",
    text: "Signature électronique sécurisée et rapide.",
    icon: (
      <>
        <path d="M15 4l5 5-9 9H6v-5z" />
        <path d="M3 21c2-2 4-2 5 0s3 2 5 0 3-1 4 0" />
      </>
    ),
  },
  {
    title: "Recevez les fonds",
    text: "Les fonds sont versés directement à l'entreprise après signature.",
    icon: (
      <>
        <path d="M3 10 12 4l9 6" />
        <path d="M5 10v10h14V10" />
        <circle cx="12" cy="15" r="3" />
        <path d="M13.5 13.8a1.8 1.8 0 1 0 0 2.4M10.5 14.6h2.5M10.5 15.4h2.5" />
      </>
    ),
  },
];

const partners = [
  { name: "Sofinco", logo: "/images/sofinco-logo-trim.png", width: 571, height: 127 },
  { name: "DOMOfinance", logo: "/images/domofinance-logo-trim.png", width: 787, height: 158 },
  { name: "Younited Crédit", logo: "/images/logo-younited-trim.webp", width: 1145, height: 325 },
  { name: "Cofidis", logo: "/images/logo-cofidis-fr.png", width: 609, height: 400, h: 64 },
];

const faq = [
  {
    q: "Puis-je cumuler un financement avec les aides de l'État ?",
    a: "Oui. Le financement porte sur le reste à charge, après déduction de MaPrimeRénov', des CEE et des aides locales.",
  },
  {
    q: "Y a-t-il des frais de dossier ?",
    a: "Selon l'organisme et la solution choisie. Votre conseiller vous indique le coût total du crédit avant toute signature.",
  },
  {
    q: "Quels documents sont nécessaires ?",
    a: "Généralement une pièce d'identité, un justificatif de domicile, un RIB et vos derniers justificatifs de revenus.",
  },
  {
    q: "Sous combien de temps les fonds sont-ils versés ?",
    a: "Après acceptation définitive et signature, les fonds sont versés directement à l'entreprise, en général sous quelques jours.",
  },
];

const trustItems: { icon: ReactNode; lines: ReactNode }[] = [
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
        installations
        <br />
        réalisées
      </>
    ),
  },
  {
    icon: <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z" />,
    lines: (
      <>
        <strong>4,6/5</strong>
        <br />
        sur +800 avis
        <br />
        Google
      </>
    ),
  },
  {
    icon: <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />,
    lines: (
      <>
        <strong>RGE</strong>
        <br />
        Entreprise
        <br />
        certifiée
      </>
    ),
  },
  {
    icon: houseCheck,
    lines: (
      <>
        <strong>Plus de 13 ans</strong>
        <br />
        d&apos;expérience à
        <br />
        vos côtés
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

export default function FinancementPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Aides & financement", path: "/aides-financement" },
          { name: "Financement", path: "/aides-financement/financement" },
        ]}
      />

      {/* Hero */}
      <section className="pt-2">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">FINANCEMENT</p>
            <h1 className="qsn-hero-title">
              Financez vos projets
              <br />
              en toute <span className="text-teal">sérénité.</span>
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-muted" style={{ maxWidth: 420 }}>
              Des solutions de financement adaptées à votre budget pour réaliser vos travaux de
              rénovation énergétique sans attendre.
            </p>

            <div className="ca-badges" style={{ marginTop: 28 }}>
              {heroBadges.map((b) => (
                <div className="ca-badge" key={b.label}>
                  <Ico size={26}>{b.icon}</Ico>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            <div className="mpr-hero-actions" style={{ marginTop: 34 }}>
              <Link href="/simuler-mon-projet" className="btn btn-primary">
                SIMULER MON FINANCEMENT <Arrow color="#fff" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                ÊTRE RAPPELÉ GRATUITEMENT <Phone />
              </Link>
            </div>

            <div className="fin-trustpilot">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="#00b67a" aria-hidden>
                <path d={starPath} />
              </svg>
              <span className="fin-trustpilot-name">Trustpilot</span>
              <span className="ca-stars" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className={i === 4 ? "is-partial" : undefined}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff">
                      <path d={starPath} />
                    </svg>
                  </span>
                ))}
              </span>
              <span className="fin-trustpilot-score">
                <strong>4,6/5</strong> sur +800 avis
              </span>
            </div>
          </div>

          <div className="fin-hero-media">
            <Image
              src="/images/finance.jpg"
              alt="Maison avec pompe à chaleur et exemple de financement à partir de 78 € par mois"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <div className="container mt-8">
        <div className="mpr-stats fin-stats">
          {stats.map((s) => (
            <div className="mpr-stat" key={s.title}>
              <Ico size={30} sw={1.2}>{s.icon}</Ico>
              <div>
                <strong>{s.title}</strong>
                <span>{s.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions */}
      <Reveal as="section" className="section">
        <div className="container">
          <h2 className="mpr-heading">Nos solutions de financement</h2>
          <div className="fin-solutions">
            {solutions.map((s) => (
              <div className="fin-sol" key={s.title} style={{ background: s.bg }}>
                <div className="fin-sol-head">
                  <span className="fin-sol-icon" style={{ color: s.accent }}>
                    <Ico size={20} sw={1.4}>{s.icon}</Ico>
                  </span>
                  <p>{s.title}</p>
                </div>
                <p className="fin-sol-text">{s.text}</p>
                <ul className="fin-sol-points">
                  {s.points.map((p) => (
                    <li key={p}>
                      <svg width="11" height="9" viewBox="0 0 12 10" fill="none" stroke={s.accent} strokeWidth="1.8" aria-hidden>
                        <path d="M1 5l3.5 3.5L11 1" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="fin-sol-link">
                  En savoir plus <Arrow />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Comment ça fonctionne */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <h2 className="mpr-heading">Comment ça fonctionne ?</h2>
          <div className="fin-how">
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
                <span className="fin-how-circle">
                  <Ico size={30} sw={1.1}>{h.icon}</Ico>
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

      {/* Partenaires */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="fin-partners">
            <div className="fin-partners-intro">
              <p className="fin-partners-title">Nos partenaires de financement de confiance</p>
              <p>
                Nous travaillons avec des organismes reconnus pour vous garantir sécurité et
                sérénité.
              </p>
            </div>
            {partners.map((p) => (
              <div className="fin-partner" key={p.name}>
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={p.width}
                  height={p.height}
                  style={{ objectFit: "contain", width: "auto", height: "h" in p ? p.h : 40 }}
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* FAQ + conseiller */}
      <Reveal as="section" className="section pt-0">
        <div className="container fin-faq-row">
          <div>
            <h2 className="mpr-heading">Questions fréquentes</h2>
            <div style={{ marginTop: 16 }}>
              <FaqAccordion items={faq} single />
            </div>
          </div>
          <div className="fin-advisor">
            <div>
              <p className="fin-advisor-title">Un conseiller dédié à votre projet</p>
              <p className="fin-advisor-text">
                Nos experts vous accompagnent gratuitement pour trouver la solution de
                financement la plus adaptée à votre projet.
              </p>
              <a href={`tel:${siteConfig.phone}`} className="fin-advisor-phone">
                {siteConfig.phoneDisplay}
              </a>
              <p className="fin-advisor-hours">Lun - Ven : 9h00 - 18h00</p>
              <Link href="/contact" className="fin-advisor-cta">
                ÊTRE RAPPELÉ GRATUITEMENT <Phone size={12} />
              </Link>
            </div>
            <span className="fin-advisor-photo" aria-hidden>
              <Headphones size={56} strokeWidth={1.2} />
            </span>
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="pt-cta-banner fin-cta">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="0.9" aria-hidden>
              <path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
              <path d="M16 5l-10 2" />
              <rect x="15" y="11.5" width="5" height="4" rx="1" />
              <path d="M11 11a2.5 2.5 0 1 0 0 3.5M7 12.2h3M7 13.4h3" />
            </svg>
            <div>
              <p className="pt-cta-title">Donnez vie à votre projet dès aujourd&apos;hui.</p>
              <p className="pt-cta-text">
                Simulez votre financement en 2 minutes et sans engagement.
              </p>
            </div>
            <div className="pt-cta-actions">
              <Link href="/simuler-mon-projet" className="btn" style={{ background: "#fff", color: "#0b5c42" }}>
                SIMULER MON FINANCEMENT <Arrow color="#0b5c42" />
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
              <Ico size={34}>{t.icon}</Ico>
              <div>{t.lines}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
