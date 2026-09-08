import Link from "next/link";
import { Phone, X } from "lucide-react";

export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-soft">
      <header className="border-b border-line bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="brand" aria-label="Label Énergie, retour à l'accueil">
            <span className="brand-label">Label</span>
            <span className="brand-energy">Energie</span>
          </Link>
          <div className="flex items-center gap-4">
            <a href="tel:+33184804000" className="hidden items-center gap-2 text-xs font-bold text-navy sm:flex">
              <Phone size={14} /> 01 84 80 40 00
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
