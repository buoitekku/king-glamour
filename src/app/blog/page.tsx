import type { Metadata } from "next";
import { posts } from "@/data/blog";
import { BlogIndex } from "@/components/BlogIndex";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = { title: "Blog jeździecki" };

export default function BlogPage() {
  return (
    <div className="pb-10">
      <PageHead crumbs={[{ name: "Blog" }]} title="Blog" lead="Poradniki, testy sprzętu i przygotowanie do zawodów, pisane przez jeźdźców dla jeźdźców." />
      <div className="container-page mt-2">
        <BlogIndex posts={posts} />
      </div>
    </div>
  );
}
