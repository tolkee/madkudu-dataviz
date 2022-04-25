import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Plus } from "react-feather";
import { Button, useBreakpointValue, useDisclosure } from "@chakra-ui/react";

import { useStores } from "../stores";
import { Chart, ChartMakerModal, Layout } from "../components";

const ChartsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin-right: -40px;
  margin-bottom: -40px;
`;

const ChartWrapper = styled.div<{ widhtWithBP: string }>`
  width: ${(p) => p.widhtWithBP};

  margin-right: 40px;
  margin-bottom: 40px;
`;

function AnalysisPage() {
  const { analysisStore } = useStores();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const chartWidth =
    useBreakpointValue({ base: "100%", lg: "100%", xl: "40%" }) || "100%";

  return (
    <Layout
      title="Analysis"
      description="Analyse antelope species with charts !"
    >
      <Button
        marginBottom={7}
        leftIcon={<Plus />}
        colorScheme="linkedin"
        onClick={onOpen}
        width="fit-content"
      >
        Create your Chart
      </Button>
      <ChartsWrapper>
        {analysisStore.charts.map((c) => (
          <ChartWrapper key={c.title + c.type} widhtWithBP={chartWidth}>
            <Chart chart={c} />
          </ChartWrapper>
        ))}
      </ChartsWrapper>
      <ChartMakerModal isOpen={isOpen} onClose={onClose} />
    </Layout>
  );
}

export default observer(AnalysisPage);
