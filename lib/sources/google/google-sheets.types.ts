import type { AnalyticsSource, MetricAggregation, MetricUnit } from "@/types/analytics";

export interface GoogleSheetsMetricColumn {
  column: string;
  label: string;
  unit?: MetricUnit;
  aggregation?: MetricAggregation;
}

export interface GoogleSheetsCsvConfig {
  spreadsheetId: string;
  sheetId?: string;
  sheetName?: string;
  source?: Extract<AnalyticsSource, "google-sheets">;
  mapping: {
    occurredAt: string;
    managerId: string;
    managerName: string;
    snapshotId?: string;
    metrics: Record<string, GoogleSheetsMetricColumn>;
  };
}
