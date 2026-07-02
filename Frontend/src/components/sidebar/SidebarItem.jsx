import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function SidebarItem({ item }) {
  const Icon = item.icon;

  return (
    <NavLink to={item.path}>
      {({ isActive }) => (
        <motion.div
          whileHover={{ x: 3 }}
          transition={{ duration: 0.15 }}
          className={clsx(
            "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300 overflow-hidden",
            isActive
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
              : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
          )}
        >
          {isActive && (
            <motion.span
              layoutId="sidebar-glow"
              className="absolute inset-0 rounded-xl bg-emerald-400/20 blur-xl"
            />
          )}

          <Icon size={17} className="relative z-10 shrink-0" />

          <span
            style={{ letterSpacing: "-0.01em" }}
            className="relative z-10 text-sm font-medium"
          >
            {item.title}
          </span>
        </motion.div>
      )}
    </NavLink>
  );
}