import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col rounded-lg border border-ink-100 bg-white p-5 transition hover:shadow-card">
      <p className="text-xs uppercase tracking-wide text-brand-700">{post.category} · {post.readingTime} min</p>
      <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-ink-900">
        <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-ink-500">{post.excerpt}</p>
      <p className="mt-auto pt-4 text-xs text-ink-500">{formatDate(post.date)}</p>
    </article>
  );
}
