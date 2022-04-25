import React from "react";
import ReactDOM from "react-dom";
import { Route } from "wouter";
import { ChakraProvider } from "@chakra-ui/react";

import { StoresProvider } from "./stores";
import { AnalysisPage, HomePage } from "./pages";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <StoresProvider>
        <Route path="/" component={HomePage} />
        <Route path="/analysis" component={AnalysisPage} />
      </StoresProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
