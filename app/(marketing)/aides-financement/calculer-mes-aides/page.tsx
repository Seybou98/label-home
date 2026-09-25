import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/animation/Reveal";
import { AidesSimulator } from "@/components/marketing/AidesSimulator";

export const metadata: Metadata = buildMetadata({
  title: "Calculer mes aides à la rénovation énergétique",
  description:
    "Estimez en 2 minutes le montant des aides auxquelles vous avez droit pour votre projet de pompe à chaleur, panneaux solaires ou rénovation énergétique.",
  path: "/aides-financement/calculer-mes-aides",
});

function Ico({ size, children }: { size: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      {children}
    </svg>
  );
}

const shield = (
  <>
    <path d="M12 2.5 20 5v7c0 5-3.4 8.3-8 9.5C7.4 20.3 4 17 4 12V5z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </>
);
const clock = (
  <>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2M10 2h4" />
  </>
);
const lock = (
  <>
    <rect x="5" y="10" width="14" height="11" rx="1.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <path d="M12 14v3" />
  </>
);
const circleCheck = (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12l3 3 5-6" />
  </>
);
const house = (
  <>
    <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
    <path d="M10 20v-5h4v5" />
  </>
);
const houseCheck = (
  <>
    <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
    <path d="M8.5 13l2.5 2.5 4.5-5" />
  </>
);
const followUp = (
  <>
    <path d="M3 13l4-4 4 3 5-5 5 4" />
    <path d="M3 13l6 6 4-3 3 2 5-6" />
  </>
);
const person = (
  <>
    <circle cx="12" cy="9" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    <path d="M7 9a5 5 0 0 1 10 0" />
  </>
);
const paperwork = (
  <>
    <rect x="5" y="3" width="13" height="18" rx="1.5" />
    <path d="M8 8h7M8 12h7M8 16h3" />
    <circle cx="17" cy="17" r="3.5" fill="#fff" />
    <path d="M15.5 17l1 1 2-2" />
  </>
);
const piggy = (
  <>
    <path d="M5 11a7 6 0 0 1 13-2h2v4h-2l-1 3v3h-3v-2h-4v2H7v-3a6 6 0 0 1-2-5z" />
    <path d="M10 6.5a2 2 0 1 1 3-1.5" />
  </>
);

const heroBadges: { icon: ReactNode; label: string }[] = [
  { icon: shield, label: "Résultat personnalisé" },
  { icon: clock, label: "Simulation rapide (2 min)" },
  { icon: lock, label: "100% gratuit et sans engagement" },
  { icon: circleCheck, label: "Données sécurisées et confidentielles" },
];

const reviewItems: { icon: ReactNode; lines: ReactNode }[] = [
  { icon: shield, lines: <>Entreprise RGE<br />certifiée</> },
  {
    icon: house,
    lines: (
      <>
        <strong>+12 000</strong>
        <br />
        installations réalisées
      </>
    ),
  },
  {
    icon: houseCheck,
    lines: (
      <>
        <strong>Plus de 13 ans</strong>
        <br />
        d&apos;expérience
      </>
    ),
  },
  { icon: followUp, lines: <>Accompagnement<br />de A à Z</> },
];

const benefits: { icon: ReactNode; title: string; text: string }[] = [
  { icon: shield, title: "Fiable et à jour", text: "Nos calculs sont basés sur les dernières réglementations." },
  { icon: person, title: "Accompagnement", text: "Nos experts vous accompagnent à chaque étape de votre projet." },
  { icon: paperwork, title: "Démarches simplifiées", text: "Nous nous occupons de toutes les démarches pour vous." },
  { icon: piggy, title: "Économies garanties", text: "Réduisez significativement le coût de vos travaux." },
];

const breakdown = [
  { label: "MaPrimeRénov'", amount: "8 000 €", color: "#12a05c" },
  { label: "CEE", amount: "3 200 €", color: "#1e8ae6" },
  { label: "Aides locales", amount: "1 000 €", color: "#f5b91e" },
];

const starPath = "M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.8 5.5 21l2-7.5L2 9h7z";

export default function CalculerMesAidesPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Aides & financement", path: "/aides-financement" },
          { name: "Calculer mes aides", path: "/aides-financement/calculer-mes-aides" },
        ]}
      />

      {/* Hero */}
      <section className="pt-2">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">CALCULER MES AIDES</p>
            <h1 className="qsn-hero-title">
              Estimez vos aides
              <br />
              en 2 minutes et{" "}
              <span className="text-teal">
                réduisez
                <br />
                le coût de vos travaux.
              </span>
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-muted" style={{ maxWidth: 440 }}>
              Simulez gratuitement le montant des aides auxquelles vous avez droit : MaPrimeRénov&apos;,
              CEE et autres aides locales. Un résultat fiable, clair et personnalisé.
            </p>

            <div className="ca-badges">
              {heroBadges.map((b) => (
                <div className="ca-badge" key={b.label}>
                  <Ico size={28}>{b.icon}</Ico>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ca-hero-media">
            <Image
              src="/images/aide1.jpg"
              alt="Maison avec pompe à chaleur et exemple de résultat de simulation des aides"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "right center" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Bandeau avis */}
      <div className="container mt-6">
        <div className="ca-review">
          <div className="ca-review-rating">
            <span className="ca-review-title">Excellent</span>
            <span className="ca-stars" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className={i === 4 ? "is-partial" : undefined}>
                  <svg width="13" height="12" viewBox="0 0 24 24" fill="#fff">
                    <path d={starPath} />
                  </svg>
                </span>
              ))}
            </span>
            <span className="ca-review-score">
              <strong>4,6/5</strong> sur +800 avis Google
            </span>
          </div>
          {reviewItems.map((r, i) => (
            <div className="ca-review-item" key={i}>
              <Ico size={34}>{r.icon}</Ico>
              <div>{r.lines}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulateur : étapes + formulaire */}
      <AidesSimulator />

      {/* Exemple de résultat */}
      <Reveal as="section" className="section">
        <div className="container ca-result-row">
          <div className="ca-result-card">
            <p className="ca-card-title">Exemple de résultat</p>
            <div className="ca-result-body">
              <div className="ca-donut">
                <svg width="160" height="160" viewBox="0 0 42 42" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="21" cy="21" r="16" fill="none" stroke="#12a05c" strokeWidth="5" pathLength={100} strokeDasharray="65.57 34.43" strokeDashoffset="0" />
                  <circle cx="21" cy="21" r="16" fill="none" stroke="#1e8ae6" strokeWidth="5" pathLength={100} strokeDasharray="26.23 73.77" strokeDashoffset="-65.57" />
                  <circle cx="21" cy="21" r="16" fill="none" stroke="#f5b91e" strokeWidth="5" pathLength={100} strokeDasharray="8.2 91.8" strokeDashoffset="-91.8" />
                </svg>
                <div className="ca-donut-center">
                  <strong>12 200 €</strong>
                  <span>d&apos;aides obtenues</span>
                </div>
              </div>
              <div>
                <ul className="ca-breakdown">
                  {breakdown.map((b) => (
                    <li key={b.label}>
                      <span>
                        <i style={{ background: b.color }} />
                        {b.label}
                      </span>
                      <strong>{b.amount}</strong>
                    </li>
                  ))}
                </ul>
                <div className="ca-remaining">
                  <span>Reste à charge estimé</span>
                  <strong>3 800 €</strong>
                </div>
                <p className="ca-remaining-note">sur un projet de 16 000 € TTC</p>
              </div>
            </div>
          </div>

          <div className="ca-promo-card">
            <div>
              <p className="ca-promo-title">Les aides qui réduisent votre facture</p>
              <p className="ca-promo-text">
                Profitez d&apos;un cumul d&apos;aides pour financer votre projet de rénovation
                énergétique.
              </p>
              <Link href="/aides-financement/maprimerenov" className="ca-promo-link">
                Voir le détail des aides
                <svg width="15" height="9" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                  <path d="M0 5h14" />
                  <path d="M10 1l4 4-4 4" />
                </svg>
              </Link>
            </div>
            <div className="ca-promo-media">
              <Image
                src="/images/aide2.png"
                alt="Portefeuille, document et pièce en euros"
                width={550}
                height={454}
                sizes="(max-width: 900px) 50vw, 20vw"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Avantages */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="ca-benefits">
            {benefits.map((b) => (
              <div className="ca-benefit" key={b.title}>
                <Ico size={44}>{b.icon}</Ico>
                <div>
                  <p className="ca-benefit-title">{b.title}</p>
                  <p className="ca-benefit-text">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="pt-cta-banner ca-cta">
            <svg width="54" height="68" viewBox="0 0 20 26" fill="none" stroke="#ffffff" strokeWidth="0.8" aria-hidden>
              <rect x="1" y="1" width="18" height="24" rx="2.5" />
              <rect x="4" y="4" width="12" height="5" rx="1" />
              <rect x="4" y="12" width="3" height="3" rx="0.6" />
              <rect x="8.5" y="12" width="3" height="3" rx="0.6" />
              <rect x="13" y="12" width="3" height="3" rx="0.6" />
              <rect x="4" y="17" width="3" height="3" rx="0.6" />
              <rect x="8.5" y="17" width="3" height="3" rx="0.6" />
              <rect x="13" y="17" width="3" height="3" rx="0.6" />
            </svg>
            <div>
              <p className="pt-cta-title">
                Calculez vos aides
                <br />
                en 2 minutes
              </p>
              <p className="pt-cta-text">Gratuit, rapide et sans engagement.</p>
            </div>
            <div className="pt-cta-actions">
              <Link href="/simuler-mon-projet" className="btn" style={{ background: "#fff", color: "#0b5c42" }}>
                COMMENCER MA SIMULATION
                <svg width="15" height="9" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                  <path d="M0 5h14" />
                  <path d="M10 1l4 4-4 4" />
                </svg>
              </Link>
              <Link href="/contact" className="btn" style={{ border: "1px solid #cfe9da", color: "#fff" }}>
                ÊTRE RAPPELÉ GRATUITEMENT
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Contact */}
      <section className="pb-10">
        <div className="container ca-contact">
          <span>
            <strong>Une question ?</strong> Nos conseillers sont à votre écoute
          </span>
          <i aria-hidden />
          <span className="ca-contact-phone">
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
            <span>Lun - Ven : 9h00 - 18h00</span>
          </span>
          <i aria-hidden />
          <Link href="/contact" className="ca-contact-link">
            Nous contacter
            <svg width="15" height="9" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
              <path d="M0 5h14" />
              <path d="M10 1l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
