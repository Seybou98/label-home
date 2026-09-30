import Link from "next/link";
import Image from "next/image";
import { Phone, X } from "lucide-react";
import logo from "@/maquette/logo.png";
import { siteConfig } from "@/lib/site";

export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-soft">
      <header className="border-b border-line bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="brand" aria-label="Label Énergie, retour à l'accueil">
            <Image src={logo} alt="Label Energie" className="header-logo" priority />
          </Link>
          <div className="flex items-center gap-4">
            <a href={`tel:${siteConfig.phone}`} className="hidden items-center gap-2 text-xs font-bold text-navy sm:flex">
              <Phone size={14} /> {siteConfig.phoneDisplay}
            </a>
            <Link href="/" aria-label="Quitter le parcours" className="text-muted">
              <X size={20} />
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
