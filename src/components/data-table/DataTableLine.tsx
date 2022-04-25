import { observer } from "mobx-react-lite";
import { Td, Tr, Image, Tag } from "@chakra-ui/react";

import { Antelope } from "../../types/data";

interface DataTableLineProps {
  antelope: Antelope;
  isHighlighted?: boolean;
}

function DataTableLine({ antelope, isHighlighted }: DataTableLineProps) {
  const { name, continent, horns, weight, height, picture } = antelope;

  const color: string = isHighlighted ? "blue.500" : "";

  return (
    <Tr>
      <Td>
        <Image
          src={picture}
          borderRadius="md"
          boxSize={20}
          objectFit="cover"
          borderWidth={isHighlighted ? 2 : 0}
          borderColor={color}
          borderStyle="solid"
        />
      </Td>
      <Td>
        {isHighlighted ? (
          <Tag variant="solid" colorScheme="blue">
            {name}
          </Tag>
        ) : (
          name
        )}
      </Td>
      <Td color={color}>{continent}</Td>
      <Td color={color}>{horns}</Td>
      <Td color={color} isNumeric>
        {weight}
      </Td>
      <Td color={color} isNumeric>
        {height}
      </Td>
    </Tr>
  );
}

DataTableLine.defaultProps = {
  isHighlighted: false,
};

export default observer(DataTableLine);
