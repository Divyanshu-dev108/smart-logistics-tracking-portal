import { motion } from "framer-motion";

export default function PageHeader({
  title,
  subtitle,
  badge,
  icon: Icon,
  actions,
  children,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-2 min-w-0 w-full ${className}`}>
      <div className="space-y-1 min-w-0 flex-1">
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap min-w-0">
          {Icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <Icon size={20} />
            </div>
          )}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white font-sans truncate">
            {title}
          </h1>
          {badge && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_14px_rgba(16,185,129,0.2)] shrink-0 select-none">
              <span>{badge}</span>
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-slate-400 font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap justify-start md:justify-end min-w-0 max-w-full">
          {actions}
        </div>
      )}

      {children && <div className="w-full mt-2 min-w-0">{children}</div>}
    </div>
  );
}
