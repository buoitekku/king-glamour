import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/format";

/** Indeks wpisów: wiersze rozdzielone hairline'ami, bez kart. */
export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug} className="grid gap-1 border-b border-rule py-4 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-6">
          <p className="caps">{formatDate(post.date)}</p>
          <h3 className="font-display text-xl font-title leading-snug text-ink md:text-2xl">
            <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
          </h3>
          <p className="text-sm text-muted md:text-right">{post.category} · {post.readingTime} min</p>
        </li>
      ))}
    </ul>
  );
}
