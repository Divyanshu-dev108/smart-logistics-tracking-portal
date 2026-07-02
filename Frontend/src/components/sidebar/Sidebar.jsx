import { Truck } from "lucide-react";
import { motion } from "framer-motion";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";
import { navigation } from "../../utils/navigation";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 flex h-screen w-64 flex-col border-r border-slate-800/60 bg-slate-950/70 backdrop-blur-xl"
    >
      {/* Logo */}
      <div className="border-b border-slate-800/60 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
            <Truck className="text-white" size={18} />
          </div>

          <div>
            <h1
              style={{ letterSpacing: "-0.04em" }}
              className="text-base font-bold text-white leading-none"
            >
              FleetFlow
            </h1>
            <p className="text-[10px] font-medium tracking-widest uppercase text-slate-500 mt-0.5">
              Logistics Platform
            </p>
          </div>
        </div>
      </div>

      {/* Nav label */}
      <div className="px-5 pt-5 pb-2">
        <p className="label">Navigation</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-3 overflow-y-auto">
        {navigation.map((item) => (
          <SidebarItem key={item.path} item={item} />
        ))}
      </nav>

      <SidebarFooter />
    </motion.aside>
  );
}