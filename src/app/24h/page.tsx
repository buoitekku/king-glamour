import type { Metadata } from "next";
import { ProductListing } from "@/components/ProductListing";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = { title: "Dział 24h" };

export default function Page() {
  return (
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: "Dział 24h" }]} />
      <div className="mt-4 mb-6">
        <h1 className="font-serif text-3xl font-semibold text-ink-900">Dział 24h</h1>
        <p className="mt-2 max-w-2xl text-ink-500">Produkty z tej listy mamy na magazynie w Łodzi. Zamówienie złożone do 14:00 wysyłamy tego samego dnia.</p>
      </div>
      <ProductListing base={{ ships24h: true }} basePath="/24h" hide24h />
    </div>
  );
}
