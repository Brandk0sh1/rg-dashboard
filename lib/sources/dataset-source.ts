import type { DashboardDataset } from "@/types/analytics";

export interface DashboardDatasetSource {
  load(): Promise<DashboardDataset>;
}
