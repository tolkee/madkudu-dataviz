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
  Box,
} from "@chakra-ui/react";

import { useDataStore } from "../../stores/dataStore";
import DataTableLine from "./DataTableLine";
import Loader from "../Loader";

const TextCaptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
function DataTable() {
  const dataStore = useDataStore();

  const { kudu, isError, isLoading, antelopesWithoutKudu } = dataStore;
  return (
    <Box borderWidth="1px" borderRadius="lg" width="90%">
      <TableContainer>
        <Table variant="simple" size="md">
          <TableCaption>
            {isLoading ? (
              <Loader text="Fetching antelopes species..." />
            ) : (
              <TextCaptionWrapper>
                <Text>Antelopes species data</Text>
                {isError && (
                  <Text color="red.500">
                    An error happened during data fetch !
                  </Text>
                )}
              </TextCaptionWrapper>
            )}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Picture</Th>
              <Th>Name</Th>
              <Th>Continent</Th>
              <Th>Horns</Th>
              <Th isNumeric>Weight</Th>
              <Th isNumeric>Height</Th>
            </Tr>
          </Thead>
          <Tbody>
            {kudu && (
              <DataTableLine
                key={kudu.name + kudu.horns + kudu.continent}
                antelope={kudu}
                isHighlighted
              />
            )}
            {antelopesWithoutKudu.map((ant) => (
              <DataTableLine
                key={ant.name + ant.horns + ant.continent}
                antelope={ant}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default observer(DataTable);
