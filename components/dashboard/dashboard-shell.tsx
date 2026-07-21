"use client";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { ManagersTable } from "@/components/dashboard/managers-table";
import { MetricsChart } from "@/components/dashboard/metrics-chart";
import { PeriodFilter } from "@/components/dashboard/period-filter";
import type { DashboardOverview } from "@/types/analytics";

interface DashboardShellProps { overview: DashboardOverview; }

export function DashboardShell({ overview }: DashboardShellProps) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <header className="flex flex-col gap-5 rounded-2xl bg-slate-950 px-6 py-7 text-white shadow-xl sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-300">RG Analytics</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Обзор эффективности</h1>
          <p className="mt-2 text-sm text-slate-300">Источник: {overview.source} · обновлено {new Date(overview.updatedAt).toLocaleString("ru-RU")}</p>
        </div>
        <PeriodFilter />
      </header>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{overview.metrics.map((metric) => <KpiCard key={metric.key} metric={metric} />)}</section>
      <MetricsChart metrics={overview.metrics} trend={overview.trend} />
      <ManagersTable managers={overview.managers} metrics={overview.metrics} />
    </div>
  );
}
