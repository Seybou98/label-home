export function PortalPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h1 className="portal-title">{title}</h1>
      <p>{description}</p>
      <div className="mt-6 rounded-card border border-dashed border-line bg-white p-8 text-center text-xs text-muted">
        Cette section sera connectée aux données réelles du compte client (CRM / base de données)
        lors de la prochaine étape.
      </div>
    </div>
  );
}
