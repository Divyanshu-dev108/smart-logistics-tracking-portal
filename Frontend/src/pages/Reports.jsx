import { Download } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import {
  monthlyTrips,
  driverPerformance,
  reportSummary,
} from "../data/reportData";

const Reports = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Reports</h1>
          <p className="text-slate-400 mt-2">
            Performance insights across your fleet.
          </p>
        </div>

        <Button variant="secondary">
          <Download size={18} className="mr-2" />
          Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportSummary.map((item) => (
          <Card key={item.id} className="space-y-3">
            <p className="text-slate-400 text-sm">{item.title}</p>
            <h2 className="text-3xl font-bold text-white">{item.value}</h2>
            <span className="text-emerald-400 text-sm">
              {item.change} vs last period
            </span>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Trips vs Delivered
            </h3>
            <p className="text-sm text-slate-400">Monthly breakdown</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2 text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
              Total
            </span>
            <span className="flex items-center gap-2 text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Delivered
            </span>
          </div>
        </div>

        <BarChart data={monthlyTrips} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-white mb-1">
            Driver On-Time Performance
          </h3>
          <p className="text-sm text-slate-400 mb-4">% of trips on time</p>

          <LineChart
            data={driverPerformance.map((d) => ({
              name: d.name.split(" ")[0],
              onTime: d.onTime,
            }))}
          />
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">
            Top Drivers
          </h3>

          <div className="space-y-3">
            {driverPerformance
              .sort((a, b) => b.trips - a.trips)
              .map((driver, index) => (
                <div
                  key={driver.name}
                  className="flex items-center justify-between rounded-xl bg-slate-800/50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold">
                      {index + 1}
                    </span>

                    <div>
                      <p className="text-sm font-medium text-white">
                        {driver.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {driver.trips} trips
                      </p>
                    </div>
                  </div>

                  <span className="text-emerald-400 text-sm font-semibold">
                    {driver.onTime}%
                  </span>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;