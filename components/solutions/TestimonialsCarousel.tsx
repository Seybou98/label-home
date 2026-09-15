"use client";

import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

export function TestimonialsCarousel({
  items,
}: {
  items: { quote: string; rating: number; name: string; location: string }[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const index = cardRefs.current.findIndex((el) => el === visible.target);
          if (index !== -1) setActive(index);
        }
      },
      { root: track, threshold: 0.6 },
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    const card = cardRefs.current[index];
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <div className="testimonials-carousel">
      <div ref={trackRef} className="testimonials-grid">
        {items.map((t, i) => (
          <article key={t.name} ref={(el) => { cardRefs.current[i] = el; }} className="testimonial-card">
            <Quote className="testimonial-quote-icon" aria-hidden />
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-stars" aria-hidden>
              {Array.from({ length: 5 }, (_, s) => (
                <Star key={s} size={14} className="testimonial-star" fill={s < Math.floor(t.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <p className="testimonial-name">{t.name}</p>
            <p className="testimonial-location">{t.location}</p>
          </article>
        ))}
      </div>
      <div className="testimonials-dots">
        {items.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-label={`Aller à l'avis ${i + 1}`}
            className={`testimonials-dot${i === active ? " is-active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
