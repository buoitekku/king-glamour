import Link from "next/link";
import type { Product } from "@/lib/types";
import { getBrand } from "@/data/brands";
import { discountPercent } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { Price } from "./Price";
import { WishlistButton } from "./WishlistButton";

/**
 * Karta produktu (F6): obraz · marka · nazwa · cena. Jeden sygnał
 * kontenera (blok paper-2 pod obrazem), jeden sygnał hover (obraz 1.02).
 * Etykiety są tekstem, nie kolorowymi plakietkami.
 */
export function ProductCard({ product }: { product: Product }) {
  const brand = getBrand(product.brand);
  const discount = discountPercent(product.price, product.oldPrice);
  return (
    <article className="group relative flex min-w-0 flex-col">
      <div className="absolute right-2 top-2 z-[var(--z-raised)]">
        <WishlistButton productId={product.id} />
      </div>
      <Link href={`/produkt/${product.slug}`} className="block overflow-hidden rounded-card bg-paper-2">
        <ProductImage
          product={product}
          className="aspect-square w-full transition-transform duration-[420ms] ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1 pt-3">
        <p className="caps flex flex-wrap gap-x-3">
          <span>{brand?.name}</span>
          {discount > 0 && <span className="text-accent">−{discount}%</span>}
          {product.isNew && <span className="text-ink">Nowość</span>}
          {product.ships24h && <span className="text-forest">24 h</span>}
        </p>
        <Link href={`/produkt/${product.slug}`} className="line-clamp-2 font-display text-lg font-title leading-snug text-ink hover:underline">
          {product.name}
        </Link>
        <div className="mt-auto pt-1">
          <Price price={product.price} oldPrice={product.oldPrice} />
        </div>
      </div>
    </article>
  );
}
