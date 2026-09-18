export interface SolutionVariant {
  title: string;
  text: string;
  image: string;
  href?: string;
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
  quickBenefitsStacked?: boolean;
  benefitCards?: { icon: string; title: string; text: string }[];
  highlights: { icon: string; title: string; text: string }[];
  highlightsTitle?: string;
  highlightsKicker?: string;
  hideHighlights?: boolean;
  howItWorks: {
    kicker?: string;
    title: string;
    intro: string;
    steps: { n: number; title: string; text: string }[];
    image: string;
    imageAlt: string;
    imageAspect?: string;
  };
  variants?: {
    title: string;
    compact?: boolean;
    items: SolutionVariant[];
  };
  aides: {
    heading?: string;
    amount: string;
    amountColor?: string;
    text: string;
    items: string[];
  };
  teamTrust?: {
    subtitle: string;
    image: string;
    imageAlt: string;
    items: string[];
  };
  installations?: {
    kicker?: string;
    title: string;
    items: {
      location: string;
      capacity: string;
      type: string;
      status: string;
      image: string;
    }[];
  };
  testimonials?: {
    title: string;
    combined?: boolean;
    items: {
      quote: string;
      rating: number;
      name: string;
      location: string;
    }[];
  };
  ctaIcon?: string;
  ctaIconFallback?: string;
  ctaTitle?: string;
  ctaTheme?: "blue" | "green";
  ctaTicks: string[];
  hideCtaTicks?: boolean;
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
    heroImage: "/images/solutions/pomp1.jpg",
    heroAlt: "Unité extérieure de pompe à chaleur installée par Label Énergie",
    heroImageAspect: "1078/992",
    quickBenefits: [
      { icon: "PiggyBank", title: "Jusqu'à 70 % d'économies", text: "sur votre facture de chauffage." },
      { icon: "Snowflake", title: "Confort optimal été comme hiver", text: "chauffage en hiver, rafraîchissement possible en été." },
      { icon: "Leaf", title: "Énergie renouvelable et écologique", text: "réduit votre impact carbone." },
      { icon: "Euro", title: "Éligible aux aides de l'État", text: "MaPrimeRénov', CEE, éco-prêt à taux 0." },
    ],
    quickBenefitsStacked: true,
    benefitCards: [
      {
        icon: "PiggyBank",
        title: "ÉCONOMIQUE",
        text: "Jusqu'à 70 % d'économies sur votre facture de chauffage par rapport à une chaudière classique.",
      },
      {
        icon: "ThermometerSun",
        title: "CONFORT TOUTE L'ANNÉE",
        text: "Chauffage en hiver, rafraîchissement en été avec les modèles réversibles.",
      },
      {
        icon: "Leaf",
        title: "ÉCOLOGIQUE",
        text: "Une énergie renouvelable qui réduit votre impact carbone et préserve l'environnement.",
      },
      {
        icon: "Award",
        title: "AIDES & SUBVENTIONS",
        text: "Profitez des aides de l'État (MaPrimeRénov', CEE, etc.) pour alléger votre investissement.",
      },
    ],
    highlights: [
      { icon: "PiggyBank", title: "Économies d'énergie", text: "Jusqu'à 70 % d'économies sur votre facture de chauffage." },
      { icon: "Leaf", title: "Écologique", text: "Une énergie renouvelable qui réduit votre impact carbone." },
      { icon: "ThermometerSun", title: "Confort", text: "Une chaleur douce et homogène toute l'année." },
      { icon: "Clock", title: "Autonomie", text: "Un fonctionnement automatique, sans intervention au quotidien." },
      { icon: "BadgePercent", title: "Aides financières", text: "MaPrimeRénov', CEE, éco-prêt à taux 0." },
    ],
    howItWorks: {
      kicker: "TECHNOLOGIE",
      title: "Comment fonctionne une pompe à chaleur ?",
      intro:
        "Elle capte les calories gratuites présentes dans l'environnement pour les transformer en chaleur dans votre logement.",
      steps: [
        { n: 1, title: "Captation", text: "Elle capte les calories dans l'air, l'eau ou le sol." },
        { n: 2, title: "Compression", text: "Elle augmente la température grâce à un système de compression." },
        { n: 3, title: "Restitution", text: "Elle restitue la chaleur dans votre logement via vos émetteurs." },
      ],
      image: "/images/solutions/pomp2.jpg",
      imageAlt: "Schéma de fonctionnement d'une pompe à chaleur : captation, compression, restitution",
      imageAspect: "1461/720",
    },
    variants: {
      title: "Quelle pompe à chaleur pour votre logement ?",
      compact: true,
      items: [
        {
          title: "Pompe à chaleur Air / Eau",
          text: "Idéale pour remplacer une chaudière et alimenter vos radiateurs ou votre plancher chauffant.",
          href: "/solutions/pompe-a-chaleur-air-eau",
          image:
            "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Pompe à chaleur Air / Air",
          text: "Parfaite pour chauffer ou rafraîchir votre logement avec des unités intérieures (climatisation réversible).",
          href: "/solutions/pompe-a-chaleur-air-air",
          image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Pompe à chaleur Géothermique",
          text: "Utilise la chaleur du sol pour un rendement optimal et des économies maximales.",
          href: "/solutions/pompe-a-chaleur-geothermie",
          image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    aides: {
      amount: "10 000 €",
      text: "d'aides pour l'installation d'une pompe à chaleur",
      items: ["MaPrimeRénov'", "Les certificats d'économies d'énergie", "Éco-prêt à taux 0%"],
    },
    teamTrust: {
      subtitle: "Une expertise reconnue et un accompagnement de A à Z",
      image: "/images/solutions/pomp3.jpg",
      imageAlt: "Équipe Label Énergie devant ses véhicules de service",
      items: [
        "Étude gratuite et personnalisée",
        "Matériel performant",
        "Installation par nos équipes RGE",
        "Mise en service et explications",
        "SAV & entretien assurés",
      ],
    },
    ctaTicks: defaultCtaTicks,
    hideCtaTicks: true,
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
      text: "d'aides pour l'installation d'une PAC Air/Eau",
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
      text: "d'aides disponibles (MaPrimeRénov', CEE, aides locales)",
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
      text: "d'aides pour l'installation d'une PAC géothermique",
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
      text: "d'aides pour une climatisation réversible éligible",
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
    h1: "Produisez votre propre électricité, <span>économisez durablement.</span>",
    intro:
      "Les panneaux photovoltaïques vous permettent de produire une électricité propre et renouvelable, de réduire vos factures et de gagner en indépendance énergétique.",
    heroImage: "/images/solutions/panneaux1.jpg",
    heroAlt: "Panneaux photovoltaïques installés sur une toiture de maison individuelle",
    heroImageAspect: "1196/896",
    quickBenefits: [
      { icon: "PiggyBank", title: "Jusqu'à 70 % d'économies", text: "sur votre facture d'électricité." },
      { icon: "Leaf", title: "Énergie propre et renouvelable", text: "produite directement sur votre toit." },
      { icon: "Home", title: "Valorisation de votre bien", text: "grâce à une installation durable." },
      { icon: "Home", title: "Éligible aux aides de l'État", text: "MaPrimeRénov', CEE, etc." },
    ],
    benefitCards: [
      { icon: "PiggyBank", title: "ÉCONOMIES DURABLES", text: "Réduisez jusqu'à 70 % sur votre facture d'électricité." },
      { icon: "Zap", title: "INDÉPENDANCE ÉNERGÉTIQUE", text: "Produisez et consommez votre propre électricité." },
      { icon: "Leaf", title: "ÉCOLOGIQUE", text: "Une énergie propre qui réduit votre empreinte carbone." },
      {
        icon: "Award",
        title: "AIDES & SUBVENTIONS",
        text: "Profitez des aides de l'État (MaPrimeRénov', CEE, etc.).",
      },
    ],
    highlights: [
      { icon: "Leaf", title: "Économies immédiates", text: "Réduisez votre facture d'électricité dès la mise en service." },
      { icon: "Zap", title: "Rentabilité durable", text: "Un investissement rentable sur le long terme." },
      { icon: "Settings", title: "Faible entretien", text: "Des installations fiables et durables." },
      { icon: "Home", title: "Adapté à tous les toits", text: "Solutions sur mesure pour chaque type d'habitat." },
      { icon: "Recycle", title: "Valorisation immobilière", text: "Augmente la valeur de votre bien immobilier." },
    ],
    highlightsKicker: "POURQUOI CHOISIR LE PHOTOVOLTAÏQUE ?",
    howItWorks: {
      kicker: "FONCTIONNEMENT",
      title: "Un fonctionnement simple et performant",
      intro: "Les panneaux captent la lumière du soleil et la convertissent en électricité utilisable.",
      steps: [
        { n: 1, title: "", text: "Les panneaux captent la lumière du soleil." },
        { n: 2, title: "", text: "L'onduleur transforme cette énergie en électricité." },
        { n: 3, title: "", text: "L'électricité alimente votre logement en priorité." },
        { n: 4, title: "", text: "Le surplus est stocké ou revendu (selon votre contrat)." },
      ],
      image: "/images/solutions/panneaux2.jpg",
      imageAlt: "Schéma de fonctionnement d'une installation photovoltaïque : captation, conversion, consommation, surplus",
      imageAspect: "1635/569",
    },
    aides: {
      heading: "Des aides pour un projet plus accessible",
      amount: "5 000 €",
      amountColor: "var(--teal2)",
      text: "d'aides pour l'installation de panneaux photovoltaïques",
      items: ["MaPrimeRénov'", "Prime à l'autoconsommation", "TVA réduite à 10 %", "Revente du surplus possible"],
    },
    installations: {
      kicker: "NOS RÉALISATIONS",
      title: "Ils ont choisi le solaire avec Label Energie",
      items: [
        {
          location: "Melun (77)",
          capacity: "Installation 3 kWc",
          type: "Maison individuelle",
          status: "Autoconsommation",
          image: "/images/solutions/panneaux1.jpg",
        },
        {
          location: "Brie-Comte-Robert (77)",
          capacity: "Installation 6 kWc",
          type: "Maison individuelle",
          status: "Autoconsommation",
          image: "/images/solutions/panneaux1.jpg",
        },
        {
          location: "Lagny-sur-Marne (77)",
          capacity: "Installation 9 kWc",
          type: "Maison individuelle",
          status: "Autoconsommation",
          image: "/images/solutions/panneaux1.jpg",
        },
        {
          location: "Coulommiers (77)",
          capacity: "Installation 6 kWc",
          type: "Maison individuelle",
          status: "Autoconsommation",
          image: "/images/solutions/panneaux1.jpg",
        },
        {
          location: "Saint Denis (93)",
          capacity: "Installation 9 kWc",
          type: "Maison individuelle",
          status: "Autoconsommation",
          image: "/images/solutions/panneaux1.jpg",
        },
        {
          location: "Stains (93)",
          capacity: "Installation 3 kWc",
          type: "Maison individuelle",
          status: "Autoconsommation",
          image: "/images/solutions/panneaux1.jpg",
        },
      ],
    },
    testimonials: {
      title: "Ils nous font confiance",
      combined: true,
      items: [
        {
          quote: "Équipe professionnelle, installation rapide et performance au rendez-vous. Je recommande Label Energie !",
          rating: 5,
          name: "Thomas D.",
          location: "Melun (77)",
        },
        {
          quote: "Depuis l'installation, notre facture d'électricité a chuté de moitié. Un investissement rentable !",
          rating: 5,
          name: "Isabelle F.",
          location: "Brie-Comte-Robert (77)",
        },
        {
          quote: "Conseillers à l'écoute et démarches administratives simplifiées pour les aides. Très satisfaits.",
          rating: 4.5,
          name: "Karim B.",
          location: "Lagny-sur-Marne (77)",
        },
      ],
    },
    ctaTitle: "Produisez votre propre électricité et reprenez le contrôle de votre énergie.",
    ctaIcon: "/images/solutions/icon-m.png",
    ctaTicks: defaultCtaTicks,
    hideCtaTicks: true,
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
      text: "d'aides pour l'installation d'un système solaire combiné",
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
    h1: "De l'eau chaude intelligente, des <span>économies</span> durables.",
    intro:
      "Le chauffe-eau thermodynamique utilise les calories de l'air ambiant pour chauffer l'eau sanitaire. Une solution économique, écologique et idéale pour réduire votre facture d'énergie.",
    heroImage: "/images/solutions/btd.jpg",
    heroAlt: "Chauffe-eau thermodynamique installé dans une buanderie",
    heroImageAspect: "1120/958",
    quickBenefits: [
      { icon: "PiggyBank", title: "Jusqu'à 70 % d'économies", text: "sur votre facture d'eau chaude." },
      { icon: "Home", title: "Éligible aux aides de l'État", text: "MaPrimeRénov', CEE." },
      { icon: "Leaf", title: "Confort en eau chaude toute l'année", text: "avec une technologie fiable." },
      { icon: "Home", title: "Technologie fiable et silencieuse", text: "et éprouvée." },
    ],
    benefitCards: [
      { icon: "PiggyBank", title: "ÉCONOMIQUE", text: "Réduisez jusqu'à 70 % votre facture d'eau chaude." },
      { icon: "Leaf", title: "ÉCOLOGIQUE", text: "Une énergie renouvelable qui réduit vos émissions de CO2." },
      { icon: "ShowerHead", title: "CONFORT", text: "De l'eau chaude disponible à tout moment, même en hiver." },
      {
        icon: "Award",
        title: "AIDES & SUBVENTIONS",
        text: "Profitez des aides de l'État (MaPrimeRénov', CEE, etc.) pour réduire votre investissement.",
      },
    ],
    highlights: [],
    hideHighlights: true,
    howItWorks: {
      kicker: "FONCTIONNEMENT",
      title: "Comment fonctionne un chauffe-eau thermodynamique ?",
      intro: "Il capte les calories présentes dans l'air pour chauffer l'eau de votre ballon de stockage.",
      steps: [
        { n: 1, title: "Captation", text: "L'air ambiant est aspiré par le chauffe-eau." },
        { n: 2, title: "Transfert", text: "Les calories de l'air sont captées par une pompe à chaleur intégrée." },
        { n: 3, title: "Stockage", text: "La chaleur est transférée à l'eau du ballon de stockage." },
        { n: 4, title: "Distribution", text: "L'eau chaude est disponible dans toute la maison." },
      ],
      image: "/images/solutions/btd2.jpg",
      imageAlt: "Schéma de fonctionnement d'un chauffe-eau thermodynamique : captation, transfert, stockage, distribution",
      imageAspect: "1552/688",
    },
    aides: {
      heading: "Des aides pour alléger votre investissement",
      amount: "4 000 €",
      amountColor: "var(--teal2)",
      text: "d'aides pour l'installation d'un chauffe-eau thermodynamique",
      items: [
        "MaPrimeRénov'",
        "Certificats d'économies d'énergie (CEE)",
        "TVA réduite à 5,5 %",
        "Cumulable avec d'autres aides locales",
      ],
    },
    installations: {
      kicker: "NOS RÉALISATIONS",
      title: "",
      items: [
        {
          location: "Melun (77)",
          capacity: "Chauffe-eau thermodynamique 270 L",
          type: "Maison individuelle",
          status: "Installation complète",
          image: "/images/solutions/btd.jpg",
        },
        {
          location: "Brie-Comte-Robert (77)",
          capacity: "Chauffe-eau thermodynamique 270 L",
          type: "Maison individuelle",
          status: "Installation complète",
          image: "/images/solutions/btd.jpg",
        },
        {
          location: "Lagny-sur-Marne (77)",
          capacity: "Chauffe-eau thermodynamique 200 L",
          type: "Maison individuelle",
          status: "Installation complète",
          image: "/images/solutions/btd.jpg",
        },
        {
          location: "Coulommiers (77)",
          capacity: "Chauffe-eau thermodynamique 200 L",
          type: "Maison individuelle",
          status: "Installation complète",
          image: "/images/solutions/btd.jpg",
        },
      ],
    },
    ctaTitle: "Passez à une eau chaude plus économique et plus respectueuse de l'environnement.",
    ctaTheme: "green",
    ctaIcon: "/images/solutions/icon-btd.png",
    ctaTicks: defaultCtaTicks,
    hideCtaTicks: true,
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
    h1: "L'eau chaude sanitaire autrement, <span>naturellement.</span>",
    intro:
      "Le CESI utilise l'énergie gratuite du soleil pour produire votre eau chaude sanitaire. Une solution économique, écologique et durable.",
    heroImage: "/images/solutions/cesi1.jpg",
    heroAlt: "Capteurs solaires thermiques et ballon de stockage pour chauffe-eau solaire individuel",
    heroImageAspect: "1132/928",
    quickBenefits: [
      { icon: "PiggyBank", title: "Jusqu'à 70 % d'économies", text: "sur votre facture d'eau chaude." },
      { icon: "Sun", title: "Énergie solaire gratuite", text: "captée sur votre toiture." },
      { icon: "Waves", title: "Confort en eau chaude toute l'année", text: "avec appoint électrique." },
      { icon: "Home", title: "Éligible aux aides de l'État", text: "MaPrimeRénov', CEE." },
    ],
    benefitCards: [
      { icon: "PiggyBank", title: "ÉCONOMIQUE", text: "Jusqu'à 70 % d'économies sur votre facture d'eau chaude." },
      { icon: "Leaf", title: "ÉCOLOGIQUE", text: "Une énergie solaire propre et sans émission de CO2." },
      { icon: "ShowerHead", title: "CONFORTABLE", text: "De l'eau chaude disponible toute l'année." },
      {
        icon: "Award",
        title: "AIDES & SUBVENTIONS",
        text: "Profitez des aides de l'État (MaPrimeRénov', CEE, etc.) pour réduire votre investissement.",
      },
    ],
    highlights: [
      { icon: "Leaf", title: "Économies durables", text: "Réduisez votre facture d'eau chaude jusqu'à 70 %." },
      { icon: "Zap", title: "Indépendance énergétique", text: "Produisez votre propre eau chaude." },
      { icon: "Home", title: "Valorisation de votre bien", text: "Augmentez la valeur de votre logement." },
      { icon: "Settings", title: "Technologie fiable", text: "Une solution éprouvée, performante et durable." },
      { icon: "Recycle", title: "Respect de l'environnement", text: "Réduisez votre empreinte carbone." },
    ],
    highlightsTitle: "Pourquoi choisir un CESI ?",
    howItWorks: {
      kicker: "FONCTIONNEMENT",
      title: "Comment fonctionne un CESI ?",
      intro: "Les capteurs solaires thermiques captent l'énergie du soleil pour chauffer votre eau sanitaire.",
      steps: [
        { n: 1, title: "", text: "Les capteurs solaires thermiques captent l'énergie du soleil." },
        {
          n: 2,
          title: "",
          text: "Cette énergie chauffe un fluide caloporteur qui transfère la chaleur au ballon de stockage.",
        },
        { n: 3, title: "", text: "L'eau contenue dans le ballon est chauffée et reste disponible pour vos besoins." },
        { n: 4, title: "", text: "Un appoint électrique prend le relais en cas de manque d'ensoleillement." },
      ],
      image: "/images/solutions/cesi2.jpg",
      imageAlt: "Schéma de fonctionnement d'un CESI : capteurs solaires, circuit primaire, ballon de stockage, appoint",
      imageAspect: "1559/688",
    },
    aides: {
      heading: "Des aides pour un projet plus accessible",
      amount: "4 000 €",
      amountColor: "var(--teal2)",
      text: "d'aides pour l'installation d'un CESI",
      items: [
        "MaPrimeRénov'",
        "Certificats d'économies d'énergie (CEE)",
        "TVA réduite à 5,5 %",
        "Cumulable avec d'autres aides locales",
      ],
    },
    installations: {
      title: "Nos dernières installations de CESI",
      items: [
        {
          location: "Melun (77)",
          capacity: "CESI 300 L",
          type: "Maison individuelle",
          status: "Installation complète",
          image: "/images/solutions/cesi1.jpg",
        },
        {
          location: "Brie-Comte-Robert (77)",
          capacity: "CESI 250 L",
          type: "Maison individuelle",
          status: "Installation complète",
          image: "/images/solutions/cesi1.jpg",
        },
        {
          location: "Lagny-sur-Marne (77)",
          capacity: "CESI 300 L",
          type: "Maison individuelle",
          status: "Installation complète",
          image: "/images/solutions/cesi1.jpg",
        },
        {
          location: "Coulommiers (77)",
          capacity: "CESI 250 L",
          type: "Maison individuelle",
          status: "Installation complète",
          image: "/images/solutions/cesi1.jpg",
        },
      ],
    },
    testimonials: {
      title: "Ils nous font confiance",
      items: [
        {
          quote: "Une équipe professionnelle et à l'écoute. Installation rapide et matériel de qualité. Je recommande Label Energie !",
          rating: 5,
          name: "Sophie L.",
          location: "Melun (77)",
        },
        {
          quote: "Grâce au CESI, nous avons réduit de 60 % notre facture d'eau chaude. Très satisfait du résultat !",
          rating: 5,
          name: "Marc D.",
          location: "Brie-Comte-Robert (77)",
        },
        {
          quote: "Excellent accompagnement du début à la fin du projet. Aides obtenues sans stress.",
          rating: 4.5,
          name: "Nathalie et David P.",
          location: "Lagny-sur-Marne (77)",
        },
        {
          quote: "Devis clair, pose soignée et conseillers disponibles. Notre eau chaude est désormais quasi gratuite en été !",
          rating: 5,
          name: "Julien R.",
          location: "Coulommiers (77)",
        },
        {
          quote: "Un peu de retard sur le planning au départ, mais le résultat final est top et le SAV répond vite.",
          rating: 4,
          name: "Christelle M.",
          location: "Meaux (77)",
        },
      ],
    },
    ctaTitle: "Passez à l'eau chaude solaire et faites des économies durables.",
    ctaTheme: "green",
    ctaIconFallback: "Sun",
    ctaTicks: defaultCtaTicks,
    hideCtaTicks: true,
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
      amount: "3 000 €",
      text: "d'aides pour l'installation d'un poêle à granulés",
      items: ["MaPrimeRénov'", "Certificats d'économies d'énergie (CEE)", "TVA réduite à 5,5 %"],
    },
    ctaIcon: "/images/solutions/projets.png",
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
      text: "d'aides cumulées pour une rénovation globale",
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
