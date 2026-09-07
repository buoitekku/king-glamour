import Link from "next/link";

/**
 * Hero na ciemnym pasmie, pełna szerokość. Dyptyk: ciężki display po
 * lewej, lede i dwa typograficzne linki po prawej, dół cięższy od góry.
 */
export function HomeHero() {
  return (
    <section className="bg-paper-3 text-ink-on-dark">
      <div className="container-page grid items-end gap-8 pb-16 pt-12 md:grid-cols-[3fr_2fr] md:gap-12 md:pb-24 md:pt-16">
        <h1 className="display text-display text-ink-on-dark">
          Dla jeźdźca<br />i konia.
        </h1>
        <div className="max-w-[44ch] md:justify-self-end md:pb-2">
          <p className="text-md leading-snug text-muted-on-dark">
            Samshield, KEP, Horseware, Prestige, Pikeur. Wysyłka w 24 h z Łodzi, zwrot do 30 dni.
          </p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-base">
            <Link href="/nowosci" className="link-typo-dark">Zobacz nowości</Link>
            <Link href="/24h" className="link-typo-dark">Dział 24h</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
