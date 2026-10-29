import { useState } from "react";
import { TrendingUp, Fuel, Clock, Leaf, BarChart2 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import PageHeader from "../components/common/PageHeader";
import ChartContainer from "../components/charts/ChartContainer";
import Card from "../components/ui/Card";
import SpotlightCard from "../components/ui/SpotlightCard";
import KpiCard from "../components/ui/KpiCard";
import AnimatedTabs from "../components/ui/AnimatedTabs";
import {
  fleetUtilization,
  costBreakdown,
  routeEfficiency,
  vehicleTypeDistribution,
  analyticsKpis,
} from "../data/analyticsData";

const kpiIcons = {
  1: TrendingUp,
  2: Fuel,
  3: Clock,
  4: Leaf,
};

const kpiColors = {
  1: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    spotlight: "rgba(16, 185, 129, 0.16)",
    glowBorder: "rgba(16, 185, 129, 0.4)",
  },
  2: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    spotlight: "rgba(59, 130, 246, 0.16)",
    glowBorder: "rgba(59, 130, 246, 0.4)",
  },
  3: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    spotlight: "rgba(245, 158, 11, 0.16)",
    glowBorder: "rgba(245, 158, 11, 0.4)",
  },
  4: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/30",
    spotlight: "rgba(168, 85, 247, 0.16)",
    glowBorder: "rgba(168, 85, 247, 0.4)",
  },
};

const tooltipStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.92)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  color: "#f8fafc",
  fontFamily: "var(--font-body)",
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.6)",
};

const timeRanges = [
  { id: "7D", label: "7D" },
  { id: "30D", label: "30D" },
  { id: "90D", label: "90D" },
  { id: "1Y", label: "1Y" },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30D");

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      <PageHeader
        title="Fleet Analytics & Insights"
        subtitle="Telemetry data models, fuel expenditure indexes, and routing time efficiencies."
        badge="Live Metrics"
        icon={BarChart2}
        actions={
          <AnimatedTabs
            tabs={timeRanges}
            activeTab={timeRange}
            onChange={setTimeRange}
            size="sm"
            layoutId="analyticsTimeRangeTabs"
          />
        }
      />

      {/* KPI Cards with 21st.dev / ReactBits MagicBento Effects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 min-w-0 w-full items-stretch">
        {analyticsKpis.map((kpi) => {
          const Icon = kpiIcons[kpi.id];
          const colorMap = { 1: "emerald", 2: "blue", 3: "orange", 4: "purple" };

          return (
            <KpiCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              subtitle="vs baseline"
              color={colorMap[kpi.id] || "emerald"}
              icon={Icon}
              showSparkline={false}
              animateValue={true}
            />
          );
        })}
      </div>

      {/* Utilization + Cost Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch min-w-0 w-full">
        <ChartContainer
          title="Fleet Utilization Trend"
          subtitle="% of fleet actively running, last 7 months"
          className="xl:col-span-2 min-w-0 w-full"
        >
          <div className="w-full h-[280px] min-w-0 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fleetUtilization}>
                <defs>
                  <linearGradient id="utilGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Utilization"]} />

                <Area
                  type="monotone"
                  dataKey="utilization"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#utilGradient)"
                  activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <ChartContainer
          title="Cost Breakdown"
          subtitle="% of total operating cost"
          className="min-w-0 w-full"
        >
          <div className="w-full h-[200px] min-w-0 overflow-hidden flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  cornerRadius={6}
                >
                  {costBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-4 pt-3 border-t border-slate-800/80 min-w-0">
            {costBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs min-w-0">
                <span className="flex items-center gap-2 text-slate-300 font-medium truncate">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate">{item.name}</span>
                </span>
                <span className="text-slate-300 font-mono font-semibold tabular-nums">{item.value}%</span>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Route Efficiency + Vehicle Type */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch min-w-0 w-full">
        <ChartContainer
          title="Route Efficiency"
          subtitle="Average trip duration by route (hours)"
          className="xl:col-span-2 min-w-0 w-full"
        >
          <div className="w-full h-[280px] min-w-0 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={routeEfficiency} layout="vertical" margin={{ left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="route"
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                  width={130}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} hrs`, "Avg Time"]} />
                <Bar dataKey="avgTime" fill="#10b981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <ChartContainer
          title="Vehicle Type Mix"
          subtitle="Active fleet composition"
          className="min-w-0 w-full"
        >
          <div className="w-full h-[200px] min-w-0 overflow-hidden flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehicleTypeDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  cornerRadius={6}
                >
                  {vehicleTypeDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-4 pt-3 border-t border-slate-800/80 min-w-0">
            {vehicleTypeDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs min-w-0">
                <span className="flex items-center gap-2 text-slate-300 font-medium truncate">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate">{item.name}</span>
                </span>
                <span className="text-slate-300 font-mono font-semibold tabular-nums">{item.value}</span>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>
    </div>
  );
}