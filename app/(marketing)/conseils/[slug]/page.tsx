import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock, MessageCircle } from "lucide-react";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { articles, articleSlugs, getArticle } from "@/lib/content/articles";

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/conseils/${article.slug}`,
    image: article.image,
  });
}

const frDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T12:00:00Z`));

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const others = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          path: `/conseils/${article.slug}`,
          image: article.image,
          publishedAt: article.publishedAt,
        })}
      />
      <Breadcrumb
        items={[
          { name: "Conseils", path: "/conseils" },
          { name: article.title, path: `/conseils/${article.slug}` },
        ]}
      />

      <section className="pt-2">
        <div className="container max-w-3xl">
          <p className="eyebrow">{article.category.toUpperCase()}</p>
          <h1 className="mt-3 font-display text-[28px] font-bold leading-[1.25] text-navy sm:text-[34px]">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-5 text-[13px] text-muted">
            <span className="flex items-center gap-2">
              <Calendar size={15} className="text-teal2" /> {frDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={15} className="text-teal2" /> {article.readingMinutes} min de lecture
            </span>
          </div>

          <div className="relative mt-6 h-[280px] overflow-hidden rounded-card sm:h-[380px]">
            <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 720px" style={{ objectFit: "cover" }} priority />
          </div>

          <div className="mt-8 grid gap-5">
            {article.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="mt-3 font-display text-[19px] font-bold text-navy">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={i} className="grid gap-2.5">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-navy">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "callout") {
                return (
                  <div key={i} className="rounded-md border border-teal2 bg-soft p-4 text-[13px] font-semibold leading-relaxed text-navy">
                    {block.text}
                  </div>
                );
              }
              return (
                <p key={i} className="text-[13px] leading-relaxed text-navy">
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/simuler-mon-projet" className="btn btn-primary">
              SIMULER MON PROJET <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              <MessageCircle size={16} /> UN CONSEIL PERSONNALISÉ
            </Link>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="qsn-section-heading">À lire aussi</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {others.map((a) => (
                <Link key={a.slug} href={`/conseils/${a.slug}`} className="article-card">
                  <div className="relative h-32">
                    <Image src={a.image} alt={a.title} fill sizes="(max-width: 900px) 50vw, 25vw" style={{ objectFit: "cover" }} loading="lazy" />
                  </div>
                  <div className="p-4">
                    <p className="article-card-date">{frDate(a.publishedAt)}</p>
                    <h3 className="mt-2 text-sm font-bold text-navy">{a.title}</h3>
                    <p className="mt-2 text-[13px] text-muted">{a.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
