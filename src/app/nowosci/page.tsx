import type { Metadata } from "next";
import { ProductListing, type SearchParams } from "@/components/ProductListing";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = { title: "Nowości" };

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  return (
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: "Nowości" }]} />
      <div className="mt-4 mb-6">
        <h1 className="font-serif text-3xl font-semibold text-ink-900">Nowości</h1>
        <p className="mt-2 max-w-2xl text-ink-500">Właśnie dotarły do magazynu: nowe kolekcje Samshield, Pikeur, Eskadron i Kentucky.</p>
      </div>
      <ProductListing base={{ isNew: true }} searchParams={sp} basePath="/nowosci" />
    </div>
  );
}
