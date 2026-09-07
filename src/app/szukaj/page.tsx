import type { Metadata } from "next";
import { ProductListing, type SearchParams } from "@/components/ProductListing";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = { title: "Wyszukiwarka" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  return (
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: "Wyszukiwanie" }]} />
      <form action="/szukaj" className="mt-4 mb-6 flex max-w-xl gap-2">
        <input name="q" defaultValue={q} placeholder="Czego szukasz?" className="input" aria-label="Szukaj" autoFocus={!q} />
        <button type="submit" className="btn-primary">Szukaj</button>
      </form>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-ink-900">
        {q ? <>Wyniki dla: <span className="text-brand-700">„{q}”</span></> : "Wszystkie produkty"}
      </h1>
      <ProductListing base={{ q }} searchParams={sp} basePath="/szukaj" />
    </div>
  );
}
