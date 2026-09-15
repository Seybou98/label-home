export function SectionTitle({
  kicker,
  title,
  align = "center",
}: {
  kicker?: string;
  title?: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={`section-title ${align}`}>
      {kicker && <div className="eyebrow">{kicker}</div>}
      {title && <h2>{title}</h2>}
      <span className="title-line" />
    </div>
  );
}
