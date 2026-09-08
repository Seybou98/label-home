"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  as = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
}) {
  const ref = useRef<HTMLDivElement & HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const combinedClassName = `reveal-group${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`;

  if (as === "section") {
    return (
      <section id={id} ref={ref} className={combinedClassName}>
        {children}
      </section>
    );
  }

  return (
    <div id={id} ref={ref} className={combinedClassName}>
      {children}
    </div>
  );
}
