import { useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Crosshair, Filter } from "react-feather";
import { Button, IconButton, Select } from "@chakra-ui/react";

import { SORTS } from "../stores/types";
import { useDataStore } from "../stores/dataStore";
import DataTable from "../components/data-table";
import DataFilter from "../components/data-filter";
import Layout from "../components/Layout";
import FlexDivider from "../components/FlexDivider";

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
`;

function HomePage() {
  const dataStore = useDataStore();
  const [filterShowed, setFilterShowed] = useState(false);
  const [kuduPinned, setKuduPinned] = useState(false);

  return (
    <Layout
      title="MadKudu DataViz"
      description="Learn more about antelope species !"
    >
      <IconsWrapper>
        <IconButton
          aria-label="show-data-filter"
          icon={<Filter />}
          onClick={() => setFilterShowed((prev) => !prev)}
          colorScheme={filterShowed ? "blue" : "gray"}
        />
        <Button
          aria-label="pin-kudu"
          leftIcon={<Crosshair />}
          onClick={() => setKuduPinned((prev) => !prev)}
          colorScheme={kuduPinned ? "blue" : "gray"}
          marginLeft={5}
        >
          Kudu
        </Button>
        <FlexDivider />
        <Select
          onChange={(e) => {
            dataStore.setSortBy(e.currentTarget.value as SORTS);
          }}
          value={dataStore.sortBy}
          w="fit-content"
        >
          <option value={SORTS.NAME_A}>{SORTS.NAME_A}</option>
          <option value={SORTS.WEIGHT_L_H}>{SORTS.WEIGHT_L_H}</option>
          <option value={SORTS.WEIGHT_H_L}>{SORTS.WEIGHT_H_L}</option>
          <option value={SORTS.HEIGHT_L_H}>{SORTS.HEIGHT_L_H}</option>
          <option value={SORTS.HEIGHT_H_L}>{SORTS.HEIGHT_H_L}</option>
        </Select>
      </IconsWrapper>
      {filterShowed && <DataFilter />}
      <DataTable kuduPinned={kuduPinned} />
    </Layout>
  );
}

export default observer(HomePage);
