import { ContractFunnelProvider } from "@/components/funnel/FunnelContext";

export default function SouscrireLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContractFunnelProvider>
      <div className="container max-w-3xl py-4">
        <p className="text-center text-[11px] font-extrabold tracking-wide text-teal2">
          SOUSCRIPTION CONTRAT D&apos;ENTRETIEN
        </p>
        {children}
      </div>
    </ContractFunnelProvider>
  );
}
