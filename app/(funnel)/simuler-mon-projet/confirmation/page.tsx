import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SimulationConfirmation } from "@/components/funnel/SimulationConfirmation";

export const metadata: Metadata = buildMetadata({
  title: "Votre demande de simulation est envoyée",
  description: "Récapitulatif de votre demande de simulation d'aides pour votre projet de pompe à chaleur.",
  path: "/simuler-mon-projet/confirmation",
  noIndex: true,
});

export default function SimulationConfirmationPage() {
  return <SimulationConfirmation />;
}
