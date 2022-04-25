import { action, computed, makeObservable, observable } from "mobx";
import axios from "axios";

import { Antelope, Filters, NumberRange, SORTS } from "../types/data";
import {
  getRangeFromArray,
  inRange,
  isolateFieldInArray,
  sortAntelopesArray,
} from "./utils";

const DATA_URL =
  "https://work-sample-mk-fs.s3-us-west-2.amazonaws.com/species.json";

const DEFAULT_FILTERS: Filters = {
  continents: [],
  horns: [],
  weightRange: { min: 0, max: 0 },
  heightRange: { min: 0, max: 0 },
};

export default class DataStore {
  antelopes: Antelope[] = [];
  isLoading = false;
  isError = false;
  filters: Filters = DEFAULT_FILTERS;
  sortBy: SORTS = SORTS.NAME_A;

  constructor() {
    makeObservable(this, {
      antelopes: observable,
      isError: observable,
      isLoading: observable,
      filters: observable,
      sortBy: observable,
      kudu: computed,
      antelopesFiltered: computed,
      continents: computed,
      horns: computed,
      weightRange: computed,
      heightRange: computed,
      setAntelopes: action,
      setIsLoading: action,
      setIsError: action,
      setSortBy: action,
      updateFilters: action,
    });

    this.fetchData().then(() => {
      this.updateFilters(this.defaultFilters);
    });
  }

  async fetchData() {
    this.setIsError(false);
    this.setIsLoading(true);

    try {
      const { data: antelopes } = await axios.get<Antelope[]>(DATA_URL);
      this.setAntelopes(antelopes);
    } catch (error) {
      this.setIsError(true);
    }

    this.setIsLoading(false);
  }

  /* ---- Computed Values ----- */

  get kudu(): Antelope | null {
    return (
      this.antelopes.find((ant) =>
        ant.name.toLocaleLowerCase().includes("kudu")
      ) || null
    );
  }

  get antelopesFiltered(): Antelope[] {
    const antelopesFiltered = this.antelopes.filter(
      (ant) =>
        this.filters.continents?.includes(ant.continent) &&
        this.filters.horns?.includes(ant.horns) &&
        inRange(ant.height, this.filters.heightRange) &&
        inRange(ant.weight, this.filters.weightRange)
    );

    return sortAntelopesArray(antelopesFiltered, this.sortBy);
  }

  get antelopesFilteredWithoutKudu(): Antelope[] {
    return this.antelopesFiltered.filter(
      (ant) => !ant.name.toLocaleLowerCase().includes("kudu")
    );
  }

  get continents(): string[] {
    return isolateFieldInArray<Antelope, "continent">(
      this.antelopes,
      "continent"
    );
  }

  get horns(): string[] {
    return isolateFieldInArray<Antelope, "horns">(this.antelopes, "horns");
  }

  get weightRange(): NumberRange {
    const weights = isolateFieldInArray<Antelope, "weight">(
      this.antelopes,
      "weight"
    );

    return getRangeFromArray(weights);
  }

  get heightRange(): NumberRange {
    const heights = isolateFieldInArray<Antelope, "height">(
      this.antelopes,
      "height"
    );

    return getRangeFromArray(heights);
  }

  get defaultFilters(): Filters {
    return {
      continents: this.continents,
      horns: this.horns,
      weightRange: this.weightRange,
      heightRange: this.heightRange,
    };
  }

  /* ---- Observable modifiers ----- */

  setAntelopes(antelopes: Antelope[]) {
    this.antelopes = antelopes;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsError(isError: boolean) {
    this.isError = isError;
  }

  setSortBy(sortBy: SORTS) {
    this.sortBy = sortBy;
  }

  updateFilters(filters: Partial<Filters>) {
    this.filters = { ...this.filters, ...filters };
  }
}
