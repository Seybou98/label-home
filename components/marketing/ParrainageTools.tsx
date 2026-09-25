"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const LINK = "https://www.label-energie.fr/parrainage/LE12345";
const CODE = "LEPARRAIN300";
const MESSAGE = "Découvre Label Énergie et profite de conseils d'experts pour ta rénovation énergétique : ";

const enc = encodeURIComponent;

const shares: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Email",
    href: `mailto:?subject=${enc("Label Énergie")}&body=${enc(MESSAGE + LINK)}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0e8a5f" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/?text=${enc(MESSAGE + LINK)}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0e8a5f" strokeWidth="1.8" aria-hidden>
        <path d="M4 20l1.3-4A8 8 0 1 1 8.5 19z" />
        <path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-1-.5-1.8-1.3-2.3-2.3l.8-1-1-2z" />
      </svg>
    ),
  },
  {
    label: "SMS",
    href: `sms:?&body=${enc(MESSAGE + LINK)}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0e8a5f" strokeWidth="1.8" aria-hidden>
        <path d="M4 20l1.5-4.5A8 8 0 1 1 9 19z" />
        <path d="M8 12h.01M12 12h.01M16 12h.01" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${enc(LINK)}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="#12334b" />
        <path d="M13 21v-7h2.5l.4-3H13V9.3c0-.8.3-1.3 1.4-1.3H16V5.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 3.8V11H7.6v3H10v7z" fill="#fff" />
      </svg>
    ),
  },
  {
    label: "Linkedin",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(LINK)}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#12334b" />
        <path d="M6 10h3v8H6zM7.5 5.5a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM11 10h2.8v1.1c.4-.7 1.4-1.3 2.7-1.3 2.6 0 3 1.7 3 3.9V18h-3v-3.8c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2V18H11z" fill="#fff" />
      </svg>
    ),
  },
];

export function ParrainageTools() {
  const [copied, setCopied] = useState<"link" | "code" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy(text: string, which: "link" | "code") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard indisponible : on affiche quand même le retour visuel
    }
    setCopied(which);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 1800);
  }

  return (
    <div className="par-tools">
      <div className="par-tool par-tool-link">
        <p className="par-tool-title">Partagez votre lien unique</p>
        <p className="par-tool-text">Envoyez votre lien par email, SMS ou sur vos réseaux sociaux.</p>
        <div className="par-link-box">
          <span>{LINK}</span>
          <button type="button" title="Copier" aria-label="Copier le lien" onClick={() => copy(LINK, "link")}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#12334b" strokeWidth="1.8" aria-hidden>
              <rect x="8" y="8" width="12" height="12" rx="2" />
              <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
            </svg>
          </button>
        </div>
        <div className="par-shares">
          {shares.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.icon}
              {s.label}
            </a>
          ))}
          <button type="button" onClick={() => copy(LINK, "link")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#12334b" strokeWidth="1.8" aria-hidden>
              <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
              <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
            </svg>
            {copied === "link" ? "Copié !" : "Copier"}
          </button>
        </div>
      </div>

      <div className="par-tool par-tool-code">
        <p className="par-tool-title">Ou utilisez votre code parrain</p>
        <p className="par-tool-text">Communiquez simplement votre code à vos proches.</p>
        <button type="button" className="par-code" onClick={() => copy(CODE, "code")}>
          {CODE}
        </button>
        <p className="par-code-label">{copied === "code" ? "Code copié !" : "Code à transmettre"}</p>
      </div>
    </div>
  );
}
