"use client";

import { useState } from "react";
import { Quote, Star } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function TrustTestimonialCard({
  items,
}: {
  items: { quote: string; rating: number; name: string; location: string }[];
}) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="trust-testimonial-card">
      <div className="trust-testimonial-stats">
        <div className="trust-testimonial-stat">
          <strong>{siteConfig.stats.installations}</strong>
          <span className="trust-caption">Installations réalisées</span>
        </div>
        <div className="trust-testimonial-stat">
          <strong>{siteConfig.rating.valueLabel}/5</strong>
          <span className="testimonial-stars" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={12} className="testimonial-star" fill="currentColor" />
            ))}
          </span>
          <span className="trust-caption">avis clients Google</span>
        </div>
        <div className="trust-testimonial-stat">
          <strong>{siteConfig.stats.collaborators}</strong>
          <span className="trust-caption">collaborateurs à votre service</span>
        </div>
        <div className="trust-testimonial-stat">
          <strong>{siteConfig.stats.experienceYears} ans</strong>
          <span className="trust-caption">d&apos;expérience à vos côtés</span>
        </div>
        <div className="trust-testimonial-stat">
          <strong>RGE</strong>
          <span className="trust-caption">entreprise certifiée</span>
        </div>
      </div>
      <div className="trust-testimonial-quote">
        <Quote className="testimonial-quote-icon" aria-hidden />
        <p className="testimonial-quote">{current.quote}</p>
        <div className="testimonial-stars" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={14} className="testimonial-star" fill={i < Math.floor(current.rating) ? "currentColor" : "none"} />
          ))}
        </div>
        <p className="testimonial-name">{current.name}</p>
        <p className="testimonial-location">{current.location}</p>
        <div className="testimonials-dots">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Aller à l'avis ${i + 1}`}
              className={`testimonials-dot${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
