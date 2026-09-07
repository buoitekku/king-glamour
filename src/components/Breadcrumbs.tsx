import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Okruszki" className="text-xs text-ink-500">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-ink-900">Strona główna</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <span aria-hidden>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-ink-900">{item.name}</Link>
            ) : (
              <span className="text-ink-900">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
