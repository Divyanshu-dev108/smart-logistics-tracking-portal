export default function Input({
  className = "",
  ...props
}) {
  return (
    <input
      className={`
      w-full
      h-12
      rounded-xl
      bg-slate-900
      border
      border-slate-700
      px-4
      outline-none
      text-white
      placeholder:text-slate-500
      focus:border-emerald-500
      transition-all
      ${className}
      `}
      {...props}
    />
  );
}