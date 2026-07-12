import { Circle } from "lucide-react";
import { Suspense } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import VehicleMap from "../components/map/VehicleMap";
import AbstractTruck3D from "../components/3d/AbstractTruck3D";
import { vehicleLocations } from "../data/trackingData";

const statusVariant = {
  Moving: "success",
  Stopped: "warning",
};

const Tracking = () => {
  return (
    <div className="relative space-y-8">
      <Suspense fallback={null}>
        <AbstractTruck3D />
      </Suspense>

      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white">Live Tracking</h1>
        <p className="text-slate-400 mt-2">
          Real-time location of your active fleet.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 h-[480px] p-2">
          <VehicleMap vehicles={vehicleLocations} />
        </Card>

        <Card className="h-[480px] overflow-y-auto">
          <h3 className="text-lg font-semibold text-white mb-4">
            Active Vehicles
          </h3>

          <div className="space-y-3">
            {vehicleLocations.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between rounded-xl bg-slate-800/50 p-3"
              >
                <div className="flex items-center gap-3">
                  <Circle
                    size={10}
                    fill={v.status === "Moving" ? "#10b981" : "#f59e0b"}
                    className={
                      v.status === "Moving"
                        ? "text-emerald-400"
                        : "text-yellow-400"
                    }
                  />

                  <div>
                    <p className="text-sm font-medium text-white">
                      {v.number}
                    </p>
                    <p className="text-xs text-slate-400">{v.driver}</p>
                  </div>
                </div>

                <div className="text-right">
                  <Badge variant={statusVariant[v.status]}>{v.status}</Badge>
                  <p className="text-xs text-slate-500 mt-1">{v.speed}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Tracking;