import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactForm } from "@/components/marketing/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact : parlons de votre projet énergétique",
  description:
    "Contactez Label Énergie pour un devis gratuit ou une question sur votre projet de pompe à chaleur, climatisation, solaire ou eau chaude. Réponse rapide de nos conseillers.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Contact", path: "/contact" }]} />
      <section className="section">
        <div className="container grid gap-10 md:grid-cols-2">
          <div>
            <h1 className="font-display text-2xl text-navy">Parlons de votre projet</h1>
            <p className="mt-3 text-sm text-muted">
              Nos conseillers vous répondent et vous accompagnent gratuitement, du lundi au
              vendredi de 8h à 20h et le samedi de 9h à 12h.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-teal2">
                <Phone size={18} />
              </span>
              <div>
                <a href={`tel:${siteConfig.phone}`} className="block text-lg font-bold text-navy">
                  {siteConfig.phoneDisplay}
                </a>
                <span className="text-xs text-muted">Lun. - Ven. : 8h - 20h • Sam. : 9h - 12h</span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
