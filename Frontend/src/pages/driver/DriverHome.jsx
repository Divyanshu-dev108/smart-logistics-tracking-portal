import { Route, CheckCircle2, Clock, MapPinned } from "lucide-react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { trips } from "../../data/tripData";

const statusVariant = {
  Delivered: "success",
  "In Transit": "info",
  Pending: "warning",
};

// demo: pretend the logged-in driver is Rahul Sharma
const currentDriver = "Rahul Sharma";

export default function DriverHome() {
  const myTrips = trips.filter((t) => t.driver === currentDriver);
  const active = myTrips.filter((t) => t.status === "In Transit").length;
  const delivered = myTrips.filter((t) => t.status === "Delivered").length;
  const pending = myTrips.filter((t) => t.status === "Pending").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Welcome back, {currentDriver.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-400 mt-2">
          Here's what's on your schedule today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-sm">In Transit</p>
            <Route size={18} className="text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">{active}</h2>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-sm">Delivered</p>
            <CheckCircle2 size={18} className="text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">{delivered}</h2>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-sm">Pending</p>
            <Clock size={18} className="text-yellow-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">{pending}</h2>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">My Trips Today</h3>
          <Button size="sm" variant="secondary">
            <MapPinned size={16} className="mr-2" />
            Open Live Map
          </Button>
        </div>

        {myTrips.length === 0 ? (
          <p className="text-slate-500 text-sm py-6 text-center">
            No trips assigned yet.
          </p>
        ) : (
          <div className="space-y-3">
            {myTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center justify-between rounded-xl bg-slate-800/50 p-4"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {trip.source} → {trip.destination}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Trip {trip.id} • Vehicle {trip.vehicle}
                  </p>
                </div>

                <Badge variant={statusVariant[trip.status] || "info"}>
                  {trip.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}