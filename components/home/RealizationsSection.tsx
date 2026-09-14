"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { realizations } from "@/lib/content/home";
import { Reveal } from "@/components/animation/Reveal";

export function RealizationsSection() {
  const [active, setActive] = useState(0);
  const canPrev = active > 0;
  const canNext = active < realizations.length - 1;

  return (
    <section id="realisations" className="section realizations">
      <div className="container">
        <div className="real-header-row">
          <div className="real-header-left">
            <SectionTitle
              align="left"
              kicker="NOS RÉALISATIONS PRÈS DE CHEZ VOUS"
              title=
              {
                <strong>
                  "Découvrez quelques projets réalisés"
                </strong>
              }
            />
          </div>
          <div className="real-header-right">
            <div className="testimonial-kicker">ILS NOUS FONT CONFIANCE</div>
            <h2>
              Des clients satisfaits,
              <br />
              des résultats concrets
            </h2>
          </div>
        </div>

        <Reveal className="real-layout">
          <div className="real-carousel-row">
            <button
              type="button"
              className="carousel-arrow"
              aria-label="Réalisation précédente"
              disabled={!canPrev}
              onClick={() => setActive((a) => Math.max(0, a - 1))}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="real-track">
              <div
                className="project-carousel"
                style={{ transform: `translateX(-${active * 25}%)` }}
              >
                {realizations.map((p) => {
                  const [line1, line2] = p.details.split(" • ");
                  return (
                    <article className="real-card" key={p.location}>
                      <div className="real-img" style={{ position: "relative" }}>
                        <Image
                          src={p.image}
                          alt={`${p.title} — ${p.location}`}
                          fill
                          sizes="(max-width: 900px) 50vw, 260px"
                          style={{ objectFit: "cover" }}
                          loading="lazy"
                        />
                        <span>{p.location}</span>
                      </div>
                      <div className="real-card-body">
                        <h3>{p.title}</h3>
                        <p>{line1}</p>
                        {line2 && <p>{line2}</p>}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className="carousel-arrow"
              aria-label="Réalisation suivante"
              disabled={!canNext}
              onClick={() => setActive((a) => Math.min(realizations.length - 1, a + 1))}
            >
              <ChevronRight size={18} />
            </button>

            <aside className="testimonial">
              <Quote className="quote-icon" />
              <p>
                Équipe professionnelle du début à la fin. Installation rapide et travail propre.
                Je recommande Label Énergie !
              </p>
              <div className="review-stars">★★★★★</div>
              <strong>Sophie D.</strong>
              <small>Melun (77)</small>
              <Link href="/temoignages">
                
                Voir tous les avis Google <ArrowRight size={20} />
              </Link>

              <div className="carousel-dots">
                {realizations.map((p, i) => (
                  <button
                    key={p.location}
                    type="button"
                    className={i === active ? "active" : ""}
                    aria-label={`Aller à la réalisation ${i + 1}`}
                    onClick={() => setActive(i)}
                  />
                ))}
              </div>
            </aside>
          </div>
        </Reveal>

        <Link className="more-link" href="/realisations">
          Voir toutes nos réalisations <ArrowRight size={34} />
        </Link >
      </div>
    </section>
  );
}
