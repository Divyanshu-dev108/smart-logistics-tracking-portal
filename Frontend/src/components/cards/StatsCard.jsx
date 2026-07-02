import { motion } from "framer-motion";
import Sparkline from "../charts/Sparkline";

const colorMap = {
  emerald: { glow: "shadow-emerald-500/20", text: "text-emerald-400", icon: "bg-emerald-500/15", line: "#10b981" },
  blue: { glow: "shadow-blue-500/20", text: "text-blue-400", icon: "bg-blue-500/15", line: "#3b82f6" },
  yellow: { glow: "shadow-yellow-500/20", text: "text-yellow-400", icon: "bg-yellow-500/15", line: "#eab308" },
  purple: { glow: "shadow-purple-500/20", text: "text-purple-400", icon: "bg-purple-500/15", line: "#a855f7" },
};

const fakeTrend = [
  { value: 30 }, { value: 45 }, { value: 38 }, { value: 55 },
  { value: 48 }, { value: 62 }, { value: 70 },
];

export default function StatsCard({ title, value, change, color = "emerald", icon: Icon }) {
  const c = colorMap[color] || colorMap.emerald;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`relative rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6 shadow-xl hover:shadow-2xl ${c.glow} transition-shadow duration-300 overflow-hidden`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-slate-400 text-sm">{title}</p>
          <h2 className="text-4xl font-bold text-white">{value}</h2>
          <span className={`text-sm font-medium ${c.text}`}>
            {change} this month
          </span>
        </div>

        {Icon && (
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.icon}`}>
            <Icon size={20} className={c.text} />
          </div>
        )}
      </div>

      <div className="mt-3 -mx-2 opacity-70">
        <Sparkline data={fakeTrend} color={c.line} />
      </div>
    </motion.div>
  );
}