import {
  ResponsiveContainer,
  PieChart as RCPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { ChartData } from "../../types/chart";
import useRandomColors from "../../hooks/useRandomColors";

interface PieChartProps {
  data: ChartData[];
}

function PieChart({ data }: PieChartProps) {
  const colors = useRandomColors(data.length);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RCPieChart width={400} height={400}>
        <Tooltip />
        <Legend />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((cell, index) => (
            <Cell key={`cell-${cell}`} fill={colors[index]} />
          ))}
        </Pie>
      </RCPieChart>
    </ResponsiveContainer>
  );
}

export default PieChart;
