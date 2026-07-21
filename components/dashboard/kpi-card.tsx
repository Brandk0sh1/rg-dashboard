import { formatMetric } from "@/components/dashboard/metric-format";
import type { DashboardMetric } from "@/types/analytics";

interface KpiCardProps { metric: DashboardMetric; }

export function KpiCard({ metric }: KpiCardProps) {
  const change = metric.previousValue === undefined || metric.previousValue === 0
    ? undefined
    : ((metric.value - metric.previousValue) / Math.abs(metric.previousValue)) * 100;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{metric.label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{formatMetric(metric.value, metric.unit)}</p>
      {change !== undefined && (
        <p className={`mt-3 text-sm font-medium ${change >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
          {change >= 0 ? "+" : ""}{change.toFixed(1)}% к прошлому периоду
        </p>
      )}
    </article>
  );
}
