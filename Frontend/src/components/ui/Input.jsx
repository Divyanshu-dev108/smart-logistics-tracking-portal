export default function Input({
  className = "",
  icon: Icon,
  rightElement,
  error,
  label,
  shortcut,
  ...props
}) {
  return (
    <div className="w-full space-y-1.5 min-w-0">
      {label && (
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-slate-300 font-sans tracking-wide">
            {label}
          </label>
          {shortcut && (
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-800 border border-slate-700/80 rounded">
              {shortcut}
            </kbd>
          )}
        </div>
      )}

      <div className="relative w-full group min-w-0">
        {Icon && (
          <Icon
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none z-10"
          />
        )}

        {/* Ambient focus glow */}
        <div className="absolute inset-0 rounded-xl bg-emerald-500/0 group-focus-within:bg-emerald-500/10 blur-sm transition-all duration-300 pointer-events-none" />

        <input
          className={`relative w-full h-10 sm:h-11 rounded-xl bg-slate-900/70 border ${
            error
              ? "border-rose-500/60 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/30"
              : "border-slate-800/90 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
          } outline-none text-white text-sm placeholder:text-slate-500 transition-all duration-200 backdrop-blur-md ${
            Icon ? "pl-10" : "px-3.5"
          } ${rightElement ? "pr-10" : "pr-3.5"} ${className}`}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-rose-400 font-medium pl-1">{error}</p>
      )}
    </div>
  );
}