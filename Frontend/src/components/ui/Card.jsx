import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/80
        backdrop-blur-xl
        shadow-xl
        p-6
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}