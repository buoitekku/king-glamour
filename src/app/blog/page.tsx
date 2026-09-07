import type { Metadata } from "next";
import { posts } from "@/data/blog";
import { BlogCard } from "@/components/BlogCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = { title: "Blog jeździecki" };

export default function BlogPage() {
  return (
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: "Blog" }]} />
      <h1 className="mt-4 mb-2 font-serif text-3xl font-semibold text-ink-900">Blog</h1>
      <p className="mb-8 max-w-2xl text-ink-500">Poradniki, testy sprzętu i przygotowanie do zawodów, pisane przez jeźdźców dla jeźdźców.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
