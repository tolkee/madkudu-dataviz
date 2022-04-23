import { observer } from "mobx-react-lite";

import Layout from "../components/Layout";

function AnalysisPage() {
  return <Layout title="Analysis" description="Analyse antelopes species !" />;
}

export default observer(AnalysisPage);
