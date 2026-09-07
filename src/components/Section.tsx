import Link from "next/link";
import { ChevronIcon } from "./Icons";

export function Section({
  title,
  subtitle,
  href,
  linkLabel = "Zobacz wszystkie",
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`container-page py-10 md:py-14 ${className}`}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 md:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
        </div>
        {href && (
          <Link href={href} className="hidden items-center gap-1 text-sm font-medium text-brand-700 hover:underline sm:inline-flex">
            {linkLabel} <ChevronIcon width={16} height={16} />
          </Link>
        )}
      </div>
      {children}
      {href && (
        <Link href={href} className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline sm:hidden">
          {linkLabel} <ChevronIcon width={16} height={16} />
        </Link>
      )}
    </section>
  );
}
