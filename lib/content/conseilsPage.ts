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

export interface ConseilArticle {
  date: string;
  title: string;
  text: string;
  image: string;
}

export const conseilsArticles: ConseilArticle[] = [
  {
    date: "24 MAI 2024",
    title: "MaPrimeRénov' 2024 : ce qui change",
    text: "Nouveaux montants, nouvelles conditions... on vous explique tout simplement.",
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=800&q=80",
  },
  {
    date: "15 MAI 2024",
    title: "Comment réduire votre facture d'énergie ?",
    text: "10 astuces simples et efficaces pour faire baisser vos consommations.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80",
  },
  {
    date: "08 MAI 2024",
    title: "Rénovation énergétique : par où commencer ?",
    text: "Les étapes clés pour réussir votre projet de rénovation sereinement.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    date: "02 MAI 2024",
    title: "Isolation : le premier pas vers les économies",
    text: "Pourquoi l'isolation est essentielle et quelles solutions existent.",
    image: "https://images.unsplash.com/photo-1621905252472-943afaa20e20?auto=format&fit=crop&w=800&q=80",
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
