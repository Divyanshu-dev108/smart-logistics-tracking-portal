import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  noPadding = false,
  interactive = true,
  glow = "emerald",
  ...props
}) {
  const glowStyles = {
    emerald: "group-hover:border-emerald-500/30 group-hover:shadow-[0_15px_35px_-10px_rgba(16,185,129,0.12)]",
    blue: "group-hover:border-blue-500/30 group-hover:shadow-[0_15px_35px_-10px_rgba(59,130,246,0.12)]",
    purple: "group-hover:border-purple-500/30 group-hover:shadow-[0_15px_35px_-10px_rgba(168,85,247,0.12)]",
    none: "",
  };

  return (
    <motion.div
      whileHover={interactive ? { y: -3 } : undefined}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`relative group overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-lg transition-all duration-300 min-w-0 w-full ${
        interactive ? glowStyles[glow] || glowStyles.emerald : ""
      } ${noPadding ? "" : "p-5 sm:p-6"} ${className}`}
      {...props}
    >
      {/* 21st.dev Top specular highlight sheen */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

      {/* Subtle bottom ambient gradient */}
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500" />

      <div className="relative z-10 h-full min-w-0 w-full flex flex-col flex-1">{children}</div>
    </motion.div>
  );
}