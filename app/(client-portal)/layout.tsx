import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Bell } from "lucide-react";
import { redirect } from "next/navigation";
import logo from "@/maquette/logo.png";
import { Sidebar } from "@/components/client-portal/Sidebar";
import { LogoutButton } from "@/components/client-portal/LogoutButton";
import { PortalHeaderNav } from "@/components/client-portal/PortalHeaderNav";
import { PortalMobileNav } from "@/components/client-portal/PortalMobileNav";
import { PortalFooterCta } from "@/components/client-portal/PortalFooterCta";
import { getSession } from "@/lib/auth/session";
import { getPortalData } from "@/lib/portal/data";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/connexion");
  // Mis en cache le temps de la requête : les pages réutilisent le même chargement.
  const notifCount = await getPortalData(session.clientId, session.source, session.name, session.email)
    .then((d) => d.notifications.length)
    .catch(() => 0);

  return (
    <div className="portal-shell flex flex-col bg-soft">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
          <Link href="/espace-client" className="brand shrink-0" aria-label="Label Énergie, espace client">
            <Image src={logo} alt="Label Energie" className="header-logo" priority />
          </Link>
          <PortalHeaderNav />
          <div className="ml-auto flex shrink-0 items-center gap-4">
            <Link href="/espace-client" className="relative text-muted" aria-label={`Notifications (${notifCount})`}>
              <Bell size={18} />
              {notifCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal2 text-[9px] font-bold text-white">
                  {notifCount}
                </span>
              )}
            </Link>
            <span className="hidden text-xs font-semibold text-navy sm:inline">Bonjour, {session.name}</span>
            <div className="hidden md:block">
              <LogoutButton />
            </div>
            <PortalMobileNav />
          </div>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-7xl flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
      </div>
      <PortalFooterCta />
    </div>
  );
}
