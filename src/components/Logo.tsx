import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="King Glamour – strona główna">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-ink text-ink">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 19c1-5 2-9 6-11 2-1 4-1 6-3l1.5-2.5L21 4l-1 3c1 2 0 5-3 6l-1.5 6" />
          <path d="M9 19l1-5M15 19l-1-4" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block whitespace-nowrap font-display text-xl font-display tracking-tight text-ink">King Glamour</span>
        <span className="caps hidden whitespace-nowrap text-[10px] sm:block">sklep jeździecki</span>
      </span>
    </Link>
  );
}
