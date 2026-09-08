import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Avis clients Label Énergie",
  description:
    "Découvrez les avis Google de nos clients sur nos installations de pompes à chaleur, climatisation, panneaux solaires et eau chaude.",
  path: "/temoignages",
});

export default function TemoignagesPage() {
  return (
    <PagePlaceholder
      breadcrumb={[{ name: "Témoignages", path: "/temoignages" }]}
      eyebrow="ILS NOUS FONT CONFIANCE"
      title="4,6/5 sur plus de 800 avis Google"
      description="Des clients satisfaits, des résultats concrets. La liste complète de nos avis clients sera intégrée ici, avec une synchronisation directe depuis notre fiche Google Business."
    />
  );
}
