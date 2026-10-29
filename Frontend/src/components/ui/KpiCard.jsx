import PixelCard from "./PixelCard";
import AnimatedNumber from "./AnimatedNumber";
import Sparkline from "../charts/Sparkline";

const colorThemes = {
  emerald: {
    badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
    iconBg: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
    variant: "emerald",
    line: "#10b981",
  },
  blue: {
    badge: "bg-blue-500/10 text-blue-400 border border-blue-500/25",
    iconBg: "bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.2)]",
    variant: "blue",
    line: "#3b82f6",
  },
  yellow: {
    badge: "bg-amber-500/10 text-amber-400 border border-amber-500/25",
    iconBg: "bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    variant: "yellow",
    line: "#f59e0b",
  },
  orange: {
    badge: "bg-amber-500/10 text-amber-400 border border-amber-500/25",
    iconBg: "bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    variant: "yellow",
    line: "#f59e0b",
  },
  purple: {
    badge: "bg-purple-500/10 text-purple-400 border border-purple-500/25",
    iconBg: "bg-purple-500/15 text-purple-400 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]",
    variant: "purple",
    line: "#a855f7",
  },
  pink: {
    badge: "bg-pink-500/10 text-pink-400 border border-pink-500/25",
    iconBg: "bg-pink-500/15 text-pink-400 border border-pink-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]",
    variant: "pink",
    line: "#f43f5e",
  },
};

const defaultTrend = [
  { value: 30 }, { value: 45 }, { value: 38 }, { value: 55 },
  { value: 48 }, { value: 62 }, { value: 70 },
];

export default function KpiCard({
  title,
  value,
  change,
  subtitle = "vs last month",
  color = "emerald",
  icon: Icon,
  sparklineData,
  showSparkline = true,
  animateValue = true,
}) {
  const theme = colorThemes[color] || colorThemes.emerald;
  const trend = sparklineData || defaultTrend;

  return (
    <PixelCard
      variant={theme.variant}
      className="p-5 sm:p-5.5 flex flex-col justify-between h-full min-h-[160px] hover:border-slate-700/80 transition-all duration-300 group"
    >
      {/* Top Header: Title + Icon */}
      <div className="flex items-start justify-between gap-2.5 min-w-0 w-full">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 truncate min-w-0 font-display pt-0.5">
          {title}
        </p>

        {Icon && (
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-105 ${theme.iconBg}`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      {/* Middle: Metric Value with Odometer count-up */}
      <div className="my-auto py-1 min-w-0 w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white tabular-nums font-display leading-tight truncate">
          {animateValue ? (
            <AnimatedNumber value={value} duration={1100} />
          ) : (
            value
          )}
        </h2>
      </div>

      {/* Bottom: Change Badge + Subtitle */}
      {change && (
        <div className="flex items-center gap-2 flex-wrap min-w-0 w-full pt-1">
          <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums shrink-0 ${theme.badge}`}>
            {change}
          </span>
          <span className="text-[11px] text-slate-400 font-normal truncate min-w-0">
            {subtitle}
          </span>
        </div>
      )}

      {/* Sparkline (optional) */}
      {showSparkline && (
        <div className="mt-3 -mx-5 sm:-mx-5.5 -mb-5 sm:-mb-5.5 pt-1 overflow-hidden opacity-40 hover:opacity-85 transition-opacity min-w-0 rounded-b-2xl">
          <Sparkline data={trend} color={theme.line} />
        </div>
      )}
    </PixelCard>
  );
}
