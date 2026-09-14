import Image from "next/image";
import { Check } from "lucide-react";
import { phoneImage, appFeatures } from "@/lib/content/home";
import { Reveal } from "@/components/animation/Reveal";

export function AppPromoBlock() {
  return (
    <Reveal as="section" className="app-section container">
      <div className="app-phone">
        <Image
          src={phoneImage}
          alt="Application mobile Label Énergie"
          width={481}
          height={519}
          className="app-phone-img"
          loading="lazy"
        />
      </div>
      <div className="app-copy">
        <h2>Votre projet dans votre poche</h2>
        <p>
          Suivez votre installation, accédez à vos documents, contactez le SAV et bien plus
          encore depuis notre application.
        </p>
        <div className="store-buttons">
          <button type="button">
            <Image src="/images/appl.png" alt="" width={30} height={30} />
            <span>
              Télécharger sur
              <br />
              <b>App Store</b>
            </span>
          </button>
          <button type="button">
            <Image src="/images/googl.png" alt="" width={30} height={30} />
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
        <Image src="/images/qr.png" alt="QR code de téléchargement" width={180} height={180} className="qr-grid" />
        <span>
          Scannez pour
          <br />
          télécharger l&apos;application
        </span>
      </div>
    </Reveal>
  );
}
