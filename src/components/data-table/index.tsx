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

import { useStores } from "../../stores";
import DataTableLine from "./DataTableLine";
import Loader from "../Loader";

interface DataTableProps {
  kuduPinned?: boolean;
}

const TextCaptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function DataTable({ kuduPinned }: DataTableProps) {
  const { dataStore } = useStores();

  const {
    kudu,
    isError,
    isLoading,
    antelopesFiltered,
    antelopesFilteredWithoutKudu,
  } = dataStore;

  const antelopesData = kuduPinned
    ? antelopesFilteredWithoutKudu
    : antelopesFiltered;

  return (
    <Box borderWidth="1px" borderRadius="lg">
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
            {kudu && kuduPinned && (
              <DataTableLine
                key={kudu.name + kudu.horns + kudu.continent}
                antelope={kudu}
                isHighlighted
              />
            )}
            {antelopesData.map((ant) => (
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

DataTable.defaultProps = {
  kuduPinned: false,
};

export default observer(DataTable);
