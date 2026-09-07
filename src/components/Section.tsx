import Link from "next/link";

/**
 * Sekcja z wiszącym nagłówkiem (S2): tytuł unosi się nad treścią w pustej
 * przestrzeni, bez linii i bez eyebrow. Odstępy różnią się między
 * wariantami, żeby rytm strony nie był jednostajny.
 */
export function Section({
  title,
  subtitle,
  href,
  linkLabel = "Zobacz wszystkie",
  children,
  className = "",
  rhythm = "loose",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  children: React.ReactNode;
  className?: string;
  rhythm?: "loose" | "tight";
}) {
  const pad = rhythm === "loose" ? "pt-16 pb-10 md:pt-24 md:pb-12" : "pt-8 pb-10 md:pt-10 md:pb-14";
  return (
    <section className={`container-page ${pad} ${className}`}>
      <header className="mb-6 max-w-[40ch] md:mb-8">
        <h2 className="font-display text-2xl font-light leading-none text-ink md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
      </header>
      {children}
      {href && (
        <p className="mt-8">
          <Link href={href} className="link-typo text-base">{linkLabel}</Link>
        </p>
      )}
    </section>
  );
}
