export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
  readingMinutes: number;
  body: ArticleBlock[];
}

/** Articles publiés le 29/09/2026 : premier lot du blog conseils. */
export const articles: Article[] = [
  {
    slug: "maprimerenov-2026-montants-conditions",
    title: "MaPrimeRénov' 2026 : montants et conditions pour une pompe à chaleur",
    excerpt: "Barème par profil de revenus, cumul avec les CEE, conditions d'éligibilité : ce qu'il faut savoir avant de lancer votre projet.",
    category: "Aides & subventions",
    image: "/images/solutions/r1.jpg",
    publishedAt: "2026-09-29",
    readingMinutes: 4,
    body: [
      {
        type: "p",
        text: "MaPrimeRénov' est l'aide principale de l'État pour financer l'installation d'une pompe à chaleur. Son montant dépend de vos revenus, calculés selon un barème par profil de couleur (bleu, jaune, violet, rose) qui tient compte de la taille de votre foyer et de votre zone géographique.",
      },
      { type: "h2", text: "Les montants par profil" },
      {
        type: "list",
        items: [
          "Profil bleu (très modeste) : jusqu'à 5 000 €",
          "Profil jaune (modeste) : jusqu'à 4 000 €",
          "Profil violet (intermédiaire) : jusqu'à 3 000 €",
          "Profil rose (aisé) : non éligible à MaPrimeRénov', mais peut bénéficier des CEE",
        ],
      },
      {
        type: "p",
        text: "Ces montants concernent l'installation d'une pompe à chaleur par une entreprise certifiée RGE, condition indispensable pour bénéficier de l'aide. Votre logement doit être votre résidence principale, achevée depuis plus de 15 ans (2 ans pour un remplacement de chaudière au fioul ou au charbon).",
      },
      { type: "h2", text: "Cumuler MaPrimeRénov' avec d'autres aides" },
      {
        type: "p",
        text: "MaPrimeRénov' est cumulable avec les certificats d'économies d'énergie (CEE), l'éco-prêt à taux zéro et, selon votre commune ou région, des aides locales complémentaires. Ce cumul permet souvent de réduire significativement le reste à charge.",
      },
      {
        type: "callout",
        text: "Le plus simple : utilisez notre simulateur gratuit pour connaître votre profil et estimer le montant de vos aides en 2 minutes.",
      },
    ],
  },
  {
    slug: "comprendre-les-cee",
    title: "CEE : comment fonctionnent les certificats d'économies d'énergie ?",
    excerpt: "Une prime versée par les fournisseurs d'énergie, cumulable avec MaPrimeRénov'. On vous explique le principe et les montants.",
    category: "Aides & subventions",
    image: "/images/cee2.jpg",
    publishedAt: "2026-09-29",
    readingMinutes: 3,
    body: [
      {
        type: "p",
        text: "Le dispositif des Certificats d'Économies d'Énergie (CEE) oblige les fournisseurs d'énergie (électricité, gaz, fioul...) à financer des actions d'économies d'énergie chez les particuliers. Concrètement, cela se traduit par une prime versée lors de l'installation d'un équipement performant comme une pompe à chaleur.",
      },
      { type: "h2", text: "Quel montant espérer ?" },
      {
        type: "p",
        text: "Le montant de la prime CEE dépend de vos revenus et du type de chauffage remplacé. Le \"coup de pouce chauffage\" bonifie la prime lorsque vous remplacez une chaudière au fioul ou au gaz :",
      },
      {
        type: "list",
        items: [
          "Remplacement d'une chaudière fioul ou gaz : de 2 000 € à 5 500 € selon vos revenus",
          "Autre remplacement (chaudière électrique, convecteurs...) : de 800 € à 2 500 € selon vos revenus",
        ],
      },
      { type: "h2", text: "Cumulable avec MaPrimeRénov'" },
      {
        type: "p",
        text: "Contrairement à une idée reçue, les CEE ne remplacent pas MaPrimeRénov' : les deux aides se cumulent. C'est ce cumul qui permet, pour une pompe à chaleur, d'atteindre plusieurs milliers d'euros d'aides sur un même projet.",
      },
      {
        type: "callout",
        text: "Label Énergie monte le dossier CEE pour vous : aucune démarche administrative à votre charge.",
      },
    ],
  },
  {
    slug: "pac-air-air-ou-air-eau",
    title: "Pompe à chaleur air/air ou air/eau : quelle différence ?",
    excerpt: "Les deux technologies n'ont pas le même usage. Voici comment savoir laquelle correspond à votre logement.",
    category: "Choisir son équipement",
    image: "/images/solutions/pac2.jpg",
    publishedAt: "2026-09-29",
    readingMinutes: 3,
    body: [
      {
        type: "p",
        text: "Pompe à chaleur air/air et pompe à chaleur air/eau captent toutes les deux les calories de l'air extérieur, mais elles ne diffusent pas la chaleur de la même façon dans votre logement.",
      },
      { type: "h2", text: "La pompe à chaleur air/air" },
      {
        type: "p",
        text: "Elle diffuse l'air chauffé (ou rafraîchi en été) directement dans les pièces via des unités murales, comme une climatisation réversible. Elle ne produit pas d'eau chaude sanitaire et ne se raccorde pas à un réseau de radiateurs existant.",
      },
      { type: "h2", text: "La pompe à chaleur air/eau" },
      {
        type: "p",
        text: "Elle chauffe l'eau qui circule dans vos radiateurs, votre plancher chauffant ou votre ballon d'eau chaude. Elle remplace très bien une chaudière fioul ou gaz sur une installation existante.",
      },
      { type: "h2", text: "Laquelle choisir ?" },
      {
        type: "list",
        items: [
          "Vous avez des radiateurs à eau ou un plancher chauffant : la PAC air/eau est adaptée",
          "Vous n'avez pas de réseau hydraulique, ou vous souhaitez aussi la climatisation l'été : la PAC air/air est adaptée",
          "Dans tous les cas, une étude thermique gratuite permet de dimensionner l'équipement à votre logement",
        ],
      },
    ],
  },
  {
    slug: "bien-entretenir-sa-pompe-a-chaleur",
    title: "Bien entretenir sa pompe à chaleur : nos conseils",
    excerpt: "Un entretien régulier prolonge la durée de vie de votre équipement et préserve ses performances. Voici pourquoi et comment.",
    category: "Entretien & maintenance",
    image: "/images/solutions/r4.jpg",
    publishedAt: "2026-09-29",
    readingMinutes: 3,
    body: [
      {
        type: "p",
        text: "Comme tout équipement thermique, une pompe à chaleur a besoin d'un entretien régulier pour conserver ses performances et sa durée de vie.",
      },
      { type: "h2", text: "Que fait le technicien lors d'une visite ?" },
      {
        type: "p",
        text: "Une visite annuelle préventive permet de contrôler, nettoyer et optimiser votre installation : vérification des pressions, nettoyage des filtres et de l'unité extérieure, contrôle des raccordements et des performances de l'équipement.",
      },
      { type: "h2", text: "Pourquoi c'est important" },
      {
        type: "list",
        items: [
          "Préserver les performances énergétiques et éviter la surconsommation",
          "Prolonger la durée de vie de l'équipement",
          "Respecter les conditions de garantie constructeur",
          "Détecter une anomalie avant qu'elle ne devienne une panne",
        ],
      },
      {
        type: "p",
        text: "Avec un contrat d'entretien (formules Standard, Premium ou VIP), la visite annuelle est planifiée automatiquement et vous n'avez rien à faire.",
      },
      {
        type: "callout",
        text: "Découvrez nos formules d'entretien pour pompe à chaleur, solaire et chauffe-eau.",
      },
    ],
  },
  {
    slug: "financer-vos-travaux-de-renovation-energetique",
    title: "Comment financer vos travaux de rénovation énergétique ?",
    excerpt: "Prêt à taux fixe, paiement en plusieurs fois, éco-prêt à taux zéro : les solutions pour financer votre projet sans avancer les fonds.",
    category: "Aides & subventions",
    image: "/images/solutions/cesi1.jpg",
    publishedAt: "2026-09-29",
    readingMinutes: 3,
    body: [
      {
        type: "p",
        text: "Entre les aides de l'État et les solutions de financement, il existe plusieurs façons de financer vos travaux de rénovation énergétique sans avancer l'intégralité des fonds.",
      },
      { type: "h2", text: "Les solutions de financement" },
      {
        type: "list",
        items: [
          "Prêt travaux à taux fixe, de 12 à 120 mois, avec des remboursements mensuels constants",
          "Paiement en 3 ou 4 fois sans frais",
          "Éco-prêt à taux zéro (Éco-PTZ), sans intérêts, pour les travaux de rénovation énergétique",
        ],
      },
      {
        type: "p",
        text: "Ces solutions se combinent avec MaPrimeRénov' et les CEE : les aides viennent réduire le montant à financer, et le reste à charge peut être étalé dans le temps.",
      },
      {
        type: "callout",
        text: "Votre conseiller Label Énergie vous oriente vers la solution la plus adaptée à votre situation, sans engagement.",
      },
    ],
  },
  {
    slug: "5-gestes-pour-reduire-votre-facture-denergie",
    title: "5 gestes simples pour réduire votre facture d'énergie",
    excerpt: "Pas besoin de gros travaux pour commencer à économiser : voici des gestes simples et efficaces au quotidien.",
    category: "Économies d'énergie",
    image: "/images/solutions/btd.jpg",
    publishedAt: "2026-09-29",
    readingMinutes: 2,
    body: [
      {
        type: "p",
        text: "En attendant ou en complément de travaux de rénovation, quelques gestes simples permettent déjà de réduire votre consommation d'énergie.",
      },
      {
        type: "list",
        items: [
          "Baissez la température de 1°C : cela représente environ 7% d'économies sur votre facture de chauffage",
          "Profitez du soleil : ouvrez vos volets le jour, fermez-les la nuit en hiver pour limiter les déperditions",
          "Entretenez vos équipements : un chauffage bien entretenu consomme moins et dure plus longtemps",
          "Purgez vos radiateurs en début de saison de chauffe pour qu'ils diffusent bien la chaleur",
          "Utilisez un thermostat programmable pour adapter le chauffage à votre présence réelle",
        ],
      },
      {
        type: "p",
        text: "Ces gestes ne remplacent pas une isolation ou un équipement performant, mais ils permettent de commencer à réduire votre facture dès aujourd'hui, sans travaux.",
      },
    ],
  },
];

export const articleSlugs = articles.map((a) => a.slug);
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
