"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Quote, Star } from "lucide-react";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialsCarousel({
  items,
  showAvatars,
  showGoogleBadge,
  showArrows,
}: {
  items: { quote: string; rating: number; name: string; location: string }[];
  showAvatars?: boolean;
  showGoogleBadge?: boolean;
  showArrows?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    function updateActive() {
      ticking = false;
      if (!track) return;
      let closest = 0;
      let closestDistance = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const distance = Math.abs(card.offsetLeft - track.scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = i;
        }
      });
      setActive(closest);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  function goTo(index: number) {
    const card = cardRefs.current[index];
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  function next() {
    goTo(Math.min(items.length - 1, active + 1));
  }

  return (
    <div className="testimonials-carousel">
      <div className="testimonials-carousel-row">
        <div ref={trackRef} className="testimonials-grid">
          {items.map((t, i) => (
            <article key={t.name} ref={(el) => { cardRefs.current[i] = el; }} className="testimonial-card">
              <Quote className="testimonial-quote-icon" aria-hidden />
              <p className="testimonial-quote">{t.quote}</p>
              {showAvatars ? (
                <div className="testimonial-footer">
                  <span className="testimonial-avatar">{initials(t.name)}</span>
                  <div className="testimonial-footer-info">
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-location">{t.location}</p>
                  </div>
                  <div className="testimonial-footer-rating">
                    <div className="testimonial-stars" aria-hidden>
                      {Array.from({ length: 5 }, (_, s) => (
                        <Star key={s} size={14} className="testimonial-star" fill={s < Math.floor(t.rating) ? "currentColor" : "none"} />
                      ))}
                    </div>
                    {showGoogleBadge && (
                      <Image src="/images/google-logo.webp" alt="Google" width={16} height={16} />
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="testimonial-stars" aria-hidden>
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star key={s} size={14} className="testimonial-star" fill={s < Math.floor(t.rating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-location">{t.location}</p>
                </>
              )}
            </article>
          ))}
        </div>
        {showArrows && (
          <div className="installations-arrows testimonials-next">
            <button type="button" aria-label="Avis suivant" onClick={next}>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
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
