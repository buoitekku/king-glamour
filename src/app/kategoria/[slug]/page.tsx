import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getBreadcrumbs, getCategory, getSubcategories } from "@/data/categories";
import { PageHead } from "@/components/PageHead";
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
  const tabs = subs.length ? subs : siblings;

  return (
    <div className="pb-6">
      <PageHead
        crumbs={trail.map((c, i) => ({ name: c.name, href: i < trail.length - 1 ? `/kategoria/${c.slug}` : undefined }))}
        title={cat.name}
        lead={cat.description}
      >
        {tabs.length > 0 && (
          <nav aria-label="Podkategorie" className="no-scrollbar -mb-px flex gap-6 overflow-x-auto border-b border-rule">
            {tabs.map((s) => (
              <Link
                key={s.slug}
                href={`/kategoria/${s.slug}`}
                aria-current={s.slug === slug ? "page" : undefined}
                className={`caps shrink-0 whitespace-nowrap border-b-2 py-3 ${s.slug === slug ? "border-ink !text-ink" : "border-transparent hover:!text-ink"}`}
              >
                {s.name}
              </Link>
            ))}
          </nav>
        )}
      </PageHead>
      <div className="container-page pt-8">
        <ProductListing base={{ category: slug }} basePath={`/kategoria/${slug}`} />
      </div>
    </div>
  );
}
