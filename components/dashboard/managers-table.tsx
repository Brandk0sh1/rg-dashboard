import { formatMetric } from "@/components/dashboard/metric-format";
import type { DashboardManagerRow, DashboardMetric } from "@/types/analytics";

interface ManagersTableProps { managers: DashboardManagerRow[]; metrics: DashboardMetric[]; }

export function ManagersTable({ managers, metrics }: ManagersTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-950">Менеджеры</h2>
        <p className="mt-1 text-sm text-slate-500">Актуальные показатели по каждому менеджеру</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>
            <th className="px-5 py-3 font-medium sm:px-6">Менеджер</th>
            {metrics.map((metric) => <th className="px-5 py-3 font-medium" key={metric.key}>{metric.label}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-slate-100">
            {managers.map((manager) => <tr className="text-slate-700" key={manager.id}>
              <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-950 sm:px-6">{manager.name}</td>
              {metrics.map((metric) => <td className="whitespace-nowrap px-5 py-4" key={metric.key}>{formatMetric(manager.values[metric.key] ?? 0, metric.unit)}</td>)}
            </tr>)}
          </tbody>
        </table>
      </div>
    </section>
  );
}
