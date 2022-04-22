import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Text } from "@chakra-ui/react";

import useDocTitle from "../hooks/useDocTitle";
import { useDataStore } from "../stores/dataStore";

function HomePage() {
  useDocTitle("MadKudu DataViz");
  const dataStore = useDataStore();

  // fetch antelopes data from the API when the Page is mounted
  useEffect(() => {
    dataStore.fetchData();
  }, []);

  return (
    <div>
      <Text fontWeight="bold" fontSize="4xl">
        MadKudu DataViz
      </Text>
      <Text>{JSON.stringify(dataStore.antelopes)}</Text>
    </div>
  );
}

export default observer(HomePage);
