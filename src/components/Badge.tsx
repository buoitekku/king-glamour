export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "sale" | "new" | "fast" }) {
  const tones = {
    neutral: "bg-ink-100 text-ink-700",
    sale: "bg-accent text-white",
    new: "bg-brand-800 text-brand-50",
    fast: "bg-emerald-700 text-white",
  };
  return <span className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${tones[tone]}`}>{children}</span>;
}
