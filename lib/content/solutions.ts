export interface SolutionVariant {
  title: string;
  text: string;
  image: string;
}

export interface SolutionContent {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  breadcrumbLabel: string;
  category: string;
  h1: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  heroImageAspect?: string;
  heroBadge?: { icon: string; text: string };
  quickBenefits: { icon: string; title: string; text: string }[];
  benefitCards?: { icon: string; title: string; text: string }[];
  highlights: { icon: string; title: string; text: string }[];
  howItWorks: {
    title: string;
    intro: string;
    steps: { n: number; title: string; text: string }[];
    image: string;
    imageAlt: string;
    imageAspect?: string;
  };
  variants?: {
    title: string;
    items: SolutionVariant[];
  };
  aides: {
    amount: string;
    text: string;
    items: string[];
  };
  ctaTicks: string[];
  faq: { question: string; answer: string }[];
}

export const defaultCtaTicks = [
  "Étude gratuite et personnalisée",
  "Installation par nos équipes RGE",
  "Matériel de qualité",
  "Garantie et SAV assurés",
  "Accompagnement de A à Z",
];

export const solutions: Record<string, SolutionContent> = {
  "pompe-a-chaleur": {
    slug: "pompe-a-chaleur",
    seoTitle: "Pompe à chaleur : installation par un expert RGE",
    metaDescription:
      "Chauffez mieux, consommez moins avec une pompe à chaleur Air/Eau, Air/Air ou géothermique. Étude gratuite, jusqu'à 10 000 € d'aides, installation par Label Énergie.",
    breadcrumbLabel: "Pompe à chaleur",
    category: "POMPE À CHALEUR",
    h1: "Chauffez mieux, consommez moins.",
    intro:
      "La pompe à chaleur capte les calories présentes dans l'air, l'eau ou le sol pour chauffer votre logement et votre eau chaude sanitaire. Une solution économique, écologique et durable.",
    heroImage:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Unité extérieure de pompe à chaleur installée par Label Énergie",
    heroBadge: { icon: "Leaf", text: "Une énergie renouvelable, gratuite et disponible toute l'année." },
    quickBenefits: [
      { icon: "PiggyBank", title: "Jusqu'à 70 % d'économies", text: "sur votre facture de chauffage." },
      { icon: "ThermometerSun", title: "Confort toute l'année", text: "chauffage en hiver, rafraîchissement possible en été." },
      { icon: "Leaf", title: "Énergie renouvelable", text: "réduit votre impact carbone." },
      { icon: "BadgePercent", title: "Aides & subventions", text: "MaPrimeRénov', CEE, éco-prêt à taux 0." },
    ],
    highlights: [
      { icon: "PiggyBank", title: "Économies d'énergie", text: "Jusqu'à 70 % d'économies sur votre facture de chauffage." },
      { icon: "Leaf", title: "Écologique", text: "Une énergie renouvelable qui réduit votre impact carbone." },
      { icon: "ThermometerSun", title: "Confort", text: "Une chaleur douce et homogène toute l'année." },
      { icon: "Clock", title: "Autonomie", text: "Un fonctionnement automatique, sans intervention au quotidien." },
      { icon: "BadgePercent", title: "Aides financières", text: "MaPrimeRénov', CEE, éco-prêt à taux 0." },
    ],
    howItWorks: {
      title: "Comment fonctionne une pompe à chaleur ?",
      intro:
        "Elle capte les calories gratuites présentes dans l'environnement pour les transformer en chaleur dans votre logement.",
      steps: [
        { n: 1, title: "Captation", text: "Elle capte les calories dans l'air, l'eau ou le sol." },
        { n: 2, title: "Compression", text: "Elle augmente la température grâce à un système de compression." },
        { n: 3, title: "Restitution", text: "Elle restitue la chaleur dans votre logement via vos émetteurs." },
      ],
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Schéma de fonctionnement d'une pompe à chaleur",
    },
    variants: {
      title: "Quelle pompe à chaleur pour votre logement ?",
      items: [
        {
          title: "Pompe à chaleur Air / Eau",
          text: "Idéale pour remplacer une chaudière et alimenter vos radiateurs ou votre plancher chauffant.",
          image:
            "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Pompe à chaleur Air / Air",
          text: "Parfaite pour chauffer ou rafraîchir votre logement avec des unités intérieures (climatisation réversible).",
          image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Pompe à chaleur Géothermique",
          text: "Utilise la chaleur du sol pour un rendement optimal et des économies maximales.",
          image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    aides: {
      amount: "10 000 €",
      text: "d'aides pour l'installation d'une pompe à chaleur*",
      items: ["MaPrimeRénov'", "Certificats d'économies d'énergie (CEE)", "TVA réduite à 5,5 %"],
    },
    ctaTicks: defaultCtaTicks,
    faq: [
      {
        question: "Quelle est la durée de vie d'une pompe à chaleur ?",
        answer:
          "Une pompe à chaleur bien entretenue dure généralement entre 15 et 20 ans. Un contrat d'entretien annuel permet de préserver ses performances et sa durée de vie.",
      },
      {
        question: "Une pompe à chaleur fonctionne-t-elle par grand froid ?",
        answer:
          "Les modèles installés par Label Énergie restent performants jusqu'à -20°C, avec un appoint électrique intégré pour les pics de froid les plus rares.",
      },
    ],
  },

  "pompe-a-chaleur-air-eau": {
    slug: "pompe-a-chaleur-air-eau",
    seoTitle: "Pompe à chaleur Air/Eau : remplacez votre chaudière",
    metaDescription:
      "La pompe à chaleur Air/Eau chauffe votre logement et votre eau chaude sanitaire via vos radiateurs ou plancher chauffant. Jusqu'à 70 % d'économies, éligible MaPrimeRénov'.",
    breadcrumbLabel: "Pompe à chaleur Air/Eau",
    category: "POMPE À CHALEUR AIR/EAU",
    h1: "Remplacez votre chaudière par une PAC Air/Eau.",
    intro:
      "La pompe à chaleur Air/Eau capte les calories de l'air extérieur pour chauffer l'eau qui alimente vos radiateurs, votre plancher chauffant et votre ballon d'eau chaude.",
    heroImage:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Pompe à chaleur Air/Eau installée à l'extérieur d'une maison",
    heroBadge: { icon: "Leaf", text: "Compatible avec vos radiateurs et votre plancher chauffant existants." },
    quickBenefits: [
      { icon: "PiggyBank", title: "Jusqu'à 70 % d'économies", text: "par rapport à une chaudière au fioul ou au gaz." },
      { icon: "ThermometerSun", title: "Compatible radiateurs", text: "et plancher chauffant existants." },
      { icon: "Leaf", title: "Énergie renouvelable", text: "et respectueuse de l'environnement." },
      { icon: "BadgePercent", title: "Éligible aux aides", text: "MaPrimeRénov', CEE, TVA à 5,5 %." },
    ],
    highlights: [
      { icon: "PiggyBank", title: "Économies d'énergie", text: "Jusqu'à 70 % d'économies par rapport au fioul ou au gaz." },
      { icon: "ThermometerSun", title: "Confort", text: "Chauffe votre logement et votre eau chaude sanitaire." },
      { icon: "Leaf", title: "Écologique", text: "Une énergie renouvelable et respectueuse de l'environnement." },
      { icon: "Wrench", title: "Installation rapide", text: "Remplacement de chaudière en 1 à 2 jours." },
      { icon: "BadgePercent", title: "Aides financières", text: "MaPrimeRénov', CEE, TVA à 5,5 %." },
    ],
    howItWorks: {
      title: "Comment fonctionne une PAC Air/Eau ?",
      intro: "Elle transfère la chaleur captée dans l'air vers l'eau de votre circuit de chauffage.",
      steps: [
        { n: 1, title: "Captation", text: "L'unité extérieure capte les calories de l'air ambiant." },
        { n: 2, title: "Compression", text: "Un compresseur élève la température du fluide caloporteur." },
        { n: 3, title: "Distribution", text: "La chaleur est transmise à l'eau de vos radiateurs ou plancher chauffant." },
      ],
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Schéma de fonctionnement d'une pompe à chaleur Air/Eau",
    },
    aides: {
      amount: "10 000 €",
      text: "d'aides pour l'installation d'une PAC Air/Eau*",
      items: ["MaPrimeRénov'", "Certificats d'économies d'énergie (CEE)", "TVA réduite à 5,5 %"],
    },
    ctaTicks: defaultCtaTicks,
    faq: [
      {
        question: "Puis-je garder mes radiateurs actuels ?",
        answer:
          "Dans la majorité des cas, oui. Nos techniciens vérifient le dimensionnement de vos émetteurs lors de l'étude gratuite.",
      },
    ],
  },

  "pompe-a-chaleur-air-air": {
    slug: "pompe-a-chaleur-air-air",
    seoTitle: "Pompe à chaleur Air/Air : chauffage et climatisation réversible",
    metaDescription:
      "PAC Air/Air : chauffez en hiver, rafraîchissez en été. Jusqu'à 70 % d'économies, installation rapide, éligible MaPrimeRénov' et CEE. Devis gratuit avec Label Énergie.",
    breadcrumbLabel: "Pompe à chaleur Air/Air",
    category: "POMPE À CHALEUR AIR/AIR",
    h1: "PAC Air/Air, le confort sur mesure en toute saison.",
    intro:
      "La pompe à chaleur Air/Air (climatisation réversible) vous offre un confort optimal et des économies d'énergie jusqu'à 70 % par rapport à un chauffage électrique classique.",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Unité intérieure de climatisation réversible dans un salon",
    heroBadge: { icon: "Waves", text: "Chauffage l'hiver, climatisation l'été : un confort toute l'année." },
    quickBenefits: [
      { icon: "PiggyBank", title: "Jusqu'à 70 % d'économies", text: "d'énergie par rapport au chauffage électrique." },
      { icon: "ThermometerSun", title: "Confort en toutes saisons", text: "chauffage l'hiver, climatisation l'été." },
      { icon: "Waves", title: "Technologie Inverter", text: "haute performance et fonctionnement silencieux." },
      { icon: "BadgePercent", title: "Éligible MaPrimeRénov'", text: "et aux certificats d'économies d'énergie (CEE)." },
    ],
    highlights: [
      { icon: "PiggyBank", title: "Économies d'énergie", text: "Jusqu'à 70 % d'économies vs. chauffage électrique." },
      { icon: "ThermometerSun", title: "Confort toute saison", text: "Chauffage l'hiver, rafraîchissement l'été." },
      { icon: "Waves", title: "Technologie Inverter", text: "Un fonctionnement silencieux dès 19 dB(A)." },
      { icon: "Sparkles", title: "Design discret", text: "Des unités qui s'intègrent à votre décoration." },
      { icon: "BadgePercent", title: "Aides financières", text: "MaPrimeRénov' et certificats d'économies d'énergie." },
    ],
    howItWorks: {
      title: "Comment fonctionne une PAC Air/Air ?",
      intro: "Elle capte les calories de l'air extérieur pour chauffer ou rafraîchir l'air intérieur.",
      steps: [
        { n: 1, title: "Simulation en ligne", text: "Estimez votre projet et vos aides en 2 minutes." },
        { n: 2, title: "Étude personnalisée", text: "Un conseiller analyse vos besoins et votre logement." },
        { n: 3, title: "Devis gratuit", text: "Recevez une proposition détaillée et sans engagement." },
        { n: 4, title: "Planification", text: "Nous fixons ensemble la date d'intervention qui vous convient." },
        { n: 5, title: "Installation", text: "Nos techniciens installent votre équipement." },
        { n: 6, title: "Mise en service", text: "Nous testons, réglons et vous expliquons le fonctionnement." },
      ],
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Installation d'une climatisation réversible",
    },
    variants: {
      title: "Une solution adaptée à tous vos besoins",
      items: [
        {
          title: "Monosplit",
          text: "Une unité intérieure pour climatiser ou chauffer une pièce. Idéal pour chambre, bureau, salon.",
          image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Multi-split",
          text: "Plusieurs unités intérieures raccordées à une seule unité extérieure. Idéal pour maison, étage, plusieurs pièces.",
          image:
            "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Console & gainable",
          text: "Des solutions discrètes et performantes pour tous les intérieurs, idéal pour intégration discrète.",
          image:
            "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    aides: {
      amount: "5 000 €",
      text: "d'aides disponibles (MaPrimeRénov', CEE, aides locales)*",
      items: ["MaPrimeRénov'", "Certificats d'économies d'énergie (CEE)", "Aides locales selon votre région"],
    },
    ctaTicks: defaultCtaTicks,
    faq: [
      {
        question: "Quelle est la différence entre climatisation et PAC Air/Air ?",
        answer:
          "Une PAC Air/Air est une climatisation réversible : elle rafraîchit en été et chauffe en hiver, contrairement à une climatisation simple qui ne fait que rafraîchir.",
      },
      {
        question: "Le bruit est-il gênant à l'intérieur ?",
        answer:
          "Les modèles récents Inverter que nous installons descendent jusqu'à 19 dB(A), soit un fonctionnement quasiment silencieux.",
      },
    ],
  },

  "pompe-a-chaleur-geothermie": {
    slug: "pompe-a-chaleur-geothermie",
    seoTitle: "Pompe à chaleur géothermique : rendement maximal",
    metaDescription:
      "La pompe à chaleur géothermique puise l'énergie du sol pour un chauffage stable et très économique toute l'année. Étude gratuite et aides MaPrimeRénov'.",
    breadcrumbLabel: "Pompe à chaleur Géothermique",
    category: "POMPE À CHALEUR GÉOTHERMIQUE",
    h1: "La chaleur du sol, une énergie stable et performante.",
    intro:
      "La pompe à chaleur géothermique capte l'énergie stockée dans le sol pour chauffer votre logement avec un rendement optimal, quelle que soit la saison.",
    heroImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Chantier de forage pour pompe à chaleur géothermique",
    heroBadge: { icon: "Leaf", text: "La chaleur stable du sol, pour un rendement optimal toute l'année." },
    quickBenefits: [
      { icon: "PiggyBank", title: "Rendement optimal", text: "une température de sol stable toute l'année." },
      { icon: "ThermometerSun", title: "Économies maximales", text: "sur le long terme." },
      { icon: "Leaf", title: "Très faible impact carbone", text: "énergie puisée localement." },
      { icon: "BadgePercent", title: "Éligible aux aides", text: "MaPrimeRénov' et CEE." },
    ],
    highlights: [
      { icon: "ThermometerSun", title: "Rendement optimal", text: "Une température de sol stable en toutes saisons." },
      { icon: "PiggyBank", title: "Économies maximales", text: "Les factures de chauffage les plus basses sur la durée." },
      { icon: "Leaf", title: "Très faible impact", text: "Une énergie puisée localement, quasiment inépuisable." },
      { icon: "Clock", title: "Longévité", text: "Une durée de vie supérieure à 20 ans." },
      { icon: "BadgePercent", title: "Aides financières", text: "MaPrimeRénov' et certificats d'économies d'énergie." },
    ],
    howItWorks: {
      title: "Comment fonctionne une PAC géothermique ?",
      intro: "Elle capte la chaleur du sol via des capteurs enterrés puis la restitue dans le logement.",
      steps: [
        { n: 1, title: "Captation au sol", text: "Des capteurs horizontaux ou verticaux captent la chaleur du sol." },
        { n: 2, title: "Compression", text: "La pompe à chaleur élève la température captée." },
        { n: 3, title: "Distribution", text: "La chaleur est restituée via vos émetteurs (radiateurs, plancher chauffant)." },
      ],
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Schéma de fonctionnement d'une pompe à chaleur géothermique",
    },
    aides: {
      amount: "10 000 €",
      text: "d'aides pour l'installation d'une PAC géothermique*",
      items: ["MaPrimeRénov'", "Certificats d'économies d'énergie (CEE)", "TVA réduite à 5,5 %"],
    },
    ctaTicks: defaultCtaTicks,
    faq: [
      {
        question: "Quelle surface de terrain est nécessaire ?",
        answer:
          "Cela dépend du type de capteurs (horizontaux ou verticaux) et de la surface à chauffer. Notre étude gratuite détermine la solution la plus adaptée à votre terrain.",
      },
    ],
  },

  climatisation: {
    slug: "climatisation",
    seoTitle: "Climatisation : installation et entretien par un pro RGE",
    metaDescription:
      "Installez une climatisation performante et silencieuse avec Label Énergie. Monosplit, multi-split, gainable : devis gratuit et pose par des techniciens certifiés.",
    breadcrumbLabel: "Climatisation",
    category: "CLIMATISATION",
    h1: "Un confort frais et maîtrisé, été comme hiver.",
    intro:
      "Nos solutions de climatisation réversible rafraîchissent votre intérieur en été et complètent votre chauffage en hiver, avec une consommation maîtrisée.",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Climatisation murale installée dans un salon lumineux",
    heroBadge: { icon: "Waves", text: "Un air frais et sain, été comme hiver." },
    quickBenefits: [
      { icon: "ThermometerSun", title: "Confort toute l'année", text: "rafraîchissement l'été, chauffage d'appoint l'hiver." },
      { icon: "Waves", title: "Fonctionnement silencieux", text: "dès 19 dB(A) pour les modèles Inverter." },
      { icon: "PiggyBank", title: "Consommation maîtrisée", text: "grâce à la technologie Inverter haute performance." },
      { icon: "BadgePercent", title: "Installation rapide", text: "sans gros travaux, par des techniciens certifiés." },
    ],
    highlights: [
      { icon: "ThermometerSun", title: "Confort toute l'année", text: "Rafraîchissement l'été, chauffage d'appoint l'hiver." },
      { icon: "Waves", title: "Silencieux", text: "Dès 19 dB(A) pour les modèles Inverter." },
      { icon: "PiggyBank", title: "Consommation maîtrisée", text: "Grâce à la technologie Inverter haute performance." },
      { icon: "Wrench", title: "Installation rapide", text: "Sans gros travaux, posée en une journée." },
      { icon: "BadgePercent", title: "Aides possibles", text: "Éligible sous conditions à certaines aides de l'État." },
    ],
    howItWorks: {
      title: "Comment se déroule l'installation ?",
      intro: "Un parcours simple, de l'étude à la mise en service.",
      steps: [
        { n: 1, title: "Étude gratuite", text: "Nous évaluons vos besoins et la configuration de votre logement." },
        { n: 2, title: "Devis & pose", text: "Installation par nos techniciens qualifiés RGE." },
        { n: 3, title: "Mise en service", text: "Réglages et explications d'utilisation." },
      ],
      image:
        "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Technicien installant une climatisation murale",
    },
    aides: {
      amount: "5 000 €",
      text: "d'aides pour une climatisation réversible éligible*",
      items: [
        "Certificats d'économies d'énergie (CEE) sous conditions",
        "TVA réduite à 5,5 % pose comprise",
        "Aides locales selon votre région",
      ],
    },
    ctaTicks: defaultCtaTicks,
    faq: [
      {
        question: "Faut-il une autorisation pour installer une climatisation ?",
        answer:
          "En maison individuelle, aucune autorisation n'est généralement nécessaire. En copropriété ou zone protégée, une déclaration préalable peut être requise : nous vous accompagnons dans ces démarches.",
      },
    ],
  },

  "panneaux-photovoltaiques": {
    slug: "panneaux-photovoltaiques",
    seoTitle: "Panneaux solaires photovoltaïques : produisez votre électricité",
    metaDescription:
      "Installez des panneaux photovoltaïques et réduisez votre facture d'électricité grâce à l'autoconsommation. Étude gratuite, aides et revente du surplus avec Label Énergie.",
    breadcrumbLabel: "Panneaux photovoltaïques",
    category: "SOLAIRE PHOTOVOLTAÏQUE",
    h1: "Produisez votre électricité, gagnez en autonomie.",
    intro:
      "Les panneaux photovoltaïques transforment l'énergie du soleil en électricité pour votre logement. Autoconsommez et revendez votre surplus.",
    heroImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Panneaux photovoltaïques installés sur une toiture",
    heroBadge: { icon: "Sun", text: "Une énergie gratuite et propre, produite directement sur votre toit." },
    quickBenefits: [
      { icon: "PiggyBank", title: "Jusqu'à 60 % d'économies", text: "sur votre facture d'électricité." },
      { icon: "Sun", title: "Énergie gratuite et propre", text: "produite directement sur votre toit." },
      { icon: "Leaf", title: "Revente du surplus", text: "à EDF OA, notre partenaire officiel." },
      { icon: "BadgePercent", title: "Prime à l'autoconsommation", text: "et TVA réduite selon votre projet." },
    ],
    highlights: [
      { icon: "PiggyBank", title: "Économies d'énergie", text: "Jusqu'à 60 % d'économies sur votre facture d'électricité." },
      { icon: "Sun", title: "Énergie gratuite", text: "Produite directement sur votre toiture." },
      { icon: "Leaf", title: "Revente du surplus", text: "À EDF OA, notre partenaire officiel." },
      { icon: "Clock", title: "Faible entretien", text: "Une installation durable, sans entretien complexe." },
      { icon: "BadgePercent", title: "Aides financières", text: "Prime à l'autoconsommation et TVA réduite." },
    ],
    howItWorks: {
      title: "Comment fonctionne une installation photovoltaïque ?",
      intro: "Les panneaux captent la lumière du soleil et la convertissent en électricité utilisable.",
      steps: [
        { n: 1, title: "Captation", text: "Les panneaux captent l'énergie lumineuse du soleil." },
        { n: 2, title: "Conversion", text: "Un onduleur transforme le courant continu en courant alternatif." },
        { n: 3, title: "Utilisation", text: "L'électricité alimente votre logement, le surplus est revendu ou stocké." },
      ],
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Schéma de fonctionnement d'une installation photovoltaïque",
    },
    aides: {
      amount: "8 000 €",
      text: "d'aides et primes pour une installation photovoltaïque*",
      items: ["Prime à l'autoconsommation", "Revente du surplus à EDF OA", "TVA réduite selon la puissance installée"],
    },
    ctaTicks: defaultCtaTicks,
    faq: [
      {
        question: "Combien de panneaux sont nécessaires pour ma maison ?",
        answer:
          "Cela dépend de votre consommation, de la surface de toiture disponible et de son orientation. Notre étude gratuite détermine le dimensionnement optimal.",
      },
    ],
  },

  "systeme-solaire-combine": {
    slug: "systeme-solaire-combine",
    seoTitle: "Système solaire combiné (SSC) : chauffage et eau chaude solaire",
    metaDescription:
      "Le système solaire combiné chauffe votre logement et produit votre eau chaude sanitaire grâce à l'énergie solaire. La solution 2-en-1 économique avec Label Énergie.",
    breadcrumbLabel: "Système solaire combiné",
    category: "SYSTÈME SOLAIRE COMBINÉ",
    h1: "Chauffage et eau chaude solaire, la solution 2-en-1.",
    intro:
      "Le système solaire combiné (SSC) utilise l'énergie du soleil pour couvrir une partie de vos besoins de chauffage et la totalité de votre eau chaude sanitaire.",
    heroImage:
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Capteurs solaires thermiques sur une toiture",
    heroBadge: { icon: "Sun", text: "Chauffage et eau chaude solaire, la solution 2-en-1." },
    quickBenefits: [
      { icon: "PiggyBank", title: "Jusqu'à 60 % d'économies", text: "sur chauffage et eau chaude combinés." },
      { icon: "Sun", title: "Énergie solaire gratuite", text: "captée directement sur votre toiture." },
      { icon: "Leaf", title: "2 besoins couverts", text: "chauffage et eau chaude sanitaire." },
      { icon: "BadgePercent", title: "Éligible aux aides", text: "MaPrimeRénov', CEE, TVA à 5,5 %." },
    ],
    highlights: [
      { icon: "PiggyBank", title: "Économies d'énergie", text: "Jusqu'à 60 % d'économies sur chauffage et eau chaude." },
      { icon: "Sun", title: "Énergie solaire gratuite", text: "Captée directement sur votre toiture." },
      { icon: "Leaf", title: "2 besoins couverts", text: "Chauffage et eau chaude sanitaire." },
      { icon: "ThermometerSun", title: "Confort toute l'année", text: "Un appoint automatique prend le relais si besoin." },
      { icon: "BadgePercent", title: "Aides financières", text: "MaPrimeRénov', CEE, TVA à 5,5 %." },
    ],
    howItWorks: {
      title: "Comment fonctionne un système solaire combiné ?",
      intro: "Les capteurs solaires thermiques chauffent un fluide qui alimente chauffage et eau chaude.",
      steps: [
        { n: 1, title: "Captation", text: "Les capteurs solaires thermiques captent l'énergie du soleil." },
        { n: 2, title: "Stockage", text: "Un ballon de stockage conserve la chaleur produite." },
        { n: 3, title: "Distribution", text: "La chaleur alimente le chauffage et l'eau chaude sanitaire, avec appoint si besoin." },
      ],
      image:
        "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Schéma de fonctionnement d'un système solaire combiné",
    },
    aides: {
      amount: "4 000 €",
      text: "d'aides pour l'installation d'un système solaire combiné*",
      items: ["MaPrimeRénov'", "Certificats d'économies d'énergie (CEE)", "TVA réduite à 5,5 %"],
    },
    ctaTicks: defaultCtaTicks,
    faq: [
      {
        question: "Le SSC couvre-t-il 100 % de mes besoins de chauffage ?",
        answer:
          "Non, il couvre généralement 25 à 60 % des besoins de chauffage selon la région, complété par un système d'appoint (chaudière, pompe à chaleur).",
      },
    ],
  },

  "chauffe-eau-thermodynamique": {
    slug: "chauffe-eau-thermodynamique",
    seoTitle: "Chauffe-eau thermodynamique : eau chaude économique",
    metaDescription:
      "Le chauffe-eau thermodynamique utilise les calories de l'air pour chauffer votre eau sanitaire. Jusqu'à 70 % d'économies, éligible MaPrimeRénov' et CEE.",
    breadcrumbLabel: "Chauffe-eau thermodynamique",
    category: "CHAUFFE-EAU THERMODYNAMIQUE",
    h1: "De l'eau chaude intelligente, des économies durables.",
    intro:
      "Le chauffe-eau thermodynamique utilise les calories de l'air ambiant pour chauffer l'eau sanitaire. Une solution économique, écologique et idéale pour réduire votre facture d'énergie.",
    heroImage:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Chauffe-eau thermodynamique installé dans une buanderie",
    heroBadge: { icon: "Leaf", text: "Une eau chaude économique grâce aux calories de l'air ambiant." },
    quickBenefits: [
      { icon: "PiggyBank", title: "Jusqu'à 70 % d'économies", text: "sur votre facture d'eau chaude." },
      { icon: "BadgePercent", title: "Éligible aux aides de l'État", text: "MaPrimeRénov', CEE." },
      { icon: "ThermometerSun", title: "Confort en eau chaude", text: "toute l'année." },
      { icon: "Waves", title: "Technologie fiable", text: "et silencieuse." },
    ],
    highlights: [
      { icon: "PiggyBank", title: "Économies d'énergie", text: "Jusqu'à 70 % d'économies sur votre facture d'eau chaude." },
      { icon: "ThermometerSun", title: "Confort", text: "Une eau chaude disponible toute l'année, pour toute la famille." },
      { icon: "Waves", title: "Technologie fiable", text: "Silencieuse et éprouvée." },
      { icon: "Clock", title: "Faible entretien", text: "Un entretien annuel simple suffit." },
      { icon: "BadgePercent", title: "Aides financières", text: "MaPrimeRénov' et certificats d'économies d'énergie." },
    ],
    howItWorks: {
      title: "Comment fonctionne un chauffe-eau thermodynamique ?",
      intro: "Il capte les calories présentes dans l'air pour chauffer l'eau de votre ballon de stockage.",
      steps: [
        { n: 1, title: "Captation", text: "L'air ambiant est aspiré par le chauffe-eau." },
        { n: 2, title: "Transfert", text: "Les calories de l'air sont captées par une pompe à chaleur intégrée." },
        { n: 3, title: "Stockage", text: "La chaleur est transférée à l'eau du ballon de stockage." },
        { n: 4, title: "Distribution", text: "L'eau chaude est disponible dans toute la maison." },
      ],
      image:
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Schéma de fonctionnement d'un chauffe-eau thermodynamique",
    },
    aides: {
      amount: "4 000 €",
      text: "d'aides pour l'installation d'un chauffe-eau thermodynamique*",
      items: ["MaPrimeRénov'", "Certificats d'économies d'énergie (CEE)", "TVA réduite à 5,5 %"],
    },
    ctaTicks: defaultCtaTicks,
    faq: [
      {
        question: "Quel volume de ballon choisir ?",
        answer:
          "Le volume dépend du nombre d'occupants du logement : 200 L pour 2-3 personnes, 270 L pour 4-5 personnes en général. Nous vous conseillons lors de l'étude gratuite.",
      },
    ],
  },

  "chauffe-eau-solaire-individuel": {
    slug: "chauffe-eau-solaire-individuel",
    seoTitle: "Chauffe-eau solaire individuel (CESI) : eau chaude 100 % solaire",
    metaDescription:
      "Le CESI utilise l'énergie gratuite du soleil pour produire votre eau chaude sanitaire. Jusqu'à 70 % d'économies, solution durable, aides MaPrimeRénov' et CEE.",
    breadcrumbLabel: "Chauffe-eau solaire (CESI)",
    category: "CESI – CHAUFFE-EAU SOLAIRE INDIVIDUEL",
    h1: "L'eau chaude sanitaire autrement, naturellement.",
    intro:
      "Le CESI utilise l'énergie gratuite du soleil pour produire votre eau chaude sanitaire. Une solution économique, écologique et durable.",
    heroImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Capteurs solaires thermiques pour chauffe-eau solaire individuel",
    heroBadge: { icon: "Sun", text: "L'eau chaude sanitaire produite gratuitement par le soleil." },
    quickBenefits: [
      { icon: "PiggyBank", title: "Jusqu'à 70 % d'économies", text: "sur votre facture d'eau chaude." },
      { icon: "Sun", title: "Énergie solaire gratuite", text: "captée sur votre toiture." },
      { icon: "ThermometerSun", title: "Confort en eau chaude", text: "toute l'année, avec appoint électrique." },
      { icon: "BadgePercent", title: "Éligible aux aides de l'État", text: "MaPrimeRénov', CEE." },
    ],
    highlights: [
      { icon: "PiggyBank", title: "Économies d'énergie", text: "Jusqu'à 70 % d'économies sur votre facture d'eau chaude." },
      { icon: "Sun", title: "Énergie gratuite", text: "Captée sur votre toiture, sans limite." },
      { icon: "ThermometerSun", title: "Confort garanti", text: "Un appoint électrique prend le relais si besoin." },
      { icon: "Leaf", title: "Écologique", text: "Une eau chaude produite sans énergie fossile." },
      { icon: "BadgePercent", title: "Aides financières", text: "MaPrimeRénov' et certificats d'économies d'énergie." },
    ],
    howItWorks: {
      title: "Comment fonctionne un CESI ?",
      intro: "Les capteurs solaires thermiques captent l'énergie du soleil pour chauffer votre eau sanitaire.",
      steps: [
        { n: 1, title: "Capteurs solaires", text: "Captent l'énergie du soleil." },
        { n: 2, title: "Circuit primaire", text: "Un fluide caloporteur transfère la chaleur au ballon de stockage." },
        { n: 3, title: "Ballon de stockage", text: "L'eau est chauffée et stockée." },
        { n: 4, title: "Appoint", text: "Un appoint électrique prend le relais en cas de manque d'ensoleillement." },
      ],
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Schéma de fonctionnement d'un chauffe-eau solaire individuel",
    },
    aides: {
      amount: "4 000 €",
      text: "d'aides pour l'installation d'un CESI*",
      items: ["MaPrimeRénov'", "Certificats d'économies d'énergie (CEE)", "TVA réduite à 5,5 %"],
    },
    ctaTicks: defaultCtaTicks,
    faq: [
      {
        question: "Le CESI fonctionne-t-il en hiver ou par temps couvert ?",
        answer:
          "Oui, un appoint électrique intégré prend automatiquement le relais lorsque l'ensoleillement est insuffisant, garantissant de l'eau chaude toute l'année.",
      },
    ],
  },

  "poele-a-granules": {
    slug: "poele-a-granules",
    seoTitle: "Poêle à granulés : chauffage au bois économique",
    metaDescription:
      "Installez un poêle à granulés performant et automatisé pour chauffer votre logement à moindre coût. Devis gratuit, aides MaPrimeRénov' avec Label Énergie.",
    breadcrumbLabel: "Poêle à granulés",
    category: "POÊLE À GRANULÉS",
    h1: "Le chauffage qui réchauffe <span>votre maison et votre budget</span>",
    intro:
      "Le poêle à granulés offre un chauffage performant, automatisé et économique grâce à une énergie renouvelable et locale : le bois.",
    heroImage: "/images/solutions/poele-1.jpg",
    heroAlt: "Poêle à granulés dans un salon chaleureux, avec une énergie renouvelable et respectueuse de l'environnement",
    heroImageAspect: "1098/976",
    quickBenefits: [
      { icon: "PiggyBank", title: "Jusqu'à 70 % d'économies", text: "sur votre facture de chauffage." },
      { icon: "ThermometerSun", title: "Chaleur douce et homogène", text: "dans toute la maison." },
      { icon: "Leaf", title: "Écologique et renouvelable", text: "une énergie neutre en CO₂." },
      { icon: "Home", title: "Éligible aux aides de l'État", text: "MaPrimeRénov', CEE, etc." },
    ],
    benefitCards: [
      { icon: "PiggyBank", title: "ÉCONOMIQUE", text: "Jusqu'à 70 % d'économies sur votre facture de chauffage." },
      { icon: "Clock", title: "AUTONOME", text: "Une grande autonomie grâce au réservoir de granulés." },
      { icon: "ThermometerSun", title: "CONFORTABLE", text: "Une chaleur douce et constante dans toute la maison." },
      {
        icon: "BadgePercent",
        title: "AIDES & SUBVENTIONS",
        text: "Profitez des aides de l'État (MaPrimeRénov', CEE, etc.) pour alléger votre investissement.",
      },
    ],
    highlights: [
      { icon: "PiggyBank", title: "Économies d'énergie", text: "Réduisez votre facture jusqu'à 70 %." },
      { icon: "Leaf", title: "Écologique", text: "Une énergie renouvelable et neutre en CO₂." },
      { icon: "ThermometerSun", title: "Confort", text: "Chaleur douce et constante, programmable." },
      { icon: "Clock", title: "Autonomie", text: "Jusqu'à plusieurs jours d'autonomie." },
      { icon: "Sparkles", title: "Esthétique", text: "Des designs modernes qui s'adaptent à votre intérieur." },
    ],
    howItWorks: {
      title: "Une technologie simple pour un confort optimal",
      intro:
        "Le poêle à granulés utilise des granulés de bois compressé pour produire une chaleur performante tout en réduisant votre impact environnemental.",
      steps: [
        { n: 1, title: "", text: "Les granulés sont stockés dans le réservoir." },
        { n: 2, title: "", text: "Ils sont acheminés automatiquement vers le foyer de combustion." },
        { n: 3, title: "", text: "La chaleur est diffusée rapidement et uniformément dans votre intérieur." },
        { n: 4, title: "", text: "Vous profitez d'un confort optimal avec une consommation maîtrisée." },
      ],
      image: "/images/solutions/poele-2.jpg",
      imageAlt: "Schéma de fonctionnement d'un poêle à granulés : réservoir, alimentation, combustion, diffusion",
      imageAspect: "1474/704",
    },
    aides: {
      amount: "2 500 €",
      text: "d'aides pour l'installation d'un poêle à granulés*",
      items: ["MaPrimeRénov'", "Certificats d'économies d'énergie (CEE)", "TVA réduite à 5,5 %"],
    },
    ctaTicks: defaultCtaTicks,
    faq: [
      {
        question: "Quelle autonomie offre un poêle à granulés ?",
        answer:
          "Selon la taille du réservoir, l'autonomie varie de 24h à plusieurs jours avant de devoir recharger en granulés.",
      },
    ],
  },

  "renovation-energetique-globale": {
    slug: "renovation-energetique-globale",
    seoTitle: "Rénovation énergétique globale : un accompagnement de A à Z",
    metaDescription:
      "Isolation, chauffage, ventilation : Label Énergie vous accompagne dans votre projet de rénovation énergétique globale, du diagnostic aux aides MaPrimeRénov' Parcours accompagné.",
    breadcrumbLabel: "Rénovation énergétique globale",
    category: "RÉNOVATION ÉNERGÉTIQUE GLOBALE",
    h1: "Un accompagnement complet pour un logement plus performant.",
    intro:
      "Isolation, chauffage, ventilation, production d'énergie : nous vous accompagnons de A à Z dans votre projet de rénovation énergétique globale et dans le montage de vos aides.",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Maison individuelle rénovée énergétiquement",
    heroBadge: { icon: "Home", text: "Un accompagnement complet pour un logement plus performant." },
    quickBenefits: [
      { icon: "PiggyBank", title: "Économies maximisées", text: "en combinant plusieurs travaux complémentaires." },
      { icon: "ClipboardCheck", title: "Diagnostic complet", text: "audit énergétique de votre logement." },
      { icon: "Leaf", title: "Confort et valorisation", text: "de votre bien immobilier." },
      { icon: "BadgePercent", title: "MaPrimeRénov' Parcours accompagné", text: "et aides cumulables." },
    ],
    highlights: [
      { icon: "PiggyBank", title: "Économies maximisées", text: "En combinant plusieurs travaux complémentaires." },
      { icon: "ClipboardCheck", title: "Diagnostic complet", text: "Un audit énergétique de votre logement." },
      { icon: "Leaf", title: "Confort et valeur", text: "Un bien plus confortable et mieux valorisé." },
      { icon: "Clock", title: "Accompagnement de A à Z", text: "Du diagnostic à la réception des travaux." },
      { icon: "BadgePercent", title: "Aides cumulables", text: "MaPrimeRénov' Parcours accompagné et aides locales." },
    ],
    howItWorks: {
      title: "Comment se déroule une rénovation globale ?",
      intro: "Un accompagnement structuré, du diagnostic à la réception des travaux.",
      steps: [
        { n: 1, title: "Audit énergétique", text: "Diagnostic complet de votre logement." },
        { n: 2, title: "Plan de travaux", text: "Priorisation des travaux et montage des aides." },
        { n: 3, title: "Réalisation", text: "Coordination des différents corps de métier." },
        { n: 4, title: "Réception & suivi", text: "Contrôle final et accompagnement SAV." },
      ],
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Accompagnement rénovation énergétique globale",
    },
    aides: {
      amount: "70 000 €",
      text: "d'aides cumulées pour une rénovation globale*",
      items: ["MaPrimeRénov' Parcours accompagné", "Certificats d'économies d'énergie (CEE)", "Éco-prêt à taux zéro"],
    },
    ctaTicks: defaultCtaTicks,
    faq: [
      {
        question: "Qu'est-ce que MaPrimeRénov' Parcours accompagné ?",
        answer:
          "C'est un dispositif de l'État qui finance une partie des travaux de rénovation globale et impose l'accompagnement d'un Accompagnateur Rénov' agréé, que nous pouvons coordonner avec vous.",
      },
    ],
  },
};

export const solutionSlugs = Object.keys(solutions);
