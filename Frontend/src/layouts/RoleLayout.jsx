import { Outlet, useLocation, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Truck } from "lucide-react";
import clsx from "clsx";
import SidebarFooter from "../components/sidebar/SidebarFooter";
import Navbar from "../components/navbar/Navbar";
import ParticleBackground from "../components/ui/ParticleBackground";
import { getTransition } from "../utils/pageTransitions";

function RoleSidebar({ navigation, brandTitle, brandSubtitle }) {
  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex h-[calc(100vh-2rem)] my-4 ml-4 w-72 flex-col rounded-3xl glass-card shrink-0 overflow-hidden"
    >
      <div className="flex items-center gap-4 px-6 py-6 border-b border-slate-800/60">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30 shrink-0"
        >
          <Truck className="text-white" size={24} />
        </motion.div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-white tracking-tight leading-none truncate">
            {brandTitle}
          </h1>
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mt-1.5">
            {brandSubtitle}
          </p>
        </div>
      </div>

      <div className="px-6 pt-6 pb-3">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">
          Navigation
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.05 * index,
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className={clsx(
                      "flex items-center gap-4 rounded-xl px-4 py-3.5 transition-colors duration-200 group cursor-pointer relative overflow-hidden",
                      isActive
                        ? "text-white shadow-md shadow-emerald-500/25"
                        : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-100"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-emerald-500 rounded-xl"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    <Icon
                      size={20}
                      className={clsx(
                        "shrink-0 transition-colors relative z-10",
                        isActive
                          ? "text-white"
                          : "text-slate-500 group-hover:text-slate-300"
                      )}
                    />
                    <span className="text-base font-semibold relative z-10 tracking-wide">
                      {item.title}
                    </span>

                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="ml-auto w-2 h-2 rounded-full bg-white/90 relative z-10"
                      />
                    )}
                  </motion.div>
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      <SidebarFooter />
    </motion.aside>
  );
}

export default function RoleLayout({
  navigation,
  brandTitle,
  brandSubtitle,
  greetingTitle,
  greetingSubtitle,
}) {
  const location = useLocation();
  const t = getTransition(location.pathname);

  return (
    <div className="flex h-screen text-white overflow-hidden relative">
      <ParticleBackground />
      <div className="fixed inset-0 bg-slate-950/85 z-0 pointer-events-none" />

      <RoleSidebar
        navigation={navigation}
        brandTitle={brandTitle}
        brandSubtitle={brandSubtitle}
      />

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Navbar title={greetingTitle} subtitle={greetingSubtitle} />

        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={t.initial}
              animate={t.animate}
              exit={t.exit}
              transition={t.transition}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}