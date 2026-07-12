import {
  PieChart as RPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RPieChart>
        <defs>
          <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.4" />
          </filter>
        </defs>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={65}
          outerRadius={90}
          paddingAngle={6}
          cornerRadius={6}
          stroke="none"
          style={{ filter: "url(#pieShadow)" }}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            color: "#f8fafc",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
          }}
          itemStyle={{ fontWeight: "bold" }}
        />
      </RPieChart>
    </ResponsiveContainer>
  );
}