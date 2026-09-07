import { Breadcrumbs } from "./Breadcrumbs";

/**
 * Wspólny nagłówek podstron (design.md): okruszki, display h1 po lewej,
 * lede po prawej, gruba linia 2 px pod całością.
 */
export function PageHead({
  title,
  lead,
  crumbs,
  children,
  size = "lg",
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs: { name: string; href?: string }[];
  children?: React.ReactNode;
  size?: "lg" | "md";
}) {
  const titleCls = size === "lg" ? "text-[2.6rem] md:text-[3.75rem]" : "text-3xl md:text-[2.8rem]";
  return (
    <header className="container-page pt-5 md:pt-6">
      <Breadcrumbs items={crumbs} />
      <div className="mt-5 grid items-end gap-4 border-b-2 border-ink pb-5 md:grid-cols-[3fr_2fr] md:gap-10 md:pb-6">
        <h1 className={`display leading-none text-ink ${titleCls}`}>{title}</h1>
        {lead && <p className="max-w-[46ch] text-base leading-snug text-muted md:justify-self-end md:pb-1">{lead}</p>}
      </div>
      {children}
    </header>
  );
}
