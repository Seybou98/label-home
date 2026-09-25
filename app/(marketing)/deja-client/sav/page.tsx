import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/animation/Reveal";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { SavForm } from "@/components/marketing/SavForm";

export const metadata: Metadata = buildMetadata({
  title: "Déclarer un SAV sur votre équipement Label Énergie",
  description:
    "Un problème sur votre pompe à chaleur, votre climatisation ou vos panneaux solaires ? Déclarez votre demande de SAV en ligne, nos techniciens vous recontactent rapidement.",
  path: "/deja-client/sav",
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

const headset = (
  <>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <rect x="2.5" y="13" width="4" height="6" rx="1.6" />
    <rect x="17.5" y="13" width="4" height="6" rx="1.6" />
    <path d="M19.5 19v1a2 2 0 0 1-2 2H13" />
  </>
);
const shield = (
  <>
    <path d="M12 2.5 20 5v7c0 5-3.4 8.3-8 9.5C7.4 20.3 4 17 4 12V5z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </>
);
const calendar = (
  <>
    <rect x="3" y="5" width="18" height="15" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4M7 13h2M11 13h2M15 13h2M7 16h2M11 16h2" />
  </>
);
const phoneIcon = (
  <path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z" />
);

const perks: { icon: ReactNode; title: string; text: string }[] = [
  { icon: headset, title: "Support réactif", text: "du lundi au vendredi 8h - 18h" },
  { icon: shield, title: "Techniciens", text: "qualifiés et certifiés" },
  { icon: calendar, title: "Intervention rapide", text: "sous 48 à 72h*" },
  {
    icon: (
      <>
        <path d="M12 2l2 1.8 2.7-.4 1 2.5 2.4 1.2-.6 2.7 1.3 2.4-2 1.9.2 2.7-2.7.5-1.6 2.2-2.7-.9-2.7.9-1.6-2.2-2.7-.5.2-2.7-2-1.9 1.3-2.4-.6-2.7L4.3 6.1l1-2.5L8 4z" />
        <path d="M8.7 12l2.4 2.4 4.2-4.6" />
      </>
    ),
    title: "Pièces d'origine",
    text: "constructeur",
  },
];

const howSteps: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Déclarez votre demande",
    text: "Remplissez le formulaire ou contactez-nous par téléphone.",
    icon: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4M9 11h6M9 14h6M9 17h4" />
      </>
    ),
  },
  { title: "Nous vous recontactons", text: "Un conseiller vous appelle pour comprendre votre problème.", icon: headset },
  {
    title: "Intervention planifiée",
    text: "Nous planifions une intervention sous 48 à 72h selon votre disponibilité*.",
    icon: calendar,
  },
  {
    title: "Nos techniciens interviennent",
    text: "Diagnostic, réparation et test complet de votre installation.",
    icon: (
      <>
        <path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2 2 0 0 1-3-3z" />
        <path d="M14.5 6.5 17 4l3 3-2.5 2.5" />
        <path d="M4 20l5-4" />
      </>
    ),
  },
  {
    title: "Votre installation est opérationnelle",
    text: "Nous vous conseillons pour éviter toute future panne.",
    icon: shield,
  },
];

const reasons: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: (
      <>
        <circle cx="14" cy="13" r="7" />
        <path d="M14 9v4l2.5 2M2 10h4M3 14h3M4 18h4" />
      </>
    ),
    title: "Réactivité",
    text: "Une équipe dédiée pour vous répondre rapidement et intervenir dans les meilleurs délais.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="9" r="6" />
        <path d="M9.5 9l2 2 3-3.5" />
        <path d="M8.5 14 7 21l5-2.5 5 2.5-1.5-7" />
      </>
    ),
    title: "Expertise",
    text: "Des techniciens qualifiés et formés en continu sur toutes les marques et technologies.",
  },
  {
    icon: (
      <>
        <path d="M14 2.5 22 5v7c0 5-3.4 8.3-8 9.5-4.6-1.2-8-4.5-8-9.5V5z" />
        <path d="M10.5 12l2.5 2.5 4.5-5" />
        <path d="M2 9h3M1 13h4M3 17h3" />
      </>
    ),
    title: "Fiabilité",
    text: "Des pièces d'origine constructeur et des réparations garanties jusqu'à 2 ans.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="10" r="3.5" />
        <path d="M6 19c1-3 3.3-4.5 6-4.5s5 1.5 6 4.5" />
      </>
    ),
    title: "Suivi personnalisé",
    text: "Un suivi complet de vos interventions et un historique accessible depuis votre espace client.",
  },
];

const faq = [
  {
    q: "Quels équipements sont couverts par le SAV ?",
    a: "Tous les équipements installés par Label Énergie : pompes à chaleur, chauffe-eau, systèmes solaires, panneaux photovoltaïques et poêles à granulés.",
  },
  {
    q: "Comment suivre ma demande SAV ?",
    a: `Depuis votre espace client, rubrique « Mes demandes SAV », ou en appelant notre service au ${siteConfig.phoneDisplay}.`,
  },
  {
    q: "Quels sont les délais d'intervention ?",
    a: "Nous intervenons en général sous 48 à 72h, selon la disponibilité des techniciens et votre zone géographique.",
  },
  {
    q: "Les pièces changées sont-elles garanties ?",
    a: "Oui, nous utilisons des pièces d'origine constructeur et nos réparations sont garanties jusqu'à 2 ans.",
  },
  {
    q: "Le déplacement est-il payant ?",
    a: "Le déplacement est inclus pendant la période de garantie. Hors garantie, un devis vous est communiqué avant toute intervention.",
  },
  {
    q: "Puis-je souscrire un contrat d'entretien ?",
    a: "Oui, nous proposons des contrats d'entretien annuels pour garantir la performance et la longévité de vos équipements.",
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

export default function SavPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Déjà client", path: "/deja-client" },
          { name: "SAV", path: "/deja-client/sav" },
        ]}
      />

      {/* Hero */}
      <section className="pt-2">
        <div className="container grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <p className="eyebrow">SERVICE APRÈS-VENTE</p>
            <h1 className="qsn-hero-title">
              Un problème avec
              <br />
              votre installation ?
              <br />
              <span className="text-teal">Nous sommes là pour vous.</span>
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-ink" style={{ maxWidth: 420 }}>
              Notre service SAV réactif et efficace intervient rapidement pour résoudre vos
              problèmes et vous garantir confort et sérénité. Nos équipes spécialisées sont à
              votre écoute.
            </p>

            <div className="sav-perks">
              {perks.map((p) => (
                <div key={p.title}>
                  <Ico size={30} sw={1.2}>{p.icon}</Ico>
                  <p>
                    <b>{p.title}</b>
                    <br />
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="sav-urgent">
              <div className="sav-urgent-text">
                <Ico size={28} sw={1.4}>{phoneIcon}</Ico>
                <div>
                  <p>Une urgence ? Appelez-nous directement</p>
                  <small>Nos conseillers vous répondent immédiatement.</small>
                </div>
              </div>
              <a href={`tel:${siteConfig.phone}`} className="sav-urgent-phone">
                <Ico size={24} sw={1.4}>{phoneIcon}</Ico>
                <div>
                  <strong>{siteConfig.phoneDisplay}</strong>
                  <small>Du lundi au vendredi de 8h à 18h</small>
                </div>
              </a>
            </div>
          </div>

          <div className="sav-hero-media">
            <Image
              src="/images/equipe/t3.jpg"
              alt="Technicien Label Énergie en pleine préparation de matériel"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "left center" }}
              priority
            />
            <SavForm />
          </div>
        </div>
      </section>

      {/* Comment ça fonctionne */}
      <Reveal as="section" className="section">
        <div className="container">
          <h2 className="ca-steps-title">
            Comment ça <span className="text-teal">fonctionne</span> ?
          </h2>
          <div className="fin-how sav-how" style={{ marginTop: 26 }}>
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
                  <Ico size={26}>{h.icon}</Ico>
                </span>
                <p className="par-how-title" style={{ marginTop: 18 }}>{h.title}</p>
                <p className="fin-how-text">{h.text}</p>
              </div>
            ))}
          </div>
          <p className="sav-footnote">* Délais indicatifs selon disponibilité et zone géographique.</p>
        </div>
      </Reveal>

      {/* Pourquoi choisir + espace client */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="sav-why">
            <div>
              <h2 className="sav-why-title">
                Pourquoi choisir Label Énergie <span className="text-teal">pour votre SAV</span> ?
              </h2>
              <div className="sav-why-grid">
                {reasons.map((r) => (
                  <div className="sav-why-card" key={r.title}>
                    <Ico size={32} sw={1.2}>{r.icon}</Ico>
                    <p className="sav-why-card-title">{r.title}</p>
                    <p className="sav-why-card-text">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="sav-space">
              <div className="sav-space-text">
                <p className="sav-space-title">Votre espace client</p>
                <p className="sav-space-desc">
                  Suivez toutes vos demandes SAV, consultez l&apos;historique de vos interventions
                  et accédez à vos documents.
                </p>
                <Link href="/espace-client" className="sav-space-link">
                  ACCÉDER À MON ESPACE CLIENT <Arrow w={12} />
                </Link>
              </div>
              <div className="sav-space-media">
                <Image
                  src="/images/app-label.png"
                  alt="Application Label Énergie : mes installations, mes documents, mes demandes SAV"
                  width={481}
                  height={519}
                  sizes="(max-width: 900px) 40vw, 18vw"
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal as="section" className="section pt-0">
        <div className="container sav-faq">
          <h2 className="par-section-title">Questions fréquentes</h2>
          <div style={{ marginTop: 18 }}>
            <FaqAccordion items={faq} />
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="section pt-0">
        <div className="container" >
          <div className="pt-cta-banner sav-cta pt-10">
            <span className="par-cta-icon" style={{ width: 66, height: 66 }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" aria-hidden>
                {headset}
              </svg>
            </span>
            <div>
              <p className="pt-cta-title ">Besoin d&apos;aide immédiate ?</p>
              <p className="pt-cta-text">Contactez notre service SAV dès maintenant.</p>
            </div>
            <a href={`tel:${siteConfig.phone}`} className="sav-cta-phone">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" aria-hidden>
                {phoneIcon}
              </svg>
              <div>
                <strong>{siteConfig.phoneDisplay}</strong>
                <small>Lun - Ven : 8h - 18h</small>
              </div>
            </a>
            <a href="#declarer" className="sav-cta-btn">
              <span>
                DÉCLARER UNE DEMANDE SAV <Arrow color="#0b5c42" />
              </span>
              <small>Réponse sous 2h ouvrées</small>
            </a>
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
