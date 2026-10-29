import { Link } from "react-router-dom";
import { Compass, ArrowLeft, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import DecryptedText from "../components/ui/DecryptedText";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-6 text-white overflow-hidden bg-slate-950">

      {/* Cyber Grid Mask Overlay */}
      <div className="fixed inset-0 bg-grid-cyber mask-radial-center opacity-60 pointer-events-none" />

      {/* Ambient center emerald glow */}
      <div className="absolute w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-lg w-full text-center flex flex-col items-center"
      >
        {/* Animated Radar Beacon */}
        <div className="relative mb-6">
          {/* Radar ping rings */}
          <div className="absolute inset-0 -m-6 rounded-full border border-emerald-500/20 animate-ping opacity-40 pointer-events-none" />
          <div className="absolute inset-0 -m-3 rounded-full border border-emerald-500/30 animate-pulse pointer-events-none" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.25)] relative"
          >
            <Compass size={44} className="text-emerald-400" />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
          </motion.div>
        </div>

        {/* 404 Cipher Title */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Navigation size={12} className="animate-pulse" />
            Route Telemetry Missing
          </span>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-display">
            <DecryptedText text="404: LOST IN TRANSIT" speed={40} maxIterations={10} />
          </h1>

          <p className="text-sm text-slate-400 font-body max-w-md mx-auto leading-relaxed pt-2">
            The waypoint or route manifest you are looking for has departed the radar grid or does not exist on this fleet server.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to="/admin/dashboard">
            <Button size="md" starBorder={true}>
              <ArrowLeft size={16} />
              Return to Fleet Command
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
