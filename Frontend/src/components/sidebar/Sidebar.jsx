import { Truck } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";
import { adminNavigation } from "../../utils/navigation";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 flex h-screen w-64 flex-col border-r border-slate-800/60 bg-slate-950/80 backdrop-blur-xl shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800/60">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30 shrink-0">
          <Truck className="text-white" size={18} />
        </div>
        <div className="min-w-0">
          <h1 className="text-sm font-bold text-white tracking-tight leading-none">
            FleetFlow
          </h1>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-500 mt-1">
            Logistics Platform
          </p>
        </div>
      </div>

      {/* Nav label */}
      <div className="px-4 pt-5 pb-2">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-600">
          Navigation
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {adminNavigation.map((item) => (
          <SidebarItem key={item.path} item={item} />
        ))}
      </nav>

      <SidebarFooter />
    </motion.aside>
  );
}