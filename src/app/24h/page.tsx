import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { ProductListing } from "@/components/ProductListing";

export const metadata: Metadata = { title: "Dział 24h" };

export default function Page() {
  return (
    <div className="pb-6">
      <PageHead crumbs={[{ name: "Dział 24h" }]} title="Dział 24h" lead="Produkty z tej listy mamy na magazynie w Łodzi. Zamówienie złożone do 14:00 wysyłamy tego samego dnia." />
      <div className="container-page pt-8">
        <ProductListing base={{ ships24h: true }} basePath="/24h" hide24h />
      </div>
    </div>
  );
}
