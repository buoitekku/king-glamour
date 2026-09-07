/** Etykieta tekstowa w kapitalikach. Kolor tylko dla promocji. */
export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "sale" | "new" | "fast" }) {
  const tones = {
    neutral: "text-muted",
    sale: "text-accent",
    new: "text-ink",
    fast: "text-muted",
  };
  return <span className={`caps inline-block ${tones[tone]}`}>{children}</span>;
}
