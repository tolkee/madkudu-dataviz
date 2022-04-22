import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Text } from "@chakra-ui/react";

import useDocTitle from "../hooks/useDocTitle";

interface LayoutProps {
  title: string;
}

const LayoutWrapper = styled.div`
  width: 100vw;
  margin: 10px;
`;

function Layout({ title, children }: PropsWithChildren<LayoutProps>) {
  useDocTitle(title);

  return (
    <LayoutWrapper>
      <Text fontWeight="bold" fontSize="4xl">
        {title}
      </Text>
      {children}
    </LayoutWrapper>
  );
}

export default Layout;
