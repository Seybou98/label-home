import Link from "next/link";
import { CheckCircle2, FileText, Gift, Mail, MessageSquare, Phone, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";

const trustBar = [
  { icon: ShieldCheck, value: "RGE", label: "Entreprise certifiée" },
  { icon: FileText, value: siteConfig.stats.installations, label: "installations réalisées" },
  { icon: Gift, value: `${siteConfig.rating.valueLabel}/5`, label: `sur +${siteConfig.rating.count} avis Google` },
  { icon: ShieldCheck, value: `${siteConfig.stats.experienceYears} ans`, label: "d'expérience" },
  { icon: CheckCircle2, value: "A à Z", label: "Accompagnement" },
];

export function PortalFooterCta() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-8">
      <div className="grid gap-5 rounded-card bg-soft p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div>
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="text-lg font-bold text-[#0b5c42]">Besoin d&apos;aide ?</span>
            <span className="text-xs text-navy">Notre équipe est là pour vous accompagner !</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-navy sm:border-r sm:border-line sm:pr-4">
              <Phone size={22} className="shrink-0 text-teal2" />
              <span className="text-[10.5px] leading-relaxed">
                <b className="block text-[11.5px] font-bold">{siteConfig.phoneDisplay}</b>
                Lun. - Ven. 8h - 18h
              </span>
            </a>
            <div className="flex items-center gap-3 text-navy sm:border-r sm:border-line sm:pr-4">
              <MessageSquare size={22} className="shrink-0 text-teal2" />
              <span className="text-[10.5px] leading-relaxed">
                <b className="block text-[11.5px] font-bold">WhatsApp</b>
                Réponse rapide
              </span>
            </div>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-navy">
              <Mail size={22} className="shrink-0 text-teal2" />
              <span className="text-[10.5px] leading-relaxed">
                <b className="block break-all text-[11.5px] font-bold">{siteConfig.email}</b>
                Réponse sous 24h
              </span>
            </a>
          </div>
        </div>
        <Link href="/contact" className="btn btn-outline justify-center px-8">
          NOUS CONTACTER
        </Link>
      </div>

      <div className="mt-4 grid gap-4 rounded-card bg-[#0a4d38] p-5 text-white sm:grid-cols-5">
        {trustBar.map((t, i) => (
          <div
            key={t.label}
            className={`flex items-center justify-center gap-3 px-3 ${i > 0 ? "sm:border-l sm:border-[#2d6c57]" : ""}`}
          >
            <t.icon size={24} className="shrink-0" />
            <span className="text-[10px] leading-relaxed">
              <b className="font-bold">{t.value}</b>
              <br />
              {t.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
