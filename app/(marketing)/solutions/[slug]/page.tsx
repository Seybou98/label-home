import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { solutions, solutionSlugs } from "@/lib/content/solutions";
import { SolutionPageTemplate } from "@/components/solutions/SolutionPageTemplate";
import { PacAirAirPageTemplate } from "@/components/solutions/PacAirAirPageTemplate";
import { pacAirAirContent } from "@/lib/content/pacAirAir";

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions[slug];
  if (!solution) return {};
  return buildMetadata({
    title: solution.seoTitle,
    description: solution.metaDescription,
    path: `/solutions/${solution.slug}`,
    image: solution.heroImage,
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = solutions[slug];
  if (!solution) notFound();
  if (slug === "pompe-a-chaleur-air-air") {
    return <PacAirAirPageTemplate content={pacAirAirContent} />;
  }
  return <SolutionPageTemplate solution={solution} />;
}
