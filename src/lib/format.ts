export const formatPrice = (value: number) =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", minimumFractionDigits: 2 }).format(value);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));

export const discountPercent = (price: number, oldPrice?: number) =>
  oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

export const pluralize = (n: number, one: string, few: string, many: string) => {
  if (n === 1) return one;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
  return many;
};
