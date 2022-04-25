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
import useRandomColors from "../../hooks/useRandomColors";

interface BarChartProps {
  data: ChartData[];
  bars: string[];
  stacked?: boolean;
}

function BarChart({ data, bars, stacked }: BarChartProps) {
  const colors = useRandomColors(bars.length);
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
        {bars.map((bar, index) => (
          <Bar
            key={bar}
            dataKey={bar}
            stackId={stacked ? "a" : undefined}
            fill={colors[index]}
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
