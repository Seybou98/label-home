"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function InstallationsCarousel({
  kicker,
  title,
  items,
}: {
  kicker?: string;
  title: string;
  items: { location: string; capacity: string; type: string; status: string; image: string }[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("article");
    const step = card ? card.getBoundingClientRect().width + 20 : 300;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return (
    <div className="installations-carousel">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          {kicker && <p className="eyebrow">{kicker}</p>}
          <h2 className="installations-title">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/realisations" className="inline-flex items-center gap-2 text-xs font-extrabold text-teal2">
            Voir toutes nos réalisations <ArrowRight size={14} />
          </Link>
          <div className="installations-arrows">
            <button type="button" aria-label="Précédent" onClick={() => scrollBy(-1)}>
              <ArrowLeft size={16} />
            </button>
            <button type="button" aria-label="Suivant" onClick={() => scrollBy(1)}>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <div ref={trackRef} className="installations-track mt-8">
        {items.map((item) => (
          <article key={item.location} className="installations-card">
            <div className="relative h-44">
              <Image
                src={item.image}
                alt={item.location}
                fill
                sizes="(max-width: 900px) 80vw, 25vw"
                style={{ objectFit: "cover", objectPosition: "top" }}
                loading="lazy"
              />
              <span className="installations-badge">{item.location}</span>
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-navy">{item.capacity}</h3>
              <p className="mt-1 text-sm text-muted">{item.type}</p>
              <p className="mt-1 text-sm text-muted">{item.status}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
