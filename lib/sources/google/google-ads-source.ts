import type { DataSource } from "@/lib/engine/contracts";
import type { ReportQuery } from "@/lib/engine/query";
import type { GoogleAdsReportRow } from "@/types/google";

export class GoogleAdsSource implements DataSource<ReportQuery, GoogleAdsReportRow[]> {
  async execute(query: ReportQuery): Promise<GoogleAdsReportRow[]> {
    // Integration boundary: credentials and transport are added here, not in UI.
    void query;
    return [];
  }
}
