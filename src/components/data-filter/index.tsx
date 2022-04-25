import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Text } from "@chakra-ui/react";

import { useStores } from "../../stores";
import CheckBoxFilter from "./CheckBoxFilter";
import RangeFilter from "./RangeFilter";

const DataFilterWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const FilterTitle = styled(Text).attrs({
  fontSize: "lg",
  fontWeight: "bold",
  marginTop: 4,
})``;

function DataFilter() {
  const { dataStore } = useStores();

  const { continents, horns, weightRange, heightRange } = dataStore.filters;

  return (
    <DataFilterWrapper>
      <FilterTitle>Continents</FilterTitle>
      <CheckBoxFilter
        checkBoxs={dataStore.continents}
        state={continents}
        onStateChange={(newState) =>
          dataStore.updateFilters({ continents: newState })
        }
      />
      <FilterTitle>Horns</FilterTitle>
      <CheckBoxFilter
        checkBoxs={dataStore.horns}
        state={horns}
        onStateChange={(newState) =>
          dataStore.updateFilters({ horns: newState })
        }
      />
      <FilterTitle>Weight</FilterTitle>
      <RangeFilter
        label="weight"
        range={dataStore.weightRange}
        value={weightRange}
        onValueChange={(newValue) => {
          dataStore.updateFilters({ weightRange: newValue });
        }}
      />
      <FilterTitle>Height</FilterTitle>
      <RangeFilter
        label="height"
        range={dataStore.heightRange}
        value={heightRange}
        onValueChange={(newValue) => {
          dataStore.updateFilters({ heightRange: newValue });
        }}
      />
    </DataFilterWrapper>
  );
}

export default observer(DataFilter);
