"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import logo from "@/maquette/logo.png";

const navSections = [
  {
    label: "Solutions",
    href: "/solutions",
    items: [
      { label: "Pompe à chaleur", href: "/solutions/pompe-a-chaleur" },
      { label: "Pompe à chaleur Air/Air", href: "/solutions/pompe-a-chaleur-air-air" },
      // { label: "Climatisation", href: "/solutions/climatisation" },
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
  {
    label: "À propos",
    href: "/a-propos/qui-sommes-nous",
    items: [
      { label: "Qui sommes-nous ?", href: "/a-propos/qui-sommes-nous" },
      { label: "Nos certifications", href: "/a-propos/certifications" },
      { label: "Nos équipes", href: "/a-propos/nos-equipes" },
      { label: "Nos partenaires", href: "/a-propos/nos-partenaires" },
      // { label: "Recrutement", href: "/a-propos/recrutement" },
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

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " header-scrolled" : ""}`}>
      <div className="container nav">
        <Link href="/" className="brand" aria-label="Label Énergie, retour à l'accueil">
          <Image src={logo} alt="Label Energie" className="header-logo" priority />
        </Link>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navSections.map((section) =>
            section.items ? (
              <div
                key={section.label}
                className="nav-dropdown-wrap"
                onMouseEnter={() => setOpenSection(section.label)}
                onMouseLeave={() => setOpenSection(null)}
              >
                <button
                  onClick={() =>
                    setOpenSection(openSection === section.label ? null : section.label)
                  }
                >
                  {section.label} <ChevronDown size={12} />
                </button>
                {openSection === section.label && (
                  <div className="nav-dropdown">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setMenuOpen(false);
                          setOpenSection(null);
                        }}
                        className="nav-dropdown-item"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={section.href} href={section.href} onClick={() => setMenuOpen(false)}>
                {section.label}
              </Link>
            ),
          )}
        </nav>

        <Link href="/simuler-mon-projet" className="btn btn-primary nav-cta">
          SIMULER MON PROJET <ArrowRight size={16} />
        </Link>
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
