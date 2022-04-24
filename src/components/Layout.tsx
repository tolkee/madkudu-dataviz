import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Link as WouterLink } from "wouter";
import { Text, useBreakpointValue, Link } from "@chakra-ui/react";

import useDocTitle from "../hooks/useDocTitle";

interface LayoutProps {
  title: string;
  description: string;
}

const LayoutWrapper = styled.div<{ paddingLR: string }>`
  width: 100vw;
  max-width: 100%;
  padding-left: ${(p) => p.paddingLR};
  padding-right: ${(p) => p.paddingLR};
  padding-top: 2%;
  padding-bottom: 2%;
`;

function Layout({
  title,
  description,
  children,
}: PropsWithChildren<LayoutProps>) {
  useDocTitle(title);

  // get padding right and left of the layout depending on breakpoint
  const paddingLR = useBreakpointValue({ base: "4%", lg: "10%" }) || "10%";

  return (
    <LayoutWrapper paddingLR={paddingLR}>
      <Link as={WouterLink} to="/" color="blue.500">
        Home
      </Link>
      <Link as={WouterLink} to="/analysis" marginLeft="5" color="blue.500">
        Analysis
      </Link>
      <Text fontWeight="bold" fontSize="4xl" marginTop="3">
        {title}
      </Text>
      <Text fontSize="lg" marginBottom="5">
        {description}
      </Text>
      {children}
    </LayoutWrapper>
  );
}

export default Layout;
