import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { dashboardConfig } from "@/config/dashboard.config";
import { getDashboardOverview } from "@/lib/analytics/dashboard-service";
import { createDashboardSource } from "@/lib/sources/dashboard-source-factory";

export default async function HomePage() {
  const dataset = await createDashboardSource(dashboardConfig).load();
  const overview = getDashboardOverview(dataset);

  return (
    <main className="flex flex-1 bg-zinc-50 p-6 dark:bg-zinc-950 sm:p-10">
      <DashboardShell overview={overview} />
    </main>
  );
}
