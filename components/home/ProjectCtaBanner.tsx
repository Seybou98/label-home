import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";

export function ProjectCtaBanner() {
  return (
    <Reveal className="project-cta">
      <div>
        <h2>Votre projet en 2 minutes</h2>
        <ul>
          <li>
            <Check /> Estimation des économies réalisables
          </li>
          <li>
            <Check /> Aides et subventions auxquelles vous avez droit
          </li>
          <li>
            <Check /> Conseils adaptés à votre logement
          </li>
        </ul>
      </div>
      <div className="cta-center">
        <span className="scribble" aria-hidden>
          ↘
        </span>
        <Link href="/simuler-mon-projet" className="btn btn-primary">
          SIMULER MON PROJET <ArrowRight />
        </Link>
        <small>Gratuit • Sans engagement • Résultat immédiat</small>
      </div>
      <div className="phone-mock">
        <Image
          src="/images/telephone.png"
          alt="Aperçu de l'application Label Énergie sur mobile"
          width={595}
          height={419}
          className="phone-mock-img"
        />
      </div>
    </Reveal>
  );
}
