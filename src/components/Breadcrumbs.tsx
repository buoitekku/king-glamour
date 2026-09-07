import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Okruszki" className="caps">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="whitespace-nowrap hover:text-ink">Strona główna</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {item.href ? (
              <Link href={item.href} className="whitespace-nowrap hover:text-ink">{item.name}</Link>
            ) : (
              <span className="text-ink">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
