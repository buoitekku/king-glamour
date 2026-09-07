import Link from "next/link";
import { products } from "@/data/products";
import { brands } from "@/data/brands";
import { posts } from "@/data/blog";
import { getSubcategories } from "@/data/categories";
import { discountPercent, formatDate, formatPrice, pluralize } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { Price } from "./Price";

/**
 * Bento: 13 kafli o mieszanych rozpiętościach (2×2, 2×1, 1×2, 1×1).
 * Każda liczba na stronie jest policzona z katalogu, nie wpisana.
 */
export function HomeBento() {
  const fastCount = products.filter((p) => p.ships24h).length;
  const sale = products.filter((p) => p.oldPrice);
  const maxDiscount = Math.max(...sale.map((p) => discountPercent(p.price, p.oldPrice)));
  const featured = products.find((p) => p.slug === "kask-samshield-shadowmatt") ?? products[0];
  const collectionPad = products.find((p) => p.slug === "czaprak-eskadron-cotton-reflexx");
  const fresh = products.filter((p) => p.isNew).slice(0, 2);
  const post = posts[0];
  const rider = getSubcategories("jezdziec");

  let i = 0;
  const idx = () => ({ "--i": i++ } as React.CSSProperties);

  return (
    <section aria-label="Wejścia do sklepu" className="container-page pt-4 md:pt-6">
      <div className="grid auto-rows-[minmax(9rem,auto)] grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2 lg:auto-rows-[11.5rem] lg:grid-cols-4 lg:gap-4">
        {/* 2×2 — kolekcja sezonu */}
        <article className="tile tile-cognac min-h-[18rem] sm:col-span-2 sm:row-span-2" style={idx()}>
          <p className="caps !text-ink-on-dark">Kolekcja jesień 2026</p>
          <h2 className="display mt-3 text-3xl leading-none text-ink-on-dark md:text-[3.75rem]">
            Eskadron<br />Reflexx
          </h2>
          <p className="mt-3 max-w-[30ch] text-base text-ink-on-dark">Czapraki, kantary i bluzy w kolorach sezonu.</p>
          <p className="mt-auto">
            <Link href="/marki/eskadron" className="link-typo-dark text-sm">Zobacz kolekcję</Link>
          </p>
          {collectionPad && (
            <ProductImage
              product={collectionPad}
              color="var(--color-cognac-soft)"
              plain
              className="pointer-events-none absolute -bottom-8 -right-8 w-[64%] max-w-[20rem] opacity-60 md:-bottom-10"
            />
          )}
        </article>

        {/* 1×1 — dział 24h */}
        <article className="tile tile-forest" style={idx()}>
          <p className="caps text-muted-on-dark">Dział 24h</p>
          <p className="display mt-2 text-[3.25rem] tabular-nums text-ink-on-dark">{fastCount}</p>
          <p className="mt-1 text-sm text-muted-on-dark">{pluralize(fastCount, "produkt gotowy", "produkty gotowe", "produktów gotowych")} do wysyłki dziś</p>
          <p className="mt-auto pt-3"><Link href="/24h" className="link-typo-dark text-sm">Przeglądaj</Link></p>
        </article>

        {/* 1×2 — Jeździec z podkategoriami */}
        <article className="tile sm:row-span-2" style={idx()}>
          <h2 className="font-display text-2xl font-title leading-none text-ink md:text-[1.75rem]">
            <Link href="/kategoria/jezdziec" className="link-typo whitespace-normal">Jeździec</Link>
          </h2>
          <ul className="mt-4 space-y-1.5 text-sm text-ink-2">
            {rider.map((s) => (
              <li key={s.slug}>
                <Link href={`/kategoria/${s.slug}`} className="hover:text-ink hover:underline">{s.name}</Link>
              </li>
            ))}
          </ul>
        </article>

        {/* 1×1 — promocje */}
        <article className="tile" style={idx()}>
          <p className="caps">Promocje</p>
          <p className="display mt-2 text-[3.25rem] tabular-nums text-accent">−{maxDiscount}%</p>
          <p className="mt-1 text-sm text-muted">{sale.length} {pluralize(sale.length, "produkt", "produkty", "produktów")} w obniżonej cenie</p>
          <p className="mt-auto pt-3"><Link href="/promocje" className="link-typo text-sm">Wszystkie promocje</Link></p>
        </article>

        {/* 2×1 — wyróżniony produkt */}
        <article className="tile flex-row items-stretch gap-4 p-0 sm:col-span-2" style={idx()}>
          <Link href={`/produkt/${featured.slug}`} className="block w-1/3 shrink-0 bg-paper sm:w-2/5">
            <ProductImage product={featured} className="h-full w-full object-cover" />
          </Link>
          <div className="flex min-w-0 flex-1 flex-col py-5 pr-5">
            <p className="caps">Bestseller</p>
            <h2 className="mt-2 font-display text-xl font-title leading-tight text-ink sm:text-2xl">
              <Link href={`/produkt/${featured.slug}`} className="hover:underline">{featured.name}</Link>
            </h2>
            <p className="mt-1 line-clamp-2 text-sm text-muted">{featured.description}</p>
            <div className="mt-auto flex items-baseline justify-between gap-3 pt-3">
              <Price price={featured.price} oldPrice={featured.oldPrice} />
              <Link href={`/produkt/${featured.slug}`} className="link-typo hidden text-sm sm:inline">Zobacz produkt</Link>
            </div>
          </div>
        </article>

        {/* 1×1 — Koń */}
        <article className="tile" style={idx()}>
          <h2 className="font-display text-2xl font-title leading-none text-ink md:text-[1.75rem]">
            <Link href="/kategoria/kon" className="link-typo whitespace-normal">Koń</Link>
          </h2>
          <p className="mt-2 text-sm text-muted">Siodła, ogłowia, derki, ochraniacze, pielęgnacja, pasze.</p>
        </article>

        {/* 1×1 — Stajnia */}
        <article className="tile" style={idx()}>
          <h2 className="font-display text-2xl font-title leading-none text-ink md:text-[1.75rem]">
            <Link href="/kategoria/stajnia" className="link-typo whitespace-normal">Stajnia i wybieg</Link>
          </h2>
          <p className="mt-2 text-sm text-muted">Siatki na siano, wiadra, zabawki, ogrodzenia.</p>
        </article>

        {/* 2×1 — blog */}
        <article className="tile tile-dark sm:col-span-2" style={idx()}>
          <p className="caps text-muted-on-dark">Blog · {formatDate(post.date)}</p>
          <h2 className="mt-2 font-display text-2xl font-title leading-tight text-ink-on-dark">
            <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
          </h2>
          <p className="mt-auto pt-3"><Link href="/blog" className="link-typo-dark text-sm">Wszystkie wpisy</Link></p>
        </article>

        {/* 1×1 — Specjalistyczne */}
        <article className="tile" style={idx()}>
          <h2 className="font-display text-2xl font-title leading-none text-ink md:text-[1.75rem]">
            <Link href="/kategoria/specjalistyczne" className="link-typo whitespace-normal">Specjalistyczne</Link>
          </h2>
          <p className="mt-2 text-sm text-muted">Hobby horse, western, akcesoria dla psa.</p>
        </article>

        {/* 1×1 — marki */}
        <article className="tile" style={idx()}>
          <p className="caps">Marki</p>
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink-2">
            {brands.slice(0, 7).map((b) => (
              <li key={b.slug}>
                <Link href={`/marki/${b.slug}`} className="hover:text-ink hover:underline">{b.name}</Link>
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-3"><Link href="/marki" className="link-typo text-sm">Wszystkie marki</Link></p>
        </article>

        {/* 2×1 — nowości, dwa produkty */}
        <article className="tile sm:col-span-2" style={idx()}>
          <p className="caps">Nowości</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {fresh.map((p) => (
              <li key={p.id} className="flex min-w-0 items-center gap-3">
                <Link href={`/produkt/${p.slug}`} className="shrink-0">
                  <ProductImage product={p} className="h-16 w-16 rounded-card" />
                </Link>
                <div className="min-w-0">
                  <Link href={`/produkt/${p.slug}`} className="line-clamp-2 text-sm leading-snug text-ink hover:underline">{p.name}</Link>
                  <p className="text-sm tabular-nums text-muted">{formatPrice(p.price)}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-3"><Link href="/nowosci" className="link-typo text-sm">Wszystkie nowości</Link></p>
        </article>

        {/* 1×1 — sklep stacjonarny */}
        <article className="tile tile-soft" style={idx()}>
          <p className="caps">Sklep stacjonarny</p>
          <p className="mt-2 font-display text-xl font-title leading-tight text-ink">ul. Jeździecka 1<br />Łódź</p>
          <p className="mt-1 text-sm text-muted">pn–pt 10–18, sob 10–14</p>
          <p className="mt-auto pt-3"><Link href="/kontakt" className="link-typo text-sm">Kontakt</Link></p>
        </article>

        {/* 1×1 — dostawa i zwroty */}
        <article className="tile" style={idx()}>
          <p className="caps">Dostawa i zwroty</p>
          <p className="mt-2 text-sm leading-snug text-ink">Darmowa dostawa od 299 zł.<br />30 dni na zwrot.</p>
          <p className="mt-auto pt-3"><Link href="/dostawa" className="link-typo text-sm">Szczegóły</Link></p>
        </article>
      </div>
    </section>
  );
}
