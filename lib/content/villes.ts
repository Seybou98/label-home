export interface Ville {
  slug: string;
  name: string;
  postalCode: string;
  department: string;
  departmentCode: string;
  /**
   * "proximite" = zone historique autour du siège (Île-de-France) : intervention rapide.
   * "national" = ville desservie sur devis par l'équipe, qui se déplace depuis la Seine-et-Marne.
   * Change le discours affiché (délai/proximité vs devis/déplacement) pour rester honnête.
   */
  scope: "proximite" | "national";
  /** Communes voisines desservies (à faire valider par l'équipe). */
  nearby: string[];
  /**
   * Paragraphe rédigé par l'équipe et propre à la ville (références de chantiers, délais, aides locales…).
   * C'est ce texte unique qui distingue la page d'une page générique : à renseigner ville par ville.
   */
  note?: string;
}

/** Villes pour lesquelles une page dédiée est publiée. Ajouter une ville = ajouter une entrée ici. */
export const villes: Ville[] = [
  {
    slug: "croissy-beaubourg",
    name: "Croissy-Beaubourg",
    postalCode: "77183",
    department: "Seine-et-Marne",
    departmentCode: "77",
    scope: "proximite",
    nearby: ["Torcy", "Collégien", "Lognes", "Émerainville", "Pontault-Combault"],
  },
  {
    slug: "melun",
    name: "Melun",
    postalCode: "77000",
    department: "Seine-et-Marne",
    departmentCode: "77",
    scope: "proximite",
    nearby: ["Dammarie-les-Lys", "Le Mée-sur-Seine", "Vaux-le-Pénil", "Rubelles"],
  },
  {
    slug: "meaux",
    name: "Meaux",
    postalCode: "77100",
    department: "Seine-et-Marne",
    departmentCode: "77",
    scope: "proximite",
    nearby: ["Villenoy", "Trilport", "Nanteuil-lès-Meaux", "Mareuil-lès-Meaux"],
  },
  {
    slug: "torcy",
    name: "Torcy",
    postalCode: "77200",
    department: "Seine-et-Marne",
    departmentCode: "77",
    scope: "proximite",
    nearby: ["Lognes", "Noisiel", "Bussy-Saint-Georges", "Croissy-Beaubourg", "Collégien"],
  },
  {
    slug: "chelles",
    name: "Chelles",
    postalCode: "77500",
    department: "Seine-et-Marne",
    departmentCode: "77",
    scope: "proximite",
    nearby: ["Brou-sur-Chantereine", "Vaires-sur-Marne", "Courtry"],
  },
  {
    slug: "pontault-combault",
    name: "Pontault-Combault",
    postalCode: "77340",
    department: "Seine-et-Marne",
    departmentCode: "77",
    scope: "proximite",
    nearby: ["Roissy-en-Brie", "Émerainville", "Ozoir-la-Ferrière", "Croissy-Beaubourg"],
  },
  {
    slug: "lagny-sur-marne",
    name: "Lagny-sur-Marne",
    postalCode: "77400",
    department: "Seine-et-Marne",
    departmentCode: "77",
    scope: "proximite",
    nearby: ["Thorigny-sur-Marne", "Saint-Thibault-des-Vignes", "Montévrain", "Pomponne", "Dampmart"],
  },
  {
    slug: "bussy-saint-georges",
    name: "Bussy-Saint-Georges",
    postalCode: "77600",
    department: "Seine-et-Marne",
    departmentCode: "77",
    scope: "proximite",
    nearby: ["Guermantes", "Conches-sur-Gondoire", "Collégien", "Montévrain"],
  },

  // Île-de-France élargie (proximité, une ville par département)
  {
    slug: "paris",
    name: "Paris",
    postalCode: "75000",
    department: "Paris",
    departmentCode: "75",
    scope: "proximite",
    nearby: ["Boulogne-Billancourt", "Saint-Denis", "Montreuil", "Vincennes"],
  },
  {
    slug: "versailles",
    name: "Versailles",
    postalCode: "78000",
    department: "Yvelines",
    departmentCode: "78",
    scope: "proximite",
    nearby: ["Le Chesnay", "Viroflay", "Vélizy-Villacoublay", "Rocquencourt"],
  },
  {
    slug: "evry-courcouronnes",
    name: "Évry-Courcouronnes",
    postalCode: "91000",
    department: "Essonne",
    departmentCode: "91",
    scope: "proximite",
    nearby: ["Corbeil-Essonnes", "Ris-Orangis", "Bondoufle", "Lisses"],
  },
  {
    slug: "nanterre",
    name: "Nanterre",
    postalCode: "92000",
    department: "Hauts-de-Seine",
    departmentCode: "92",
    scope: "proximite",
    nearby: ["Courbevoie", "Rueil-Malmaison", "Colombes", "Puteaux"],
  },
  {
    slug: "bobigny",
    name: "Bobigny",
    postalCode: "93000",
    department: "Seine-Saint-Denis",
    departmentCode: "93",
    scope: "proximite",
    nearby: ["Drancy", "Bondy", "Noisy-le-Sec", "Pantin"],
  },
  {
    slug: "creteil",
    name: "Créteil",
    postalCode: "94000",
    department: "Val-de-Marne",
    departmentCode: "94",
    scope: "proximite",
    nearby: ["Saint-Maur-des-Fossés", "Maisons-Alfort", "Bonneuil-sur-Marne", "Alfortville"],
  },
  {
    slug: "cergy",
    name: "Cergy",
    postalCode: "95000",
    department: "Val-d'Oise",
    departmentCode: "95",
    scope: "proximite",
    nearby: ["Pontoise", "Vauréal", "Éragny", "Osny"],
  },

  // Grandes villes de France (national, sur devis)
  {
    slug: "lyon",
    name: "Lyon",
    postalCode: "69000",
    department: "Rhône",
    departmentCode: "69",
    scope: "national",
    nearby: ["Villeurbanne", "Vénissieux", "Caluire-et-Cuire", "Bron"],
  },
  {
    slug: "marseille",
    name: "Marseille",
    postalCode: "13000",
    department: "Bouches-du-Rhône",
    departmentCode: "13",
    scope: "national",
    nearby: ["Aubagne", "Allauch", "Marignane", "Septèmes-les-Vallons"],
  },
  {
    slug: "toulouse",
    name: "Toulouse",
    postalCode: "31000",
    department: "Haute-Garonne",
    departmentCode: "31",
    scope: "national",
    nearby: ["Blagnac", "Colomiers", "Tournefeuille", "Balma"],
  },
  {
    slug: "nice",
    name: "Nice",
    postalCode: "06000",
    department: "Alpes-Maritimes",
    departmentCode: "06",
    scope: "national",
    nearby: ["Cagnes-sur-Mer", "Saint-Laurent-du-Var", "Villeneuve-Loubet", "Cannes"],
  },
  {
    slug: "nantes",
    name: "Nantes",
    postalCode: "44000",
    department: "Loire-Atlantique",
    departmentCode: "44",
    scope: "national",
    nearby: ["Rezé", "Saint-Herblain", "Orvault", "Vertou"],
  },
  {
    slug: "strasbourg",
    name: "Strasbourg",
    postalCode: "67000",
    department: "Bas-Rhin",
    departmentCode: "67",
    scope: "national",
    nearby: ["Schiltigheim", "Illkirch-Graffenstaden", "Lingolsheim", "Hoenheim"],
  },
  {
    slug: "montpellier",
    name: "Montpellier",
    postalCode: "34000",
    department: "Hérault",
    departmentCode: "34",
    scope: "national",
    nearby: ["Castelnau-le-Lez", "Lattes", "Juvignac", "Pérols"],
  },
  {
    slug: "bordeaux",
    name: "Bordeaux",
    postalCode: "33000",
    department: "Gironde",
    departmentCode: "33",
    scope: "national",
    nearby: ["Mérignac", "Pessac", "Talence", "Bègles"],
  },
  {
    slug: "lille",
    name: "Lille",
    postalCode: "59000",
    department: "Nord",
    departmentCode: "59",
    scope: "national",
    nearby: ["Roubaix", "Tourcoing", "Villeneuve-d'Ascq", "Marcq-en-Barœul"],
  },
  {
    slug: "rennes",
    name: "Rennes",
    postalCode: "35000",
    department: "Ille-et-Vilaine",
    departmentCode: "35",
    scope: "national",
    nearby: ["Cesson-Sévigné", "Saint-Grégoire", "Bruz", "Chantepie"],
  },
  {
    slug: "reims",
    name: "Reims",
    postalCode: "51100",
    department: "Marne",
    departmentCode: "51",
    scope: "national",
    nearby: ["Tinqueux", "Cormontreuil", "Bétheny", "Bezannes"],
  },
  {
    slug: "le-havre",
    name: "Le Havre",
    postalCode: "76600",
    department: "Seine-Maritime",
    departmentCode: "76",
    scope: "national",
    nearby: ["Sainte-Adresse", "Montivilliers", "Gonfreville-l'Orcher", "Harfleur"],
  },
  {
    slug: "saint-etienne",
    name: "Saint-Étienne",
    postalCode: "42000",
    department: "Loire",
    departmentCode: "42",
    scope: "national",
    nearby: ["Saint-Priest-en-Jarez", "Saint-Chamond", "Roche-la-Molière", "Villars"],
  },
  {
    slug: "toulon",
    name: "Toulon",
    postalCode: "83000",
    department: "Var",
    departmentCode: "83",
    scope: "national",
    nearby: ["La Seyne-sur-Mer", "Six-Fours-les-Plages", "La Garde", "Hyères"],
  },
  {
    slug: "grenoble",
    name: "Grenoble",
    postalCode: "38000",
    department: "Isère",
    departmentCode: "38",
    scope: "national",
    nearby: ["Échirolles", "Saint-Martin-d'Hères", "Fontaine", "Meylan"],
  },
  {
    slug: "dijon",
    name: "Dijon",
    postalCode: "21000",
    department: "Côte-d'Or",
    departmentCode: "21",
    scope: "national",
    nearby: ["Chenôve", "Talant", "Quetigny", "Longvic"],
  },
  {
    slug: "angers",
    name: "Angers",
    postalCode: "49000",
    department: "Maine-et-Loire",
    departmentCode: "49",
    scope: "national",
    nearby: ["Trélazé", "Avrillé", "Les Ponts-de-Cé", "Saint-Barthélemy-d'Anjou"],
  },
  {
    slug: "nimes",
    name: "Nîmes",
    postalCode: "30000",
    department: "Gard",
    departmentCode: "30",
    scope: "national",
    nearby: ["Marguerittes", "Bouillargues", "Milhaud", "Caveirac"],
  },
  {
    slug: "clermont-ferrand",
    name: "Clermont-Ferrand",
    postalCode: "63000",
    department: "Puy-de-Dôme",
    departmentCode: "63",
    scope: "national",
    nearby: ["Chamalières", "Beaumont", "Aubière", "Cournon-d'Auvergne"],
  },
  {
    slug: "le-mans",
    name: "Le Mans",
    postalCode: "72000",
    department: "Sarthe",
    departmentCode: "72",
    scope: "national",
    nearby: ["Allonnes", "Coulaines", "Yvré-l'Évêque", "Arnage"],
  },
];

export const villeSlugs = villes.map((v) => v.slug);

export const getVille = (slug: string) => villes.find((v) => v.slug === slug);

/** Solutions pour lesquelles on publie une page par ville. */
export const cityServiceSlugs = [
  "pompe-a-chaleur-air-eau",
  "pompe-a-chaleur-air-air",
  "panneaux-photovoltaiques",
  "chauffe-eau-thermodynamique",
  "systeme-solaire-combine",
  "chauffe-eau-solaire-individuel",
  "poele-a-granules",
];
