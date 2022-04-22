import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Text } from "@chakra-ui/react";

import { useDataStore } from "../stores/dataStore";
import Layout from "../components/Layout";

function HomePage() {
  const dataStore = useDataStore();

  // fetch antelopes data from the API when the Page is mounted (letting dephs array empty to simulate componentDidMount)
  useEffect(() => {
    dataStore.fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="MadKudu DataViz">
      <Text>{JSON.stringify(dataStore.antelopes)}</Text>
    </Layout>
  );
}

export default observer(HomePage);
