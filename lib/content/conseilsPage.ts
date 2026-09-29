export const conseilsHeroTicks = [
  { icon: "GraduationCap", label: "Conseils d'experts\nindépendants" },
  { icon: "Leaf", label: "Solutions durables\net performantes" },
  { icon: "Euro", label: "Économies\ngaranties" },
  { icon: "ShieldCheck", label: "Informations fiables\net à jour" },
];

export const conseilsCategories = [
  {
    icon: "Gift",
    title: "Aides & subventions",
    text: "Comprendre MaPrimeRénov', les CEE et autres aides.",
    href: "/aides-financement",
  },
  {
    icon: "Lightbulb",
    title: "Choisir son équipement",
    text: "Nos guides pour bien choisir votre solution.",
    href: "/solutions",
  },
  {
    icon: "BarChart3",
    title: "Économies d'énergie",
    text: "Astuces, optimisation et gestes économes.",
    href: "/conseils",
  },
  {
    icon: "Wrench",
    title: "Entretien & maintenance",
    text: "Prolongez la durée de vie de vos équipements.",
    href: "/conseils",
  },
];

export interface ConseilGuide {
  category: string;
  categoryColor: "green" | "orange" | "blue" | "teal";
  title: string;
  text: string;
  image: string;
  href: string;
}

export const conseilsGuides: ConseilGuide[] = [
  {
    category: "POMPE À CHALEUR",
    categoryColor: "green",
    title: "Pompe à chaleur : le guide complet 2024",
    text: "Fonctionnement, avantages, prix, aides et installation.",
    image: "/images/solutions/r4.jpg",
    href: "/solutions/pompe-a-chaleur",
  },
  {
    category: "SOLAIRE",
    categoryColor: "green",
    title: "Système solaire combiné : comment ça marche ?",
    text: "Chauffage + eau chaude avec l'énergie du soleil.",
    image: "/images/solutions/r3.jpg",
    href: "/solutions/systeme-solaire-combine",
  },
  {
    category: "CHAUFFAGE",
    categoryColor: "orange",
    title: "Poêle à granulés : économique et écologique",
    text: "Tout savoir avant d'installer un poêle à granulés.",
    image: "/images/solutions/r5.jpg",
    href: "/solutions/poele-a-granules",
  },
  {
    category: "PHOTOVOLTAÏQUE",
    categoryColor: "blue",
    title: "Panneaux solaires : autoconsommation ou revente ?",
    text: "Avantages, rentabilité et aides disponibles.",
    image: "/images/solutions/r6.jpg",
    href: "/solutions/panneaux-photovoltaiques",
  },
  {
    category: "EAU CHAUDE",
    categoryColor: "teal",
    title: "Chauffe-eau thermodynamique : jusqu'à 70% d'économies",
    text: "Le guide pour bien choisir votre chauffe-eau.",
    image: "/images/solutions/r2.jpg",
    href: "/solutions/chauffe-eau-thermodynamique",
  },
];

export const conseilsTips = [
  {
    icon: "Thermometer",
    title: "Baissez la température\nde 1°C = 7% d'économies",
    text: "Un petit geste, un grand impact sur votre facture.",
  },
  {
    icon: "Sun",
    title: "Profitez du soleil",
    text: "Ouvrez vos volets le jour, fermez-les la nuit en hiver.",
  },
  {
    icon: "Droplet",
    title: "Entretenez vos équipements",
    text: "Un entretien régulier assure performance et longévité.",
  },
];
