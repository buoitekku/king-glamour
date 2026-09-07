import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { ProductListing } from "@/components/ProductListing";

export const metadata: Metadata = { title: "Nowości" };

export default function Page() {
  return (
    <div className="pb-6">
      <PageHead crumbs={[{ name: "Nowości" }]} title="Nowości" lead="Właśnie dotarły do magazynu: nowe kolekcje Samshield, Pikeur, Eskadron i Kentucky." />
      <div className="container-page pt-8">
        <ProductListing base={{ isNew: true }} basePath="/nowosci" />
      </div>
    </div>
  );
}
