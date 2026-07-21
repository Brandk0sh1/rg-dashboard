import type { DashboardDataset } from "@/types/analytics";
import type { DashboardDatasetSource } from "@/lib/sources/dataset-source";

export class MockDashboardSource implements DashboardDatasetSource {
  async load(): Promise<DashboardDataset> {
    return {
      source: "mock",
      generatedAt: new Date("2026-07-21T09:00:00.000Z"),
      metrics: [
        { key: "revenue", label: "Revenue", unit: "currency" },
        { key: "leads", label: "Leads", unit: "count" },
        { key: "conversionRate", label: "Conversion rate", unit: "percent", aggregation: "average" },
      ],
      managers: [
        { id: "anna", name: "Anna Petrova" },
        { id: "maksim", name: "Maksim Ivanov" },
      ],
      snapshots: [
        { id: "anna-previous", managerId: "anna", occurredAt: new Date("2026-07-14T09:00:00.000Z"), values: { revenue: 124000, leads: 62, conversionRate: 3.1 } },
        { id: "maksim-previous", managerId: "maksim", occurredAt: new Date("2026-07-14T09:00:00.000Z"), values: { revenue: 98000, leads: 51, conversionRate: 2.8 } },
        { id: "anna-current", managerId: "anna", occurredAt: new Date("2026-07-21T09:00:00.000Z"), values: { revenue: 148000, leads: 71, conversionRate: 3.4 } },
        { id: "maksim-current", managerId: "maksim", occurredAt: new Date("2026-07-21T09:00:00.000Z"), values: { revenue: 112000, leads: 58, conversionRate: 3.0 } },
      ],
    };
  }
}
