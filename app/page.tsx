import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getDashboardOverview } from "@/lib/analytics/dashboard-service";
import { MockDashboardSource } from "@/lib/sources/mock/mock-dashboard-source";

export default async function HomePage() {
  const dataset = await new MockDashboardSource().load();
  const overview = getDashboardOverview(dataset);

  return (
    <main className="flex flex-1 bg-zinc-50 p-6 dark:bg-zinc-950 sm:p-10">
      <DashboardShell overview={overview} />
    </main>
  );
}
