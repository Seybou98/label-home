export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection extends NavItem {
  items?: NavItem[];
}

/** Navigation principale du site, partagée par le header public et le header de l'espace client. */
export const navSections: NavSection[] = [
  {
    label: "Solutions",
    href: "/solutions",
    items: [
      { label: "Pompe à chaleur", href: "/solutions/pompe-a-chaleur" },
      { label: "Pompe à chaleur Air/Air", href: "/solutions/pompe-a-chaleur-air-air" },
      { label: "Panneaux photovoltaïques", href: "/solutions/panneaux-photovoltaiques" },
      { label: "Système solaire combiné", href: "/solutions/systeme-solaire-combine" },
      { label: "Chauffe-eau thermodynamique", href: "/solutions/chauffe-eau-thermodynamique" },
      { label: "Chauffe-eau solaire (CESI)", href: "/solutions/chauffe-eau-solaire-individuel" },
      { label: "Poêle à granulés", href: "/solutions/poele-a-granules" },
      { label: "Toutes nos solutions", href: "/solutions" },
    ],
  },
  {
    label: "Aides & financement",
    href: "/aides-financement",
    items: [
      { label: "Calculer mes aides", href: "/aides-financement/calculer-mes-aides" },
      { label: "MaPrimeRénov'", href: "/aides-financement/maprimerenov" },
      { label: "CEE", href: "/aides-financement/cee" },
      { label: "Financement", href: "/aides-financement/financement" },
    ],
  },
  { label: "Réalisations", href: "/realisations" },
  { label: "Conseils", href: "/conseils" },
  { label: "FAQ", href: "/faq" },
  {
    label: "À propos",
    href: "/a-propos/qui-sommes-nous",
    items: [
      { label: "Qui sommes-nous ?", href: "/a-propos/qui-sommes-nous" },
      { label: "Nos certifications", href: "/a-propos/certifications" },
      { label: "Nos équipes", href: "/a-propos/nos-equipes" },
      { label: "Nos partenaires", href: "/a-propos/nos-partenaires" },
    ],
  },
  {
    label: "Déjà client",
    href: "/deja-client",
    items: [
      { label: "Mon espace client", href: "/espace-client" },
      { label: "Déclarer un SAV", href: "/deja-client/sav" },
      { label: "Entretien & contrats", href: "/deja-client/entretien" },
      { label: "Parrainage", href: "/deja-client/parrainage" },
    ],
  },
];
