import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  Droplets,
  Fan,
  FileText,
  Flame,
  Headphones,
  ShieldCheck,
  Sun,
  Smartphone,
  SunMedium,
  type LucideIcon,
} from "lucide-react";
import { buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { EquipmentFinder } from "@/components/entretien/EquipmentFinder";
import { contractPlans, entretienFaq, entretienSteps, equipmentTypes } from "@/lib/content/entretien";

export const metadata: Metadata = buildMetadata({
  title: "Contrat d'entretien : pompe à chaleur, solaire, chauffe-eau",
  description:
    "Souscrivez un contrat d'entretien pour votre pompe à chaleur, système solaire combiné, chauffe-eau ou panneaux photovoltaïques. 3 formules, souscription en ligne, techniciens certifiés.",
  path: "/deja-client/entretien",
});

const equipmentIcons: Record<string, LucideIcon> = {
  Fan,
  SunMedium,
  Smartphone,
  Flame,
  Sun,
  Droplets,
};

export default function EntretienPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Contrat d'entretien Label Énergie",
            description:
              "Contrats d'entretien annuel pour pompes à chaleur, systèmes solaires combinés, chauffe-eau thermodynamiques, poêles à granulés, panneaux photovoltaïques et ballons d'eau chaude.",
            path: "/deja-client/entretien",
          }),
          faqJsonLd(entretienFaq),
        ]}
      />
      <Breadcrumb
        items={[
          { name: "Déjà client", path: "/deja-client" },
          { name: "Entretien & maintenance", path: "/deja-client/entretien" },
        ]}
      />

      {/* Hero */}
      <section className="bg-white">
        <div className="container grid gap-10 py-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <p className="eyebrow">ENTRETIEN &amp; MAINTENANCE</p>
            <h1 className="font-display text-3xl leading-tight text-navy md:text-4xl">
              Prolongez la durée de vie de vos équipements et faites des économies.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Un entretien régulier, c&apos;est la garantie d&apos;installations performantes,
              sécurisées et économiques toute l&apos;année.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Performance optimale", "Économies d'énergie", "Sécurité renforcée", "Conformité réglementaire"].map(
                (label) => (
                  <div key={label} className="flex items-start gap-2">
                    <Check className="mt-0.5 shrink-0 text-teal2" size={16} />
                    <span className="text-xs font-semibold text-navy">{label}</span>
                  </div>
                ),
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/deja-client/entretien/souscrire" className="btn btn-primary">
                SOUSCRIRE UN CONTRAT D&apos;ENTRETIEN <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                DEMANDER UN DEVIS GRATUIT
              </Link>
            </div>
          </div>

          <EquipmentFinder />
        </div>
      </section>

      {/* Service highlights */}
      <section className="border-y border-line bg-soft">
        <div className="container grid gap-6 py-6 sm:grid-cols-2 md:grid-cols-4">
          {[
            { icon: Headphones, title: "Service client dédié", text: "Une équipe à l'écoute du lundi au vendredi 8h - 18h" },
            { icon: Calendar, title: "Intervention rapide", text: "Sous 48 à 72h* selon votre disponibilité" },
            { icon: ShieldCheck, title: "Techniciens certifiés", text: "Des experts qualifiés et régulièrement formés" },
            { icon: FileText, title: "Rapport d'entretien", text: "Un rapport complet après chaque intervention" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <item.icon className="mt-0.5 shrink-0 text-teal2" size={22} />
              <div>
                <p className="text-xs font-bold text-navy">{item.title}</p>
                <p className="text-xs text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="container pb-4 text-[10px] text-muted">
          * Délais indicatifs selon disponibilité et zone géographique.
        </p>
      </section>

      {/* Equipment types */}
      <section className="section">
        <div className="container">
          <h2 className="text-center font-display text-xl text-navy">
            Quels équipements entretenons-nous ?
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {equipmentTypes.map((eq) => {
              const Icon = equipmentIcons[eq.icon] ?? Flame;
              return (
                <div
                  key={eq.slug}
                  className="flex flex-col items-center gap-3 rounded-card border border-line p-4 text-center shadow-card"
                >
                  <Icon className="text-teal2" size={26} />
                  <p className="text-xs font-bold text-navy">{eq.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contract plans */}
      <section className="section bg-soft">
        <div className="container">
          <h2 className="text-center font-display text-xl text-navy">Nos contrats d&apos;entretien</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {contractPlans.map((plan) => (
              <div
                key={plan.slug}
                className={`relative rounded-card border bg-white p-6 shadow-card ${
                  plan.recommended ? "border-teal2 ring-2 ring-teal2" : "border-line"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal2 px-3 py-1 text-[10px] font-extrabold text-white">
                    RECOMMANDÉ
                  </span>
                )}
                <h3 className="text-center text-base font-bold text-navy">{plan.name}</h3>
                <p className="mt-1 text-center text-xs font-semibold text-teal2">{plan.tagline}</p>
                <ul className="mt-4 grid gap-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted">
                      <Check className="mt-0.5 shrink-0 text-teal2" size={14} />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-center">
                  <span className="text-xs text-muted">À partir de </span>
                  <span className="font-display text-2xl text-navy">{plan.price} €</span>
                  <span className="text-xs text-muted"> TTC / an</span>
                </p>
                <Link
                  href={`/deja-client/entretien/souscrire?formule=${plan.slug}`}
                  className={`btn mt-4 w-full ${plan.recommended ? "btn-primary" : "btn-outline"}`}
                >
                  CHOISIR CETTE OFFRE
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[10px] text-muted">
            * Hors pièces &nbsp;&nbsp; ** Pièces d&apos;usure : joints, filtres, bougies d&apos;allumage, etc.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <h2 className="text-center font-display text-xl text-navy">Comment ça fonctionne ?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-5">
            {entretienSteps.map((step) => (
              <div key={step.n} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-line text-sm font-bold text-navy">
                  {step.n}
                </div>
                <p className="mt-3 text-xs font-bold text-navy">{step.title}</p>
                <p className="mt-1 text-xs text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-soft">
        <div className="container max-w-3xl">
          <h2 className="text-center font-display text-xl text-navy">Questions fréquentes</h2>
          <div className="mt-6 grid gap-3">
            {entretienFaq.map((item) => (
              <details key={item.question} className="rounded-card border border-line bg-white p-4">
                <summary className="cursor-pointer text-sm font-bold text-navy">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-gradient-to-r from-navy to-teal2 py-8 text-white">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-base font-bold">
            Protégez votre installation, réduisez vos dépenses.
          </p>
          <div className="flex gap-3">
            <Link href="/deja-client/entretien/souscrire" className="btn" style={{ background: "#fff", color: "var(--navy)" }}>
              SOUSCRIRE UN CONTRAT <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn" style={{ border: "1px solid #fff", color: "#fff" }}>
              ÊTRE RAPPELÉ GRATUITEMENT
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
