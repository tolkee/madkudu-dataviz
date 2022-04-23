import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Text, useBreakpointValue } from "@chakra-ui/react";

import useDocTitle from "../hooks/useDocTitle";

interface LayoutProps {
  title: string;
}

const LayoutWrapper = styled.div<{ paddingLR: string }>`
  width: 100vw;
  height: 100vh;
  padding-left: ${(p) => p.paddingLR};
  padding-right: ${(p) => p.paddingLR};
`;

function Layout({ title, children }: PropsWithChildren<LayoutProps>) {
  useDocTitle(title);

  // get padding right and left of the layout depending on breakpoint
  const paddingLR = useBreakpointValue({ base: "3%", lg: "10%" }) || "10%";

  return (
    <LayoutWrapper paddingLR={paddingLR}>
      <Text fontWeight="bold" fontSize="4xl">
        {title}
      </Text>
      {children}
    </LayoutWrapper>
  );
}

export default Layout;
