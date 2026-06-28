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
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={85}
          paddingAngle={4}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} stroke="none" />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            color: "#f8fafc",
          }}
        />
      </RPieChart>
    </ResponsiveContainer>
  );
}