"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import logo from "@/maquette/logo.png";
import { navSections } from "@/lib/navigation";

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
