"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  FileText,
  Gift,
  Headphones,
  Home,
  LogOut,
  MessageSquare,
  Phone,
  Receipt,
  ShieldCheck,
  User,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { logout } from "./LogoutButton";

export const sidebarItems: { label: string; href: string; sub?: string; icon: LucideIcon }[] = [
  { label: "Accueil", href: "/espace-client", icon: Home },
  { label: "Mon projet", href: "/espace-client/mon-projet", sub: "Suivi de mon installation", icon: FileText },
  { label: "Mes documents", href: "/espace-client/documents", icon: FileText },
  { label: "Mes rendez-vous", href: "/espace-client/rendez-vous", icon: Calendar },
  { label: "Mes contrats", href: "/espace-client/contrats", sub: "Entretien & garanties", icon: ShieldCheck },
  { label: "Mes factures", href: "/espace-client/factures", icon: Receipt },
  { label: "Mes demandes", href: "/espace-client/demandes", sub: "SAV, devis, parrainage…", icon: MessageSquare },
  { label: "Mon parrainage", href: "/espace-client/parrainage", sub: "Gagnez 300 €", icon: Gift },
  { label: "Mon coach énergie", href: "/espace-client/coach-energie", sub: "Conseils & économies", icon: Headphones },
  { label: "Mon profil", href: "/espace-client/profil", sub: "Mes informations", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="portal-sidebar hidden w-64 shrink-0 border-r border-line bg-white py-4 md:block">
      <nav className="grid gap-1 px-3">
        {sidebarItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-xs font-semibold ${
                active ? "bg-soft text-navy" : "text-muted hover:bg-soft"
              }`}
            >
              <item.icon size={16} className={active ? "text-teal2" : "text-muted"} />
              <span>
                {item.label}
                {item.sub && <span className="mt-0.5 block text-[10px] font-normal text-muted">{item.sub}</span>}
              </span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={logout}
          className="mt-4 flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-xs font-semibold text-muted hover:bg-soft"
        >
          <LogOut size={16} /> Déconnexion
        </button>
      </nav>

      <div className="portal-aide px-3 pt-4">
        <div className="rounded-card border border-line bg-soft p-4">
          <p className="text-xs font-bold text-navy">Besoin d&apos;aide ?</p>
          <p className="mt-3 text-[11px] leading-relaxed text-muted">
            Notre service client
            <br />
            est à votre écoute.
          </p>
          <a
            href={`tel:${siteConfig.phone}`}
            className="mt-3 flex items-center gap-2 text-xs font-bold text-navy"
          >
            <Phone size={14} className="text-teal2" /> {siteConfig.phoneDisplay}
          </a>
          <p className="mt-2 text-[11px] leading-relaxed text-muted">
            Du lundi au vendredi
            <br />
            de 8h à 18h
          </p>
          <Link
            href="/contact"
            className="btn btn-outline mt-4 w-full justify-center py-2 text-[11px]"
          >
            NOUS CONTACTER
          </Link>
        </div>
      </div>
    </aside>
  );
}
