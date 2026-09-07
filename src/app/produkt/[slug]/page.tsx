import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { getBrand } from "@/data/brands";
import { getBreadcrumbs } from "@/data/categories";
import { getProductBySlug, getRelatedProducts, FREE_SHIPPING_FROM } from "@/lib/commerce";
import { discountPercent, formatPrice } from "@/lib/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Price } from "@/components/Price";
import { Badge } from "@/components/Badge";
import { Rating } from "@/components/Rating";
import { ProductPurchase } from "@/components/AddToCart";
import { ProductGrid } from "@/components/ProductGrid";
import { Section } from "@/components/Section";
import { ClockIcon, ReturnIcon, TruckIcon } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const brand = getBrand(product.brand);
  const trail = getBreadcrumbs(product.category);
  const related = await getRelatedProducts(product, 4);
  const discount = discountPercent(product.price, product.oldPrice);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    brand: { "@type": "Brand", name: brand?.name },
    description: product.description,
    offers: { "@type": "Offer", priceCurrency: "PLN", price: product.price, availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews },
  };

  return (
    <div className="container-page py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[...trail.map((c) => ({ name: c.name, href: `/kategoria/${c.slug}` })), { name: product.name }]} />

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="mb-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {brand && <Link href={`/marki/${brand.slug}`} className="text-sm font-medium uppercase tracking-wide text-brand-700 hover:underline">{brand.name}</Link>}
              {discount > 0 && <Badge tone="sale">-{discount}%</Badge>}
              {product.isNew && <Badge tone="new">Nowość</Badge>}
              {product.ships24h && <Badge tone="fast">Wysyłka 24h</Badge>}
            </div>
            <h1 className="font-serif text-3xl font-semibold text-ink-900">{product.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <Rating value={product.rating} count={product.reviews} />
              <span className="text-xs text-ink-500">SKU: {product.sku}</span>
            </div>
            <div className="mt-4">
              <Price price={product.price} oldPrice={product.oldPrice} size="lg" />
              <p className="text-xs text-ink-500">Cena zawiera VAT. {product.price >= FREE_SHIPPING_FROM ? "Darmowa dostawa." : `Darmowa dostawa od ${formatPrice(FREE_SHIPPING_FROM)}.`}</p>
            </div>
          </div>

          <ProductPurchase product={product} />

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="prose-shop">
              <h2>Opis produktu</h2>
              <p>{product.description}</p>
              {brand && <p>{brand.description}</p>}
            </div>
            <div className="prose-shop">
              <h2>Najważniejsze cechy</h2>
              <ul>
                {product.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <h2>Dane produktu</h2>
              <dl className="grid grid-cols-[120px_1fr] gap-y-1 text-sm text-ink-700">
                <dt className="text-ink-500">Marka</dt><dd>{brand?.name}</dd>
                <dt className="text-ink-500">Kraj marki</dt><dd>{brand?.country}</dd>
                <dt className="text-ink-500">Kolory</dt><dd>{product.colors.map((c) => c.name).join(", ")}</dd>
                {product.sizes && <><dt className="text-ink-500">Rozmiary</dt><dd>{product.sizes.join(", ")}</dd></>}
                <dt className="text-ink-500">Kategoria</dt><dd>{trail.map((c) => c.name).join(" › ")}</dd>
              </dl>
            </div>
          </div>
        </div>

        <aside className="space-y-4 self-start lg:sticky lg:top-36">
          <div className="rounded-lg border border-ink-100 bg-brand-50 p-5 text-sm">
            <ul className="space-y-3 text-ink-700">
              <li className="flex gap-3"><TruckIcon className="shrink-0 text-brand-700" /> <span><strong>Darmowa dostawa</strong> od {formatPrice(FREE_SHIPPING_FROM)}. InPost, DPD, DHL lub odbiór osobisty w Łodzi.</span></li>
              <li className="flex gap-3"><ClockIcon className="shrink-0 text-brand-700" /> <span>{product.ships24h ? <><strong>Wysyłka w 24 h.</strong> Zamów do 14:00, wyślemy dziś.</> : <><strong>Na zamówienie.</strong> Wysyłka w 3–5 dni roboczych.</>}</span></li>
              <li className="flex gap-3"><ReturnIcon className="shrink-0 text-brand-700" /> <span><strong>30 dni na zwrot</strong> bez podawania przyczyny.</span></li>
            </ul>
          </div>
          <div className="rounded-lg border border-ink-100 p-5 text-sm">
            <p className="font-semibold text-ink-900">Masz pytanie o ten produkt?</p>
            <p className="mt-1 text-ink-500">Doradcy King Glamour to czynni jeźdźcy. Zadzwoń pn–pt 9–17.</p>
            <a href="tel:+48420000000" className="btn-secondary mt-3 w-full">+48 42 000 00 00</a>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <Section title="Podobne produkty" className="px-0">
          <ProductGrid products={related} />
        </Section>
      )}
    </div>
  );
}
