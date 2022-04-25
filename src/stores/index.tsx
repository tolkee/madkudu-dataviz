import React, { useMemo } from "react";
import AnalysisStore from "./analysis.store";
import DataStore from "./data.store";

export default class Stores {
  dataStore: DataStore;
  analysisStore: AnalysisStore;

  constructor() {
    this.dataStore = new DataStore();
    this.analysisStore = new AnalysisStore(this.dataStore);
  }
}

const storesContext = React.createContext<Stores | null>(null);

// Use this provider to be able to call useStores hook
export function StoresProvider({ children }: { children: React.ReactNode }) {
  const stores = useMemo(() => new Stores(), []);

  return (
    <storesContext.Provider value={stores}>{children}</storesContext.Provider>
  );
}

// Use that hook to access the stores from a component
export function useStores() {
  const stores = React.useContext(storesContext);

  if (!stores) {
    throw new Error("Need to use stores provider");
  }
  return stores;
}
