import Image from "next/image";
import { Check } from "lucide-react";
import { phoneImage, appFeatures } from "@/lib/content/home";
import { Reveal } from "@/components/animation/Reveal";

export function AppPromoBlock() {
  return (
    <Reveal as="section" className="app-section container">
      <div className="app-phone" style={{ position: "relative" }}>
        <Image
          src={phoneImage}
          alt="Application mobile Label Énergie"
          fill
          sizes="150px"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
      </div>
      <div className="app-copy">
        <div className="eyebrow">VOTRE PROJET DANS VOTRE POCHE</div>
        <h2>
          Suivez votre installation,
          <br />
          accédez à vos documents,
          <br />
          contactez le SAV et bien plus encore depuis notre application.
        </h2>
        <div className="store-buttons">
          <button type="button">
            {" "}
            <span>
              Télécharger sur
              <br />
              <b>App Store</b>
            </span>
          </button>
          <button type="button">
            ▶{" "}
            <span>
              DISPONIBLE SUR
              <br />
              <b>Google Play</b>
            </span>
          </button>
        </div>
      </div>
      <div className="app-features">
        {appFeatures.map((x) => (
          <span key={x}>
            <Check />
            {x}
          </span>
        ))}
      </div>
      <div className="qr">
        <div className="qr-grid">
          {Array.from({ length: 64 }).map((_, i) => (
            <i key={i} className={i % 3 === 0 || i % 7 === 0 ? "on" : ""} />
          ))}
        </div>
        <span>
          Scannez pour
          <br />
          télécharger l&apos;application
        </span>
      </div>
    </Reveal>
  );
}
