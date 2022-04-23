import { observer } from "mobx-react-lite";

import DataTable from "../components/data-table/DataTable";
import Layout from "../components/Layout";

function HomePage() {
  return (
    <Layout
      title="MadKudu DataViz"
      description="Learn more about antelopes species !"
    >
      <DataTable />
    </Layout>
  );
}

export default observer(HomePage);
