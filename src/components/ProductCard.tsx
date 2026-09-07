import Link from "next/link";
import type { Product } from "@/lib/types";
import { getBrand } from "@/data/brands";
import { discountPercent } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { Price } from "./Price";
import { Badge } from "./Badge";
import { Rating } from "./Rating";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product }: { product: Product }) {
  const brand = getBrand(product.brand);
  const discount = discountPercent(product.price, product.oldPrice);
  return (
    <article className="group relative flex flex-col rounded-lg border border-ink-100 bg-white transition hover:shadow-card">
      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
        {discount > 0 && <Badge tone="sale">-{discount}%</Badge>}
        {product.isNew && <Badge tone="new">Nowość</Badge>}
        {product.ships24h && <Badge tone="fast">Wysyłka 24h</Badge>}
      </div>
      <div className="absolute right-2 top-2 z-10">
        <WishlistButton productId={product.id} />
      </div>
      <Link href={`/produkt/${product.slug}`} className="block overflow-hidden rounded-t-lg">
        <ProductImage product={product} className="aspect-square w-full transition duration-300 group-hover:scale-[1.03]" />
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <span className="text-xs uppercase tracking-wide text-ink-500">{brand?.name}</span>
        <Link href={`/produkt/${product.slug}`} className="line-clamp-2 text-sm font-medium text-ink-900 hover:underline">
          {product.name}
        </Link>
        <Rating value={product.rating} count={product.reviews} size={12} />
        <div className="mt-auto pt-1">
          <Price price={product.price} oldPrice={product.oldPrice} />
        </div>
      </div>
    </article>
  );
}
