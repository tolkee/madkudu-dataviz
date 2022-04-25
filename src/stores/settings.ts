import { ChartSchema } from "../types/chart";
import { Filters, SORTS } from "../types/data";

interface Settings {
  dataUrl: string;
  defaultFilters: Filters;
  defaultSort: SORTS;
  initialCharts: ChartSchema[];
}

const settings: Settings = {
  dataUrl: "https://work-sample-mk-fs.s3-us-west-2.amazonaws.com/species.json",
  defaultFilters: {
    continents: [],
    horns: [],
    weightRange: { min: 0, max: 0 },
    heightRange: { min: 0, max: 0 },
  },
  defaultSort: SORTS.NAME_A,
  initialCharts: [
    {
      type: "pie",
      title: "Antelopes per continent",
      dataOne: "continent",
    },
    {
      type: "line",
      title: "Antelopes per horns",
      dataOne: "horns",
    },
    {
      type: "bar",
      title: "Antelopes by horns per continent",
      dataOne: "continent",
      dataTwo: "horns",
      stacked: true,
    },
    {
      type: "bar",
      title: "Antelopes by continent per horn",
      dataOne: "horns",
      dataTwo: "continent",
      stacked: false,
    },
  ],
};

export default settings;
