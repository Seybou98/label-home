import Image from "next/image";
import { Home, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";

export function TrustBar() {
  return (
    <Reveal as="section" className="trust container">
      <div className="trust-item stacked">
        <Image
          src="/images/logo-rge.png"
          alt="Certification RGE"
          width={130}
          height={90}
          className="trust-mark"
        />
        <span className="trust-caption">Entreprise certifiée</span>
      </div>

      <div className="trust-item stacked">
        <span className="trust-edf-lockup">
          <Image
            src="/images/logo-edf.png"
            alt=""
            width={100}
            height={90}
            className="trust-mark"
          />
          edf
        </span>
        <span className="trust-caption">Partenaire officiel</span>
      </div>

      <div className="trust-item trust-inline">
        <Home className="trust-mark trust-icon" aria-hidden />
        <div className="trust-text">
          <strong>+ 12 000</strong>
          <span className="trust-caption">Installations réalisées</span>
        </div>
      </div>

      <div className="trust-item trust-inline">
        <ShieldCheck className="trust-mark trust-icon" aria-hidden />
        <div className="trust-text">
          <strong>SAV &amp; entretien</strong>
          <span className="trust-caption">assurés</span>
        </div>
      </div>
    </Reveal>
  );
}
