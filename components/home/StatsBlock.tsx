import Image from "next/image";
import { Reveal } from "@/components/animation/Reveal";
import { Counter } from "@/components/animation/Counter";

function Stat({
  value,
  label,
  stars,
}: {
  value: React.ReactNode;
  label: React.ReactNode;
  stars?: boolean;
}) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      {stars && <div className="review-stars">★★★★★</div>}
      <span>{label}</span>
    </div>
  );
}

export function StatsBlock() {
  return (
    <Reveal className="stats">
      <Stat
        value={<Counter value={12000} prefix="+ " />}
        label={
          <>
            Installations
            <br />
            réalisées
          </>
        }
      />
      <Stat
        value={<Counter value={90} />}
        label={
          <>
            Collaborateurs
            <br />à votre service
          </>
        }
      />
      <Stat
        value={<Counter value={4.6} decimals={1} suffix="/5" />}
        label={
          <>
            Avis clients
            <br />
            vérifiés
          </>
        }
        stars
      />
      <Stat
        value={<Counter value={13} />}
        label={
          <>
            Années
            <br />
            d&apos;expérience
          </>
        }
      />
      <div className="stats-team" style={{ position: "relative" }}>
        <Image
          src="/images/technicien.png"
          alt="Équipe Label Énergie"
          fill
          sizes="(max-width: 900px) 0px, 400px"
          style={{ objectFit: "cover" }}
        />
      </div>
    </Reveal>
  );
}
