import { useState, Suspense } from "react";
import { Circle, Search, Navigation, MapPin, Gauge, Shield, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import AnimatedTabs from "../components/ui/AnimatedTabs";
import VehicleMap from "../components/map/VehicleMap";
import { vehicleLocations } from "../data/trackingData";

const statusVariant = {
  Moving: "success",
  Stopped: "warning",
};

export default function Tracking() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredVehicles = vehicleLocations.filter((v) => {
    const matchesSearch =
      v.number.toLowerCase().includes(search.toLowerCase()) ||
      v.driver.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || v.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const movingCount = vehicleLocations.filter((v) => v.status === "Moving").length;
  const stoppedCount = vehicleLocations.length - movingCount;

  const trackingTabs = [
    { id: "all", label: "All Units", count: vehicleLocations.length },
    { id: "moving", label: "Moving", count: movingCount },
    { id: "stopped", label: "Stopped", count: stoppedCount },
  ];

  return (
    <div className="space-y-7 sm:space-y-8 pb-12 w-full max-w-full min-w-0">
      <PageHeader
        title="Live Fleet Telemetry"
        subtitle="Real-time GPS positioning, heading speeds, and active route tracking."
        badge={`${movingCount} Active on Road`}
        icon={Navigation}
        actions={
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              GPS 10Hz Feed
            </span>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch min-w-0 w-full">
        {/* Map Container */}
        <div className="xl:col-span-2 h-[640px] rounded-3xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl p-2.5 overflow-hidden flex flex-col relative shadow-2xl min-w-0 w-full group">
          {/* 21st.dev Top specular highlight sheen */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent pointer-events-none z-20" />

          <VehicleMap
            vehicles={filteredVehicles}
            selectedVehicle={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
          />

          {/* Quick HUD Overlay at bottom of Map */}
          {selectedVehicle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 left-6 right-6 z-20 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl p-4 shadow-2xl flex items-center justify-between gap-4 flex-wrap"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  <Navigation size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    {selectedVehicle.number}
                  </h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <User size={12} className="text-slate-500" />
                    {selectedVehicle.driver}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/70 text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Speed</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">{selectedVehicle.speed}</span>
                </div>
                <Badge variant={statusVariant[selectedVehicle.status]}>
                  {selectedVehicle.status}
                </Badge>
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800/60"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Active Vehicles Telemetry Sidebar */}
        <Card className="h-[640px] flex flex-col p-5 min-w-0 w-full">
          <div className="space-y-3 pb-3 border-b border-slate-800/80 min-w-0">
            <div className="flex items-center justify-between gap-2 min-w-0">
              <div>
                <h3 className="text-base font-semibold text-white font-sans tracking-tight">
                  Fleet Units
                </h3>
                <p className="text-xs text-slate-400">Live units reporting telemetry</p>
              </div>
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tabular-nums">
                {filteredVehicles.length} Units
              </span>
            </div>

            {/* Quick Search */}
            <div className="relative min-w-0">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Filter by plate or driver..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-body"
              />
            </div>

            {/* Animated Status Filter Tabs (React Bits / Watermelon style) */}
            <div className="w-full flex justify-center pt-1">
              <AnimatedTabs
                tabs={trackingTabs}
                activeTab={filter}
                onChange={setFilter}
                size="sm"
                className="w-full justify-between"
              />
            </div>
          </div>

          {/* Vehicle List */}
          <div className="flex-1 overflow-y-auto space-y-2 pt-3 pr-1 min-w-0">
            {filteredVehicles.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-xs font-mono">
                No telemetry units match search filter.
              </div>
            ) : (
              filteredVehicles.map((v) => {
                const isSelected = selectedVehicle?.id === v.id;
                return (
                  <motion.div
                    key={v.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedVehicle(v)}
                    className={`flex items-center justify-between rounded-2xl p-3 cursor-pointer border transition-all duration-200 min-w-0 ${
                      isSelected
                        ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30"
                        : "bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                          v.status === "Moving"
                            ? "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"
                            : "bg-amber-400"
                        }`}
                      />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white tracking-tight font-display truncate">
                          {v.number}
                        </p>
                        <p className="text-xs text-slate-400 font-normal truncate">
                          {v.driver}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 flex flex-col items-end gap-1">
                      <Badge variant={statusVariant[v.status]}>{v.status}</Badge>
                      <span className="text-[11px] font-mono font-semibold text-emerald-400/90 tabular-nums">
                        {v.speed}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}