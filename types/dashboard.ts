export interface SnapshotColumn {
  index: number;
  title: string;
  date: string;
  time: string;
}

export interface DashboardData {
  columns: SnapshotColumn[];
  rows: string[][];
}

export interface KPI {
  cards: number;
  sets: number;
  dialogs: number;
  answers: number;
  assigned: number;
}

export interface Manager {
  name: string;
  cards: number;
  sets: number;
  dialogs: number;
  answers: number;
  assigned: number;
}

export interface Snapshot {
  date: string;
  time: string;
  kpi: KPI;
  managers: Manager[];
}