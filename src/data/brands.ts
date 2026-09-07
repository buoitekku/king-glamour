import type { Brand } from "@/lib/types";

export const brands: Brand[] = [
  { slug: "samshield", name: "Samshield", country: "Francja", description: "Francuskie kaski premium łączące bezpieczeństwo z designem. Możliwość personalizacji." },
  { slug: "kep-italia", name: "KEP Italia", country: "Włochy", description: "Włoskie kaski z systemem wentylacji i wymiennymi wkładkami." },
  { slug: "pikeur", name: "Pikeur", country: "Niemcy", description: "Odzież jeździecka z najwyższej półki – bryczesy, kurtki, fraki." },
  { slug: "eskadron", name: "Eskadron", country: "Niemcy", description: "Kultowe kolekcje sezonowe: czapraki, derki, ochraniacze." },
  { slug: "schockemohle", name: "Schockemöhle Sports", country: "Niemcy", description: "Ogłowia anatomiczne i odzież sportowa dla jeźdźców." },
  { slug: "kentucky", name: "Kentucky Horsewear", country: "Belgia", description: "Ochraniacze, derki i akcesoria klasy premium." },
  { slug: "deniro", name: "DeNiro Boot Co.", country: "Włochy", description: "Ręcznie szyte oficerki z włoskiej skóry." },
  { slug: "horseware", name: "Horseware Ireland", country: "Irlandia", description: "Derki Rambo i Amigo – standard w stajniach na całym świecie." },
  { slug: "hkm", name: "HKM", country: "Niemcy", description: "Szeroka oferta w przystępnych cenach dla jeźdźca i konia." },
  { slug: "imperial-riding", name: "Imperial Riding", country: "Holandia", description: "Kolorowe, modne akcesoria z charakterem." },
  { slug: "prestige", name: "Prestige Italia", country: "Włochy", description: "Siodła o anatomicznym kroju, produkowane we Włoszech." },
  { slug: "st-hippolyt", name: "St. Hippolyt", country: "Niemcy", description: "Naturalne pasze i suplementy dla koni." },
  { slug: "king-glamour", name: "King Glamour", country: "Polska", description: "Nasza marka własna – solidne wyposażenie stajni i akcesoria w dobrej cenie." },
];

export function getBrand(slug: string) {
  return brands.find((b) => b.slug === slug);
}
