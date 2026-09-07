import { formatPrice } from "@/lib/format";

/**
 * Cena z obsługą Omnibus: przy obniżce pokazuje cenę przekreśloną oraz
 * najniższą cenę z 30 dni przed obniżką (wymóg prawny w UE).
 */
export function Price({
  price,
  oldPrice,
  lowestPrice30d,
  size = "md",
}: {
  price: number;
  oldPrice?: number;
  lowestPrice30d?: number;
  size?: "sm" | "md" | "lg";
}) {
  const cls = { sm: "text-sm", md: "text-base", lg: "text-2xl" }[size];
  return (
    <span className="block tabular-nums">
      <span className="flex flex-wrap items-baseline gap-x-2">
        <span className={`${cls} font-semibold ${oldPrice ? "text-accent" : "text-ink"}`}>{formatPrice(price)}</span>
        {oldPrice && <span className="text-sm text-muted line-through">{formatPrice(oldPrice)}</span>}
      </span>
      {oldPrice && lowestPrice30d != null && (
        <span className="mt-0.5 block text-xs text-muted">Najniższa cena z 30 dni przed obniżką: {formatPrice(lowestPrice30d)}</span>
      )}
    </span>
  );
}
