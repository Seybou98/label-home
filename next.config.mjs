/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // En-têtes de sécurité de base (site avec espace client authentifié).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  // Redirections 301 depuis les URL de l'ancien site (www.labelenergie.fr) pour conserver le référencement.
  async redirects() {
    const permanent = true;
    return [
      { source: "/aides-et-subventions", destination: "/aides-financement", permanent },
      { source: "/simulateur", destination: "/aides-financement/calculer-mes-aides", permanent },
      { source: "/qui-sommes-nous", destination: "/a-propos/qui-sommes-nous", permanent },
      { source: "/services/sav", destination: "/deja-client/sav", permanent },
      { source: "/services/entretien-maintenance", destination: "/deja-client/entretien", permanent },
      { source: "/solutions/chauffe-eau-thermo", destination: "/solutions/chauffe-eau-thermodynamique", permanent },
      { source: "/solutions/chauffe-eau-solaire", destination: "/solutions/chauffe-eau-solaire-individuel", permanent },
      { source: "/solutions/poele-a-granule", destination: "/solutions/poele-a-granules", permanent },
      { source: "/solutions/chaudiere-a-granule", destination: "/solutions/poele-a-granules", permanent },
      { source: "/solutions/panneaux-solaire-photovoltaique", destination: "/solutions/panneaux-photovoltaiques", permanent },
      { source: "/solutions/panneaux-solaires-hybrides", destination: "/solutions/panneaux-photovoltaiques", permanent },
      // Anciennes étapes du tunnel de souscription : désormais un seul assistant en 7 étapes.
      { source: "/deja-client/entretien/souscrire/formule", destination: "/deja-client/entretien/souscrire", permanent: false },
      { source: "/deja-client/entretien/souscrire/coordonnees", destination: "/deja-client/entretien/souscrire", permanent: false },
    ];
  },
};

export default nextConfig;
