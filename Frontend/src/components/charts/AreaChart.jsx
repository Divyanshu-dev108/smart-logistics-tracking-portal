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
    <div className="w-full h-[280px] min-w-0 overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <RAreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />

        <XAxis
          dataKey="month"
          stroke="#64748b"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "#94a3b8" }}
          dy={10}
        />

        <YAxis
          stroke="#64748b"
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `₹${v / 1000}k`}
          tick={{ fontSize: 12, fill: "#94a3b8" }}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            color: "#f8fafc",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
          }}
          itemStyle={{ color: "#10b981", fontWeight: "bold" }}
          formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
        />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#10b981"
          strokeWidth={3}
          fill="url(#revenueGradient)"
          activeDot={{ r: 6, fill: "#10b981", stroke: "#fff", strokeWidth: 2, filter: "url(#glow)" }}
          isAnimationActive={true}
          animationDuration={1300}
          animationEasing="ease-out"
          style={{ filter: "drop-shadow(0px 10px 10px rgba(16,185,129,0.3))" }}
        />
      </RAreaChart>
    </ResponsiveContainer>
    </div>
  );
}