import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/animation/Reveal";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { MprBareme } from "@/components/marketing/MprBareme";

export const metadata: Metadata = buildMetadata({
  title: "MaPrimeRénov' : conditions, montants et démarches",
  description:
    "Tout savoir sur MaPrimeRénov' : montants, conditions d'éligibilité et démarches pour financer votre pompe à chaleur, vos panneaux solaires ou vos travaux de rénovation.",
  path: "/aides-financement/maprimerenov",
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

const shield = (
  <>
    <path d="M12 2.5 20 5v7c0 5-3.4 8.3-8 9.5C7.4 20.3 4 17 4 12V5z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </>
);
const houseCheck = (
  <>
    <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
    <path d="M8.5 13l2.5 2.5 4.5-5" />
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
const followUp = (
  <>
    <path d="M3 13l4-4 4 3 5-5 5 4" />
    <path d="M3 13l6 6 4-3 3 2 5-6" />
  </>
);

const heroBadges: { icon: ReactNode; lines: ReactNode }[] = [
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5a4 4 0 1 0 0 7M7.5 11h6M7.5 13.5h6" />
      </>
    ),
    lines: <>Jusqu&apos;à<br />90 % d&apos;aides</>,
  },
  {
    icon: (
      <>
        <path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
        <path d="M10 21v-5h4v5" />
      </>
    ),
    lines: <>Pour tous les<br />logements</>,
  },
  { icon: shield, lines: <>Un dispositif<br />de l&apos;État</> },
  { icon: person, lines: <>Accompagnement<br />de A à Z</> },
];

const stats: { icon: ReactNode; value?: string; text: ReactNode }[] = [
  { icon: piggy, value: "2,7 milliards €", text: "de budget pour 2024" },
  {
    icon: (
      <>
        <circle cx="7" cy="7" r="3.5" />
        <circle cx="17" cy="7" r="3.5" />
        <circle cx="7" cy="17" r="3.5" />
        <circle cx="17" cy="17" r="3.5" />
      </>
    ),
    value: "+ 650 000",
    text: "logements rénovés avec MaPrimeRénov' depuis son lancement",
  },
  {
    icon: (
      <>
        <path d="M3 21h18" />
        <rect x="4" y="15" width="3" height="5" />
        <rect x="9" y="12" width="3" height="8" />
        <rect x="14" y="9" width="3" height="11" />
        <path d="M4 11l6-5 4 3 6-5M17 4h3v3" />
      </>
    ),
    value: "Jusqu'à 90 %",
    text: "du montant des travaux selon vos revenus",
  },
  {
    icon: (
      <>
        <path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
        <path d="M15.5 11c-3.5 0-5.5 2-5.5 4.5A2 2 0 0 0 12 17.5c2.5 0 3.5-3 3.5-6.5z" />
      </>
    ),
    text: "Des travaux pour un logement plus confortable, plus économe et plus respectueux de l'environnement",
  },
];

const howSteps: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Vérifiez votre éligibilité",
    text: "Répondez à quelques questions pour savoir si vous pouvez bénéficier de MaPrimeRénov'.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="1.2" />
        <path d="M8 20h8M12 16v4" />
        <path d="M9 10l2 2 4-4" stroke="#0e8a5f" />
      </>
    ),
  },
  {
    title: "Créez votre dossier en ligne",
    text: "Déposez votre demande sur le site officiel et recevez votre accord de principe.",
    icon: (
      <>
        <rect x="5" y="3" width="13" height="18" rx="1.5" />
        <path d="M8 7h7M8 10h7M8 13h4" />
        <circle cx="17" cy="17" r="3" stroke="#0e8a5f" fill="#fff" />
        <path d="M15.8 17l.8.8 1.6-1.6" stroke="#0e8a5f" />
      </>
    ),
  },
  {
    title: "Réalisez vos travaux",
    text: "Faites réaliser vos travaux par un professionnel RGE (Reconnu Garant de l'Environnement).",
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
    title: "Transmettez vos justificatifs",
    text: "Envoyez vos factures et attestations directement depuis votre espace.",
    icon: (
      <>
        <rect x="5" y="3" width="13" height="18" rx="1.5" />
        <path d="M8 7h3v3H8zM13 8h2M8 13h7M8 16h4" />
        <circle cx="17" cy="17" r="3" stroke="#0e8a5f" fill="#fff" />
        <path d="M15.8 17l.8.8 1.6-1.6" stroke="#0e8a5f" />
      </>
    ),
  },
  {
    title: "Recevez votre aide",
    text: "L'aide vous est versée sous quelques jours sur votre compte bancaire.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M15 9a3.5 3.5 0 1 0 0 6M8 11h5M8 13h5" />
        <path d="M19 4l1.5-1.5" stroke="#0e8a5f" />
      </>
    ),
  },
];

const tiers = [
  { label: "Ménages très modestes", pct: "90 %" },
  { label: "Ménages modestes", pct: "75 %" },
  { label: "Ménages intermédiaires", pct: "60 %" },
  { label: "Ménages supérieurs", pct: "40 %" },
];

const eligibleWorks: { icon: ReactNode; label: string }[] = [
  {
    label: "Chauffage",
    icon: (
      <>
        <rect x="6" y="4" width="12" height="16" rx="3" />
        <path d="M10 4v16M14 4v16" />
      </>
    ),
  },
  {
    label: "Isolation",
    icon: (
      <>
        <path d="M3 10 12 4l9 6" />
        <path d="M5 9v11h14V9" />
        <path d="M8 12h8M8 15h8M8 18h8M10 12v3M14 15v3" />
      </>
    ),
  },
  {
    label: "Ventilation",
    icon: (
      <>
        <circle cx="12" cy="12" r="2" />
        <path d="M12 10c0-4 2-6 4-6s2 4-2 6M14 12c4 0 6 2 6 4s-4 2-6-2M12 14c0 4-2 6-4 6s-2-4 2-6M10 12c-4 0-6-2-6-4s4-2 6 2" />
      </>
    ),
  },
  {
    label: "Eau chaude sanitaire",
    icon: (
      <>
        <path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
        <path d="M12 11c-2 2.5-2.5 3.5-2.5 4.5a2.5 2.5 0 0 0 5 0c0-1-.5-2-2.5-4.5z" />
      </>
    ),
  },
  {
    label: "Audit énergétique",
    icon: (
      <>
        <path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
        <circle cx="11" cy="14" r="3" />
        <path d="M13.2 16.2l3 3" />
      </>
    ),
  },
];

const helpPoints = [
  "Vérification de votre éligibilité",
  "Constitution et dépôt de votre dossier",
  "Suivi jusqu'au versement de l'aide",
];

const faq = [
  {
    q: "Qui peut bénéficier de MaPrimeRénov' ?",
    a: "Tous les propriétaires, occupants ou bailleurs, d'un logement construit depuis plus de 15 ans, sous conditions de ressources pour le montant de l'aide.",
  },
  {
    q: "Quels sont les délais de versement ?",
    a: "Une fois vos justificatifs transmis et validés, l'aide est généralement versée sous quelques semaines sur votre compte bancaire.",
  },
  {
    q: "Mon logement est-il éligible ?",
    a: "Votre logement doit être votre résidence principale (ou celle de votre locataire) et avoir été construit depuis au moins 15 ans.",
  },
  {
    q: "MaPrimeRénov' est-elle cumulable avec d'autres aides ?",
    a: "Oui, elle est cumulable avec les CEE, l'éco-PTZ et certaines aides locales, dans la limite d'un plafond global.",
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
        <strong>+ 12 000</strong>
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
        <strong>+ 13 ans</strong>
        <br />
        d&apos;expérience
      </>
    ),
  },
  { icon: followUp, lines: <>Accompagnement<br />de A à Z</> },
];

export default function MaPrimeRenovPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Aides & financement", path: "/aides-financement" },
          { name: "MaPrimeRénov'", path: "/aides-financement/maprimerenov" },
        ]}
      />

      {/* Hero */}
      <section className="pt-2">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">MAPRIMERÉNOV&apos;</p>
            <h1 className="qsn-hero-title">
              MaPrimeRénov&apos;,
              <br />
              <span className="text-teal">
                l&apos;aide pour vos travaux
                <br />
                de rénovation énergétique.
              </span>
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-muted" style={{ maxWidth: 450 }}>
              MaPrimeRénov&apos; est une aide financière de l&apos;État qui vous accompagne dans vos
              travaux de rénovation énergétique. Isolation, chauffage, ventilation, eau chaude
              sanitaire : réduisez vos dépenses et améliorez votre confort.
            </p>

            <div className="mpr-badges">
              {heroBadges.map((b, i) => (
                <div className="mpr-badge" key={i}>
                  <span className="mpr-badge-icon">
                    <Ico size={22}>{b.icon}</Ico>
                  </span>
                  <span>{b.lines}</span>
                </div>
              ))}
            </div>

            <div className="mpr-hero-actions">
              <Link href="/aides-financement/calculer-mes-aides" className="btn btn-primary">
                VÉRIFIER MON ÉLIGIBILITÉ <Arrow color="#fff" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                ÊTRE RAPPELÉ GRATUITEMENT <Phone />
              </Link>
            </div>
          </div>

          <div className="mpr-hero-media">
            <Image
              src="/images/maprime.jpg"
              alt="Maison rénovée avec panneaux solaires et pompe à chaleur, aide MaPrimeRénov'"
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
        <div className="mpr-stats">
          {stats.map((s, i) => (
            <div className="mpr-stat" key={i}>
              <Ico size={36} sw={1.2}>{s.icon}</Ico>
              <div>
                {s.value && <strong>{s.value}</strong>}
                <span className={s.value ? undefined : "is-plain"}>{s.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment ça marche */}
      <Reveal as="section" className="section">
        <div className="container">
          <h2 className="mpr-heading">Comment ça marche ?</h2>
          <div className="mpr-how">
            {howSteps.map((h, i) => (
              <div className="mpr-how-step" key={h.title}>
                {i < howSteps.length - 1 && (
                  <svg className="mpr-how-arrow" width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                    <path d="M0 5h20M16 1l4 4-4 4" />
                  </svg>
                )}
                <span className="mpr-how-circle">
                  <Ico size={36} sw={1.1}>{h.icon}</Ico>
                </span>
                <p className="mpr-how-title">
                  <span>{i + 1}</span>
                  {h.title}
                </p>
                <p className="mpr-how-text">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Montants */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="mpr-tiers">
            <div className="mpr-tiers-intro">
              <h2 className="mpr-heading">
                Des aides jusqu&apos;à
                <br />
                plusieurs milliers d&apos;euros
              </h2>
              <p>
                Le montant de MaPrimeRénov&apos; dépend de vos revenus et du type de travaux
                réalisés.
              </p>
              <Link href="/aides-financement/calculer-mes-aides" className="btn btn-primary">
                ESTIMER MES AIDES <Arrow color="#fff" />
              </Link>
            </div>
            {tiers.map((t) => (
              <div className="mpr-tier" key={t.label}>
                <p className="mpr-tier-label">{t.label}</p>
                <p className="mpr-tier-upto">Jusqu&apos;à</p>
                <p className="mpr-tier-pct">{t.pct}</p>
                <p className="mpr-tier-note">du montant des travaux</p>
              </div>
            ))}
            <div className="mpr-tiers-more">
              <a href="#bareme">
                Voir les plafonds et montants détaillés <Arrow color="#0e8a5f" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Barème PAC air/eau */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <MprBareme />
        </div>
      </Reveal>

      {/* Travaux éligibles + aide dossier */}
      <Reveal as="section" className="section pt-0">
        <div className="container mpr-duo">
          <div className="mpr-works-card">
            <h3 className="mpr-card-title">Quels travaux sont éligibles ?</h3>
            <div className="mpr-works">
              {eligibleWorks.map((w) => (
                <div key={w.label}>
                  <Ico size={28} sw={1.2}>{w.icon}</Ico>
                  <span>{w.label}</span>
                </div>
              ))}
            </div>
            <Link href="/solutions" className="mpr-works-link">
              VOIR TOUS LES TRAVAUX ÉLIGIBLES <Arrow />
            </Link>
          </div>

          <div className="mpr-help-card">
            <div>
              <h3 className="mpr-card-title">Besoin d&apos;aide pour votre dossier ?</h3>
              <p className="mpr-help-text">
                Nos experts vous accompagnent gratuitement dans toutes les étapes de votre demande.
              </p>
              <ul className="mpr-help-list">
                {helpPoints.map((p) => (
                  <li key={p}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" strokeWidth="2" aria-hidden>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M8 12l3 3 5-6" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mpr-help-actions">
              <Link href="/contact" className="mpr-help-cta">
                ÊTRE RAPPELÉ GRATUITEMENT <Phone size={12} />
              </Link>
              <Link href="/contact" className="mpr-help-link">
                Nous contacter <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <h2 className="mpr-faq-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0e8a5f" strokeWidth="2" aria-hidden>
              <path d="M12 3v18M3 12h18" />
            </svg>
            Questions fréquentes
          </h2>
          <FaqAccordion items={faq} />
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="pt-cta-banner ca-cta">
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="0.8" aria-hidden>
              <path d="M3 11 12 3l9 8" />
              <path d="M5 9.5V21h14V9.5" />
              <path d="M16 11c-4.5 0-7 2.5-7 5.5A2.5 2.5 0 0 0 11.5 19c3 0 4.5-3.5 4.5-8z" />
              <path d="M9.5 19c1.5-3 3.5-5 6-6.5" />
            </svg>
            <div>
              <p className="pt-cta-title">
                MaPrimeRénov&apos; : l&apos;aide de l&apos;État pour
                <br />
                des travaux qui changent votre quotidien.
              </p>
              <p className="pt-cta-text">
                Vérifiez votre éligibilité en 2 minutes et découvrez vos aides.
              </p>
            </div>
            <div className="pt-cta-actions">
              <Link href="/aides-financement/calculer-mes-aides" className="btn" style={{ background: "#fff", color: "#0b5c42" }}>
                VÉRIFIER MON ÉLIGIBILITÉ <Arrow color="#0b5c42" />
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
