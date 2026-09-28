import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { dayAndMonth, frLongDate, getMyPortal, type PortalAppointment } from "@/lib/portal";

function Row({ a, past }: { a: PortalAppointment; past?: boolean }) {
  const { day, month } = dayAndMonth(a.date);
  return (
    <div className={`grid grid-cols-[48px_minmax(0,1fr)] items-center gap-4 rounded-md border border-line p-3.5 ${past ? "opacity-70" : ""}`}>
      <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md bg-soft leading-none text-navy">
        <span className="text-base font-bold">{day}</span>
        <span className="mt-0.5 text-[8px] font-bold">{month}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[11.5px] font-bold text-navy">{a.label}</p>
        <p className="mt-1 text-[10px] text-muted">
          {frLongDate(a.date)}
          {a.time ? ` · ${a.time}` : ""}
          {a.days > 1 ? ` · sur ${a.days} jours` : a.duration ? ` · durée ${a.duration}` : ""}
        </p>
      </div>
    </div>
  );
}

export default async function RendezVousPage() {
  const { appointments } = await getMyPortal();
  const upcoming = appointments.filter((a) => a.upcoming);
  const past = appointments.filter((a) => !a.upcoming).reverse();

  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-2 text-[11px] text-muted">
        <Link href="/espace-client" className="hover:text-teal2">
          Espace client
        </Link>
        <span>›</span>
        <span className="font-semibold text-navy">Mes rendez-vous</span>
      </div>

      <div>
        <h1 className="font-display text-2xl text-navy">Mes rendez-vous</h1>
        <p className="mt-2 text-[11px] text-muted">Vos rendez-vous d&apos;installation, d&apos;entretien et de SAV.</p>
      </div>

      <section className="rounded-card border border-line bg-white p-5">
        <h2 className="text-xs font-bold text-navy">À venir</h2>
        {upcoming.length ? (
          <div className="mt-3 grid gap-2.5 md:grid-cols-2">
            {upcoming.map((a) => (
              <Row key={a.id || a.date + a.label} a={a} />
            ))}
          </div>
        ) : (
          <p className="mt-3 flex items-center gap-3 rounded-md border border-dashed border-line p-4 text-[10.5px] leading-relaxed text-muted">
            <CalendarClock size={18} className="shrink-0 text-teal2" />
            <span>
              Aucun rendez-vous à venir. Pour en planifier un, appelez-nous ou{" "}
              <Link href="/contact" className="font-bold text-teal2">
                écrivez-nous
              </Link>
              .
            </span>
          </p>
        )}
      </section>

      {past.length > 0 && (
        <section className="rounded-card border border-line bg-white p-5">
          <h2 className="text-xs font-bold text-navy">Historique</h2>
          <div className="mt-3 grid gap-2.5 md:grid-cols-2">
            {past.map((a) => (
              <Row key={a.id || a.date + a.label} a={a} past />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
