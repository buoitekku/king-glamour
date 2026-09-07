import Link from "next/link";

/**
 * Hero jako dyptyk: display po lewej, lede i dwa typograficzne linki po
 * prawej. Wysokość z treści, dół cięższy niż góra, żaden element nie stoi
 * na wspólnej osi centralnej.
 */
export function HomeHero() {
  return (
    <section className="container-page grid items-end gap-8 pb-14 pt-10 md:grid-cols-[3fr_2fr] md:gap-12 md:pb-20 md:pt-14">
      <h1 className="font-display text-display font-light leading-[1.05] text-ink">
        Dla jeźdźca<br />i konia.
      </h1>
      <div className="max-w-[44ch] md:justify-self-end md:pb-2">
        <p className="text-md leading-snug text-ink-2">
          Samshield, KEP, Horseware, Prestige, Pikeur. Wysyłka w 24 h z Łodzi, zwrot do 30 dni.
        </p>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-base">
          <Link href="/nowosci" className="link-typo">Zobacz nowości</Link>
          <Link href="/24h" className="link-typo">Dział 24h</Link>
        </p>
      </div>
    </section>
  );
}
