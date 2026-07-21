"use client";

import type { DashboardMetric, DashboardTrendPoint } from "@/types/analytics";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface MetricsChartProps { metrics: DashboardMetric[]; trend: DashboardTrendPoint[]; }

const colors = ["#4f46e5", "#0891b2", "#16a34a", "#ea580c"];

export function MetricsChart({ metrics, trend }: MetricsChartProps) {
  const data = trend.map((point) => ({
    date: new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" }).format(new Date(point.timestamp)),
    ...point.values,
  }));

  return (
    <section className="min-h-96 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6"><h2 className="text-lg font-semibold text-slate-950">Динамика метрик</h2><p className="mt-1 text-sm text-slate-500">Сводные значения по всем менеджерам</p></div>
      <div className="h-72 w-full">
        <ResponsiveContainer height="100%" width="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
            <XAxis axisLine={false} dataKey="date" tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip contentStyle={{ borderColor: "#e2e8f0", borderRadius: 12 }} />
            {metrics.map((metric, index) => <Line activeDot={{ r: 5 }} dataKey={metric.key} dot={false} key={metric.key} name={metric.label} stroke={colors[index % colors.length]} strokeWidth={2.5} type="monotone" />)}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
