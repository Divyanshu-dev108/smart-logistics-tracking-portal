import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] border-t border-white/20",
  secondary:
    "glass hover:bg-slate-700/50 text-slate-100 hover:text-white border border-slate-700 hover:border-slate-500",
  danger:
    "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] border-t border-white/20",
  ghost:
    "hover:bg-slate-800/50 text-slate-400 hover:text-white backdrop-blur-sm",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export default function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}