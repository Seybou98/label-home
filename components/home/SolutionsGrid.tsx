import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { products } from "@/lib/content/home";
import { Reveal } from "@/components/animation/Reveal";

export function SolutionsGrid() {
  return (
    <>
      <SectionTitle
        kicker="NOS SOLUTIONS POUR VOTRE CONFORT"
        title="Des équipements performants et durables"
      />
      <Reveal className="products-grid">
        {products.map((p) => (
          <article className={`product-card ${p.all ? "all" : ""}`} key={p.title}>
            <div className="product-image" style={{ position: "relative" }}>
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 900px) 33vw, 190px"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
              {p.all && <Sparkles />}
            </div>
            <div className="product-body">
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <Link href={p.href}>
                {p.all ? "Voir toutes les solutions" : "En savoir plus"} <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </Reveal>
    </>
  );
}
