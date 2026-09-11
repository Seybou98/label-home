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
        <Image
          src="/images/petit-removebg-preview.png"
          alt=""
          width={71}
          height={45}
          className="scribble scribble-petit"
        />
        <Image
          src="/images/grand-removebg-preview.png"
          alt=""
          width={120}
          height={120}
          className="scribble scribble-grand"
        />
        <Link href="/simuler-mon-projet" className="btn btn-primary cta-banner-btn">
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
