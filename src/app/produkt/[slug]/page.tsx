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
import { Rating } from "@/components/Rating";
import { ProductPurchase } from "@/components/AddToCart";
import { ProductGrid } from "@/components/ProductGrid";
import { Section } from "@/components/Section";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

/** Strona produktu jako Split Studio: obraz / panel zakupu, pod nim opis i arkusz danych. */
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

  const specs: [string, string][] = [
    ["Marka", brand?.name ?? "—"],
    ["Kraj marki", brand?.country ?? "—"],
    ["SKU", product.sku],
    ["Kolory", product.colors.map((c) => c.name).join(", ")],
    ...(product.sizes ? ([["Rozmiary", product.sizes.join(", ")]] as [string, string][]) : []),
    ["Kategoria", trail.map((c) => c.name).join(" › ")],
    ["Dostępność", product.stock > 5 ? "W magazynie" : product.stock > 0 ? `Ostatnie sztuki (${product.stock})` : "Niedostępny"],
    ["Wysyłka", product.ships24h ? "24 h, zamówienie do 14:00 wysyłamy dziś" : "3–5 dni roboczych"],
  ];

  return (
    <div className="pb-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-page pt-5 md:pt-6">
        <Breadcrumbs items={[...trail.map((c) => ({ name: c.name, href: `/kategoria/${c.slug}` })), { name: product.name }]} />
      </div>

      <ProductPurchase
        product={product}
        head={
          <>
            <p className="caps flex flex-wrap gap-x-3">
              {brand && <Link href={`/marki/${brand.slug}`} className="!text-ink hover:underline">{brand.name}</Link>}
              {discount > 0 && <span className="text-accent">−{discount}%</span>}
              {product.isNew && <span className="text-ink">Nowość</span>}
              {product.ships24h && <span className="text-forest">Wysyłka 24 h</span>}
            </p>
            <h1 className="display mt-3 text-[2.4rem] leading-none text-ink md:text-[3.25rem]">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Rating value={product.rating} count={product.reviews} />
            </div>
            <div className="mt-5 border-y-2 border-ink py-3">
              <Price price={product.price} oldPrice={product.oldPrice} size="lg" />
              <p className="mt-1 text-xs text-muted">Cena zawiera VAT. {product.price >= FREE_SHIPPING_FROM ? "Darmowa dostawa." : `Darmowa dostawa od ${formatPrice(FREE_SHIPPING_FROM)}.`}</p>
            </div>
          </>
        }
      />

      <div className="container-page mt-14 grid gap-10 border-t-2 border-ink pt-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-16">
        <div className="prose-shop max-w-[65ch]">
          <h2 className="!mt-0">Opis</h2>
          <p>{product.description}</p>
          {brand && <p>{brand.description}</p>}
          <h2>Najważniejsze cechy</h2>
          <ul>
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="display mb-3 text-xl leading-none text-ink">Dane produktu</h2>
          <table className="w-full text-sm">
            <tbody>
              {specs.map(([k, v]) => (
                <tr key={k} className="border-b border-rule align-baseline">
                  <th scope="row" className="caps py-2.5 pr-4 text-left font-normal">{k}</th>
                  <td className="py-2.5 text-ink-2">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 text-sm text-muted">
            Pytania o dopasowanie? Doradcy King Glamour to czynni jeźdźcy:{" "}
            <a href="tel:+48420000000" className="link-typo">+48 42 000 00 00</a>, pn–pt 9–17.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <Section title="Podobne produkty" rhythm="loose">
          <ProductGrid products={related} />
        </Section>
      )}
    </div>
  );
}
