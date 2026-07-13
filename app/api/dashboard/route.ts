import { NextResponse } from "next/server";
import { downloadDashboardCSV } from "../../lib/google";
import { parseDashboard } from "../../lib/parser";

export async function GET() {
  try {
    const csv = await downloadDashboardCSV();

    const dashboard = parseDashboard(csv);

    return NextResponse.json(dashboard);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Ошибка загрузки Dashboard",
      },
      {
        status: 500,
      }
    );
  }
}