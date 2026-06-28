import { Bell, Search, UserCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 h-20 border-b border-slate-800/60 bg-slate-950/60 backdrop-blur-xl px-8 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-slate-400 text-sm">Welcome back, Admin 👋</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2 focus-within:border-emerald-500/60 transition-colors">
          <Search size={18} className="text-slate-400" />
          <input
            className="bg-transparent ml-2 outline-none text-sm placeholder:text-slate-500"
            placeholder="Search..."
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative text-slate-300 hover:text-white transition-colors"
        >
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-500 shadow shadow-emerald-500/60" />
        </motion.button>

        <motion.div whileHover={{ scale: 1.05 }}>
          <UserCircle2 size={35} className="text-slate-300" />
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;