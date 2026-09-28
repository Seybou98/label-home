import Link from "next/link";
import { DocumentsExplorer } from "@/components/client-portal/DocumentsExplorer";
import { getMyPortal } from "@/lib/portal";

export default async function DocumentsPage() {
  const data = await getMyPortal();
  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-2 text-[11px] text-muted">
        <Link href="/espace-client" className="hover:text-teal2">
          Espace client
        </Link>
        <span>›</span>
        <span className="font-semibold text-navy">Mes documents</span>
      </div>

      <DocumentsExplorer documents={data.documents} />
    </div>
  );
}
