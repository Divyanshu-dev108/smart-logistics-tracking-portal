const variants = {
  success:
    "bg-emerald-500/20 text-emerald-400",

  warning:
    "bg-yellow-500/20 text-yellow-400",

  danger:
    "bg-red-500/20 text-red-400",

  info:
    "bg-blue-500/20 text-blue-400",
};

export default function Badge({
  children,
  variant = "info",
}) {
  return (
    <span
      className={`
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold
      ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}