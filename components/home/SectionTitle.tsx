export function SectionTitle({
  kicker,
  title,
  align = "center",
}: {
  kicker: string;
  title: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={`section-title ${align}`}>
      <div className="eyebrow">{kicker}</div>
      <h2>{title}</h2>
      <span className="title-line" />
    </div>
  );
}
