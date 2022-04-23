import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Text, useBreakpointValue, Link } from "@chakra-ui/react";
import { Link as WouterLink } from "wouter";

import useDocTitle from "../hooks/useDocTitle";

interface LayoutProps {
  title: string;
  description: string;
}

const LayoutWrapper = styled.div<{ paddingLR: string }>`
  width: 100vw;
  padding-left: ${(p) => p.paddingLR};
  padding-right: ${(p) => p.paddingLR};
  padding-top: 2%;
`;

function Layout({
  title,
  description,
  children,
}: PropsWithChildren<LayoutProps>) {
  useDocTitle(title);

  // get padding right and left of the layout depending on breakpoint
  const paddingLR = useBreakpointValue({ base: "3%", lg: "10%" }) || "10%";

  return (
    <LayoutWrapper paddingLR={paddingLR}>
      <Link as={WouterLink} to="/" color="blue.500">
        Home
      </Link>
      <Link as={WouterLink} to="/analysis" marginLeft="5" color="blue.500">
        Analysis
      </Link>
      <Text fontWeight="bold" fontSize="4xl">
        {title}
      </Text>
      <Text fontSize="lg" paddingBottom="6">
        {description}
      </Text>
      {children}
    </LayoutWrapper>
  );
}

export default Layout;
