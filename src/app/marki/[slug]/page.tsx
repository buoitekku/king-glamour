import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { brands, getBrand } from "@/data/brands";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: "Marki", href: "/marki" }, { name: brand.name }]} />
      <div className="mt-4 mb-6">
        <h1 className="font-serif text-3xl font-semibold text-ink-900">{brand.name}</h1>
        <p className="mt-2 max-w-2xl text-ink-500">{brand.description} Kraj pochodzenia: {brand.country}.</p>
      </div>
      <ProductListing base={{ brand: [slug] }} basePath={`/marki/${slug}`} hideBrand />
    </div>
  );
}
