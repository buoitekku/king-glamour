import type { Product, ProductKind } from "@/lib/types";

/**
 * Ilustracja produktu generowana w SVG. W środowisku produkcyjnym zastąp
 * komponentem next/image z URL-ami zdjęć z platformy (CDN).
 */
const shapes: Record<ProductKind, string> = {
  helmet:
    "M20 62c0-22 14-38 40-38s40 16 40 38v6H20v-6zM14 68h92l-4 8H18l-4-8zM40 40c8-6 24-8 40-2",
  boots:
    "M42 18h26v40c0 6 4 10 12 12l8 2c6 2 6 12-2 12H36V18h6zM42 18h26M50 30h10",
  breeches:
    "M34 16h52l6 78H70l-10-46-10 46H28l6-78zM34 26h52",
  jacket:
    "M60 14l-20 8-14 22 12 6v50h44V50l12-6-14-22-20-8zM60 14v86M46 22c4 8 24 8 28 0",
  gloves:
    "M42 90V44a6 6 0 0112 0v18M54 62V36a6 6 0 0112 0v26M66 62V40a6 6 0 0112 0v22M78 62V50a6 6 0 0112 0v24c0 12-8 18-22 18H56c-8 0-14-4-14-12",
  vest:
    "M42 20l18 6 18-6 12 26-8 4v50H38V50l-8-4 12-26zM60 26v74",
  saddle:
    "M14 60c10-14 24-20 40-18 8 1 18 4 30 4 10 0 18-4 22-10 4 10 0 26-16 32-10 4-26 4-38 2-6 12-8 24-4 32-8-4-14-16-14-30-10 0-16-4-20-12z",
  bridle:
    "M60 12c-14 0-24 10-24 24 0 10 4 16 10 22v34h28V58c6-6 10-12 10-22 0-14-10-24-24-24zM46 40h28M52 92h16M36 36l24 22 24-22",
  halter:
    "M60 14c-12 0-22 8-24 20l-6 2v10l6 2c2 8 6 14 12 18v20h24V66c6-4 10-10 12-18l6-2V36l-6-2c-2-12-12-20-24-20zM40 38h40M48 60h24",
  blanket:
    "M16 44c12-14 30-20 48-18 14 2 26 8 34 18v30c-10 8-24 10-40 8-14-2-28-6-42-14V44zM16 44l8 6M92 58c-4 6-10 10-18 12M34 50c10 8 28 12 44 6",
  boot:
    "M44 14h32v60c0 10-6 16-16 16s-16-6-16-16V14zM44 30h32M44 46h32M44 62h32",
  saddlepad:
    "M18 40c14-12 34-16 54-12 12 2 22 8 30 16-4 14-14 24-30 30-16 6-34 6-52-2-4-10-4-22-2-32zM30 42c12 8 30 10 48 6",
  brush:
    "M30 46h60v14H30zM32 60l4 12h48l4-12M34 46l4-12h44l4 12M46 40v-6M60 40v-6M74 40v-6",
  feed:
    "M34 24h52l6 62H28l6-62zM34 24c0-6 52-6 52 0M44 52h32M48 66h24",
  supplement:
    "M40 30h40v56H40zM40 30l6-12h28l6 12M50 48h20M50 60h20",
  haynet:
    "M36 24h48l8 20-10 46H38L28 44l8-20zM36 24l12 66M84 24L72 90M28 44h64M32 62h56M46 24l6 66M74 24l-6 66",
  bucket:
    "M32 34h56l-6 58H38l-6-58zM32 34c0-8 56-8 56 0M40 34c0-16 40-16 40 0",
  toy:
    "M60 22a34 34 0 100 68 34 34 0 000-68zM60 22v68M26 56h68M38 32c10 10 34 10 44 0M38 80c10-10 34-10 44 0",
  fence:
    "M28 20v80M60 20v80M92 20v80M20 40h80M20 66h80M28 20l-4-6h8zM60 20l-4-6h8zM92 20l-4-6h8z",
  hobbyhorse:
    "M40 40c0-16 10-26 26-26 8 0 14 4 18 10l10 4-6 8c2 8-2 16-10 20l-6 4-8 42h-8l6-40c-10-2-22-8-22-22zM74 30a2 2 0 100 4 2 2 0 000-4",
  dog:
    "M30 40c6-10 16-14 30-14s24 4 30 14l6 10-8 4-4-6v30H36V48l-4 6-8-4 6-10zM52 40a2 2 0 100 4M68 40a2 2 0 100 4M56 52h8l-4 6z",
};

const bgByKind: Partial<Record<ProductKind, string>> = {
  helmet: "#eee7dc",
  saddle: "#e9dfd1",
  blanket: "#e6e9e4",
  feed: "#ece5d5",
};

export function ProductImage({
  product,
  color,
  className = "",
  priority,
  plain,
}: {
  product: Product;
  color?: string;
  className?: string;
  priority?: boolean;
  /** Sama kreska, bez tła i kółka (np. jako ornament na kolorowym kaflu). */
  plain?: boolean;
}) {
  const hex = color ?? product.colors[0]?.hex ?? "#3b3733";
  const bg = bgByKind[product.kind] ?? "#efeae2";
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={product.name}
      className={className}
      data-priority={priority ? "true" : undefined}
    >
      {!plain && <rect width="120" height="120" fill={bg} />}
      {!plain && <circle cx="60" cy="60" r="44" fill="#fff" fillOpacity="0.55" />}
      <path
        d={shapes[product.kind]}
        fill="none"
        stroke={hex}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
