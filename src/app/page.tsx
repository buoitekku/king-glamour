import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { CategoryTiles } from "@/components/CategoryTiles";
import { Section } from "@/components/Section";
import { ProductGrid } from "@/components/ProductGrid";
import { BrandStrip } from "@/components/BrandStrip";
import { BlogCard } from "@/components/BlogCard";
import { getBestsellers, getNewArrivals, getSaleProducts, queryProducts } from "@/lib/commerce";
import { posts } from "@/data/blog";
import { ClockIcon } from "@/components/Icons";

export default async function HomePage() {
  const [bestsellers, newArrivals, sale, fast] = await Promise.all([
    getBestsellers(8),
    getNewArrivals(4),
    getSaleProducts(4),
    queryProducts({ ships24h: true, sort: "popular" }),
  ]);

  return (
    <>
      <HomeHero />

      <Section title="Działy sklepu" subtitle="Wybierz, dla kogo szukasz">
        <CategoryTiles />
      </Section>

      <section className="bg-brand-50">
        <div className="container-page flex flex-col items-start gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white"><ClockIcon width={24} height={24} /></span>
            <div>
              <h2 className="font-serif text-xl font-semibold text-ink-900">Dział 24h</h2>
              <p className="text-sm text-ink-500">Zamów do 14:00, a paczkę wyślemy jeszcze dziś. {fast.length} produktów gotowych do wysyłki.</p>
            </div>
          </div>
          <Link href="/24h" className="btn-accent">Przeglądaj dział 24h</Link>
        </div>
      </section>

      <Section title="Bestsellery" subtitle="Najczęściej wybierane przez naszych klientów" href="/kategoria/kon">
        <ProductGrid products={bestsellers} />
      </Section>

      <section className="bg-brand-900 text-brand-50">
        <div className="container-page grid gap-8 py-12 md:grid-cols-3">
          {[
            { brand: "Eskadron", name: "Reflexx AW26", href: "/marki/eskadron", text: "Czapraki, kantary i bluzy w kolorach sezonu." },
            { brand: "Pikeur", name: "Sports Collection", href: "/marki/pikeur", text: "Bryczesy Candela i kurtki na jesienny trening." },
            { brand: "Schockemöhle", name: "Equitus Line", href: "/marki/schockemohle", text: "Anatomiczne ogłowia i sportowe bryczesy." },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="rounded-lg border border-brand-700 p-6 transition hover:border-brand-300 hover:bg-brand-800">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-300">Kolekcja</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold">{c.brand}</h3>
              <p className="text-brand-200">{c.name}</p>
              <p className="mt-3 text-sm text-brand-300">{c.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <Section title="Nowości" subtitle="Właśnie dotarły do magazynu" href="/nowosci">
        <ProductGrid products={newArrivals} />
      </Section>

      <Section title="Monster Sale" subtitle="Ceny obniżone nawet o 25%" href="/promocje" className="pt-0">
        <ProductGrid products={sale} />
      </Section>

      <Section title="Marki" subtitle="Współpracujemy z najlepszymi producentami" href="/marki">
        <BrandStrip />
      </Section>

      <Section title="Blog" subtitle="Poradniki, testy i przygotowanie do zawodów" href="/blog" className="pt-0">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {posts.slice(0, 4).map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
