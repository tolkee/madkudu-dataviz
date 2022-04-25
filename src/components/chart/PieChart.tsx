import {
  ResponsiveContainer,
  PieChart as RCPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { ChartData } from "../../types/chart";

interface PieChartProps {
  data: ChartData[];
}

function PieChart({ data }: PieChartProps) {
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
          {data.map((index) => (
            <Cell
              key={`cell-${index}`}
              fill={`hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`}
            />
          ))}
        </Pie>
      </RCPieChart>
    </ResponsiveContainer>
  );
}

export default PieChart;
