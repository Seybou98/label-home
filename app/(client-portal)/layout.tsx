import type { Metadata } from "next";
import Link from "next/link";
import { Bell } from "lucide-react";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/client-portal/Sidebar";
import { LogoutButton } from "@/components/client-portal/LogoutButton";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/connexion");

  return (
    <div className="portal-shell flex flex-col bg-soft">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/espace-client" className="brand" aria-label="Label Énergie, espace client">
            <span className="brand-label">Label</span>
            <span className="brand-energy">Energie</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="relative text-muted" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal2 text-[9px] font-bold text-white">
                3
              </span>
            </button>
            <span className="text-xs font-semibold text-navy">Bonjour, {session.name}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-7xl flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
