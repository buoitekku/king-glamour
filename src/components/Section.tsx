import Link from "next/link";

/**
 * Sekcja z grubą linią i nagłówkiem na linii bazowej z linkiem.
 * Dwa rytmy odstępów, żeby strona nie miała jednej miary.
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
  const pad = rhythm === "loose" ? "pt-14 pb-10 md:pt-20 md:pb-12" : "pt-6 pb-10 md:pt-8 md:pb-14";
  return (
    <section className={`container-page ${pad} ${className}`}>
      <header className="rule-strong mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pt-4 md:mb-8">
        <div className="max-w-[40ch]">
          <h2 className="display text-3xl leading-none text-ink md:text-[2.8rem]">{title}</h2>
          {subtitle && <p className="mt-2 text-base text-muted">{subtitle}</p>}
        </div>
        {href && <Link href={href} className="link-typo text-base">{linkLabel}</Link>}
      </header>
      {children}
    </section>
  );
}
