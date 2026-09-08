import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  ClipboardCheck,
  Leaf,
  Phone,
  PiggyBank,
  Sun,
  ThermometerSun,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, serviceJsonLd } from "@/lib/seo";
import type { SolutionContent } from "@/lib/content/solutions";

const icons: Record<string, LucideIcon> = {
  PiggyBank,
  ThermometerSun,
  Leaf,
  BadgePercent,
  Waves,
  Sun,
  ClipboardCheck,
};

export function SolutionPageTemplate({ solution }: { solution: SolutionContent }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: solution.h1,
            description: solution.metaDescription,
            path: `/solutions/${solution.slug}`,
          }),
          faqJsonLd(solution.faq),
        ]}
      />
      <Breadcrumb items={[{ name: "Solutions", path: "/solutions" }, { name: solution.breadcrumbLabel, path: `/solutions/${solution.slug}` }]} />

      {/* Hero */}
      <section className="bg-white">
        <div className="container grid gap-10 py-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-2 text-[11px] font-extrabold tracking-wide text-teal2">
              {solution.category}
            </p>
            <h1 className="font-display text-3xl leading-tight text-navy md:text-4xl">
              {solution.h1}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{solution.intro}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/simuler-mon-projet"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#0b5877] to-[#18b9a0] px-5 py-3 text-xs font-extrabold text-white shadow-lg"
              >
                SIMULER MON PROJET <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-teal2 px-5 py-3 text-xs font-extrabold text-[#17627b]"
              >
                ÊTRE RAPPELÉ GRATUITEMENT <Phone size={16} />
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card">
            <Image
              src={solution.heroImage}
              alt={solution.heroAlt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Quick benefits bar */}
      <section className="border-y border-line bg-soft">
        <div className="container grid gap-6 py-6 sm:grid-cols-2 md:grid-cols-4">
          {solution.quickBenefits.map((b) => {
            const Icon = icons[b.icon] ?? Leaf;
            return (
              <div key={b.title} className="flex items-start gap-3">
                <Icon className="mt-0.5 shrink-0 text-teal2" size={22} />
                <div>
                  <p className="text-xs font-bold text-navy">{b.title}</p>
                  <p className="text-xs text-muted">{b.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">FONCTIONNEMENT</p>
            <h2 className="font-display text-xl text-navy">{solution.howItWorks.title}</h2>
            <p className="mt-3 text-sm text-muted">{solution.howItWorks.intro}</p>
            <ol className="mt-5 grid gap-4">
              {solution.howItWorks.steps.map((step) => (
                <li key={step.n} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal2 text-[11px] font-bold text-white">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-navy">{step.title}</p>
                    <p className="text-xs text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card">
            <Image
              src={solution.howItWorks.image}
              alt={solution.howItWorks.imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Variants */}
      {solution.variants && (
        <section className="section bg-soft">
          <div className="container">
            <h2 className="text-center font-display text-xl text-navy">
              {solution.variants.title}
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {solution.variants.items.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-card bg-white shadow-card">
                  <div className="relative h-36">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 text-xs text-muted">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Aides */}
      <section className="section">
        <div className="container rounded-card bg-soft p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div className="max-w-md">
            <h2 className="font-display text-lg text-navy">
              Combien d&apos;aides pouvez-vous obtenir pour votre projet ?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Simulez gratuitement vos aides en quelques clics et réduisez le coût de votre
              installation.
            </p>
            <Link
              href="/aides-financement/calculer-mes-aides"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#0b5877] to-[#18b9a0] px-5 py-3 text-xs font-extrabold text-white shadow-lg"
            >
              CALCULER MES AIDES <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-6 md:mt-0">
            <p className="text-xs font-bold text-muted">Jusqu&apos;à</p>
            <p className="font-display text-3xl text-teal2">{solution.aides.amount}</p>
            <p className="text-xs text-muted">{solution.aides.text}</p>
            <p className="mt-1 text-[10px] text-muted">
              *Montant indicatif selon votre situation et les aides en vigueur.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="text-center font-display text-xl text-navy">Questions fréquentes</h2>
          <div className="mt-6 grid gap-3">
            {solution.faq.map((item) => (
              <details key={item.question} className="rounded-card border border-line p-4">
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
            Prêt à passer à une énergie plus économique et plus respectueuse de l&apos;environnement ?
          </p>
          <div className="flex gap-3">
            <Link
              href="/simuler-mon-projet"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-xs font-extrabold text-navy"
            >
              SIMULER MON PROJET <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white px-5 py-3 text-xs font-extrabold text-white"
            >
              ÊTRE RAPPELÉ GRATUITEMENT <Phone size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
