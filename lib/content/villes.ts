export interface Ville {
  slug: string;
  name: string;
  postalCode: string;
  department: string;
  departmentCode: string;
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
    nearby: ["Torcy", "Collégien", "Lognes", "Émerainville", "Pontault-Combault"],
  },
  {
    slug: "melun",
    name: "Melun",
    postalCode: "77000",
    department: "Seine-et-Marne",
    departmentCode: "77",
    nearby: ["Dammarie-les-Lys", "Le Mée-sur-Seine", "Vaux-le-Pénil", "Rubelles"],
  },
  {
    slug: "meaux",
    name: "Meaux",
    postalCode: "77100",
    department: "Seine-et-Marne",
    departmentCode: "77",
    nearby: ["Villenoy", "Trilport", "Nanteuil-lès-Meaux", "Mareuil-lès-Meaux"],
  },
  {
    slug: "torcy",
    name: "Torcy",
    postalCode: "77200",
    department: "Seine-et-Marne",
    departmentCode: "77",
    nearby: ["Lognes", "Noisiel", "Bussy-Saint-Georges", "Croissy-Beaubourg", "Collégien"],
  },
  {
    slug: "chelles",
    name: "Chelles",
    postalCode: "77500",
    department: "Seine-et-Marne",
    departmentCode: "77",
    nearby: ["Brou-sur-Chantereine", "Vaires-sur-Marne", "Courtry"],
  },
  {
    slug: "pontault-combault",
    name: "Pontault-Combault",
    postalCode: "77340",
    department: "Seine-et-Marne",
    departmentCode: "77",
    nearby: ["Roissy-en-Brie", "Émerainville", "Ozoir-la-Ferrière", "Croissy-Beaubourg"],
  },
  {
    slug: "lagny-sur-marne",
    name: "Lagny-sur-Marne",
    postalCode: "77400",
    department: "Seine-et-Marne",
    departmentCode: "77",
    nearby: ["Thorigny-sur-Marne", "Saint-Thibault-des-Vignes", "Montévrain", "Pomponne", "Dampmart"],
  },
  {
    slug: "bussy-saint-georges",
    name: "Bussy-Saint-Georges",
    postalCode: "77600",
    department: "Seine-et-Marne",
    departmentCode: "77",
    nearby: ["Guermantes", "Conches-sur-Gondoire", "Collégien", "Montévrain"],
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
