import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SimulationWizard } from "@/components/funnel/SimulationWizard";

export const metadata: Metadata = buildMetadata({
  title: "Simulez vos aides pompe à chaleur en 2 minutes",
  description:
    "Répondez à quelques questions pour connaître votre profil MaPrimeRénov' et estimer vos aides CEE pour l'installation d'une pompe à chaleur. Simulation gratuite et sans engagement.",
  path: "/simuler-mon-projet",
});

export default function SimulerMonProjetPage() {
  return (
    <div className="sim-shell py-8">
      <p className="eyebrow text-center">SIMULATION GRATUITE</p>
      <h1 className="mt-2 text-center font-display text-2xl text-navy">Estimez vos aides pompe à chaleur</h1>
      <p className="mx-auto mt-2 max-w-md text-center text-[13px] text-muted">
        Répondez à 8 questions rapides pour connaître votre profil MaPrimeRénov&apos; et votre fourchette d&apos;aides.
      </p>
      <div className="mt-8">
        <SimulationWizard />
      </div>
    </div>
  );
}
