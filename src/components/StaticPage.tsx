import { Breadcrumbs } from "./Breadcrumbs";

export function StaticPage({ title, lead, children }: { title: string; lead?: string; children: React.ReactNode }) {
  return (
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: title }]} />
      <article className="mx-auto mt-6 max-w-3xl">
        <h1 className="font-serif text-3xl font-semibold text-ink-900 md:text-4xl">{title}</h1>
        {lead && <p className="mt-3 text-lg text-ink-500">{lead}</p>}
        <div className="prose-shop mt-8">{children}</div>
      </article>
    </div>
  );
}
