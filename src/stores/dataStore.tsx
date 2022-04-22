import React, { useMemo } from "react";

import axios from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";
import { Antelopes } from "./types";

const DATA_URL =
  "https://work-sample-mk-fs.s3-us-west-2.amazonaws.com/species.json";

export default class DataStore {
  antelopes: Antelopes[] = [];

  loading: boolean = false;

  error: boolean = false;

  constructor() {
    makeObservable(this, {
      antelopes: observable,
      error: observable,
      loading: observable,
      fetchData: action,
    });
  }

  async fetchData() {
    this.error = false;
    this.loading = true;
    try {
      const datas = await axios.get<Antelopes[]>(DATA_URL);
      runInAction(() => {
        this.antelopes = datas.data;
      });
    } catch (error) {
      this.error = true;
    }
    this.loading = false;
  }
}

export const dataStoreContext = React.createContext<DataStore | null>(null);

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
