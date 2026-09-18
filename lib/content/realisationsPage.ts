export interface RealisationCategory {
  slug: string;
  label: string;
}

export const realisationCategories: RealisationCategory[] = [
  { slug: "pompe-a-chaleur", label: "Pompe à chaleur" },
  { slug: "solaire-thermique", label: "Solaire thermique (SSC)" },
  { slug: "panneaux-photovoltaiques", label: "Panneaux photovoltaïques" },
  { slug: "poeles-granules", label: "Poêles & granulés" },
  { slug: "chauffe-eau-thermodynamique", label: "Chauffe-eau thermodynamique" },
];

export interface RealisationItem {
  category: string;
  categoryLabel: string;
  region: string;
  title: string;
  location: string;
  text: string;
  savings: string;
  image: string;
}

export const realisationItems: RealisationItem[] = [
  {
    category: "pompe-a-chaleur",
    categoryLabel: "POMPE À CHALEUR AIR/EAU",
    region: "Nouvelle-Aquitaine",
    title: "PAC air/eau + Ballon thermodynamique",
    location: "Libourne (33)",
    text: "Remplacement d'une chaudière fioul par une PAC haut rendement pour plus de confort et d'économies d'énergie.",
    savings: "- 1 250 €",
    image: "/images/solutions/r4.jpg",
  },
  {
    category: "panneaux-photovoltaiques",
    categoryLabel: "PANNEAUX PHOTOVOLTAÏQUES",
    region: "Provence-Alpes-Côte d'Azur",
    title: "Installation 6 kWc en autoconsommation",
    location: "Aix-en-Provence (13)",
    text: "Installation photovoltaïque avec onduleur et stockage pour une production optimisée.",
    savings: "- 980 €",
    image: "/images/solutions/r6.jpg",
  },
  {
    category: "solaire-thermique",
    categoryLabel: "SYSTÈME SOLAIRE COMBINÉ (SSC)",
    region: "Occitanie",
    title: "Système solaire combiné 420L",
    location: "Toulouse (31)",
    text: "Eau chaude sanitaire et chauffage solaire pour un foyer de 4 personnes.",
    savings: "- 760 €",
    image: "/images/solutions/r3.jpg",
  },
  {
    category: "poeles-granules",
    categoryLabel: "POÊLE À GRANULÉS",
    region: "Pays de la Loire",
    title: "Poêle à granulés étanche",
    location: "Nantes (44)",
    text: "Solution de chauffage économique et écologique pour un confort optimal.",
    savings: "- 650 €",
    image: "/images/solutions/r5.jpg",
  },
];

export const realisationGallery = [
  { image: "/images/solutions/r1.jpg", alt: "Maison individuelle équipée d'une pompe à chaleur et de panneaux solaires" },
  { image: "/images/solutions/r2.jpg", alt: "Chauffe-eau thermodynamique installé dans une buanderie" },
  { image: "/images/solutions/r3.jpg", alt: "Panneaux solaires thermiques installés sur une toiture" },
  { image: "/images/solutions/r4.jpg", alt: "Unité extérieure de pompe à chaleur" },
  { image: "/images/solutions/r5.jpg", alt: "Poêle à granulés dans un salon" },
  { image: "/images/solutions/r6.jpg", alt: "Panneaux photovoltaïques installés sur une toiture" },
  { image: "/images/solutions/pac2.jpg", alt: "Unité intérieure de climatisation installée dans un salon" },
];

export const realisationTestimonials = [
  {
    quote: "Équipe professionnelle, à l'écoute et très réactive. Installation d'une PAC au top, chantier propre et délais respectés. Je recommande Label Énergie les yeux fermés !",
    rating: 5,
    name: "Sophie D.",
    location: "Bordeaux (33)",
  },
  {
    quote: "Très satisfait de notre installation solaire. Conseils clairs, matériel de qualité et suivi parfait du début à la fin. Merci à toute l'équipe !",
    rating: 5,
    name: "Marc L.",
    location: "Montpellier (34)",
  },
  {
    quote: "Du devis à la mise en service, tout a été parfait. Équipe sérieuse, chantier impeccable et résultats au rendez-vous sur nos factures d'énergie.",
    rating: 4.5,
    name: "Julie & Thomas",
    location: "Lyon (69)",
  },
  {
    quote: "Installation d'un chauffe-eau thermodynamique rapide et sans surprise. L'équipe a pris le temps de tout expliquer, je recommande.",
    rating: 5,
    name: "Nicolas B.",
    location: "Rennes (35)",
  },
  {
    quote: "Chantier propre, respect des délais et un vrai suivi après l'installation du poêle à granulés. Très bonne expérience du début à la fin.",
    rating: 4.5,
    name: "Camille R.",
    location: "Strasbourg (67)",
  },
  {
    quote: "Conseillers disponibles et à l'écoute pour notre projet solaire combiné. Les aides ont été gérées de A à Z, aucun stress de notre côté.",
    rating: 5,
    name: "Fatima et Karim",
    location: "Marseille (13)",
  },
];
