import type { Metadata } from "next";
import { ProductListing, type SearchParams } from "@/components/ProductListing";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = { title: "Promocje" };

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  return (
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: "Promocje" }]} />
      <div className="mt-4 mb-6">
        <h1 className="font-serif text-3xl font-semibold text-ink-900">Promocje</h1>
        <p className="mt-2 max-w-2xl text-ink-500">Monster Sale: ceny obniżone nawet o 25%. Promocja trwa do wyczerpania zapasów.</p>
      </div>
      <ProductListing base={{ sale: true }} searchParams={sp} basePath="/promocje" />
    </div>
  );
}
