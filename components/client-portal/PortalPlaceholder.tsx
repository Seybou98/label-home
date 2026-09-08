export function PortalPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h1 className="font-display text-2xl text-navy">{title}</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">{description}</p>
      <div className="mt-6 rounded-card border border-dashed border-line bg-white p-8 text-center text-xs text-muted">
        Cette section sera connectée aux données réelles du compte client (CRM / base de données)
        lors de la prochaine étape.
      </div>
    </div>
  );
}
