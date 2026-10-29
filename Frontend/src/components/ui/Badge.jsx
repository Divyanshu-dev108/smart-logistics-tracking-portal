const variants = {
  success: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
    dot: "bg-emerald-400",
    ping: "bg-emerald-400",
  },
  warning: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
    dot: "bg-amber-400",
    ping: "bg-amber-400",
  },
  danger: {
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/25 shadow-[0_0_12px_rgba(244,63,94,0.15)]",
    dot: "bg-rose-400",
    ping: "bg-rose-400",
  },
  info: {
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25 shadow-[0_0_12px_rgba(6,182,212,0.15)]",
    dot: "bg-cyan-400",
    ping: "bg-cyan-400",
  },
  purple: {
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/25 shadow-[0_0_12px_rgba(168,85,247,0.15)]",
    dot: "bg-purple-400",
    ping: "bg-purple-400",
  },
  neutral: {
    badge: "bg-slate-800/60 text-slate-300 border-slate-700/60",
    dot: "bg-slate-400",
    ping: null,
  },
};

export default function Badge({
  children,
  variant = "info",
  dot = true,
  ping = true,
  className = "",
}) {
  const v = variants[variant] || variants.info;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-tight border backdrop-blur-md select-none shrink-0 ${v.badge} ${className}`}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {ping && v.ping && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${v.ping}`}
            />
          )}
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${v.dot}`} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}