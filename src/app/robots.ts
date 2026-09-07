import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/koszyk", "/zamowienie", "/konto", "/api/"] },
    sitemap: "https://kingglamour.pl/sitemap.xml",
  };
}
