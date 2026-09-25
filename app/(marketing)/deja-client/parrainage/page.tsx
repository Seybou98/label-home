import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/animation/Reveal";
import { ParrainageTools } from "@/components/marketing/ParrainageTools";

export const metadata: Metadata = buildMetadata({
  title: "Parrainage Label Énergie : gagnez 300 €",
  description:
    "Recommandez Label Énergie à vos proches et recevez 300 € dès que leur installation est terminée. Découvrez notre programme de parrainage.",
  path: "/deja-client/parrainage",
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

const gift = (
  <>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <rect x="5" y="12" width="14" height="9" rx="1" />
    <path d="M12 8v13M12 8c-2-4-6-4-6-1.5S10 8 12 8zM12 8c2-4 6-4 6-1.5S14 8 12 8z" />
  </>
);
const person = (
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </>
);
const shield = (
  <>
    <path d="M12 2.5 20 5v7c0 5-3.4 8.3-8 9.5C7.4 20.3 4 17 4 12V5z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </>
);
const house = (
  <>
    <path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
    <path d="M10 21v-5h4v5" />
  </>
);
const leaf = (
  <>
    <path d="M20 4C10 4 4 9 4 15a5 5 0 0 0 5 5c6 0 11-6 11-16z" />
    <path d="M7 19C9.5 13.5 13 9.5 18 7" />
  </>
);

const perks: { icon: ReactNode; text: string }[] = [
  { icon: person, text: "Vos proches bénéficient de conseils d'experts" },
  { icon: shield, text: "Des installations performantes et garanties" },
  { icon: gift, text: "Vous recevez 300 € dès que leur installation est terminée" },
];

const howSteps: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "1. Vous parrainez",
    text: "Partagez votre lien ou votre code parrain avec vos proches.",
    icon: (
      <>
        <circle cx="10" cy="8" r="3.6" />
        <path d="M3 20c0-3.9 3.1-7 7-7 1.6 0 3 .5 4.2 1.4" />
        <path d="M18 14v6M15 17h6" />
      </>
    ),
  },
  {
    title: "2. Votre proche nous contacte",
    text: "Il réalise son projet avec Label Énergie.",
    icon: (
      <>
        <path d="M4 20l1.5-4.5A8 8 0 1 1 9 19z" />
        <path d="M8 12h.01M12 12h.01M16 12h.01" />
      </>
    ),
  },
  { title: "3. Installation réalisée", text: "Son installation est terminée et validée.", icon: house },
  { title: "4. Vous recevez votre récompense", text: "Nous vous offrons 300 € en remerciement.", icon: gift },
  {
    title: "5. Tout le monde est gagnant !",
    text: "Vous, votre proche et la planète économisez de l'énergie.",
    icon: <path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z" />,
  },
];

const advantages: { icon: ReactNode; title: string; text: string }[] = [
  { icon: gift, title: "300 € pour vous", text: "Recevez 300 € pour chaque installation parrainée et terminée." },
  {
    icon: <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z" />,
    title: "Des proches bien accompagnés",
    text: "Ils bénéficient de notre expertise et d'un accompagnement personnalisé.",
  },
  { icon: leaf, title: "Un geste pour la planète", text: "Ensemble, développons des solutions durables et économes en énergie." },
];

const lawPoints = [
  "Récompense versée par virement bancaire",
  "Offre non cumulable avec d'autres promotions",
  "Parrainage valable dans toute la France",
];

const tracking: { icon: ReactNode; value: string; label: string }[] = [
  { icon: person, value: "3", label: "Parrainages en cours" },
  { icon: house, value: "2", label: "Installations terminées" },
  { icon: gift, value: "600 €", label: "Récompenses gagnées" },
  {
    icon: (
      <>
        <path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
        <path d="M16 5 6 7" />
        <rect x="15" y="11.5" width="5" height="4" rx="1" />
      </>
    ),
    value: "300 €",
    label: "Récompenses disponibles",
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
    icon: (
      <>
        <circle cx="12" cy="9" r="5.5" />
        <path d="M8.5 14 7 22l5-2.6L17 22l-1.5-8" />
      </>
    ),
    lines: (
      <>
        <strong>Plus de 13 ans</strong>
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

export default function ParrainagePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Déjà client", path: "/deja-client" },
          { name: "Parrainage", path: "/deja-client/parrainage" },
        ]}
      />

      {/* Hero */}
      <section className="pt-2">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">PARRAINAGE</p>
            <h1 className="qsn-hero-title">
              Recommandez Label Énergie
              <br />
              et recevez <span className="text-teal">300 €</span> !
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-ink" style={{ maxWidth: 420 }}>
              Votre satisfaction est notre plus belle récompense. Parrainez vos proches et
              profitez tous les deux d&apos;une récompense exceptionnelle.
            </p>

            <div className="par-perks">
              {perks.map((p) => (
                <div key={p.text}>
                  <Ico size={34} sw={1.2}>{p.icon}</Ico>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>

            <div className="mpr-hero-actions" style={{ marginTop: 30 }}>
              <a href="#outils" className="btn btn-primary">
                PARRAINER MAINTENANT <Arrow color="#fff" />
              </a>
              <a href="#suivi" className="btn btn-outline">
                VOIR MES PARRAINAGES
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  {person}
                </svg>
              </a>
            </div>
          </div>

          <div className="par-hero-media">
            <Image
              src="/images/pa1.jpg"
              alt="Couple souriant devant sa maison équipée de panneaux solaires : recevez 300 € par installation parrainée"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <Reveal as="section" className="section">
        <div className="container">
          <h2 className="ca-steps-title">
            Comment ça <span className="text-teal">marche</span> ?
          </h2>
          <div className="fin-how par-how" style={{ marginTop: 24 }}>
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
                <span className="fin-how-circle" style={{ color: "#0e8a5f" }}>
                  <Ico size={28}>{h.icon}</Ico>
                </span>
                <p className="par-how-title">{h.title}</p>
                <p className="fin-how-text">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Avantages */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="par-gift">
            <div className="par-gift-media">
              <Image
                src="/images/pa2.jpg"
                alt="Cadeau et carte « Merci pour votre confiance ! »"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: "cover", objectPosition: "center 78%" }}
              />
            </div>
            <div className="par-gift-adv">
              <h3 className="par-card-title">Vos avantages</h3>
              <div className="par-adv-list">
                {advantages.map((a) => (
                  <div key={a.title}>
                    <span className="par-adv-icon">
                      <Ico size={22}>{a.icon}</Ico>
                    </span>
                    <div>
                      <p className="par-adv-title">{a.title}</p>
                      <p className="par-adv-text">{a.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="par-law">
              <p className="par-law-title">Ce que dit la loi</p>
              <p className="par-law-text">
                Le parrainage est ouvert à tous nos clients ayant déjà réalisé une installation
                avec Label Énergie. La participation n&apos;entraîne aucun engagement de votre
                part.
              </p>
              <ul>
                {lawPoints.map((p) => (
                  <li key={p}>
                    <svg width="11" height="9" viewBox="0 0 12 10" fill="none" stroke="#0e8a5f" strokeWidth="1.8" aria-hidden>
                      <path d="M1 5l3.5 3.5L11 1" />
                    </svg>
                    {p}
                  </li>
                ))}
                <li>
                  <svg width="11" height="9" viewBox="0 0 12 10" fill="none" stroke="#0e8a5f" strokeWidth="1.8" aria-hidden>
                    <path d="M1 5l3.5 3.5L11 1" />
                  </svg>
                  <Link href="/mentions-legales">Voir le règlement complet</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Outils */}
      <Reveal as="section" className="section pt-0" id="outils">
        <div className="container">
          <h2 className="par-section-title">Vos outils de parrainage</h2>
          <ParrainageTools />
        </div>
      </Reveal>

      {/* Suivi */}
      <Reveal as="section" className="section pt-0" id="suivi">
        <div className="container">
          <h2 className="par-section-title">Suivez vos parrainages</h2>
          <div className="par-tracking">
            {tracking.map((t) => (
              <div key={t.label}>
                <Ico size={34} sw={1.1}>{t.icon}</Ico>
                <div>
                  <strong>{t.value}</strong>
                  <span>{t.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="pt-cta-banner fin-cta">
            <span className="par-cta-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" aria-hidden>
                {gift}
              </svg>
            </span>
            <div>
              <p className="pt-cta-title">Prêt à parrainer ?</p>
              <p className="pt-cta-text">
                Recommandez Label Énergie à vos proches et recevez 300 € par installation
                parrainée.
              </p>
            </div>
            <div className="pt-cta-actions">
              <a href="#outils" className="btn" style={{ background: "#fff", color: "#0b5c42" }}>
                PARRAINER MAINTENANT <Arrow color="#0b5c42" />
              </a>
              <a href="#suivi" className="btn" style={{ border: "1px solid #cfe9da", color: "#fff" }}>
                VOIR MES PARRAINAGES
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" aria-hidden>
                  {person}
                </svg>
              </a>
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
