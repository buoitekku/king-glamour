import Link from "next/link";

const collections = [
  { brand: "Eskadron", name: "Reflexx AW26", href: "/marki/eskadron", text: "Czapraki, kantary i bluzy w kolorach sezonu." },
  { brand: "Pikeur", name: "Sports Collection", href: "/marki/pikeur", text: "Bryczesy Candela i kurtki na jesienny trening." },
  { brand: "Schockemöhle", name: "Equitus Line", href: "/marki/schockemohle", text: "Anatomiczne ogłowia i sportowe bryczesy." },
];

/**
 * Pasmo kolekcji na zieleni, pełna szerokość. Lista typograficzna: wielka
 * nazwa marki po lewej, nazwa kolekcji i opis po prawej, linie między
 * wierszami. Zmiana nastroju między bento a siatką produktów.
 */
export function CollectionsBand() {
  return (
    <section className="mt-16 bg-forest text-ink-on-dark md:mt-24">
      <div className="container-page py-12 md:py-16">
        <div className="mb-6 flex items-baseline justify-between gap-4 md:mb-8">
          <h2 className="display text-2xl leading-none text-ink-on-dark md:text-3xl">Kolekcje jesień 2026</h2>
          <Link href="/marki" className="link-typo-dark text-sm">Wszystkie marki</Link>
        </div>
        <ul className="rule-strong-dark">
          {collections.map((c) => (
            <li key={c.href} className="border-b border-muted-on-dark/40">
              <Link
                href={c.href}
                className="group grid gap-2 py-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-baseline md:gap-8 md:py-7"
              >
                <span className="display text-3xl leading-none text-ink-on-dark group-hover:underline group-hover:decoration-1 group-hover:underline-offset-8 md:text-[3.5rem]">
                  {c.brand}
                </span>
                <span className="block">
                  <span className="block text-lg text-ink-on-dark">{c.name}</span>
                  <span className="block text-sm text-muted-on-dark">{c.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
