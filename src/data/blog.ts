import type { BlogPost } from "@/lib/types";

export const posts: BlogPost[] = [
  {
    slug: "jak-dobrac-kask-jezdziecki",
    title: "Jak dobrać kask jeździecki? Rozmiar, certyfikaty i dopasowanie",
    excerpt: "Kask to jedyny element wyposażenia, na którym nie warto oszczędzać. Podpowiadamy, jak zmierzyć głowę i na jakie normy zwrócić uwagę.",
    date: "2026-08-28",
    category: "Poradnik",
    readingTime: 6,
    content: [
      "Dobrze dobrany kask siedzi stabilnie na głowie, nie uciska skroni i nie przesuwa się przy potrząsaniu. Rozmiar mierzymy centymetrem krawieckim około 1 cm nad brwiami, w najszerszym miejscu głowy.",
      "Zwróć uwagę na certyfikat. W Europie obowiązuje norma VG1 01.040 2014-12, którą spełniają wszystkie kaski w naszej ofercie. Kaski z certyfikatem ASTM lub PAS 015 spełniają dodatkowe wymagania w zakresie odporności na przebicie.",
      "Kask wymieniamy po każdym upadku, w którym doszło do uderzenia głową, oraz profilaktycznie po 4–5 latach użytkowania. Materiały absorbujące energię tracą właściwości z czasem, nawet jeśli nie widać uszkodzeń.",
      "W sklepie stacjonarnym w Łodzi możesz przymierzyć wszystkie modele Samshield, KEP i HKM. Zamówienia online możesz zwrócić w ciągu 30 dni.",
    ],
  },
  {
    slug: "derki-na-jesien-i-zime",
    title: "Derki na jesień i zimę – jaką gramaturę wybrać?",
    excerpt: "0 g, 100 g, 200 g czy 400 g? Wyjaśniamy, kiedy derkować konia i jak dobrać wypełnienie do temperatury i typu konia.",
    date: "2026-08-14",
    category: "Koń",
    readingTime: 5,
    content: [
      "Decyzja o derkowaniu zależy od tego, czy koń jest strzyżony, ile czasu spędza na padoku i jak radzi sobie z chłodem. Konie niestrzyżone z dostępem do schronienia często nie potrzebują derki nawet zimą.",
      "Orientacyjnie: derka bez wypełnienia (0 g) sprawdza się w deszczową pogodę powyżej 10°C, 100 g przy 5–10°C, 200 g przy 0–5°C, a 300–400 g poniżej zera. Konie strzyżone potrzebują o jeden stopień cieplejszej derki.",
      "Sprawdzaj codziennie, czy koń nie jest spocony pod derką i czy nie ma otarć na łopatkach. Derki Horseware Rambo i Kentucky mają podszycie chroniące przed otarciami w tych miejscach.",
    ],
  },
  {
    slug: "przygotowanie-do-pierwszych-zawodow",
    title: "Przygotowanie do pierwszych zawodów – lista rzeczy do zabrania",
    excerpt: "Frak, biały czaprak, numery startowe, apteczka. Przygotowaliśmy checklistę, dzięki której niczego nie zapomnisz.",
    date: "2026-07-30",
    category: "Zawody",
    readingTime: 4,
    content: [
      "Na tydzień przed zawodami sprawdź regulamin: wymagany strój, dopuszczalne kiełzna i ochraniacze. Przepisy różnią się między dyscyplinami i klasami.",
      "Dla jeźdźca: kask z certyfikatem, frak lub marynarka, biała koszula i plastron, białe bryczesy, oficerki, rękawiczki, numer startowy. Dla konia: czysty czaprak, ochraniacze na transport, derka polarowa, siatka z sianem na przyczepę, wiadro i woda.",
      "Zabierz też zestaw pielęgnacyjny, zapasowe wodze i popręg oraz apteczkę. Na dzień przed zawodami wyczyść skórzany sprzęt i zapakuj wszystko do przyczepy.",
    ],
  },
  {
    slug: "test-ochraniaczy-kentucky-air-tendon",
    title: "Testujemy: ochraniacze Kentucky Air Tendon po sezonie",
    excerpt: "Przez sześć miesięcy używaliśmy ochraniaczy Air Tendon w treningu i na zawodach. Jak wypadła wentylacja, rzepy i podszycie?",
    date: "2026-07-12",
    category: "Testy",
    readingTime: 7,
    content: [
      "Ochraniacze trafiły do naszego Centrum Testowego w marcu. Używane były na dwóch koniach, pięć razy w tygodniu, na hali i w terenie.",
      "Wentylowana skorupa faktycznie ogranicza nagrzewanie się ścięgien: po 45 minutach pracy noga pod ochraniaczem była wyraźnie chłodniejsza niż pod klasycznymi neoprenowymi. Podszycie Vegan Sheepskin nie zbiło się i nadal dobrze się pierze.",
      "Rzepy po pół roku trzymają bez zarzutu. Jedyna uwaga: rozmiar M na drobnym koniu pełnej krwi był minimalnie za duży, warto przymierzyć oba rozmiary.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
