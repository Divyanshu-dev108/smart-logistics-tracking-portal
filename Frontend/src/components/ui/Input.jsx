export default function Input({ className = "", icon: Icon, rightElement, ...props }) {
  return (
    <div className="relative w-full group">
      {Icon && (
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none z-10"
        />
      )}

      {/* Glow effect behind the input */}
      <div className="absolute inset-0 rounded-xl bg-emerald-500/0 group-focus-within:bg-emerald-500/10 blur-md transition-colors duration-500 pointer-events-none" />

      <input
        className={`relative w-full h-12 rounded-xl glass border border-slate-700/80 outline-none text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:bg-slate-900/60 transition-all duration-300 shadow-inner ${Icon ? "pl-11" : "px-4"} ${rightElement ? "pr-11" : Icon ? "pr-4" : ""} ${className}`}
        {...props}
      />

      {rightElement && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          {rightElement}
        </div>
      )}
    </div>
  );
}