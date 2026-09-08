import { Check } from "lucide-react";

const steps = ["Équipement", "Formule", "Coordonnées", "Confirmation"];

export function Stepper({ current }: { current: number }) {
  return (
    <ol className="mx-auto flex max-w-2xl items-center justify-between px-4 py-6">
      {steps.map((label, i) => {
        const index = i + 1;
        const done = index < current;
        const active = index === current;
        return (
          <li key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  done
                    ? "bg-teal2 text-white"
                    : active
                      ? "border-2 border-teal2 text-teal2"
                      : "border border-line text-muted"
                }`}
              >
                {done ? <Check size={16} /> : index}
              </span>
              <span
                className={`text-[10px] font-semibold ${active || done ? "text-navy" : "text-muted"}`}
              >
                {label}
              </span>
            </div>
            {index < steps.length && (
              <span className={`mx-2 h-px flex-1 ${done ? "bg-teal2" : "bg-line"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
