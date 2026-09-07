import Link from "next/link";
import type { Metadata } from "next";
import { brands } from "@/data/brands";
import { products } from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = { title: "Marki" };

export default function BrandsPage() {
  return (
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: "Marki" }]} />
      <h1 className="mt-4 mb-2 font-serif text-3xl font-semibold text-ink-900">Marki</h1>
      <p className="mb-8 max-w-2xl text-ink-500">Jesteśmy autoryzowanym dystrybutorem wszystkich marek dostępnych w sklepie.</p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((b) => {
          const count = products.filter((p) => p.brand === b.slug).length;
          return (
            <li key={b.slug}>
              <Link href={`/marki/${b.slug}`} className="block h-full rounded-lg border border-ink-100 p-5 transition hover:border-brand-300 hover:shadow-card">
                <h2 className="font-serif text-xl font-semibold text-ink-900">{b.name}</h2>
                <p className="text-xs uppercase tracking-wide text-ink-500">{b.country} · {count} produktów</p>
                <p className="mt-2 text-sm text-ink-700">{b.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
