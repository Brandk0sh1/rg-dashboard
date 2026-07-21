import type { DashboardConfig } from "@/config/dashboard.config";
import type { DashboardDatasetSource } from "@/lib/sources/dataset-source";
import { GoogleSheetsSource } from "@/lib/sources/google/google-sheets-source";
import { MockDashboardSource } from "@/lib/sources/mock/mock-dashboard-source";

export function createDashboardSource(config: DashboardConfig): DashboardDatasetSource {
  if (config.source === "mock") {
    return new MockDashboardSource();
  }

  if (!config.googleSheets.spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is required for the google-sheets dashboard source.");
  }

  return new GoogleSheetsSource(config.googleSheets);
}
