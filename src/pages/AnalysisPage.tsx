import { observer } from "mobx-react-lite";
import { Text } from "@chakra-ui/react";

import useDocTitle from "../hooks/useDocTitle";

function AnalysisPage() {
  useDocTitle("Analysis");

  return (
    <div>
      <Text fontWeight="bold" fontSize="4xl">
        Analysis
      </Text>
    </div>
  );
}

export default observer(AnalysisPage);
