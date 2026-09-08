import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ProjectChoiceGrid } from "@/components/home/ProjectChoiceGrid";
import { ProjectCtaBanner } from "@/components/home/ProjectCtaBanner";
import { StatsBlock } from "@/components/home/StatsBlock";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { RealizationsSection } from "@/components/home/RealizationsSection";
import { AppPromoBlock } from "@/components/home/AppPromoBlock";
import { ContactStrip } from "@/components/home/ContactStrip";

export const metadata: Metadata = buildMetadata({
  title: "Label Énergie | Réduisez vos factures d'énergie durablement",
  description:
    "Pompe à chaleur, climatisation, solaire photovoltaïque, eau chaude : Label Énergie étudie, installe et entretient vos équipements. Entreprise RGE, étude gratuite, aides MaPrimeRénov'.",
  path: "/",
});

export default function HomePage() {
  return (
    <div id="accueil">
      <Hero />
      <TrustBar />

      <section id="solutions" className="section">
        <div className="container">
          <ProjectChoiceGrid />
          <ProjectCtaBanner />
          <StatsBlock />
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <SolutionsGrid />
        </div>
      </section>

      <ProcessSteps />
      <RealizationsSection />
      <AppPromoBlock />
      <ContactStrip />
    </div>
  );
}
