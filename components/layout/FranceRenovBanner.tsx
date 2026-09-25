import Image from "next/image";

export function FranceRenovBanner() {
  return (
    <a
      href="https://france-renov.gouv.fr/servicepublic"
      target="_blank"
      rel="noopener noreferrer"
      className="fr-banner"
    >
      <div className="fr-banner-inner">
        <div className="fr-banner-marianne">
          <div className="fr-banner-flag" aria-hidden>
            <span style={{ background: "#000091" }} />
            <span style={{ background: "#ffffff" }} />
            <span style={{ background: "#e1000f" }} />
          </div>
          <p className="fr-banner-republique">
            RÉPUBLIQUE
            <br />
            FRANÇAISE
          </p>
          <p className="fr-banner-devise">
            Liberté
            <br />
            Égalité
            <br />
            Fraternité
          </p>
        </div>
        <Image
          src="/images/France-renov-logo-trim.png"
          alt="France Rénov'"
          width={3428}
          height={1710}
          className="fr-banner-logo"
        />
        <p className="fr-banner-text">
          Avant de vous engager, le service public vous informe gratuitement pour préparer et
          sécuriser votre projet : <b>france-renov.gouv.fr</b>
        </p>
      </div>
    </a>
  );
}
