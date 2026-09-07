import type { Category } from "@/lib/types";

export const categories: Category[] = [
  // Główne działy
  { slug: "jezdziec", name: "Jeździec", description: "Kaski, buty, bryczesy, rękawiczki i odzież zawodnicza – wszystko, czego potrzebuje jeździec.", icon: "rider" },
  { slug: "kon", name: "Koń", description: "Siodła, ogłowia, derki, ochraniacze, pielęgnacja i żywienie dla Twojego konia.", icon: "horse" },
  { slug: "stajnia", name: "Stajnia i wybieg", description: "Wyposażenie stajni, ogrodzenia, karmniki, siatki na siano i zabawki.", icon: "stable" },
  { slug: "specjalistyczne", name: "Specjalistyczne", description: "Hobby horse, woltyżerka, western i akcesoria dla psów.", icon: "special" },

  // Jeździec
  { slug: "kaski", name: "Kaski jeździeckie", parent: "jezdziec" },
  { slug: "buty", name: "Buty i sztyblety", parent: "jezdziec" },
  { slug: "bryczesy", name: "Bryczesy", parent: "jezdziec" },
  { slug: "kurtki", name: "Kurtki i bluzy", parent: "jezdziec" },
  { slug: "rekawiczki", name: "Rękawiczki", parent: "jezdziec" },
  { slug: "kamizelki", name: "Kamizelki ochronne", parent: "jezdziec" },

  // Koń
  { slug: "siodla", name: "Siodła", parent: "kon" },
  { slug: "oglowia", name: "Ogłowia i wodze", parent: "kon" },
  { slug: "kantary", name: "Kantary i uwiązy", parent: "kon" },
  { slug: "derki", name: "Derki", parent: "kon" },
  { slug: "ochraniacze", name: "Ochraniacze", parent: "kon" },
  { slug: "czapraki", name: "Czapraki i potniki", parent: "kon" },
  { slug: "pielegnacja", name: "Pielęgnacja", parent: "kon" },
  { slug: "zywienie", name: "Pasze i suplementy", parent: "kon" },

  // Stajnia
  { slug: "siatki", name: "Siatki na siano", parent: "stajnia" },
  { slug: "wiadra", name: "Wiadra i karmniki", parent: "stajnia" },
  { slug: "zabawki", name: "Zabawki dla koni", parent: "stajnia" },
  { slug: "ogrodzenia", name: "Ogrodzenia i pastuchy", parent: "stajnia" },

  // Specjalistyczne
  { slug: "hobby-horse", name: "Hobby horse", parent: "specjalistyczne" },
  { slug: "dla-psa", name: "Dla psa", parent: "specjalistyczne" },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getMainCategories() {
  return categories.filter((c) => !c.parent);
}

export function getSubcategories(parent: string) {
  return categories.filter((c) => c.parent === parent);
}

/** Zwraca slug kategorii i wszystkich jej podkategorii. */
export function getCategoryTree(slug: string): string[] {
  const subs = getSubcategories(slug).map((c) => c.slug);
  return [slug, ...subs];
}

export function getBreadcrumbs(slug: string): Category[] {
  const trail: Category[] = [];
  let current = getCategory(slug);
  while (current) {
    trail.unshift(current);
    current = current.parent ? getCategory(current.parent) : undefined;
  }
  return trail;
}
