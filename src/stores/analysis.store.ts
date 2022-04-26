import { action, makeObservable } from "mobx";

import DataStore from "./data.store";
import { DataField, ChartSchema, ChartData, ChartInfo } from "../types/chart";
import { getNbOfAntPerValueForAField } from "../utils";
import Settings from "./settings";

export default class AnalysisStore {
  dataStore: DataStore;
  charts: ChartSchema[] = Settings.initialCharts;

  constructor(dataStore: DataStore) {
    this.dataStore = dataStore;
    makeObservable(this, {
      addChart: action,
    });
  }

  // way to long function to compute data for a Chart Bar (hopefully in a real project, we could do that in SQL)
  private computeLineBarChartData(chart: ChartSchema): ChartInfo {
    const dataForChart: ChartData[] = [];
    let labels: string[] = [];

    if (chart.dataTwo && chart.dataOne !== chart.dataTwo) {
      // Case of Chart based on two data
      // Analyse the data
      // ex: {Asia: {Twisted: 4, Straight: 2,...}, Africa: {...}, ....}
      const data: Map<string, Map<string, number>> = new Map();
      this.dataStore.antelopes.forEach((ant) => {
        const dataTwo = chart.dataTwo as DataField;
        const antFieldX = ant[chart.dataOne];
        const antFieldY = ant[dataTwo];

        if (!data.has(antFieldX)) {
          data.set(antFieldX, new Map([[antFieldY, 1]]));
        } else {
          const currVal = data.get(antFieldX)?.get(antFieldY);
          data.get(antFieldX)?.set(antFieldY, (currVal || 0) + 1);
        }
      });

      // Transform data in a format readable by the charts
      data.forEach((val, key) => {
        const d: ChartData = { name: key };
        val.forEach((valY, keyY) => {
          d[keyY] = valY;
        });
        dataForChart.push(d);
      });

      labels =
        chart.dataTwo === "continent"
          ? this.dataStore.continents
          : this.dataStore.horns;
    } else {
      // Case of Chart based on one data
      // Analyse the data
      // ex: {Africa: 20, Asia: 5, ...}
      const data: Map<string, number> = new Map();
      this.dataStore.antelopes.forEach((ant) => {
        const antFieldX = ant[chart.dataOne];

        if (!data.has(antFieldX)) {
          data.set(antFieldX, 1);
        } else {
          const currVal = data.get(antFieldX);

          data.set(antFieldX, (currVal || 0) + 1);
        }
      });

      // Transform data in a format readable by the charts
      data.forEach((val, key) => {
        dataForChart.push({ name: key, [chart.dataOne]: val });
      });

      labels = [chart.dataOne];
    }

    return { data: dataForChart, labels };
  }

  private computePieChartData(chart: ChartSchema): ChartInfo {
    const counts = getNbOfAntPerValueForAField(
      this.dataStore.antelopes,
      chart.dataOne
    );

    return {
      labels: [chart.dataOne],
      data: Object.keys(counts).map((key) => {
        return { name: key, value: counts[key] };
      }),
    };
  }

  computeChartData(chart: ChartSchema) {
    switch (chart.type) {
      case "bar":
        return this.computeLineBarChartData(chart);
      case "line":
        return this.computeLineBarChartData(chart);
      case "pie":
        return this.computePieChartData(chart);
      default:
        return this.computeLineBarChartData(chart);
    }
  }

  /* ---- Observable modifiers ----- */

  addChart(chart: ChartSchema) {
    this.charts.unshift(chart);
  }
}
