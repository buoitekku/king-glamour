import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, posts } from "@/data/blog";
import { formatDate } from "@/lib/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogIndex } from "@/components/BlogIndex";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

/** Wpis jako Long Document: lede, miara 65 ch, bez kart. */
export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const others = posts.filter((p) => p.slug !== slug).slice(0, 3);
  return (
    <div className="pb-10">
      <div className="container-page pt-5 md:pt-6">
        <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title }]} />
      </div>
      <article className="container-page mt-8 grid gap-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-12">
        <p className="caps md:pt-2">{post.category}<br />{formatDate(post.date)}<br />{post.readingTime} min czytania</p>
        <div className="max-w-[65ch]">
          <h1 className="display text-[2.4rem] leading-none text-ink md:text-[3.25rem]">{post.title}</h1>
          <p className="mt-6 text-lg leading-snug text-ink-2">{post.excerpt}</p>
          <div className="prose-shop mt-8 border-t-2 border-ink pt-8 text-base">
            {post.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>
      <section className="container-page mt-16">
        <div className="rule-strong mb-4 pt-4">
          <h2 className="display text-2xl leading-none text-ink md:text-3xl">Czytaj dalej</h2>
        </div>
        <BlogIndex posts={others} />
      </section>
    </div>
  );
}
