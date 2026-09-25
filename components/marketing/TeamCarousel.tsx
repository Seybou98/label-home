"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type TeamCarouselItem = {
  photo: string;
  quote: string;
  name: string;
  role: string;
};

export function TeamCarousel({ items }: { items: TeamCarouselItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * (el.clientWidth / 2), behavior: "smooth" });
  }

  return (
    <div className="eq-carousel">
      <div className="eq-carousel-track" ref={trackRef}>
        {items.map((item) => (
          <div className="eq-carousel-card" key={item.name}>
            <div className="eq-carousel-photo">
              <Image src={item.photo} alt={item.name} fill sizes="120px" style={{ objectFit: "cover" }} loading="lazy" />
            </div>
            <div className="eq-carousel-body">
              <p className="eq-carousel-quote">&ldquo;{item.quote}&rdquo;</p>
              <p className="eq-carousel-name">
                {item.name}
                <span>{item.role}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="eq-carousel-controls">
        <button type="button" aria-label="Précédent" onClick={() => scroll(-1)} className="eq-carousel-btn">
          <ChevronLeft size={16} />
        </button>
        <button type="button" aria-label="Suivant" onClick={() => scroll(1)} className="eq-carousel-btn">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
