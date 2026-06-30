export default function Input({ className = "", icon: Icon, rightElement, ...props }) {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
        />
      )}

      <input
        className={`
        w-full
        h-12
        rounded-xl
        bg-slate-900/80
        border
        border-slate-700
        outline-none
        text-white
        placeholder:text-slate-500
        focus:border-emerald-500
        focus:ring-2
        focus:ring-emerald-500/20
        transition-all
        duration-300
        ${Icon ? "pl-11" : "px-4"}
        ${rightElement ? "pr-11" : Icon ? "pr-4" : ""}
        ${className}
        `}
        {...props}
      />

      {rightElement && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  );
}