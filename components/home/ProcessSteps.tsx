import {
  ChevronRight,
  FileSearch,
  LifeBuoy,
  Settings,
  Target,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { processSteps } from "@/lib/content/home";
import { Reveal } from "@/components/animation/Reveal";

const icons: Record<string, LucideIcon> = {
  FileSearch,
  Target,
  Wrench,
  Settings,
  LifeBuoy,
};

export function ProcessSteps() {
  return (
    <section className="section process-section">
      <div className="container">
        <SectionTitle
          kicker="NOTRE ACCOMPAGNEMENT DE A À Z"
          title="Un accompagnement simple et transparent"
        />
        <Reveal className="process">
          {processSteps.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <div className="step" key={s.n}>
                <div className="step-icon">
                  <Icon />
                </div>
                <div>
                  <span>{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                {i < processSteps.length - 1 && <ChevronRight className="step-arrow" />}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
