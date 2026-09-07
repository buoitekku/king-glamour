import { StarIcon } from "./Icons";

export function Rating({ value, count, size = 14 }: { value: number; count?: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted" aria-label={`Ocena ${value} na 5`}>
      <span className="flex text-cognac">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} width={size} height={size} filled={i <= Math.round(value)} />
        ))}
      </span>
      {count != null && <span className="text-xs tabular-nums">({count})</span>}
    </span>
  );
}
