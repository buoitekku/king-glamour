import Link from "next/link";

/** Paginacja typograficzna: numery na linii, aktywny podkreślony 2 px. */
export function Pagination({ page, pages, basePath, params }: { page: number; pages: number; basePath: string; params: { toString(): string } }) {
  if (pages <= 1) return null;
  const href = (p: number) => {
    const next = new URLSearchParams(params.toString());
    if (p === 1) next.delete("strona");
    else next.set("strona", String(p));
    const qs = next.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };
  return (
    <nav aria-label="Paginacja" className="mt-10 flex items-baseline gap-5 border-t border-rule pt-4 text-base tabular-nums">
      <span className="caps">Strona</span>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={p === page ? "border-b-2 border-ink font-semibold text-ink" : "text-muted hover:text-ink"}
        >
          {p}
        </Link>
      ))}
    </nav>
  );
}
