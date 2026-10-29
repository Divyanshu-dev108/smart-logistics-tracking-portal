import { useState } from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Truck, X } from "lucide-react";
import clsx from "clsx";
import SidebarFooter from "../components/sidebar/SidebarFooter";
import Navbar from "../components/navbar/Navbar";
import Magnetic from "../components/ui/Magnetic";
import { getTransition } from "../utils/pageTransitions";

function RoleSidebarContent({ navigation, brandTitle, brandSubtitle, onClose }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/70">
        <div className="flex items-center gap-3.5 min-w-0">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md shadow-emerald-500/25 shrink-0"
          >
            <Truck className="text-white" size={22} />
          </motion.div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-white tracking-tight leading-tight truncate font-display">
              {brandTitle}
            </h1>
            <p className="text-[11px] font-semibold tracking-wider uppercase text-emerald-400/90 mt-0.5">
              {brandSubtitle}
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg text-slate-400 hover:text-white bg-slate-800/60"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="px-6 pt-5 pb-2">
        <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-500">
          Main Navigation
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.04 * index,
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <NavLink to={item.path} onClick={onClose}>
                {({ isActive }) => (
                  <div
                    className={clsx(
                      "flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors duration-200 group cursor-pointer relative overflow-hidden text-sm font-medium font-body",
                      isActive
                        ? "text-emerald-400 font-semibold"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/35 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                      />
                    )}

                    <Icon
                      size={18}
                      className={clsx(
                        "shrink-0 transition-colors relative z-10",
                        isActive
                          ? "text-emerald-400"
                          : "text-slate-400 group-hover:text-slate-200"
                      )}
                    />
                    <span className="relative z-10 tracking-tight font-medium">
                      {item.title}
                    </span>

                  </div>
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      <SidebarFooter />
    </div>
  );
}

export default function RoleLayout({
  navigation,
  brandTitle,
  brandSubtitle,
  greetingTitle,
  greetingSubtitle,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const t = getTransition(location.pathname);

  return (
    <div className="flex h-screen text-white overflow-hidden relative">
      <div className="fixed inset-0 bg-slate-950/80 z-0 pointer-events-none" />
      <div className="fixed inset-0 bg-grid-cyber mask-radial-top z-0 pointer-events-none opacity-80" />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-slate-900 border-r border-slate-800 z-10 shadow-2xl flex flex-col"
            >
              <RoleSidebarContent
                navigation={navigation}
                brandTitle={brandTitle}
                brandSubtitle={brandSubtitle}
                onClose={() => setMobileMenuOpen(false)}
              />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden relative z-10 min-w-0 w-full max-w-full">
        <Navbar
          title={greetingTitle}
          subtitle={greetingSubtitle}
          onMenuToggle={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-6 xl:p-8 min-w-0 max-w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={t.initial}
              animate={t.animate}
              exit={t.exit}
              transition={t.transition}
              className="w-full max-w-full min-w-0"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}