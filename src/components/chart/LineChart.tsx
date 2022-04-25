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
import useRandomColors from "../../hooks/useRandomColors";

interface LineChartProps {
  data: ChartData[];
  lines: string[];
}

function LineChart({ data, lines }: LineChartProps) {
  const colors = useRandomColors(lines.length);

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
        {lines.map((line, index) => (
          <Line key={line} dataKey={line} stroke={colors[index]} />
        ))}
      </RCLineChart>
    </ResponsiveContainer>
  );
}

export default LineChart;
