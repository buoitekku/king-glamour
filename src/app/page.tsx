import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { HomeBento } from "@/components/HomeBento";
import { Section } from "@/components/Section";
import { ProductGrid } from "@/components/ProductGrid";
import { BlogIndex } from "@/components/BlogIndex";
import { CollectionsBand } from "@/components/CollectionsBand";
import { getBestsellers } from "@/lib/commerce";
import { posts } from "@/data/blog";

export default async function HomePage() {
  const bestsellers = await getBestsellers(8);

  return (
    <>
      <HomeHero />
      <HomeBento />
      <CollectionsBand />

      <Section title="Bestsellery" subtitle="Najczęściej wybierane w tym sezonie" href="/kategoria/kon" linkLabel="Wszystkie bestsellery">
        <ProductGrid products={bestsellers} />
      </Section>

      <section className="container-page pb-4 pt-6 md:pt-10">
        <div className="rule-strong mb-6 flex items-end justify-between gap-4 pt-4">
          <h2 className="display text-3xl leading-none text-ink md:text-[2.8rem]">Blog</h2>
          <Link href="/blog" className="link-typo text-base">Wszystkie wpisy</Link>
        </div>
        <BlogIndex posts={posts.slice(0, 4)} />
      </section>
    </>
  );
}
