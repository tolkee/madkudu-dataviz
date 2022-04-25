import {
  CartesianGrid,
  LineChart as RCLineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import { ChartData } from "../../types/chart";

interface LineChartProps {
  data: ChartData[];
  lines: string[];
}

function LineChart({ data, lines }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RCLineChart
        data={data}
        margin={{
          left: -35,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map((line) => (
          <Line
            key={line}
            dataKey={line}
            stroke={`hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`}
          />
        ))}
      </RCLineChart>
    </ResponsiveContainer>
  );
}

export default LineChart;