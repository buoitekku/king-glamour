import Link from "next/link";
import { brands } from "@/data/brands";

export function BrandStrip() {
  return (
    <ul className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
      {brands.map((b) => (
        <li key={b.slug} className="shrink-0">
          <Link
            href={`/marki/${b.slug}`}
            className="block rounded-md border border-ink-100 bg-white px-5 py-3 font-serif text-base font-semibold text-ink-700 transition hover:border-brand-300 hover:text-brand-800"
          >
            {b.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
