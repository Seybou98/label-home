export interface DstContent {
  category: string;
  breadcrumbLabel: string;
  h1: string;
  subtitle: string;
  intro: string;
  heroImage: string;
  heroImageAlt: string;
  heroBadge: { title: string; sub: string };
  benefits: { icon: string; title: string; text?: string; sub?: string }[];
  howItWorks: {
    title: string;
    text: string;
    image: string;
    imageAlt: string;
    steps: { n: number; title: string; text: string }[];
  };
  configs: {
    image: string;
    imageAlt: string;
    title: string;
    items: string[];
    more: string;
    href: string;
    linkLabel: string;
  }[];
  advantages: { icon: string; title: string; text: string }[];
  cee: {
    title: string;
    text: string;
    bonusTitle: string;
    bonusText: string;
    bonusItems: string[];
    bonusHref: string;
    note: string;
  };
  criteria: { icon: string; title: string; sub: string }[];
  criteriaImage: string;
  criteriaImageAlt: string;
  realisations: { image: string; alt: string }[];
  reviews: { text: string; name: string; place: string; initials: string }[];
  finalCta: { title: string; subtitle: string };
}

export const dstContent: DstContent = {
  category: "ÉNERGIE SOLAIRE THERMIQUE",
  breadcrumbLabel: "Dispositifs Solaire Thermique (DST)",
  h1: "Dispositif Solaire Thermique (DST)",
  subtitle: "Une énergie gratuite et durable pour votre eau chaude et votre chauffage",
  intro:
    "Le soleil couvre une grande partie de vos besoins en eau chaude sanitaire et peut également contribuer à votre chauffage. Le dispositif solaire thermique est une solution fiable, économique et respectueuse de l'environnement.",
  heroImage: "/images/dst1.jpg",
  heroImageAlt: "Maison avec capteurs solaires thermiques en toiture, éligible aux CEE BAR-TH-168",
  heroBadge: { title: "Éligible aux CEE BAR-TH-168", sub: "(en maison individuelle)" },
  benefits: [
    { icon: "Leaf", title: "Une énergie renouvelable et gratuite" },
    { icon: "Gauge", title: "Réduction de vos consommations d'énergie" },
    { icon: "Home", title: "Un meilleur confort toute l'année" },
    { icon: "Sun", title: "Une solution durable", sub: "25 ans de durée de vie conventionnelle" },
  ],
  howItWorks: {
    title: "Comment fonctionne un système solaire thermique ?",
    text: "Les capteurs solaires thermiques installés sur votre toit captent la chaleur du soleil et la transmettent à un fluide caloporteur. Cette chaleur est transférée à un ballon de stockage qui alimente votre eau chaude sanitaire et, selon la configuration, votre chauffage.",
    image: "/images/dst2.jpg",
    imageAlt: "Vue en coupe : capteurs, ballon de stockage, circuit solaire",
    steps: [
      { n: 1, title: "Capteurs solaires thermiques", text: "captent la chaleur du soleil" },
      { n: 2, title: "Transfert de chaleur", text: "via un circuit solaire (eau + glycol)" },
      { n: 3, title: "Ballon de stockage solaire", text: "stocke l'énergie" },
      { n: 4, title: "Eau chaude sanitaire", text: "et selon configuration chauffage" },
    ],
  },
  configs: [
    {
      image: "/images/dst3.jpg",
      imageAlt: "Salle de bain, eau chaude solaire",
      title: "Eau chaude sanitaire (ECS)",
      items: [
        "Production d'eau chaude sanitaire grâce à l'énergie solaire",
        "Surface minimale de capteurs : 2 m²",
      ],
      more:
        "Idéal pour couvrir jusqu'à 70 % des besoins annuels en eau chaude d'un foyer. Le ballon solaire est associé à un appoint (électrique ou chaudière) pour les jours moins ensoleillés.",
      href: "/solutions/chauffe-eau-solaire-individuel",
      linkLabel: "Voir la page chauffe-eau solaire (CESI)",
    },
    {
      image: "/images/dst4.jpg",
      imageAlt: "Séjour chauffé par radiateur solaire",
      title: "Chauffage + Eau chaude sanitaire",
      items: [
        "Production d'eau chaude sanitaire et contribution au chauffage",
        "Surface minimale de capteurs : 8 m²",
      ],
      more:
        "Le système solaire combiné (SSC) alimente aussi votre réseau de chauffage, idéalement un plancher chauffant ou des radiateurs basse température, en complément de votre générateur principal.",
      href: "/solutions/systeme-solaire-combine",
      linkLabel: "Voir la page système solaire combiné (SSC)",
    },
  ],
  advantages: [
    { icon: "Leaf", title: "Une énergie renouvelable", text: "Utilise une ressource naturelle et inépuisable : le soleil." },
    { icon: "Gauge", title: "Réduction des consommations", text: "Diminue votre consommation d'énergie pour l'eau chaude et le chauffage." },
    { icon: "Home", title: "Un meilleur confort", text: "Une eau chaude disponible toute l'année et un chauffage d'appoint performant." },
    { icon: "Sun", title: "Une solution durable", text: "Durée de vie conventionnelle CEE : 25 ans." },
  ],
  cee: {
    title: "Les Certificats d'économies d'énergie (CEE) BAR-TH-168 – Dispositif solaire thermique",
    text: "Le dispositif solaire thermique est éligible aux CEE selon la fiche BAR-TH-168 pour les maisons individuelles existantes de plus de 2 ans en France métropolitaine.",
    bonusTitle: "Bonification temporaire en 2026",
    bonusText:
      "Pour les opérations engagées avant le 1er janvier 2027, une bonification des CEE peut s'appliquer sous conditions de ressources :",
    bonusItems: ["Coefficient ×5 pour les ménages modestes", "Coefficient ×4 pour les autres ménages"],
    bonusHref: "/aides-financement/financement",
    note: "La fiche BAR-TH-168 n'est pas cumulable avec les fiches BAR-TH-171 (PAC air/eau) et BAR-TH-172 (PAC eau/eau) pour la même opération.",
  },
  criteria: [
    { icon: "Home", title: "Maison individuelle existante de plus de 2 ans", sub: "(en France métropolitaine)" },
    { icon: "Wrench", title: "Installation sur appoint séparé", sub: "(neuf ou existant)" },
    { icon: "ClipboardList", title: "Étude personnalisée", sub: "selon vos besoins en eau chaude et en chauffage" },
  ],
  criteriaImage: "/images/solutions/r6.jpg",
  criteriaImageAlt: "Capteurs solaires thermiques au soleil",
  realisations: [
    { image: "/images/solutions/r1.jpg", alt: "Maison individuelle équipée d'une pompe à chaleur et de panneaux solaires" },
    { image: "/images/solutions/r3.jpg", alt: "Panneaux solaires thermiques installés sur une toiture" },
    { image: "/images/solutions/r6.jpg", alt: "Panneaux photovoltaïques installés sur une toiture" },
    { image: "/images/solutions/r2.jpg", alt: "Chauffe-eau thermodynamique installé dans une buanderie" },
    { image: "/images/solutions/r4.jpg", alt: "Unité extérieure de pompe à chaleur" },
    { image: "/images/solutions/r5.jpg", alt: "Poêle à granulés dans un salon" },
  ],
  reviews: [
    {
      text: "« Installation solaire thermique réalisée par une équipe très professionnelle. Nous avons rapidement constaté une réduction sur notre consommation. »",
      name: "Sophie M.",
      place: "Ain (01)",
      initials: "SM",
    },
    {
      text: "« Très satisfait de notre installation. Eau chaude toute l'année et un vrai confort. Équipe sérieuse et accompagnement au top. »",
      name: "Laurent D.",
      place: "Vendée (85)",
      initials: "LD",
    },
    {
      text: "« Une solution écologique et économique pour notre maison. Les conseils étaient clairs et l'installation s'est très bien déroulée. »",
      name: "Caroline et Julien T.",
      place: "Haute-Garonne (31)",
      initials: "CJ",
    },
  ],
  finalCta: {
    title: "Un projet de solaire thermique ?",
    subtitle: "Nos experts vous accompagnent gratuitement de A à Z : étude de faisabilité, dimensionnement et installation.",
  },
};
