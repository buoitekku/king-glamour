import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, columns = 4 }: { products: Product[]; columns?: 3 | 4 | 5 }) {
  const cols = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" }[columns];
  if (!products.length) {
    return (
      <div className="rounded-lg border border-dashed border-ink-300 p-12 text-center text-ink-500">
        Brak produktów spełniających kryteria.
      </div>
    );
  }
  return (
    <div className={`grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 ${cols}`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
