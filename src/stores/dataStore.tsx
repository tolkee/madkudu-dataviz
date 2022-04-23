import React, { useMemo } from "react";
import { action, computed, makeObservable, observable } from "mobx";
import axios from "axios";

import { Antelope } from "./types";

const DATA_URL =
  "https://work-sample-mk-fs.s3-us-west-2.amazonaws.com/species.json";

export default class DataStore {
  antelopes: Antelope[] = [];

  isLoading: boolean = false;

  isError: boolean = false;

  constructor() {
    makeObservable(this, {
      antelopes: observable,
      isError: observable,
      isLoading: observable,
      kudu: computed,
      antelopesWithoutKudu: computed,
      setAntelopes: action,
      setIsLoading: action,
      setIsError: action,
    });

    this.fetchData();
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

  get kudu(): Antelope | null {
    return (
      this.antelopes.find((ant) =>
        ant.name.toLocaleLowerCase().includes("kudu")
      ) || null
    );
  }

  get antelopesWithoutKudu(): Antelope[] {
    return this.antelopes.filter(
      (ant) => !ant.name.toLocaleLowerCase().includes("kudu")
    );
  }

  setAntelopes(antelopes: Antelope[]) {
    this.antelopes = antelopes;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsError(isError: boolean) {
    this.isError = isError;
  }
}

const dataStoreContext = React.createContext<DataStore | null>(null);

// Use this provider to be able to call useDataStore hook
export function DataStoreProvider({ children }: React.PropsWithChildren<{}>) {
  const dataStore = useMemo(() => new DataStore(), []);

  return (
    <dataStoreContext.Provider value={dataStore}>
      {children}
    </dataStoreContext.Provider>
  );
}

// Use that hook to access the dataStore from a component
export function useDataStore() {
  const dataStore = React.useContext(dataStoreContext);

  if (!dataStore) {
    throw new Error("Need to use dataStore provider");
  }
  return dataStore;
}
