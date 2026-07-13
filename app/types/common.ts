export interface MetricValue {
  value: number;
  formatted?: string;
}

export interface Period {
  from: Date;
  to: Date;
}

export interface Option {
  label: string;
  value: string;
}