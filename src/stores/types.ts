export interface Antelope {
  name: string;
  continent: string;
  horns: string;
  weight: number;
  height: number;
  picture: string;
}

export interface NumberRange {
  min: number;
  max: number;
}

export interface Filters {
  continents: string[];
  horns: string[];
  weightRange: NumberRange;
  heightRange: NumberRange;
}

export enum SORTS {
  WEIGHT_L_H = "(Weight) Low to High",
  WEIGHT_H_L = "(Weight) High to Low",
  HEIGHT_L_H = "(Height) Low to High",
  HEIGHT_H_L = "(Height) High to Low",
  NAME_A = "(Name) Alphabetical",
}
