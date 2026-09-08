export interface EquipmentType {
  slug: string;
  label: string;
  icon: string;
}

export const equipmentTypes: EquipmentType[] = [
  { slug: "pac-air-eau-air-air", label: "Pompes à chaleur Air/Eau & Air/Air", icon: "Fan" },
  { slug: "ssc", label: "Systèmes solaires combinés (SSC)", icon: "SunMedium" },
  { slug: "chauffe-eau-thermodynamique", label: "Chauffe-eau thermodynamiques", icon: "Smartphone" },
  { slug: "poele-granules", label: "Poêles & chaudières à granulés", icon: "Flame" },
  { slug: "panneaux-photovoltaiques", label: "Panneaux photovoltaïques", icon: "Sun" },
  { slug: "ballon-eau-chaude", label: "Ballons d'eau chaude", icon: "Droplets" },
];

export interface ContractPlan {
  slug: "essentiel" | "serenite" | "confort-plus";
  name: string;
  tagline: string;
  price: number;
  priceLabel: string;
  recommended?: boolean;
  features: string[];
}

export const contractPlans: ContractPlan[] = [
  {
    slug: "essentiel",
    name: "Essentiel",
    tagline: "L'entretien annuel indispensable",
    price: 129,
    priceLabel: "129 € TTC / an",
    features: [
      "Visite d'entretien annuelle",
      "Nettoyage et contrôle complet",
      "Vérification des réglages",
      "Rapport d'intervention",
    ],
  },
  {
    slug: "serenite",
    name: "Sérénité",
    tagline: "La tranquillité au quotidien",
    price: 199,
    priceLabel: "199 € TTC / an",
    recommended: true,
    features: [
      "Entretien annuel complet",
      "Dépannage prioritaire",
      "Main d'œuvre incluse*",
      "Pièces d'usure incluses**",
      "Hotline illimitée",
    ],
  },
  {
    slug: "confort-plus",
    name: "Confort +",
    tagline: "Le contrat haute performance",
    price: 249,
    priceLabel: "249 € TTC / an",
    features: [
      "Entretien annuel complet",
      "Dépannage prioritaire",
      "Main d'œuvre incluse*",
      "Pièces d'usure incluses**",
      "Vérification des performances",
      "Conseils personnalisés",
    ],
  },
];

export const entretienSteps = [
  { n: 1, title: "Souscription", text: "Choisissez votre contrat en ligne ou contactez-nous." },
  { n: 2, title: "Planification", text: "Nous planifions l'entretien à la date qui vous convient." },
  { n: 3, title: "Intervention", text: "Notre technicien intervient à votre domicile." },
  { n: 4, title: "Rapport", text: "Vous recevez un rapport détaillé de l'intervention." },
  { n: 5, title: "Sérénité", text: "Votre installation reste performante et sécurisée." },
];

export const entretienFaq = [
  {
    question: "À quelle fréquence faut-il entretenir ma pompe à chaleur ?",
    answer:
      "Un entretien annuel est recommandé, et parfois obligatoire selon la puissance de votre équipement, afin de garantir ses performances et sa sécurité.",
  },
  {
    question: "L'entretien est-il obligatoire ?",
    answer:
      "Pour les équipements contenant plus de 2 kg de fluide frigorigène, un contrôle d'étanchéité annuel est une obligation légale. Nos contrats couvrent cette exigence.",
  },
  {
    question: "Que comprend exactement un entretien ?",
    answer:
      "Un contrôle complet du fonctionnement, un nettoyage des composants, une vérification des réglages et un contrôle de sécurité, avec un rapport détaillé remis à l'issue de l'intervention.",
  },
  {
    question: "Comment prendre rendez-vous ?",
    answer:
      "Une fois votre contrat souscrit, notre équipe vous contacte pour planifier l'intervention à une date qui vous convient, généralement sous 48 à 72h.",
  },
];
