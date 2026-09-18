import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { heroImage } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">VOTRE CONFORT, NOTRE ENGAGEMENT</div>
          <h1>
            Réduisez vos
            <br />
            factures d&apos;énergie.
            <br />
            <span>Durablement.</span>
          </h1>
          <p>
            Pompe à chaleur, climatisation, solaire, eau chaude :
            <br className="desktop" /> des solutions performantes, installées par nos équipes.
          </p>
          <div className="ticks">
            <span>
              <Check /> Étude gratuite
              <br />
              et personnalisée
            </span>
            <span>
              <Check /> Entreprise RGE
              <br />
              certifiée
            </span>
            <span>
              <Check /> Installation
              <br />
              &amp; SAV assurés
            </span>
            <span>
              <Check /> Accompagnement
              <br />
              aux aides
            </span>
          </div>
          <div className="hero-actions">
            <Link href="/simuler-mon-projet" className="btn btn-primary">
              SIMULER MON PROJET <ArrowRight />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              NOUS CONTACTER <Phone />
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-media">
            <Image
              src={heroImage}
              alt="Maison équipée d'une pompe à chaleur Label Énergie"
              fill
              sizes="(max-width: 900px) 100vw, 52vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className="hero-rating">
            <span className="google-g">G</span>
            <strong>{siteConfig.rating.valueLabel}/5</strong>
            <span className="stars">★★★★★</span>
            <small>Basé sur +{siteConfig.rating.count} avis clients</small>
          </div>
        </div>
      </div>
    </section>
  );
}
