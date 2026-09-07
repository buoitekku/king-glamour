import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { posts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kingglamour.pl";
  const statics = ["", "/promocje", "/nowosci", "/24h", "/marki", "/blog", "/kontakt", "/dostawa", "/zwroty", "/regulamin", "/polityka-prywatnosci", "/o-nas"];
  return [
    ...statics.map((p) => ({ url: `${base}${p}`, changeFrequency: "daily" as const })),
    ...categories.map((c) => ({ url: `${base}/kategoria/${c.slug}`, changeFrequency: "daily" as const })),
    ...brands.map((b) => ({ url: `${base}/marki/${b.slug}`, changeFrequency: "weekly" as const })),
    ...products.map((p) => ({ url: `${base}/produkt/${p.slug}`, changeFrequency: "weekly" as const })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.date })),
  ];
}
