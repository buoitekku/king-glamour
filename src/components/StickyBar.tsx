"use client";

import { useEffect, useState } from "react";

/**
 * Pasek C4 przyklejony do dołu ekranu (poniżej lg). Pokazuje się dopiero,
 * gdy element `targetId` (główny przycisk akcji) wyjdzie z widoku, więc nie
 * dubluje CTA, kiedy jest ono na ekranie. Szanuje safe-area telefonów.
 */
export function StickyBar({ targetId, children }: { targetId: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), { threshold: 0 });
    io.observe(target);
    return () => io.disconnect();
  }, [targetId]);

  return (
    <aside
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-[var(--z-sticky)] border-t-2 border-ink bg-paper lg:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        transition: "transform var(--dur-short) var(--ease-out)",
      }}
    >
      <div className="container-page flex min-h-14 items-center justify-between gap-4 py-2">{children}</div>
    </aside>
  );
}
