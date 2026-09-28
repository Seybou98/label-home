"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { FormulaId, ProductId } from "@/lib/content/entretien";
import type { EquipmentDetails } from "@/lib/entretien/types";
import { newContractNumber } from "@/lib/entretien/types";

export type SouscrireStep = "formule" | "produit" | "equipement" | "recap" | "paiement" | "notes" | "apercu";

export interface ContractFunnelState {
  step: SouscrireStep;
  formule: FormulaId | "";
  products: ProductId[];
  equipment: Record<string, EquipmentDetails>;
  /** Index de l'équipement en cours de saisie (étape « Équipement »). */
  equipmentIdx: number;
  paymentDate: number;
  notes: string;
  holderName: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  contractNumber: string;
}

const defaultState = (): ContractFunnelState => ({
  step: "formule",
  formule: "",
  products: [],
  equipment: {},
  equipmentIdx: 0,
  paymentDate: 1,
  notes: "",
  holderName: "",
  address: "",
  postalCode: "",
  city: "",
  phone: "",
  contractNumber: newContractNumber(),
});

const STORAGE_KEY = "label-energie-souscription-entretien-v2";

interface FunnelContextValue {
  state: ContractFunnelState;
  /** false tant que l'état sauvegardé n'a pas été relu (évite d'écraser la reprise après connexion). */
  ready: boolean;
  update: (patch: Partial<ContractFunnelState>) => void;
  reset: () => void;
}

const FunnelContext = createContext<FunnelContextValue | null>(null);

export function ContractFunnelProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContractFunnelState>(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...defaultState(), ...JSON.parse(raw) });
    } catch {
      // stockage corrompu : on repart de zéro
    }
    setReady(true);
  }, []);

  const persist = (next: ContractFunnelState) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // stockage indisponible
    }
  };

  const update = (patch: Partial<ContractFunnelState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      persist(next);
      return next;
    });
  };

  const reset = () => {
    setState(defaultState());
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return <FunnelContext.Provider value={{ state, ready, update, reset }}>{children}</FunnelContext.Provider>;
}

export function useContractFunnel() {
  const ctx = useContext(FunnelContext);
  if (!ctx) throw new Error("useContractFunnel must be used within ContractFunnelProvider");
  return ctx;
}
