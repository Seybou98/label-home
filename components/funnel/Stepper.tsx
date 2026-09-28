import { Check } from "lucide-react";

const defaultSteps = ["Équipement", "Formule", "Coordonnées", "Confirmation"];

export function Stepper({ steps = defaultSteps, current }: { steps?: string[]; current: number }) {
  return (
    <ol className="mx-auto flex max-w-3xl items-center justify-between px-1 py-6">
      {steps.map((label, i) => {
        const index = i + 1;
        const done = index < current;
        const active = index === current;
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                  done
                    ? "bg-teal2 text-white"
                    : active
                      ? "border-2 border-teal2 text-teal2"
                      : "border border-line text-muted"
                }`}
              >
                {done ? <Check size={14} /> : index}
              </span>
              <span
                className={`hidden text-[10px] font-semibold sm:block ${active || done ? "text-navy" : "text-muted"}`}
              >
                {label}
              </span>
            </div>
            {index < steps.length && <span className={`mx-1.5 h-px flex-1 ${done ? "bg-teal2" : "bg-line"}`} />}
          </li>
        );
      })}
    </ol>
  );
}
