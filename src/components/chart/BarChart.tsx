import {
  CartesianGrid,
  BarChart as RCBarchart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { ChartData } from "../../types/chart";

interface BarChartProps {
  data: ChartData[];
  bars: string[];
  stacked?: boolean;
}

function BarChart({ data, bars, stacked }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RCBarchart
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
        {bars.map((bar) => (
          <Bar
            key={bar}
            dataKey={bar}
            stackId={stacked ? "a" : undefined}
            fill={`hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`}
          />
        ))}
      </RCBarchart>
    </ResponsiveContainer>
  );
}

BarChart.defaultProps = {
  stacked: false,
};

export default BarChart;
