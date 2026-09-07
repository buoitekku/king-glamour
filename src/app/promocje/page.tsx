import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { ProductListing } from "@/components/ProductListing";

export const metadata: Metadata = { title: "Promocje" };

export default function Page() {
  return (
    <div className="pb-6">
      <PageHead crumbs={[{ name: "Promocje" }]} title="Promocje" lead="Ceny obniżone do wyczerpania zapasów. Kolor czerwony przy cenie oznacza obniżkę." />
      <div className="container-page pt-8">
        <ProductListing base={{ sale: true }} basePath="/promocje" />
      </div>
    </div>
  );
}
