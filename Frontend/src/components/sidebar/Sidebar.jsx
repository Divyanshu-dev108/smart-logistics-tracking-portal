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
      className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950"
    >
      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500">
            <Truck className="text-white" size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              FleetFlow
            </h1>

            <p className="text-xs text-slate-400">
              Smart Logistics Platform
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
          />
        ))}
      </nav>

      {/* Footer */}
      <SidebarFooter />
    </motion.aside>
  );
}