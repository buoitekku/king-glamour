import { StarIcon } from "./Icons";

/** Gwiazdki z połówkami i liczbą obok, żeby 4,6 nie wyglądało jak 5. */
export function Rating({ value, count, size = 14 }: { value: number; count?: number; size?: number }) {
  const label = new Intl.NumberFormat("pl-PL", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
  return (
    <span className="inline-flex items-center gap-1.5 text-muted" aria-label={`Ocena ${label} na 5`}>
      <span className="flex text-cognac" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = Math.max(0, Math.min(1, value - (i - 1)));
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <StarIcon width={size} height={size} className="absolute inset-0" />
              {fill > 0 && (
                <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${Math.round(fill * 100)}%` }}>
                  <StarIcon width={size} height={size} filled />
                </span>
              )}
            </span>
          );
        })}
      </span>
      <span className="text-xs tabular-nums">
        {label}{count != null && ` (${count})`}
      </span>
    </span>
  );
}
