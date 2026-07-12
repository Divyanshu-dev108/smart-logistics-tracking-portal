import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function Sparkline({ data, color = "#10b981" }) {
  return (
    <ResponsiveContainer width="100%" height={45}>
      <LineChart data={data}>
        <defs>
          <filter id={`glow-${color.replace('#', '')}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor={color} floodOpacity="0.4" />
          </filter>
        </defs>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={3}
          dot={false}
          style={{ filter: `url(#glow-${color.replace('#', '')})` }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}