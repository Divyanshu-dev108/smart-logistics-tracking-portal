import { useState } from "react";
import { Link } from "react-router-dom";
import { Route, CheckCircle2, Clock, MapPinned, Play, Check, Truck } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import KpiCard from "../../components/ui/KpiCard";
import { trips as initialTrips } from "../../data/tripData";

const statusVariant = {
  Delivered: "success",
  "In Transit": "info",
  Pending: "warning",
};

const currentDriver = "Rahul Sharma";

export default function DriverHome() {
  const [driverTrips, setDriverTrips] = useState(
    initialTrips.filter((t) => t.driver === currentDriver)
  );

  const active = driverTrips.filter((t) => t.status === "In Transit").length;
  const delivered = driverTrips.filter((t) => t.status === "Delivered").length;
  const pending = driverTrips.filter((t) => t.status === "Pending").length;

  const updateTripStatus = (id, newStatus) => {
    setDriverTrips((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    toast.success(`Trip ${id} marked as ${newStatus}!`);
  };

  return (
    <div className="space-y-7 sm:space-y-8 pb-12 w-full max-w-full min-w-0">
      <PageHeader
        title={`Welcome back, ${currentDriver.split(" ")[0]} 👋`}
        subtitle="Review your assigned transport legs, route itineraries, and mark checkpoint handoffs."
        badge="Active Shift"
        icon={Truck}
        actions={
          <Link to="/driver/tracking">
            <Button size="sm" variant="secondary">
              <MapPinned size={15} />
              Open GPS Telemetry
            </Button>
          </Link>
        }
      />

      {/* Driver Metric Cards with MagicBento & DecryptedText */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 min-w-0 w-full items-stretch">
        <KpiCard
          title="In Transit"
          value={active}
          change="+1"
          subtitle="live leg"
          color="blue"
          icon={Route}
          showSparkline={false}
          animateValue={true}
        />

        <KpiCard
          title="Delivered Today"
          value={delivered}
          change="100%"
          subtitle="on schedule"
          color="emerald"
          icon={CheckCircle2}
          showSparkline={false}
          animateValue={true}
        />

        <KpiCard
          title="Pending Next"
          value={pending}
          change="Upcoming"
          subtitle="queued dispatch"
          color="orange"
          icon={Clock}
          showSparkline={false}
          animateValue={true}
        />
      </div>

      {/* Trips Today */}
      <Card className="p-6 sm:p-7 border border-slate-800/80 shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold text-white font-sans tracking-tight">
              Assigned Journeys Today
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live status toggles and handover verification
            </p>
          </div>
        </div>

        {driverTrips.length === 0 ? (
          <p className="text-slate-500 text-sm py-8 text-center font-body">
            No trips assigned to your roster for today. Check back later!
          </p>
        ) : (
          <div className="space-y-3">
            {driverTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-slate-800/40 border border-slate-800/80 p-4 hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      {trip.id}
                    </span>
                    <p className="text-base font-semibold text-white font-display">
                      {trip.source} → {trip.destination}
                    </p>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-body">
                    Vehicle Asset: <span className="font-mono text-slate-300 font-medium">{trip.vehicle}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={statusVariant[trip.status] || "info"}>
                    {trip.status}
                  </Badge>

                  {trip.status === "Pending" && (
                    <Button
                      size="sm"
                      onClick={() => updateTripStatus(trip.id, "In Transit")}
                      className="text-xs py-1 h-8"
                    >
                      <Play size={12} />
                      Start Transit
                    </Button>
                  )}

                  {trip.status === "In Transit" && (
                    <Button
                      size="sm"
                      onClick={() => updateTripStatus(trip.id, "Delivered")}
                      className="text-xs py-1 h-8 bg-gradient-to-r from-emerald-500 to-teal-600"
                    >
                      <Check size={12} />
                      Mark Delivered
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}