import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, columns = 4 }: { products: Product[]; columns?: 3 | 4 | 5 }) {
  const cols = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" }[columns];
  if (!products.length) {
    return (
      <div className="border-t border-b border-rule py-12 text-center text-muted">
        Brak produktów spełniających kryteria.
      </div>
    );
  }
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-10 ${cols}`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
