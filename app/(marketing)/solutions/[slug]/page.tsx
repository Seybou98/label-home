import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { solutions, solutionSlugs } from "@/lib/content/solutions";
import { SolutionPageTemplate } from "@/components/solutions/SolutionPageTemplate";

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
  return <SolutionPageTemplate solution={solution} />;
}
