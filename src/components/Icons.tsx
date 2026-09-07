import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export const SearchIcon = (p: P) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const CartIcon = (p: P) => (
  <svg {...base(p)}><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 8H6" /><circle cx="9.5" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></svg>
);
export const HeartIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 20s-7-4.4-9-9a4.6 4.6 0 0 1 8-3.6l1 1.1 1-1.1a4.6 4.6 0 0 1 8 3.6c-2 4.6-9 9-9 9Z" /></svg>
);
export const UserIcon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></svg>
);
export const MenuIcon = (p: P) => (
  <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const ChevronDownIcon = (p: P) => (
  <svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>
);
export const ClockIcon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const StarIcon = (p: P & { filled?: boolean }) => {
  const { filled, ...rest } = p;
  return (
    <svg {...base(rest)} fill={filled ? "currentColor" : "none"}>
      <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
    </svg>
  );
};
export const CheckIcon = (p: P) => (
  <svg {...base(p)}><path d="m5 12 4.5 4.5L19 7" /></svg>
);
export const MinusIcon = (p: P) => <svg {...base(p)}><path d="M5 12h14" /></svg>;
export const PlusIcon = (p: P) => <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>;
export const TrashIcon = (p: P) => (
  <svg {...base(p)}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" /></svg>
);
export const FilterIcon = (p: P) => (
  <svg {...base(p)}><path d="M4 6h16M7 12h10M10 18h4" /></svg>
);
export const ColumnsOneIcon = (p: P) => (
  <svg {...base(p)}><rect x="4" y="4" width="16" height="7" rx="1" /><rect x="4" y="13" width="16" height="7" rx="1" /></svg>
);
export const ColumnsTwoIcon = (p: P) => (
  <svg {...base(p)}><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
);
