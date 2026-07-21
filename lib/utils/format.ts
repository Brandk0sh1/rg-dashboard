export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 1,
    notation: "compact",
  }).format(value);
}
