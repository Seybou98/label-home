"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navSections } from "@/lib/navigation";

export function PortalHeaderNav() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav className="hidden flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-medium text-navy lg:flex">
      {navSections.map((section) =>
        section.items ? (
          <div
            key={section.label}
            className="relative"
            onMouseEnter={() => setOpen(section.label)}
            onMouseLeave={() => setOpen(null)}
          >
            <button
              type="button"
              onClick={() => setOpen(open === section.label ? null : section.label)}
              className="flex items-center gap-1.5"
            >
              {section.label} <ChevronDown size={12} />
            </button>
            {open === section.label && (
              <div className="absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-md border border-line bg-white p-2 shadow-card">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(null)}
                    className="block rounded px-3 py-2 text-xs font-medium text-navy hover:bg-soft"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link key={section.href} href={section.href}>
            {section.label}
          </Link>
        ),
      )}
    </nav>
  );
}
