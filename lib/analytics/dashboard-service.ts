import type { DashboardDataset, DashboardOverview, Snapshot } from "@/types/analytics";

export function getDashboardOverview(dataset: DashboardDataset): DashboardOverview {
  const snapshotsByDate = groupByDate(dataset.snapshots);
  const [currentSnapshots = [], previousSnapshots = []] = snapshotsByDate;

  return {
    source: dataset.source,
    updatedAt: dataset.generatedAt.toISOString(),
    managerCount: dataset.managers.length,
    metrics: dataset.metrics.map((metric) => ({
      key: metric.key,
      label: metric.label,
      unit: metric.unit,
      value: aggregateMetric(currentSnapshots, metric.key, metric.aggregation),
      previousValue: previousSnapshots.length > 0
        ? aggregateMetric(previousSnapshots, metric.key, metric.aggregation)
        : undefined,
    })),
    managers: dataset.managers.map((manager) => {
      const currentSnapshot = currentSnapshots.find((snapshot) => snapshot.managerId === manager.id);

      return {
        id: manager.id,
        name: manager.name,
        values: Object.fromEntries(
          dataset.metrics.map((metric) => [metric.key, currentSnapshot?.values[metric.key] ?? 0]),
        ),
      };
    }),
    trend: groupByDate(dataset.snapshots)
      .reverse()
      .map((snapshots) => ({
        timestamp: snapshots[0]?.occurredAt.toISOString() ?? dataset.generatedAt.toISOString(),
        values: Object.fromEntries(
          dataset.metrics.map((metric) => [
            metric.key,
            aggregateMetric(snapshots, metric.key, metric.aggregation),
          ]),
        ),
      })),
  };
}

function groupByDate(snapshots: Snapshot[]): Snapshot[][] {
  const groups = new Map<string, Snapshot[]>();

  for (const snapshot of snapshots) {
    const key = snapshot.occurredAt.toISOString();
    groups.set(key, [...(groups.get(key) ?? []), snapshot]);
  }

  return [...groups.entries()]
    .sort(([left], [right]) => right.localeCompare(left))
    .map(([, snapshots]) => snapshots);
}

function aggregateMetric(
  snapshots: Snapshot[],
  metricKey: string,
  aggregation: "sum" | "average" = "sum",
): number {
  const values = snapshots.map((snapshot) => snapshot.values[metricKey] ?? 0);
  const total = values.reduce((sum, value) => sum + value, 0);

  return aggregation === "average" && values.length > 0 ? total / values.length : total;
}
