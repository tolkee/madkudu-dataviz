import { observer } from "mobx-react-lite";
import styled from "styled-components";
import {
  Text,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { useDataStore } from "../../stores/dataStore";
import Loader from "../Loader";
import DataTableLine from "./DataTableLine";

const TextCaptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
function DataTable() {
  const dataStore = useDataStore();

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>
          {dataStore.isLoading ? (
            <Loader text="Fetching antelopes species..." />
          ) : (
            <TextCaptionWrapper>
              <Text>Antelopes species data</Text>
              {dataStore.isError && (
                <Text color="red.500">
                  An error happened during data fetch !
                </Text>
              )}
            </TextCaptionWrapper>
          )}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Continent</Th>
            <Th>Horns</Th>
            <Th>Weight</Th>
            <Th>Height</Th>
            <Th>Picture</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataStore.antelopes.map((ant) => (
            <DataTableLine
              key={ant.name + ant.horns + ant.continent}
              antelope={ant}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default observer(DataTable);
