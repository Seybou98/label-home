import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Gem,
  GraduationCap,
  HardHat,
  Headphones,
  HeartHandshake,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  Truck,
  UserRound,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/animation/Reveal";
import { SectionTitle } from "@/components/home/SectionTitle";
import { TeamCarousel } from "@/components/marketing/TeamCarousel";

export const metadata: Metadata = buildMetadata({
  title: "Nos équipes : des experts RGE à votre service",
  description:
    "Découvrez les équipes de conseillers, techniciens et installateurs certifiés RGE qui accompagnent chaque jour les clients de Label Énergie.",
  path: "/a-propos/nos-equipes",
});

const heroValues: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MessageCircle, title: "Écoute", text: "Des conseils adaptés à vos besoins" },
  { icon: GraduationCap, title: "Expertise", text: "Des spécialistes formés en continu" },
  { icon: MapPin, title: "Proximité", text: "Des équipes locales partout en France" },
  { icon: Award, title: "Engagement", text: "Un service responsable et durable" },
];

const heroStats: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Users, value: `+${siteConfig.stats.collaborators}`, label: "collaborateurs à votre service" },
  { icon: HardHat, value: "20", label: "équipes techniques partout en France" },
  { icon: BadgeCheck, value: "100%", label: "équipes internes (pas de sous-traitance)" },
  { icon: Home, value: siteConfig.stats.installations, label: "installations réalisées" },
  { icon: Users, value: "+5 000", label: "clients accompagnés depuis 2016" },
];

const orgTeams = [
  { icon: UserRound, photo: "/images/equipe/t5.jpg", title: "Conseillers énergie", text: "Ils vous écoutent, analysent votre projet et vous proposent les solutions les plus adaptées." },
  { icon: ClipboardCheck, photo: "/images/equipe/t4.jpg", title: "Bureau d'études", text: "Nos experts techniques conçoivent des installations performantes, sécurisées et durables." },
  { icon: Truck, photo: "/images/equipe/t3.jpg", title: "Logistique", text: "Réception, contrôle et préparation du matériel pour garantir des chantiers sans souci." },
  { icon: HardHat, photo: "/images/equipe/t6.jpg", title: "Équipes de pose", text: "Nos techniciens qualifiés réalisent vos installations dans le respect des règles de l'art." },
  { icon: Headphones, photo: "/images/equipe/t2.jpg", title: "Service client", text: "Une équipe disponible 6j/7 pour répondre à toutes vos questions et vous accompagner." },
  { icon: Wrench, photo: "/images/equipe/t1.jpg", title: "SAV & maintenance", text: "Interventions rapides et efficaces pour assurer la performance et la longévité de vos équipements." },
];

const values = [
  { icon: MessageCircle, title: "Transparence", text: "Des conseils clairs et des prix justes." },
  { icon: Gem, title: "Qualité", text: "Des produits premium et des installations réalisées selon les normes les plus exigeantes." },
  { icon: ShieldCheck, title: "Respect", text: "De nos clients, de nos équipes et de l'environnement." },
  { icon: HeartHandshake, title: "Esprit d'équipe", text: "La force du collectif au service de votre satisfaction." },
];

const trainingPoints = [
  "Formations fabricants en continu",
  "Veille réglementaire permanente",
  "Certifications et habilitations à jour",
  "Partage d'expérience entre équipes",
];

const testimonials = [
  { photo: "/images/equipe/E1.png", name: "Karim", role: "Technicien poseur depuis 6 ans", quote: "Ce que j'aime, c'est apporter des solutions concrètes aux clients et voir leur satisfaction à la fin du chantier." },
  { photo: "/images/equipe/E2.png", name: "Julie", role: "Conseillère énergie depuis 3 ans", quote: "Chaque projet est unique. Nous prenons le temps d'écouter pour proposer la meilleure solution." },
  { photo: "/images/equipe/E3.png", name: "Nicolas", role: "Responsable logistique depuis 5 ans", quote: "La qualité de notre travail commence par le choix du bon matériel et une organisation sans faille." },
  { photo: "/images/equipe/E4.png", name: "Sonia", role: "Service client depuis 4 ans", quote: "Être disponible et réactif, c'est notre priorité pour accompagner nos clients sereinement." },
];

const bottomTrust = [
  { icon: ShieldCheck, value: "RGE", label: "Entreprise certifiée" },
  { icon: Home, value: siteConfig.stats.installations, label: "Installations réalisées" },
  { icon: Star, value: `${siteConfig.rating.valueLabel}/5`, label: `+${siteConfig.rating.count} avis Google` },
  { icon: Award, value: `${siteConfig.stats.experienceYears} ans`, label: "D'expérience à vos côtés" },
  { icon: CheckCircle2, value: "A à Z", label: "Accompagnement de bout en bout" },
];

export default function NosEquipesPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "À propos", path: "/a-propos/qui-sommes-nous" },
          { name: "Nos équipes", path: "/a-propos/nos-equipes" },
        ]}
      />

      {/* Hero */}
      <section className="pt-2">
        <div className="container grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <p className="eyebrow">NOS ÉQUIPES</p>
            <h1 className="qsn-hero-title">
              Des femmes et des hommes <span className="text-teal">engagés</span> pour votre
              confort et la planète.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Chez Label Énergie, chaque collaborateur partage la même mission : vous accompagner
              avec expertise, passion et bienveillance dans votre projet de rénovation
              énergétique.
            </p>

            <div className="eq-values-row">
              {heroValues.map((v) => (
                <div key={v.title}>
                  <v.icon size={34} className="eq-values-icon" />
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="eq-hero-visual">
            <div className="eq-hero-media" style={{ aspectRatio: "542 / 248" }}>
              <Image
                src="/images/equipe/L1.png"
                alt="Équipe Label Énergie devant le siège et les véhicules d'intervention"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className="eq-hero-stats">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <s.icon size={24} />
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organisation */}
      <Reveal as="section" className="section">
        <div className="container">
          <SectionTitle
            title={
              <>
                Une organisation à <span className="text-teal">taille humaine</span>
              </>
            }
          />
          <div className="eq-org-grid mt-6">
            {orgTeams.map((t) => (
              <div className="eq-org-card" key={t.title}>
                <div className="eq-org-photo">
                  <Image src={t.photo} alt={t.title} fill sizes="(max-width: 900px) 33vw, 16vw" style={{ objectFit: "cover" }} loading="lazy" />
                </div>
                <div className="eq-org-body">
                  <span className="eq-org-icon">
                    <t.icon size={20} />
                  </span>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Valeurs */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="eq-values-band">
            <div className="eq-values-band-text">
              <h2 className="qsn-section-heading">
                Nos <span className="text-teal">valeurs</span> au quotidien
              </h2>
              <div className="eq-values-list">
                {values.map((v) => (
                  <div key={v.title}>
                    <v.icon size={34} className="eq-values-list-icon" />
                    <div>
                      <h3>{v.title}</h3>
                      <p>{v.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="eq-values-media">
              <Image
                src="/images/equipe/L2.png"
                alt="Équipe Label Énergie réunie, mains jointes en signe de cohésion"
                fill
                sizes="(max-width: 900px) 100vw, 32vw"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
            <div className="eq-training-card">
              <p className="eq-training-title">Formation &amp; expertise</p>
              <p className="mt-3 text-x3 leading-relaxed text-muted">
                Nos équipes sont régulièrement formées <br />aux dernières technologies et aux
                évolutions <br />réglementaires pour vous garantir un service <br />toujours à la pointe.
              </p>
              <ul className="eq-training-list">
                {trainingPoints.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={14} /> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Zones d'intervention */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="eq-zones-banner">
            <span className="eq-zones-icon">
              <MapPin size={40} />
            </span>
            <div>
              <p className="eq-zones-title text-xl">Une équipe proche de vous, partout en France</p>
              <p className="mt-2 text-xm leading-relaxed" style={{ color: "#dcefe6" }}>
                De Paris à Marseille, de Lille à Bordeaux, nos équipes sont présentes sur tout le
                territoire <br /> pour intervenir rapidement et vous offrir le meilleur accompagnement.
              </p>
            </div>
            <Link href="/zones-intervention" className="btn" style={{ background: "#fff", color: "#0b5c42" }}>
              VOIR NOS ZONES D&apos;INTERVENTION <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Témoignages équipes */}
      <Reveal as="section" className="section">
        <div className="container">
          <SectionTitle
            title={
              <>
                Ils font <span className="text-teal">Label Énergie</span>
              </>
            }
          />
          <div className="mt-6">
            <TeamCarousel items={testimonials} />
          </div>
        </div>
      </Reveal>

      {/* Recrutement */}
      <Reveal as="section" className="section pt-0">
        <div className="container">
          <div className="eq-recruit-banner">
            <Users size={34} className="eq-recruit-icon" />
            <div>
              <p className="eq-recruit-title text-xl">Rejoignez une équipe qui a du sens.</p>
              <p className="mt-1 text-xm leading-relaxed text-muted">
                Découvrez nos opportunités de carrière et participez <br />à la transition énergétique
                avec nous.
              </p>
            </div>
            <Link href="/a-propos/recrutement" className="btn btn-outline">
              DÉCOUVRIR NOS OFFRES D&apos;EMPLOI <ArrowRight size={16} />
            </Link>
            <div className="eq-recruit-mail ">
              <Mail size={30} />
              <span>
                Ou envoyez votre candidature spontanée
                <br />
                <a href="mailto:recrutement@label-energie.fr">recrutement@label-energie.fr</a>
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Trust bar sombre */}
      <div className="container pb-10">
        <div className="eq-trust-dark">
          {bottomTrust.map((t) => (
            <div key={t.label}>
              <t.icon size={36} aria-hidden />
              <div>
                <strong>{t.value}</strong>
                <span>{t.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
