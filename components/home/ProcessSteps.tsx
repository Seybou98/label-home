import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { SectionTitle } from "./SectionTitle";
import { processSteps } from "@/lib/content/home";
import { Reveal } from "@/components/animation/Reveal";

export function ProcessSteps() {
  return (
    <section className="section process-section">
      <div className="container">
        <SectionTitle
          kicker="NOTRE ACCOMPAGNEMENT DE A À Z"
          title=
          {
            <strong>
              "Un accompagnement simple et transparent"
            </strong>
          }
        />
        <Reveal className="process">
          {processSteps.map((s, i) => {
            return (
              <div className="step" key={s.n}>
                <div className="step-icon">
                  <Image src={s.icon} alt="" width={22} height={22} />
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
