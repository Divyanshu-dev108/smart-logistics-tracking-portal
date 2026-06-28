import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50",

  secondary:
    "bg-slate-800/80 hover:bg-slate-700 text-slate-100 border border-slate-700",

  danger:
    "bg-gradient-to-r from-red-400 to-red-600 hover:from-red-300 hover:to-red-500 text-white shadow-lg shadow-red-500/30",

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
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
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