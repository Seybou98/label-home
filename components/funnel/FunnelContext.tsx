"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface ContractFunnelState {
  equipement: string;
  marque: string;
  anneeInstallation: string;
  formule: string;
  civilite: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  numeroClient: string;
}

const defaultState: ContractFunnelState = {
  equipement: "",
  marque: "",
  anneeInstallation: "",
  formule: "",
  civilite: "",
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  adresse: "",
  codePostal: "",
  ville: "",
  numeroClient: "",
};

const STORAGE_KEY = "label-energie-contrat-entretien";

interface FunnelContextValue {
  state: ContractFunnelState;
  update: (patch: Partial<ContractFunnelState>) => void;
  reset: () => void;
}

const FunnelContext = createContext<FunnelContextValue | null>(null);

export function ContractFunnelProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContractFunnelState>(defaultState);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...defaultState, ...JSON.parse(raw) });
    } catch {
      // ignore corrupted storage
    }
  }, []);

  const update = (patch: Partial<ContractFunnelState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable, ignore
      }
      return next;
    });
  };

  const reset = () => {
    setState(defaultState);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return <FunnelContext.Provider value={{ state, update, reset }}>{children}</FunnelContext.Provider>;
}

export function useContractFunnel() {
  const ctx = useContext(FunnelContext);
  if (!ctx) throw new Error("useContractFunnel must be used within ContractFunnelProvider");
  return ctx;
}
