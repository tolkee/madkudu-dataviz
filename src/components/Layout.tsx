import { PropsWithChildren } from "react";
import { Link as WouterLink } from "wouter";
import styled from "styled-components";
import { Text, useBreakpointValue, Link } from "@chakra-ui/react";

import useDocTitle from "../hooks/useDocTitle";
import FlexDivider from "./FlexDivider";

interface LayoutProps {
  title: string;
  description: string;
}

const LayoutWrapper = styled.div<{ paddingLR: string }>`
  display: flex;
  flex-direction: column;

  width: 100vw;
  max-width: 100%;

  padding-left: ${(p) => p.paddingLR};
  padding-right: ${(p) => p.paddingLR};
  padding-top: 2%;
  padding-bottom: 2%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 60px;

  margin-top: 30px;
`;

const Nav = styled.div``;

function Layout({
  title,
  description,
  children,
}: PropsWithChildren<LayoutProps>) {
  useDocTitle(title);

  // get padding right and left of the layout depending on breakpoint
  const paddingLR = useBreakpointValue({ base: "4%", xl: "10%" }) || "10%";

  return (
    <LayoutWrapper paddingLR={paddingLR}>
      <Nav>
        <Link as={WouterLink} to="/" color="blue.500">
          Home
        </Link>
        <Link as={WouterLink} to="/analysis" marginLeft="5" color="blue.500">
          Analysis
        </Link>
      </Nav>
      <Text fontWeight="bold" fontSize="4xl" marginTop="3">
        {title}
      </Text>
      <Text fontSize="lg" marginBottom="5">
        {description}
      </Text>
      {children}
      <FlexDivider />
      <Footer>
        <Text textAlign="center" marginTop="" color="gray.400">
          Made with 💛 by{" "}
          <Link href="https://github.com/tolkee" isExternal>
            Tolkee
          </Link>
        </Text>
      </Footer>
    </LayoutWrapper>
  );
}

export default Layout;
