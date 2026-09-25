/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
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
    ];
  },
};

export default nextConfig;
