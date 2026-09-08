import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Nos certifications : RGE, Qualibat et garanties",
  description:
    "Label Énergie est certifiée RGE (Reconnu Garant de l'Environnement) et Qualibat, des garanties de qualité indispensables pour bénéficier des aides de l'État.",
  path: "/a-propos/certifications",
});

export default function CertificationsPage() {
  return (
    <PagePlaceholder
      breadcrumb={[
        { name: "À propos", path: "/a-propos/qui-sommes-nous" },
        { name: "Nos certifications", path: "/a-propos/certifications" },
      ]}
      eyebrow="CERTIFICATIONS"
      title="Des certifications qui garantissent la qualité de nos installations"
      description="Certifiée RGE et Qualibat, Label Énergie répond aux exigences les plus strictes en matière de qualité d'installation, condition indispensable pour l'accès aux aides de l'État."
    />
  );
}
