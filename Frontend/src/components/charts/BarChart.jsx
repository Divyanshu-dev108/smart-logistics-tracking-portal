import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

        <XAxis
          dataKey="month"
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

        <Bar dataKey="trips" fill="#334155" radius={[6, 6, 0, 0]} name="Total Trips" isAnimationActive={true} animationDuration={1200} animationEasing="ease-out" />
        <Bar dataKey="delivered" fill="#10b981" radius={[6, 6, 0, 0]} name="Delivered" isAnimationActive={true} animationDuration={1200} animationEasing="ease-out" />
      </RBarChart>
    </ResponsiveContainer>
  );
}