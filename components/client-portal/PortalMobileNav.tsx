"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, LogOut, Menu, X } from "lucide-react";
import { sidebarItems } from "./Sidebar";
import { logout } from "./LogoutButton";

export function PortalMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        className="text-navy md:hidden"
      >
        <Menu size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-navy/40" onClick={() => setOpen(false)} aria-hidden />
          <nav className="absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col overflow-y-auto bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-navy">Menu</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu" className="text-navy">
                <X size={20} />
              </button>
            </div>

            <div className="mt-4 grid gap-1">
              {sidebarItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-semibold ${
                      active ? "bg-soft text-navy" : "text-muted hover:bg-soft"
                    }`}
                  >
                    <item.icon size={17} className={active ? "text-teal2" : "text-muted"} />
                    <span>
                      {item.label}
                      {item.sub && <span className="mt-0.5 block text-[11px] font-normal text-muted">{item.sub}</span>}
                    </span>
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={logout}
                className="mt-3 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13px] font-semibold text-muted hover:bg-soft"
              >
                <LogOut size={17} /> Déconnexion
              </button>
            </div>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-[13px] font-semibold text-navy"
            >
              <ArrowLeft size={16} /> Retour au site
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
