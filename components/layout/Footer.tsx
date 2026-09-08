import Link from "next/link";

const columns = [
  {
    title: "SOLUTIONS",
    items: [
      { label: "Pompe à chaleur", href: "/solutions/pompe-a-chaleur" },
      { label: "Climatisation", href: "/solutions/climatisation" },
      { label: "Solaire photovoltaïque", href: "/solutions/panneaux-photovoltaiques" },
      { label: "Système solaire combiné", href: "/solutions/systeme-solaire-combine" },
      { label: "Eau chaude", href: "/solutions/chauffe-eau-thermodynamique" },
      { label: "Toutes nos solutions", href: "/solutions" },
    ],
  },
  {
    title: "AIDES & FINANCEMENT",
    items: [
      { label: "Calculer mes aides", href: "/aides-financement/calculer-mes-aides" },
      { label: "MaPrimeRénov'", href: "/aides-financement/maprimerenov" },
      { label: "CEE", href: "/aides-financement/cee" },
      { label: "Financement", href: "/aides-financement/financement" },
    ],
  },
  {
    title: "À PROPOS",
    items: [
      { label: "Qui sommes-nous ?", href: "/a-propos/qui-sommes-nous" },
      { label: "Nos certifications", href: "/a-propos/certifications" },
      { label: "Nos équipes", href: "/a-propos/nos-equipes" },
      { label: "Nos partenaires", href: "/a-propos/nos-partenaires" },
      { label: "Recrutement", href: "/a-propos/recrutement" },
    ],
  },
  {
    title: "DÉJÀ CLIENT ?",
    items: [
      { label: "Mon espace client", href: "/espace-client" },
      { label: "SAV", href: "/deja-client/sav" },
      { label: "Entretien & contrats", href: "/deja-client/entretien" },
      { label: "Parrainage", href: "/deja-client/parrainage" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand-footer">
            <span>Label</span>Energie
          </div>
          <p>
            Expert en solutions énergétiques
            <br />
            pour le confort, les économies
            <br />
            d&apos;énergie et la performance
            <br />
            durable de votre habitat.
          </p>
          <div className="socials">
            <span>f</span>
            <span>◎</span>
            <span>in</span>
            <span>▶</span>
          </div>
        </div>
        {columns.map((col) => (
          <div className="footer-col" key={col.title}>
            <h4>{col.title}</h4>
            {col.items.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="container legal">
        <span>© {new Date().getFullYear()} Label Énergie</span>
        <Link href="/mentions-legales">Mentions légales</Link>
        <Link href="/confidentialite">Politique de confidentialité</Link>
        <Link href="/cookies">Gestion des cookies</Link>
        <Link href="/plan-du-site">Plan du site</Link>
      </div>
    </footer>
  );
}
