import Link from "next/link";
import type { Metadata } from "next";
import { brands } from "@/data/brands";
import { products } from "@/data/products";
import { PageHead } from "@/components/PageHead";
import { pluralize } from "@/lib/format";

export const metadata: Metadata = { title: "Marki" };

/** Indeks marek jako lista typograficzna z liniami (Catalogue). */
export default function BrandsPage() {
  return (
    <div className="pb-10">
      <PageHead crumbs={[{ name: "Marki" }]} title="Marki" lead="Jesteśmy autoryzowanym dystrybutorem wszystkich marek dostępnych w sklepie." />
      <ul className="container-page mt-2">
        {brands.map((b) => {
          const count = products.filter((p) => p.brand === b.slug).length;
          return (
            <li key={b.slug} className="border-b border-rule">
              <Link href={`/marki/${b.slug}`} className="group grid gap-1 py-5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto] md:items-baseline md:gap-8 md:py-6">
                <span className="display text-2xl leading-none text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-8 md:text-[2.25rem]">{b.name}</span>
                <span className="text-base text-ink-2">{b.description}</span>
                <span className="caps tabular-nums md:text-right">{b.country} · {count} {pluralize(count, "produkt", "produkty", "produktów")}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
