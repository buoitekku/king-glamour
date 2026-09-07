import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getBreadcrumbs, getCategory, getSubcategories } from "@/data/categories";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductListing } from "@/components/ProductListing";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getCategory((await params).slug);
  if (!cat) return {};
  return { title: cat.name, description: cat.description ?? `${cat.name} – sklep jeździecki King Glamour.` };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const trail = getBreadcrumbs(slug);
  const subs = getSubcategories(slug);
  const siblings = cat.parent ? getSubcategories(cat.parent) : [];

  return (
    <div className="container-page py-6">
      <Breadcrumbs items={trail.map((c, i) => ({ name: c.name, href: i < trail.length - 1 ? `/kategoria/${c.slug}` : undefined }))} />
      <div className="mt-4 mb-6">
        <h1 className="font-serif text-3xl font-semibold text-ink-900">{cat.name}</h1>
        {cat.description && <p className="mt-2 max-w-2xl text-ink-500">{cat.description}</p>}
      </div>

      {(subs.length > 0 || siblings.length > 0) && (
        <ul className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
          {(subs.length ? subs : siblings).map((s) => (
            <li key={s.slug} className="shrink-0">
              <Link
                href={`/kategoria/${s.slug}`}
                className={`block rounded-full border px-4 py-1.5 text-sm ${s.slug === slug ? "border-brand-800 bg-brand-800 text-white" : "border-ink-100 bg-white text-ink-700 hover:border-brand-300"}`}
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <ProductListing base={{ category: slug }} basePath={`/kategoria/${slug}`} />
    </div>
  );
}
