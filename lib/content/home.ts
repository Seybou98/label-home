export const heroImage = "/images/engage.png";
export const teamImage =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80";
export const phoneImage = "/images/app-label.png";

export const projectChoices = [
  {
    icon: "Flame",
    color: "orange",
    title: ["Réduire ma facture", "de chauffage"],
    text: "Une solution adaptée à votre logement.",
    href: "/solutions/pompe-a-chaleur",
  },
  {
    icon: "Snowflake",
    color: "blue",
    title: ["Climatiser", "mon logement"],
    text: "Confort été comme hiver.",
    href: "/solutions/climatisation",
  },
  {
    icon: "Sun",
    color: "yellow",
    title: ["Produire mon", "électricité"],
    text: "Produisez votre propre énergie.",
    href: "/solutions/panneaux-photovoltaiques",
  },
  {
    icon: "Droplets",
    color: "violet",
    title: ["Réduire le coût", "de mon eau chaude"],
    text: "Maîtrisez votre consommation.",
    href: "/solutions/chauffe-eau-thermodynamique",
  },
  {
    icon: "Home",
    color: "green",
    title: ["Rénovation énergétique", "globale"],
    text: "Un accompagnement de A à Z.",
    href: "/solutions/renovation-energetique-globale",
  },
  {
    icon: "MessageCircle",
    color: "purple",
    title: ["Je ne sais pas,", "je souhaite être conseillé"],
    text: "Parlons de votre projet.",
    href: "/simuler-mon-projet",
  },
] as const;

export const products: {
  title: string;
  text: string;
  image: string;
  href: string;
  all?: boolean;
}[] = [
  {
    title: "Pompe à chaleur",
    text: "Chauffez votre logement et réduisez jusqu'à 70 % votre facture.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    href: "/solutions/pompe-a-chaleur",
  },
  {
    title: "Climatisation",
    text: "Profitez d'un confort optimal été comme en hiver.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    href: "/solutions/climatisation",
  },
  {
    title: "Solaire photovoltaïque",
    text: "Produisez votre propre électricité et gagnez en autonomie.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    href: "/solutions/panneaux-photovoltaiques",
  },
  {
    title: "Système solaire combiné",
    text: "Chauffage et eau chaude solaire : la solution 2-en-1 économique.",
    image:
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80",
    href: "/solutions/systeme-solaire-combine",
  },
  {
    title: "Eau chaude",
    text: "Des solutions performantes pour votre eau chaude sanitaire.",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    href: "/solutions/chauffe-eau-thermodynamique",
  },
  {
    title: "Toutes nos solutions",
    text: "Découvrez l'ensemble de nos solutions énergétiques.",
    image: heroImage,
    href: "/solutions",
    all: true,
  },
];

export const realizations = [
  {
    location: "Melun (77)",
    title: "Pompe à chaleur Air/Eau",
    details: "Maison 140 m² • Ancien chauffage : Fioul",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
  },
  {
    location: "Brie-Comte-Robert (77)",
    title: "Climatisation gainable",
    details: "Maison 160 m² • 5 zones",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    location: "Lagny-sur-Marne (77)",
    title: "Solaire photovoltaïque",
    details: "Installation 6 kWc • Autoconsommation",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
  },
  {
    location: "Coupvray (77)",
    title: "Système solaire combiné",
    details: "Maison 150 m² • Chauffage + ECS",
    image:
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80",
  },
] as const;

export const processSteps = [
  {
    n: "01",
    icon: "/images/1.jpg",
    title: "Étude gratuite",
    text: "Nous analysons votre logement et vos besoins.",
  },
  {
    n: "02",
    icon: "/images/2.jpg",
    title: "Solutions & aides",
    text: "Nous vous proposons les meilleures solutions et les aides auxquelles vous avez droit.",
  },
  {
    n: "03",
    icon: "/images/3.jpg",
    title: "Installation",
    text: "Nos équipes qualifiées installent vos équipements.",
  },
  {
    n: "04",
    icon: "/images/4.jpg",
    title: "Mise en service",
    text: "Nous testons et optimisons votre installation.",
  },
  {
    n: "05",
    icon: "/images/5.png",
    title: "Suivi & SAV",
    text: "Nous restons à vos côtés pour l'entretien et le SAV.",
  },
] as const;

export const appFeatures = [
  "Suivi de votre installation",
  "Documents & garanties",
  "Demandes SAV",
  "Entretien & contrats",
  "Parrainage",
  "Conseils personnalisés",
];
