export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`
      w-full
      h-12
      rounded-xl
      bg-slate-900/80
      border
      border-slate-700
      px-4
      outline-none
      text-white
      placeholder:text-slate-500
      focus:border-emerald-500
      focus:ring-2
      focus:ring-emerald-500/20
      transition-all
      duration-300
      ${className}
      `}
      {...props}
    />
  );
}