import { Bell, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NotificationCenter from "./NotificationCenter";

const pageTitles = {
  "/admin/dashboard": { title: "Dashboard", sub: "Welcome back, Admin 👋" },
  "/admin/drivers": { title: "Drivers", sub: "Manage your fleet drivers" },
  "/admin/vehicles": { title: "Fleet", sub: "Track and manage your vehicles" },
  "/admin/trips": { title: "Trips", sub: "Monitor all ongoing trips" },
  "/admin/tracking": { title: "Live Tracking", sub: "Real-time vehicle locations" },
  "/admin/reports": { title: "Reports", sub: "Fleet performance overview" },
  "/admin/analytics": { title: "Analytics", sub: "Deep fleet insights" },
  "/admin/settings": { title: "Settings", sub: "Account & preferences" },
  "/driver/home": { title: "My Dashboard", sub: "Have a safe trip 🚚" },
  "/driver/trips": { title: "My Trips", sub: "Your assigned trips" },
  "/driver/tracking": { title: "Live Map", sub: "Your current location" },
  "/driver/settings": { title: "Settings", sub: "Account & preferences" },
  "/customer/home": { title: "Track Shipment", sub: "See where your order is 📦" },
  "/customer/trips": { title: "My Orders", sub: "Your shipment history" },
  "/customer/settings": { title: "Settings", sub: "Account & preferences" },
};

const Navbar = ({ title, subtitle }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const page = pageTitles[pathname] || { title: title || "FleetFlow", sub: subtitle || "" };

  return (
    <header className="mx-6 mt-4 mb-2 z-20 h-16 rounded-2xl glass-card px-6 flex justify-between items-center gap-4 shrink-0 transition-all duration-300">
      {/* Page title */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="min-w-0"
      >
        <h2 className="text-lg font-bold text-white leading-none tracking-tight truncate">
          {page.title}
        </h2>
        {page.sub && (
          <p className="text-xs text-slate-400 mt-0.5 font-medium truncate">
            {page.sub}
          </p>
        )}
      </motion.div>

      {/* Right side */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-xl px-3 py-2 focus-within:border-emerald-500/60 transition-colors w-56">
          <Search size={14} className="text-slate-500 shrink-0" />
          <input
            className="bg-transparent outline-none text-sm placeholder:text-slate-500 text-white w-full"
            placeholder="Search drivers, trips..."
          />
        </div>

        {/* Notifications */}
        <NotificationCenter />

        {/* User pill */}
        <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-xl px-3 py-1.5">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=10b981&color=fff&size=32`}
            alt="avatar"
            className="h-7 w-7 rounded-full shrink-0"
          />
          <div className="hidden sm:block min-w-0">
            <p className="text-sm font-semibold text-white leading-none truncate max-w-[100px]">
              {user?.name?.split(" ")[0] || "User"}
            </p>
            <p className="text-[10px] text-slate-500 capitalize mt-0.5">
              {user?.role || "Guest"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;