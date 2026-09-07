import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`} aria-label="King Glamour – strona główna">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-brand-800 text-brand-50">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 19c1-5 2-9 6-11 2-1 4-1 6-3l1.5-2.5L21 4l-1 3c1 2 0 5-3 6l-1.5 6" />
          <path d="M9 19l1-5M15 19l-1-4" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-serif text-lg font-semibold tracking-wide text-ink-900">King Glamour</span>
        <span className="block text-[10px] uppercase tracking-[0.22em] text-ink-500">sklep jeździecki</span>
      </span>
    </Link>
  );
}
