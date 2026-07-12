import { motion } from "framer-motion";

export default function Card({ children, className = "", noPadding = false }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative group overflow-hidden rounded-2xl glass-card transition-all duration-500 ${
        noPadding ? "" : "p-6"
      } ${className}`}
    >
      {/* Subtle top border glow effect */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}