import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20",

  secondary:
    "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700",

  danger:
    "bg-red-500 hover:bg-red-400 text-white",

  ghost:
    "hover:bg-slate-800 text-slate-300",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`
        rounded-xl
        font-semibold
        transition-all
        duration-300
        flex
        items-center
        justify-center
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}