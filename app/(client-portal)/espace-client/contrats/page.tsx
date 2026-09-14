import Link from "next/link";
import { PortalPlaceholder } from "@/components/client-portal/PortalPlaceholder";

export default function ContratsPage() {
  return (
    <div>
      <PortalPlaceholder
        title="Mes contrats"
        description="Retrouvez vos contrats d'entretien et de garantie en cours."
      />
      <Link href="/deja-client/entretien/souscrire" className="btn btn-primary mt-4">
        SOUSCRIRE UN NOUVEAU CONTRAT D&apos;ENTRETIEN
      </Link>
    </div>
  );
}
