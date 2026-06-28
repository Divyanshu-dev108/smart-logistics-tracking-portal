import {
  AreaChart as RAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AreaChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RAreaChart data={data}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

        <XAxis
          dataKey="month"
          stroke="#64748b"
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          stroke="#64748b"
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `₹${v / 1000}k`}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            color: "#f8fafc",
          }}
          formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
        />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#10b981"
          strokeWidth={2}
          fill="url(#revenueGradient)"
        />
      </RAreaChart>
    </ResponsiveContainer>
  );
}