export interface PacAirAirContent {
  breadcrumbLabel: string;
  category: string;
  h1: string;
  subtitle: string;
  intro: string;
  ticks: string[];
  heroImage: string;
  heroImageAlt: string;
  brands: { name: string; logo: string; width: number; height: number }[];
  variantsTitle: string;
  variants: {
    icon: string;
    title: string;
    text: string;
    idealFor: string;
    image: string;
  }[];
  advantagesTitle: string;
  advantages: { icon: string; title: string; text: string }[];
  aidesCard: {
    image: string;
    badge: string;
    title: string;
    subtitle: string;
    text: string;
    ctaLabel: string;
    ctaHref: string;
    disclaimer: string;
  };
  stepsTitle: string;
  steps: { n: number; icon: string; title: string; text: string }[];
  rating: { value: string; count: string };
  testimonials: { quote: string; name: string; location: string }[];
  finalCta: {
    title: string;
    subtitle: string;
    ctaPrimaryLabel: string;
    ctaPrimaryHref: string;
    ctaSecondaryLabel: string;
    ctaSecondaryHref: string;
    stats: { icon: string; label: string; sublabel: string }[];
  };
}

export const pacAirAirContent: PacAirAirContent = {
  breadcrumbLabel: "Pompe à chaleur Air/Air",
  category: "POMPE À CHALEUR AIR/AIR",
  h1: "PAC Air/Air, le confort sur mesure en toute saison",
  subtitle: "Chauffez en hiver, rafraîchissez en été, respirez toute l'année.",
  intro:
    "La pompe à chaleur Air/Air (climatisation réversible) vous offre un confort optimal et des économies d'énergie jusqu'à 70 % par rapport à un chauffage électrique classique.",
  ticks: [
    "Chauffage performant jusqu'à -20°C",
    "Installation rapide et sans gros travaux",
    "Climatisation douce et silencieuse",
    "Éligible aux aides et au financement",
  ],
  heroImage: "/images/solutions/pac1.jpg",
  heroImageAlt:
    "Unité intérieure de pompe à chaleur Air/Air installée dans un salon, avec ses principaux avantages",
  brands: [
    { name: "Daikin", logo: "/images/solutions/daikin-logo-crop.png", width: 3840, height: 902 },
    { name: "Mitsubishi Electric", logo: "/images/solutions/Mitsubishi_Electric_logo.svg.webp", width: 3840, height: 1171 },
    { name: "Atlantic", logo: "/images/solutions/atlantic-logo.webp", width: 570, height: 152 },
    { name: "LG", logo: "/images/solutions/lg-logo.webp", width: 3840, height: 1760 },
    { name: "Ariston", logo: "/images/solutions/ariston-logo-crop.png", width: 500, height: 82 },
    { name: "Thaléos", logo: "/images/solutions/thaleos-logo-crop.png", width: 369, height: 96 },
  ],
  variantsTitle: "Une solution adaptée à tous vos besoins",
  variants: [
    {
      icon: "Home",
      title: "Monosplit",
      text: "Une unité intérieure pour climatiser ou chauffer une pièce.",
      idealFor: "chambre, bureau, salon…",
      image: "/images/solutions/pac2.jpg",
    },
    {
      icon: "ClipboardList",
      title: "Multi-split",
      text: "Plusieurs unités intérieures raccordées à une seule unité extérieure.",
      idealFor: "maison, étage, plusieurs pièces.",
      image: "/images/solutions/pac2.jpg",
    },
    {
      icon: "Wrench",
      title: "Console & gainable",
      text: "Des solutions discrètes et performantes pour tous les intérieurs.",
      idealFor: "intégration discrète, pièces techniques, combles…",
      image: "/images/solutions/pac2.jpg",
    },
    {
      icon: "BadgeCheck",
      title: "Design & compact",
      text: "Des unités élégantes qui s'intègrent parfaitement à votre décoration.",
      idealFor: "tous les intérieurs modernes.",
      image: "/images/solutions/pac2.jpg",
    },
  ],
  advantagesTitle: "Les avantages de la PAC Air/Air",
  advantages: [
    { icon: "Zap", title: "Économies d'énergie", text: "Jusqu'à 70 % d'économies sur vos factures de chauffage." },
    { icon: "Fan", title: "Confort toute l'année", text: "Chauffage en hiver et climatisation en été." },
    { icon: "Wrench", title: "Installation rapide", text: "Aucun réseau d'eau, pose propre et sans gros travaux." },
    { icon: "Wind", title: "Air sain", text: "Filtres haute performance pour un air plus sain." },
    { icon: "Smartphone", title: "Pilotage intelligent", text: "Contrôle à distance via application mobile." },
    { icon: "ShieldCheck", title: "Fiabilité et durabilité", text: "Matériel de qualité, garantie constructeur jusqu'à 5 ans." },
  ],
  aidesCard: {
    image: "/images/solutions/pac2.jpg",
    badge: "Bon à savoir",
    title: "Jusqu'à 5 000 €",
    subtitle: "d'aides disponibles*",
    text: "MaPrimeRénov', CEE, aides locales… Nous faisons le maximum pour réduire votre reste à charge.",
    ctaLabel: "CALCULER MES AIDES",
    ctaHref: "/aides-financement/calculer-mes-aides",
    disclaimer: "*Selon votre projet et vos revenus.",
  },
  stepsTitle: "Comment ça fonctionne ?",
  steps: [
    { n: 1, icon: "Calculator", title: "Simulations en ligne", text: "Estimez votre projet et vos aides en 2 minutes." },
    { n: 2, icon: "UserSearch", title: "Étude personnalisée", text: "Un conseiller analyse vos besoins et votre logement." },
    { n: 3, icon: "FileCheck2", title: "Devis gratuit", text: "Recevez une proposition détaillée et sans engagement." },
    { n: 4, icon: "CalendarCheck", title: "Planification", text: "Nous fixons ensemble la date d'intervention qui vous convient." },
    { n: 5, icon: "Wrench", title: "Installation", text: "Nos techniciens installent votre équipement." },
    { n: 6, icon: "CheckCircle2", title: "Mise en service", text: "Nous testons, réglons et vous expliquons le fonctionnement." },
  ],
  rating: { value: "4,6/5", count: "+800 avis Google" },
  testimonials: [
    {
      quote:
        "Installation d'une clim réversible dans le salon et les chambres. Équipe sérieuse, ponctuelle et très professionnelle.",
      name: "Sophie D.",
      location: "Bordeaux (33)",
    },
    {
      quote: "Très satisfait du conseil et de la pose. Matériel de qualité, climatisation très silencieuse.",
      name: "Julien M.",
      location: "Aix-en-Provence (13)",
    },
    {
      quote:
        "De la prise de contact à la mise en service, tout s'est parfaitement déroulé. Je recommande Label Énergie !",
      name: "Karim B.",
      location: "Toulouse (31)",
    },
  ],
  finalCta: {
    title: "Prêt à améliorer votre confort ?",
    subtitle: "Simulez votre projet en ligne ou contactez-nous, nos conseillers vous accompagnent gratuitement.",
    ctaPrimaryLabel: "SIMULER MON PROJET",
    ctaPrimaryHref: "/simuler-mon-projet",
    ctaSecondaryLabel: "ÊTRE RAPPELÉ GRATUITEMENT",
    ctaSecondaryHref: "/contact",
    stats: [
      { icon: "ShieldCheck", label: "Entreprise RGE", sublabel: "certifiée" },
      { icon: "Home", label: "+12 000", sublabel: "installations réalisées" },
      { icon: "Users", label: "+5 000", sublabel: "clients accompagnés" },
      { icon: "Star", label: "4,6/5", sublabel: "sur +800 avis Google" },
      { icon: "Award", label: "Plus de 13 ans", sublabel: "d'expérience" },
      { icon: "Bird", label: "Accompagnement", sublabel: "de A à Z" },
    ],
  },
};
