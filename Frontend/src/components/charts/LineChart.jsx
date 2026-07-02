import {
  LineChart as RLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

        <XAxis
          dataKey="name"
          stroke="#64748b"
          tickLine={false}
          axisLine={false}
        />

        <YAxis stroke="#64748b" tickLine={false} axisLine={false} />

        <Tooltip
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            color: "#f8fafc",
          }}
        />

        <Line
          type="monotone"
          dataKey="onTime"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ fill: "#10b981", r: 4 }}
        />
      </RLineChart>
    </ResponsiveContainer>
  );
}