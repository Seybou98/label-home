import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  Flame,
  Home,
  MessageCircle,
  Snowflake,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { projectChoices } from "@/lib/content/home";
import { Reveal } from "@/components/animation/Reveal";

const icons: Record<string, LucideIcon> = {
  Flame,
  Snowflake,
  Sun,
  Droplets,
  Home,
  MessageCircle,
};

export function ProjectChoiceGrid() {
  return (
    <>
      <SectionTitle
        kicker="QUEL EST VOTRE PROJET ?"
        title={
          <>
            Nous avons la solution
            <br />
            adaptée à vos besoins
          </>
        }
      />
      <Reveal className="choice-grid">
        {projectChoices.map((choice) => {
          const Icon = icons[choice.icon];
          return (
            <Link className="choice-card" key={choice.href + choice.title[0]} href={choice.href}>
              <Icon className={`choice-icon ${choice.color}`} size={40} />
              <strong>
                {choice.title[0]}
                <br />
                {choice.title[1]}
              </strong>
              <ArrowRight className="card-arrow" size={16} />
            </Link>
          );
        })}
      </Reveal>
    </>
  );
}
