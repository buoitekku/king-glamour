import Link from "next/link";
import { getMainCategories, getSubcategories } from "@/data/categories";

export function CategoryTiles() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {getMainCategories().map((cat) => (
        <Link
          key={cat.slug}
          href={`/kategoria/${cat.slug}`}
          className="group rounded-lg border border-ink-100 bg-brand-50 p-5 transition hover:border-brand-300 hover:shadow-card"
        >
          <h3 className="font-serif text-xl font-semibold text-ink-900 group-hover:text-brand-700">{cat.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink-500">{cat.description}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {getSubcategories(cat.slug).slice(0, 4).map((s) => (
              <li key={s.slug} className="rounded-full bg-white px-2.5 py-1 text-xs text-ink-700">{s.name}</li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  );
}
