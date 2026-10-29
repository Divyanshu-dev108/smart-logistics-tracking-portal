import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function Sparkline({ data, color = "#10b981" }) {
  return (
    <div className="w-full h-[45px] min-w-0 overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
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
            isAnimationActive={true}
            animationDuration={1200}
            animationEasing="ease-out"
            style={{ filter: `url(#glow-${color.replace('#', '')})` }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}