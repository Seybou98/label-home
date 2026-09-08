import Link from "next/link";
import { PortalPlaceholder } from "@/components/client-portal/PortalPlaceholder";

export default function ContratsPage() {
  return (
    <div>
      <PortalPlaceholder
        title="Mes contrats"
        description="Retrouvez vos contrats d'entretien et de garantie en cours."
      />
      <Link
        href="/deja-client/entretien/souscrire"
        className="mt-4 inline-flex items-center rounded-md bg-gradient-to-r from-[#0b5877] to-[#18b9a0] px-5 py-3 text-xs font-extrabold text-white shadow-lg"
      >
        SOUSCRIRE UN NOUVEAU CONTRAT D&apos;ENTRETIEN
      </Link>
    </div>
  );
}
