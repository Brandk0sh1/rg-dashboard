import type { MetricUnit } from "@/types/analytics";

export function formatMetric(value: number, unit: MetricUnit): string {
  if (unit === "currency") {
    return new Intl.NumberFormat("ru-RU", { currency: "RUB", maximumFractionDigits: 0, style: "currency" }).format(value);
  }

  if (unit === "percent") {
    return `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 }).format(value)}%`;
  }

  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 }).format(value);
}
