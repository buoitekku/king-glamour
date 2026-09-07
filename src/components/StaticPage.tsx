import { PageHead } from "./PageHead";

/** Strony informacyjne (Long Document): nagłówek strony + proza o mierze 65 ch. */
export function StaticPage({ title, lead, children }: { title: string; lead?: string; children: React.ReactNode }) {
  return (
    <div className="pb-10">
      <PageHead crumbs={[{ name: title }]} title={title} lead={lead} size="md" />
      <article className="container-page">
        <div className="prose-shop mt-8 max-w-[65ch] text-base">{children}</div>
      </article>
    </div>
  );
}
