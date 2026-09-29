// Catalogue réel des contrats d'entretien (identique au CRM / portail Entretien : mêmes produits, formules et tarifs).

export type ProductId =
  | "pompe-air-eau"
  | "pompe-air-air"
  | "chauffe-eau-thermodynamique"
  | "poele-granule"
  | "chaudiere-granule"
  | "systeme-solaire-combine";

export type FormulaId = "standard" | "premium" | "vip";

export interface EquipmentType {
  slug: ProductId;
  label: string;
  icon: string;
  /** Libellé utilisé dans le CRM, le contrat PDF et le backend (à ne pas modifier). */
  crmName: string;
}

export const equipmentTypes: EquipmentType[] = [
  { slug: "pompe-air-eau", label: "Pompe à chaleur Air/Eau", icon: "Fan", crmName: "Pompe à chaleur Air/Eau" },
  { slug: "pompe-air-air", label: "Pompe à chaleur Air/Air", icon: "Fan", crmName: "Pompe à chaleur Air/Air" },
  { slug: "chauffe-eau-thermodynamique", label: "Chauffe-eau thermodynamique", icon: "Droplets", crmName: "Chauffe-eau thermodynamique" },
  { slug: "poele-granule", label: "Poêle à granulés", icon: "Flame", crmName: "Poêle à granule" },
  { slug: "chaudiere-granule", label: "Chaudière à granulés", icon: "Flame", crmName: "Chaudière à granule" },
  { slug: "systeme-solaire-combine", label: "Système solaire combiné", icon: "SunMedium", crmName: "Système solaire combiné" },
];

/** Mensualité TTC par équipement et par formule. */
const monthlyPrices: Record<ProductId, Record<FormulaId, number>> = {
  "pompe-air-eau": { standard: 19.9, premium: 24.9, vip: 34.9 },
  "pompe-air-air": { standard: 19.9, premium: 24.9, vip: 34.9 },
  "chauffe-eau-thermodynamique": { standard: 9.9, premium: 14.9, vip: 19.9 },
  "poele-granule": { standard: 12.9, premium: 19.9, vip: 24.9 },
  "chaudiere-granule": { standard: 24.9, premium: 34.9, vip: 39.9 },
  "systeme-solaire-combine": { standard: 24.9, premium: 34.9, vip: 39.9 },
};

export const isProductId = (v: unknown): v is ProductId => typeof v === "string" && v in monthlyPrices;
export const isFormulaId = (v: unknown): v is FormulaId => v === "standard" || v === "premium" || v === "vip";

export const productPrice = (product: ProductId, formula: FormulaId): number => monthlyPrices[product][formula];

/** Mensualité totale (somme des équipements), arrondie au centime. */
export function totalMonthly(products: ProductId[], formula: FormulaId): number {
  return Math.round(products.reduce((sum, p) => sum + monthlyPrices[p][formula], 0) * 100) / 100;
}

/** Prix d'appel « dès » d'une formule (équipement le moins cher). */
export const minMonthly = (formula: FormulaId): number =>
  Math.min(...equipmentTypes.map((e) => monthlyPrices[e.slug][formula]));

export const formatEuro = (n: number): string => `${n.toFixed(2).replace(".", ",")} €`;

export interface ContractPlan {
  slug: FormulaId;
  /** Badge au-dessus du nom (copie exacte du CRM, affiché en majuscules via CSS). */
  kicker: string;
  name: string;
  /** Prix d'appel mensuel TTC (« à partir de »). */
  price: number;
  priceLabel: string;
  /** Précision sous le prix (uniquement sur Standard dans le CRM). */
  priceNote?: string;
  /** Paragraphe de présentation. */
  tagline: string;
  /** En-tête de liste mis en avant ("Tout le Standard, plus :"), absent sur Standard. */
  highlightIntro?: string;
  recommended?: boolean;
  features: string[];
}

export const contractPlans: ContractPlan[] = [
  {
    slug: "standard",
    kicker: "Essentiel",
    name: "Standard",
    price: minMonthly("standard"),
    priceLabel: `À partir de ${formatEuro(minMonthly("standard"))} /mois`,
    priceNote: "Selon équipement",
    tagline: "Pour garder l'essentiel sous contrôle avec une visite annuelle et une priorité d'intervention.",
    features: [
      "1 visite annuelle préventive",
      "2 dépannages/an par équipement",
      "Délai d'intervention sous 7 jours ouvrés",
      "Attestation d'entretien officielle",
      "Accès hotline 01 81 72 39 59",
    ],
  },
  {
    slug: "premium",
    kicker: "Recommandé",
    name: "Premium",
    price: minMonthly("premium"),
    priceLabel: `À partir de ${formatEuro(minMonthly("premium"))} /mois`,
    tagline: "Le meilleur équilibre entre sérénité, rapidité d'intervention et confort de suivi au quotidien.",
    highlightIntro: "Tout le Standard, plus :",
    recommended: true,
    features: [
      "3 dépannages/an (au lieu de 2)",
      "Délai d'intervention sous 5 jours ouvrés",
      "Priorité renforcée — tête de file",
      "−10% sur pièces de rechange",
      "Hotline directe technicien senior",
    ],
  },
  {
    slug: "vip",
    kicker: "maximal",
    name: "VIP",
    price: minMonthly("vip"),
    priceLabel: `À partir de ${formatEuro(minMonthly("vip"))} /mois`,
    tagline: "Pour les clients qui veulent une prise en charge prioritaire avec le niveau de service le plus élevé.",
    highlightIntro: "Tout le Premium, plus :",
    features: [
      "Dépannages illimités en usage normal",
      "Délai d'intervention sous 3 jours ouvrés",
      "Priorité absolue — premier servi",
      "−30% sur les pièces de rechange",
      "Main-d'œuvre dépannage incluse",
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
