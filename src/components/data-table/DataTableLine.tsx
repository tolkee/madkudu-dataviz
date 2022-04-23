import { observer } from "mobx-react-lite";
import { Td, Tr, Image } from "@chakra-ui/react";

import { Antelope } from "../../stores/types";

interface DataTableLineProps {
  antelope: Antelope;
}

function DataTableLine({ antelope }: DataTableLineProps) {
  const { name, continent, horns, weight, height, picture } = antelope;
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{continent}</Td>
      <Td>{horns}</Td>
      <Td isNumeric>{weight}</Td>
      <Td isNumeric>{height}</Td>
      <Td>
        <Image src={picture} borderRadius="md" boxSize="16" objectFit="cover" />
      </Td>
    </Tr>
  );
}

export default observer(DataTableLine);
