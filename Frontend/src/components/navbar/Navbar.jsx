
import { useState } from "react";
import { Search, Menu, LogOut, ChevronDown, User as UserIcon, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NotificationCenter from "./NotificationCenter";
import Magnet from "../ui/Magnet";
import GooeyNav from "../ui/GooeyNav";

const pageTitles = {
  "/admin/dashboard": { title: "Dashboard", sub: "Fleet Operations & Metrics" },
  "/admin/drivers": { title: "Drivers", sub: "Personnel & Compliance" },
  "/admin/vehicles": { title: "Fleet Vehicles", sub: "Asset Tracking & Health" },
  "/admin/trips": { title: "Active Trips", sub: "Dispatch & Routing" },
  "/admin/tracking": { title: "Live Fleet Map", sub: "Real-time Telemetry" },
  "/admin/reports": { title: "Reports", sub: "Operational Logs & PDFs" },
  "/admin/analytics": { title: "Analytics", sub: "Cost & Fuel Intelligence" },
  "/admin/settings": { title: "Settings", sub: "System Configuration" },
  "/driver/home": { title: "Driver Hub", sub: "Today's Assignments" },
  "/driver/trips": { title: "My Trips", sub: "Assigned Journeys" },
  "/driver/tracking": { title: "Live Navigation", sub: "Turn-by-Turn GPS" },
  "/driver/settings": { title: "Driver Settings", sub: "Account Preferences" },
  "/customer/home": { title: "Track Shipment", sub: "Milestone Tracking" },
  "/customer/trips": { title: "Order History", sub: "Past Consignments" },
  "/customer/settings": { title: "Settings", sub: "Account Preferences" },
};

const Navbar = ({ title, subtitle, onMenuToggle }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const page = pageTitles[pathname] || { title: title || "FleetFlow", sub: subtitle || "" };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const role = user?.role || "admin";

  const navItemsByRole = {
    admin: [
      { label: "Dashboard", href: "/admin/dashboard" },
      { label: "Fleet", href: "/admin/vehicles" },
      { label: "Drivers", href: "/admin/drivers" },
      { label: "Trips", href: "/admin/trips" },
      { label: "Live Map", href: "/admin/tracking" },
      { label: "Analytics", href: "/admin/analytics" },
      { label: "Reports", href: "/admin/reports" },
      { label: "Settings", href: "/admin/settings" },
    ],
    driver: [
      { label: "Driver Hub", href: "/driver/home" },
      { label: "Live GPS", href: "/driver/tracking" },
      { label: "My Trips", href: "/driver/trips" },
      { label: "Settings", href: "/driver/settings" },
    ],
    customer: [
      { label: "Track Cargo", href: "/customer/home" },
      { label: "Order History", href: "/customer/trips" },
      { label: "Settings", href: "/customer/settings" },
    ],
  };

  const currentNavItems = navItemsByRole[role] || navItemsByRole.admin;
  const currentActiveIdx = Math.max(
    0,
    currentNavItems.findIndex((item) => pathname.startsWith(item.href))
  );

  return (
    <header className="mx-3 sm:mx-6 lg:mx-8 mt-3 mb-2 z-30 h-16 rounded-2xl border border-slate-800/80 bg-slate-900/75 backdrop-blur-2xl shadow-xl px-3 sm:px-5 flex justify-between items-center gap-3 shrink-0 transition-all duration-300 min-w-0">
      {/* Left: Brand Logo & Title */}
      <div className="flex items-center gap-3 min-w-0 shrink-0">
        <div
          onClick={() => navigate(`/${role === "driver" ? "driver/home" : role === "customer" ? "customer/home" : "admin/dashboard"}`)}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <motion.div
            whileHover={{ scale: 1.06, rotate: [0, -6, 6, 0] }}
            transition={{ duration: 0.3 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md shadow-emerald-500/25 shrink-0"
          >
            <Truck className="text-white" size={20} />
          </motion.div>
          <div className="hidden sm:block min-w-0">
            <h1 className="text-sm font-bold text-white tracking-tight leading-none group-hover:text-emerald-400 transition-colors font-display">
              FleetFlow
            </h1>
            <p className="text-[10px] font-semibold tracking-wider uppercase text-emerald-400/90 mt-1 leading-none font-mono">
              Logistics Platform
            </p>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-slate-800 hidden xl:block ml-1" />

        {/* Current Page Context */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="min-w-0 hidden 2xl:block"
        >
          <h2 className="text-sm font-semibold text-slate-200 tracking-tight truncate font-display">
            {page.title}
          </h2>
        </motion.div>
      </div>

      {/* Center: React Bits GooeyNav Interactive Liquid Bar */}
      <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 px-2">
        <GooeyNav
          items={currentNavItems}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={currentActiveIdx}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      {/* Right: Telemetry status, Search, Notifications, User Menu */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Live System Status Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono select-none">
          <span>Online • 24ms</span>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all w-60">
          <Search size={14} className="text-slate-500 shrink-0" />
          <input
            className="bg-transparent outline-none text-xs placeholder:text-slate-500 text-white w-full font-body"
            placeholder="Search telemetry, trips..."
          />
          <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-slate-800 border border-slate-700/80 rounded">
            ⌘K
          </kbd>
        </div>

        {/* Notifications Center */}
        <Magnet strength={0.2} radius={50}>
          <NotificationCenter />
        </Magnet>

        <div className="h-5 w-[1px] bg-slate-800 hidden sm:block" />

        {/* User Pill with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2.5 bg-slate-900/60 hover:bg-slate-800/70 border border-slate-800 hover:border-slate-700 rounded-xl px-2.5 py-1.5 transition-all text-left group"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=1e293b&color=10b981&bold=true&size=32`}
              alt="avatar"
              className="h-7 w-7 rounded-lg shrink-0 object-cover ring-1 ring-emerald-500/30 bg-slate-800"
            />
            <div className="hidden sm:block min-w-0">
              <p className="text-xs font-semibold text-white leading-none truncate max-w-[90px] font-display group-hover:text-emerald-400 transition-colors">
                {user?.name?.split(" ")[0] || "User"}
              </p>
              <p className="text-[10px] text-slate-400 capitalize mt-1 leading-none font-medium">
                {user?.role || "Admin"}
              </p>
            </div>
            <ChevronDown size={13} className="text-slate-500 group-hover:text-slate-300 hidden sm:block shrink-0 transition-transform" />
          </button>

          {/* User Dropdown Menu */}
          <AnimatePresence>
            {userDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserDropdownOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl glass-card border border-slate-800 shadow-2xl p-1.5 z-50 origin-top-right font-body"
                >
                  <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                    <p className="text-xs font-semibold text-white truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {user?.email || "user@fleetflow.com"}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate(`/${user?.role || "admin"}/settings`);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                  >
                    <UserIcon size={14} />
                    Account Settings
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors mt-0.5"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;