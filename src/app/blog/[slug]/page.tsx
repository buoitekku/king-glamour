import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, posts } from "@/data/blog";
import { formatDate } from "@/lib/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogCard } from "@/components/BlogCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const others = posts.filter((p) => p.slug !== slug).slice(0, 3);
  return (
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title }]} />
      <article className="mx-auto mt-6 max-w-3xl">
        <p className="text-xs uppercase tracking-wide text-brand-700">{post.category} · {formatDate(post.date)} · {post.readingTime} min czytania</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-ink-900 md:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg text-ink-500">{post.excerpt}</p>
        <div className="prose-shop mt-8 text-base">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
      <section className="mx-auto mt-12 max-w-5xl">
        <h2 className="mb-4 font-serif text-2xl font-semibold">Czytaj dalej</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {others.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
