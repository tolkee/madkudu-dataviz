import { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import { Box, Text } from "@chakra-ui/react";

import { useStores } from "../../stores";
import { ChartType, ChartSchema } from "../../types/chart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import Loader from "../Loader";

interface ChartProps {
  chart: ChartSchema;
  width?: string;
}

function Chart({ chart, width }: ChartProps) {
  const { analysisStore, dataStore } = useStores();

  const { data, labels } = analysisStore.computeChartData(chart);
  const { type, title, stacked } = chart;

  const ChartByType: { [x in ChartType]: ReactNode } = {
    bar: (
      <BarChart
        key={type + title}
        bars={labels}
        data={data}
        stacked={stacked}
      />
    ),
    pie: <PieChart key={type + title} data={data} />,
    line: <LineChart key={type + title} lines={labels} data={data} />,
  };

  return (
    <Box borderWidth="1px" borderRadius="xl" p="6" width={width}>
      <Text marginBottom={2} fontSize="lg" fontWeight="semibold">
        {title}
      </Text>
      {dataStore.isLoading ? (
        <Loader text="Fetching antelopes species..." />
      ) : (
        <>
          {dataStore.isError && (
            <Text color="red.500">An error happened during data fetch !</Text>
          )}
          {ChartByType[type]}
        </>
      )}
    </Box>
  );
}

Chart.defaultProps = {
  width: "100%",
};

export default observer(Chart);
