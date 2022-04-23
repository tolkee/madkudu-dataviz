import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Spinner, Text } from "@chakra-ui/react";

interface LoaderProps {
  text: string;
}

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Loader({ text }: LoaderProps) {
  return (
    <LoaderWrapper>
      <Spinner size="sm" marginBottom={5} color="grey.500" />
      <Text color="gray.500">{text}</Text>
    </LoaderWrapper>
  );
}

export default observer(Loader);
