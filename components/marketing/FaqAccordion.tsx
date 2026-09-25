"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

export function FaqAccordion({ items, single = false }: { items: FaqItem[]; single?: boolean }) {
  const [open, setOpen] = useState(-1);

  return (
    <div className={`mpr-faq-grid${single ? " is-single" : ""}`}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className="mpr-faq-item" key={f.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{f.q}</span>
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <path d="M1 1l5 5 5-5" />
              </svg>
            </button>
            {isOpen && <p>{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
