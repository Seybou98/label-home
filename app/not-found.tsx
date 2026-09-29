import Link from "next/link";
import { ArrowRight, Home, Phone, Search } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="section">
          <div className="container max-w-xl text-center">
            <p className="eyebrow">ERREUR 404</p>
            <h1 className="mt-3 font-display text-[32px] font-bold leading-[1.2] text-navy sm:text-[38px]">
              Cette page n&apos;existe pas.
            </h1>
            <p className="mt-4 text-[13px] leading-relaxed text-navy">
              La page que vous cherchez a peut-être changé d&apos;adresse ou n&apos;existe plus. Voici
              quelques liens utiles pour retrouver votre chemin.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/" className="btn btn-primary">
                <Home size={16} /> RETOUR À L&apos;ACCUEIL
              </Link>
              <Link href="/plan-du-site" className="btn btn-outline">
                <Search size={16} /> PLAN DU SITE
              </Link>
            </div>

            <div className="mt-10 rounded-card border border-line bg-soft p-5">
              <p className="text-[13px] font-semibold text-navy">Besoin d&apos;aide pour trouver votre solution ?</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Link href="/simuler-mon-projet" className="btn btn-outline">
                  SIMULER MON PROJET <ArrowRight size={14} />
                </Link>
                <a href={`tel:${siteConfig.phone}`} className="btn btn-outline">
                  <Phone size={14} /> {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
