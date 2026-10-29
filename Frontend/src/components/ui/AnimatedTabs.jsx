import { motion } from "framer-motion";

export default function AnimatedTabs({
  tabs = [],
  activeTab,
  onChange,
  className = "",
  size = "md",
  color = "emerald",
  layoutId = "activeTabPill",
}) {
  const colorMap = {
    emerald: {
      pill: "bg-emerald-500 shadow-lg shadow-emerald-500/25",
      textActive: "text-white font-semibold",
      textInactive: "text-slate-400 hover:text-slate-200",
    },
    blue: {
      pill: "bg-blue-500 shadow-lg shadow-blue-500/25",
      textActive: "text-white font-semibold",
      textInactive: "text-slate-400 hover:text-slate-200",
    },
    purple: {
      pill: "bg-purple-500 shadow-lg shadow-purple-500/25",
      textActive: "text-white font-semibold",
      textInactive: "text-slate-400 hover:text-slate-200",
    },
  };

  const theme = colorMap[color] || colorMap.emerald;

  const sizeClasses = {
    sm: "text-xs py-1 px-3 min-w-[42px]",
    md: "text-xs sm:text-sm py-1.5 px-3.5 min-w-[50px]",
    lg: "text-sm py-2 px-5 min-w-[64px]",
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md relative select-none ${className}`}
    >
      {tabs.map((tab) => {
        const id = typeof tab === "string" ? tab : tab.id;
        const label = typeof tab === "string" ? tab : tab.label;
        const count = typeof tab === "object" ? tab.count : undefined;
        const isActive = activeTab === id;

        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`relative rounded-lg font-medium transition-colors z-10 flex items-center justify-center gap-1.5 font-body select-none shrink-0 ${
              sizeClasses[size]
            } ${isActive ? theme.textActive : theme.textInactive}`}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className={`absolute inset-0 rounded-lg ${theme.pill} pointer-events-none`}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 32,
                }}
              />
            )}
            <span className="relative z-10 capitalize whitespace-nowrap">{label}</span>
            {count !== undefined && (
              <span
                className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-mono ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
