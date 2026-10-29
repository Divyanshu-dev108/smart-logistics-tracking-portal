import { Inbox } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "No records found",
  description = "No entries match your current search criteria or active roster filters.",
  action,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col items-center justify-center py-16 px-6 text-center relative overflow-hidden ${className}`}
    >
      {/* Background glow circle */}
      <div className="absolute w-48 h-48 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none -z-10" />

      <div className="relative mb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/80 text-emerald-400 shadow-xl shadow-emerald-500/10">
          <Icon size={28} className="text-emerald-400" />
        </div>
        <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-slate-900" />
        </span>
      </div>

      <h3 className="text-base font-bold text-white font-display tracking-tight mb-1.5">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6 leading-relaxed font-body">
        {description}
      </p>
      {action && <div className="mt-1">{action}</div>}
    </motion.div>
  );
}
