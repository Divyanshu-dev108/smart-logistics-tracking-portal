import { Download, FileText, CheckCircle2, Route, Clock, Fuel } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/ui/Card";
import SpotlightCard from "../components/ui/SpotlightCard";
import KpiCard from "../components/ui/KpiCard";
import Button from "../components/ui/Button";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import {
  monthlyTrips,
  driverPerformance,
  reportSummary,
} from "../data/reportData";

const reportIcons = {
  1: Route,
  2: CheckCircle2,
  3: Clock,
  4: Fuel,
};

export default function Reports() {
  const handleExport = () => {
    toast.success("Generating quarterly performance PDF report...", {
      icon: "📄",
    });
  };

  const reportColors = ["emerald", "blue", "purple", "orange"];

  return (
    <div className="space-y-7 sm:space-y-8 pb-12 w-full max-w-full min-w-0">
      <PageHeader
        title="Fleet Performance Reports"
        subtitle="Consolidated delivery metrics, driver efficiency KPIs, and monthly fulfillment summaries."
        badge="Q1 Analytics"
        icon={FileText}
        actions={
          <Button variant="primary" size="sm" onClick={handleExport} starBorder={true}>
            <Download size={15} />
            Export PDF
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 min-w-0 w-full items-stretch">
        {reportSummary.map((item, idx) => (
          <KpiCard
            key={item.id}
            title={item.title}
            value={item.value}
            change={item.change}
            subtitle="vs last cycle"
            color={reportColors[idx % reportColors.length]}
            icon={reportIcons[item.id]}
            showSparkline={false}
            animateValue={true}
          />
        ))}
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-base font-semibold text-white font-sans tracking-tight">
              Dispatched vs Delivered Trips
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Month-by-month fulfillment ratio</p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-2 text-slate-300 font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
              Total Dispatched
            </span>
            <span className="flex items-center gap-2 text-slate-300 font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Successfully Delivered
            </span>
          </div>
        </div>

        <BarChart data={monthlyTrips} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white font-sans tracking-tight">
              Driver On-Time Reliability
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Percentage of deliveries completed within SLA</p>
          </div>

          <LineChart
            data={driverPerformance.map((d) => ({
              name: d.name.split(" ")[0],
              onTime: d.onTime,
            }))}
          />
        </Card>

        <Card>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white font-sans tracking-tight">
              Top Ranked Drivers
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Ranked by completed trip count & SLA rate</p>
          </div>

          <div className="space-y-2.5">
            {driverPerformance
              .sort((a, b) => b.trips - a.trips)
              .map((driver, index) => (
                <div
                  key={driver.name}
                  className="flex items-center justify-between rounded-xl bg-slate-800/40 border border-slate-800/70 p-3 hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 border border-slate-700/80 text-emerald-400 text-xs font-bold font-display">
                      #{index + 1}
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-white font-display">
                        {driver.name}
                      </p>
                      <p className="text-xs text-slate-400 tabular-nums">
                        {driver.trips} completed trips
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-bold tabular-nums font-display">
                      {driver.onTime}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}