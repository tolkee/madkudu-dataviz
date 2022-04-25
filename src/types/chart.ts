import { Antelope } from "./data";

export type DataField = keyof Pick<Antelope, "continent" | "horns">;

export type ChartType = "bar" | "line" | "pie";

export interface ChartSchema {
  title: string;
  type: ChartType;
  dataOne: DataField;
  dataTwo?: DataField;
  stacked?: boolean;
}

export interface ChartData {
  [barLabel: string]: number | string;
  name: string;
}

export interface ChartInfo {
  labels: string[];
  data: ChartData[];
}
