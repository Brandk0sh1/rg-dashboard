export type AnalyticsSource = "google-sheets" | "mock";

export type MetricUnit = "count" | "currency" | "percent" | "custom";
export type MetricAggregation = "sum" | "average";

export interface Metric {
  key: string;
  label: string;
  unit: MetricUnit;
  aggregation?: MetricAggregation;
}

export interface Manager {
  id: string;
  name: string;
  attributes?: Record<string, string>;
}

export interface Snapshot {
  id: string;
  occurredAt: Date;
  managerId: string;
  values: Record<string, number>;
}

export interface DashboardDataset {
  source: AnalyticsSource;
  generatedAt: Date;
  metrics: Metric[];
  managers: Manager[];
  snapshots: Snapshot[];
}

export interface DashboardMetric {
  key: string;
  label: string;
  value: number;
  previousValue?: number;
  unit: MetricUnit;
}

export interface DashboardManagerRow {
  id: string;
  name: string;
  values: Record<string, number>;
}

export interface DashboardTrendPoint {
  timestamp: string;
  values: Record<string, number>;
}

export interface DashboardOverview {
  source: AnalyticsSource;
  updatedAt: string;
  managerCount: number;
  metrics: DashboardMetric[];
  managers: DashboardManagerRow[];
  trend: DashboardTrendPoint[];
}
