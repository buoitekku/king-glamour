import { formatPrice } from "@/lib/format";

export function Price({ price, oldPrice, size = "md" }: { price: number; oldPrice?: number; size?: "sm" | "md" | "lg" }) {
  const cls = { sm: "text-sm", md: "text-base", lg: "text-2xl" }[size];
  return (
    <span className="flex flex-wrap items-baseline gap-x-2 tabular-nums">
      <span className={`${cls} font-semibold ${oldPrice ? "text-accent" : "text-ink"}`}>{formatPrice(price)}</span>
      {oldPrice && <span className="text-sm text-muted line-through">{formatPrice(oldPrice)}</span>}
    </span>
  );
}
