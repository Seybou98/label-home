"use client";

import { usePathname } from "next/navigation";
import { ContractFunnelProvider } from "@/components/funnel/FunnelContext";
import { Stepper } from "@/components/funnel/Stepper";

const stepByPath: Record<string, number> = {
  "/deja-client/entretien/souscrire": 1,
  "/deja-client/entretien/souscrire/formule": 2,
  "/deja-client/entretien/souscrire/coordonnees": 3,
  "/deja-client/entretien/souscrire/confirmation": 4,
};

export default function SouscrireLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const current = stepByPath[pathname] ?? 1;

  return (
    <ContractFunnelProvider>
      <div className="container max-w-3xl py-4">
        <p className="text-center text-[11px] font-extrabold tracking-wide text-teal2">
          SOUSCRIPTION CONTRAT D&apos;ENTRETIEN
        </p>
        <Stepper current={current} />
        {children}
      </div>
    </ContractFunnelProvider>
  );
}
