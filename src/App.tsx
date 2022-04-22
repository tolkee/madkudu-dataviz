import { ChakraProvider } from "@chakra-ui/react";
import { Route } from "wouter";

import AnalysisPage from "./pages/AnalysisPage";
import HomePage from "./pages/HomePage";
import { DataStoreProvider } from "./stores/dataStore";

function App() {
  return (
    <ChakraProvider>
      <DataStoreProvider>
        <Route path="/" component={HomePage} />
        <Route path="/analysis" component={AnalysisPage} />
      </DataStoreProvider>
    </ChakraProvider>
  );
}

export default App;
