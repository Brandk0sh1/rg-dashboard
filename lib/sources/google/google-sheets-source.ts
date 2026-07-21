import type { DashboardDataset, Manager, Snapshot } from "@/types/analytics";
import { parse } from "papaparse";
import type { DashboardDatasetSource } from "@/lib/sources/dataset-source";
import { parseFiniteNumber } from "@/lib/parser/number";
import type { GoogleSheetsCsvConfig } from "@/lib/sources/google/google-sheets.types";

type CsvRow = Record<string, string>;

export class GoogleSheetsSource implements DashboardDatasetSource {
  constructor(private readonly config: GoogleSheetsCsvConfig) {}

  async load(): Promise<DashboardDataset> {
    const response = await fetch(this.getCsvUrl(), { next: { revalidate: 300 } });

    if (!response.ok) {
      throw new Error(`Unable to load Google Sheets CSV: ${response.status} ${response.statusText}`);
    }

    const rows = parseCsv(await response.text());
    const managers = new Map<string, Manager>();
    const snapshots = rows.map((row, index) => this.toSnapshot(row, index, managers));

    return {
      source: this.config.source ?? "google-sheets",
      generatedAt: new Date(),
      metrics: Object.entries(this.config.columns.metrics).map(([key, definition]) => ({
        key,
        label: definition.label,
        unit: definition.unit ?? "count",
        aggregation: definition.aggregation,
      })),
      managers: [...managers.values()],
      snapshots,
    };
  }

  private getCsvUrl(): string {
    const params = new URLSearchParams({ tqx: "out:csv" });

    if (this.config.sheetId) {
      params.set("gid", this.config.sheetId);
    }

    return `https://docs.google.com/spreadsheets/d/${this.config.spreadsheetId}/gviz/tq?${params}`;
  }

  private toSnapshot(row: CsvRow, index: number, managers: Map<string, Manager>): Snapshot {
    const { columns } = this.config;
    const managerId = requiredCell(row, columns.managerId);
    const managerName = requiredCell(row, columns.managerName);
    const occurredAt = new Date(requiredCell(row, columns.occurredAt));

    if (Number.isNaN(occurredAt.getTime())) {
      throw new TypeError(`Invalid date in column "${columns.occurredAt}" at row ${index + 2}.`);
    }

    managers.set(managerId, { id: managerId, name: managerName });

    return {
      id: columns.snapshotId ? requiredCell(row, columns.snapshotId) : `${managerId}:${occurredAt.toISOString()}`,
      occurredAt,
      managerId,
      values: Object.fromEntries(
        Object.entries(columns.metrics).map(([key, definition]) => [
          key,
          parseFiniteNumber(requiredCell(row, definition.column)),
        ]),
      ),
    };
  }
}

function requiredCell(row: CsvRow, column: string): string {
  const value = row[column]?.trim();

  if (!value) {
    throw new TypeError(`Required Google Sheets column "${column}" is missing or empty.`);
  }

  return value;
}

function parseCsv(csv: string): CsvRow[] {
  const result = parse<CsvRow>(csv, { header: true, skipEmptyLines: "greedy" });

  if (result.errors.length > 0) {
    const [error] = result.errors;
    throw new TypeError(`Unable to parse Google Sheets CSV: ${error?.message ?? "unknown error"}.`);
  }

  return result.data;
}
