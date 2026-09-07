import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { brands, getBrand } from "@/data/brands";
import { PageHead } from "@/components/PageHead";
import { ProductListing } from "@/components/ProductListing";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = getBrand((await params).slug);
  return brand ? { title: brand.name, description: brand.description } : {};
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();
  return (
    <div className="pb-6">
      <PageHead crumbs={[{ name: "Marki", href: "/marki" }, { name: brand.name }]} title={brand.name} lead={`${brand.description} ${brand.country}.`} />
      <div className="container-page pt-8">
        <ProductListing base={{ brand: [slug] }} basePath={`/marki/${slug}`} hideBrand />
      </div>
    </div>
  );
}
