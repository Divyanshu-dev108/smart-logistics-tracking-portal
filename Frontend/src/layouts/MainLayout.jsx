import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import ParticleBackground from "../components/ui/ParticleBackground";
import { getTransition } from "../utils/pageTransitions";

export default function MainLayout() {
  const location = useLocation();
  const t = getTransition(location.pathname);

  return (
    <div className="flex h-screen text-white overflow-hidden relative">
      <ParticleBackground />
      <div className="fixed inset-0 bg-slate-950/60 z-0 pointer-events-none" />

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Navbar />

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