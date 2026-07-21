import type { GoogleSheetsCsvConfig } from "@/lib/sources/google/google-sheets.types";

export type DashboardSourceKey = "google-sheets" | "mock";

export interface DashboardConfig {
  source: DashboardSourceKey;
  googleSheets: GoogleSheetsCsvConfig;
}

const configuredSource = process.env.DASHBOARD_DATA_SOURCE;

export const dashboardConfig: DashboardConfig = {
  source: configuredSource === "google-sheets" ? "google-sheets" : "mock",
  googleSheets: {
    source: "google-sheets",
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID ?? "2PACX-1vQm59asRktGJKPGZGnfc7iCsckMI-Z64VjeGRFhZvDLCIHB0aj8rnICW_bLi1swS9YivKIxeGe4sshl",
    sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME ?? "Дашборд",
    gid: process.env.GOOGLE_SHEETS_GID ?? "0",
    mapping: {
      snapshotId: "snapshot_id",
      occurredAt: "date",
      managerId: "manager_id",
      managerName: "manager_name",
      metrics: {
        revenue: { column: "revenue", label: "Revenue", unit: "currency" },
        leads: { column: "leads", label: "Leads", unit: "count" },
        conversionRate: {
          column: "conversion_rate",
          label: "Conversion rate",
          unit: "percent",
          aggregation: "average",
        },
      },
    },
  },
};
