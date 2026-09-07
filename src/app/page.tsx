import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { HomeBento } from "@/components/HomeBento";
import { Section } from "@/components/Section";
import { ProductGrid } from "@/components/ProductGrid";
import { BlogIndex } from "@/components/BlogIndex";
import { getBestsellers } from "@/lib/commerce";
import { posts } from "@/data/blog";

export default async function HomePage() {
  const bestsellers = await getBestsellers(8);

  return (
    <>
      <HomeHero />
      <HomeBento />

      <Section title="Bestsellery" subtitle="Najczęściej wybierane w tym sezonie" href="/kategoria/kon" linkLabel="Wszystkie bestsellery">
        <ProductGrid products={bestsellers} />
      </Section>

      <section className="container-page pb-20 pt-6 md:pt-10">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-light leading-none text-ink md:text-3xl">Blog</h2>
          <Link href="/blog" className="link-typo text-sm">Wszystkie wpisy</Link>
        </div>
        <BlogIndex posts={posts.slice(0, 4)} />
      </section>
    </>
  );
}
