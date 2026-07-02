import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

export default function RoleLayout({
  navigation,
  brandTitle,
  brandSubtitle,
  roleLabel,
  greetingTitle,
  greetingSubtitle,
}) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-transparent text-white">
      <Sidebar
        navigation={navigation}
        brandTitle={brandTitle}
        brandSubtitle={brandSubtitle}
        roleLabel={roleLabel}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title={greetingTitle} subtitle={greetingSubtitle} />

        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}