import Link from "next/link";

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
    <nav aria-label="Paginacja" className="mt-8 flex items-center justify-center gap-1">
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={`grid h-9 w-9 place-items-center rounded-md border text-sm ${p === page ? "border-brand-800 bg-brand-800 text-white" : "border-ink-100 text-ink-700 hover:border-ink-900"}`}
        >
          {p}
        </Link>
      ))}
    </nav>
  );
}
