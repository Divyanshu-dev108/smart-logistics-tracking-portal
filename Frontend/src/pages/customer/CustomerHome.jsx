import { useState } from "react";
import { Search, Package, MapPin, Truck, CheckCircle2, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { trips } from "../../data/tripData";

const statusVariant = {
  Delivered: "success",
  "In Transit": "info",
  Pending: "warning",
};

const timelineStages = [
  { key: "booked", label: "Booked & Manifested", desc: "Warehouse processed cargo" },
  { key: "dispatched", label: "Dispatched from Hub", desc: "Handled by carrier fleet" },
  { key: "transit", label: "In Transit", desc: "En route via highway corridor" },
  { key: "out_for_delivery", label: "Local Delivery", desc: "Assigned for destination drop" },
  { key: "delivered", label: "Delivered", desc: "Recipient acknowledged receipt" },
];

export default function CustomerHome() {
  const [query, setQuery] = useState("TR001");
  const [result, setResult] = useState(trips[0] || null);
  const [searched, setSearched] = useState(true);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const found = trips.find(
      (t) => t.id.toLowerCase() === query.trim().toLowerCase()
    );
    setResult(found || null);
    setSearched(true);
  };

  const getStageIndex = (status) => {
    if (status === "Delivered") return 4;
    if (status === "In Transit") return 2;
    return 1;
  };

  const currentStage = result ? getStageIndex(result.status) : 0;

  return (
    <div className="space-y-7 sm:space-y-8 pb-12 w-full max-w-full min-w-0">
      <PageHeader
        title="Track Consignment"
        subtitle="Monitor end-to-end shipment progress, driver telemetry, and delivery checkpoints."
        badge="Real-time Tracking"
        icon={Package}
      />

      {/* Search Box */}
      <Card className="p-6 sm:p-7 border border-slate-800/80 shadow-2xl rounded-2xl">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Enter Waybill or Trip ID (e.g. TR001, TR002)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="md" starBorder={true} className="shrink-0">
            <Search size={16} />
            Track Shipment
          </Button>
        </form>

        <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Popular Waybills:</span>
          {trips.slice(0, 3).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setQuery(t.id);
                setResult(t);
                setSearched(true);
              }}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 font-mono text-[11px] transition-colors"
            >
              {t.id}
            </button>
          ))}
        </div>
      </Card>

      {/* Tracking Details & Visual Timeline */}
      {searched && (
        <Card className="p-6">
          {result ? (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                    <Package size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-xl font-bold text-white font-mono tracking-wide">
                        {result.id}
                      </h2>
                      <Badge variant={statusVariant[result.status] || "info"}>
                        {result.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                      <span>{result.source}</span>
                      <ArrowRight size={12} className="text-emerald-400" />
                      <span>{result.destination}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-300 bg-slate-900/60 border border-slate-800 px-4 py-2.5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Truck size={14} className="text-emerald-400" />
                    <span className="font-mono">{result.vehicle}</span>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-800" />
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-blue-400" />
                    <span>{result.driver}</span>
                  </div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
                  Shipment Milestone Progression
                </h3>

                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-800 hidden sm:block">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-700 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                      style={{
                        width: `${(currentStage / (timelineStages.length - 1)) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Milestones */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                    {timelineStages.map((stage, idx) => {
                      const isPastOrCurrent = idx <= currentStage;
                      const isCurrent = idx === currentStage;

                      return (
                        <div
                          key={stage.key}
                          className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2"
                        >
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                              isCurrent
                                ? "bg-emerald-500 border-white text-white shadow-lg shadow-emerald-500/50 scale-110 ring-4 ring-emerald-500/20"
                                : isPastOrCurrent
                                ? "bg-slate-900 border-emerald-500 text-emerald-400"
                                : "bg-slate-900 border-slate-700 text-slate-500"
                            }`}
                          >
                            {isPastOrCurrent ? (
                              <CheckCircle2 size={16} />
                            ) : (
                              <span className="text-xs font-mono">{idx + 1}</span>
                            )}
                          </div>

                          <div>
                            <p
                              className={`text-xs font-semibold ${
                                isPastOrCurrent ? "text-white font-display" : "text-slate-500"
                              }`}
                            >
                              {stage.label}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                              {stage.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-slate-400">
                No active shipment found for waybill ID "<span className="text-white font-semibold">{query}</span>".
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Please double check the ID format and try again.
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Shipment Manifest History */}
      <Card className="p-6">
        <h3 className="text-base font-semibold text-white font-sans tracking-tight mb-4">
          All Active Consignments
        </h3>

        <div className="space-y-2.5">
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => {
                setQuery(trip.id);
                setResult(trip);
                setSearched(true);
              }}
              className="flex items-center justify-between rounded-xl bg-slate-800/40 border border-slate-800/80 p-3.5 hover:bg-slate-800/70 hover:border-emerald-500/40 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  {trip.id}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">
                    {trip.source} → {trip.destination}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Assigned: {trip.driver} • Asset: {trip.vehicle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={statusVariant[trip.status] || "info"}>
                  {trip.status}
                </Badge>
                <ArrowRight size={14} className="text-slate-500" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}