export interface MetricValue {
  value: number;
  formatted?: string;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface SelectOption {
  label: string;
  value: string;
}
