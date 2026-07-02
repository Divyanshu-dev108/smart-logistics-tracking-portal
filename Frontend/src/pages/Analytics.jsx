import { TrendingUp, Fuel, Clock, Leaf } from "lucide-react";
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
import ChartContainer from "../components/charts/ChartContainer";
import Card from "../components/ui/Card";
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
  1: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  2: { bg: "bg-blue-500/15", text: "text-blue-400" },
  3: { bg: "bg-yellow-500/15", text: "text-yellow-400" },
  4: { bg: "bg-purple-500/15", text: "text-purple-400" },
};

const tooltipStyle = {
  backgroundColor: "#0f172a",
  border: "1px solid #1e293b",
  borderRadius: "12px",
  color: "#f8fafc",
};

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Analytics</h1>
        <p className="text-slate-400 mt-2">
          Deep insights into fleet efficiency, cost, and utilization.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsKpis.map((kpi) => {
          const Icon = kpiIcons[kpi.id];
          const c = kpiColors[kpi.id];

          return (
            <Card key={kpi.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-slate-400 text-sm">{kpi.title}</p>
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${c.bg}`}>
                  <Icon size={16} className={c.text} />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white">{kpi.value}</h2>

              <span className={`text-sm font-medium ${c.text}`}>
                {kpi.change} vs last period
              </span>
            </Card>
          );
        })}
      </div>

      {/* Utilization + Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartContainer
          title="Fleet Utilization Trend"
          subtitle="% of fleet actively running, last 7 months"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={fleetUtilization}>
              <defs>
                <linearGradient id="utilGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Utilization"]} />

              <Area
                type="monotone"
                dataKey="utilization"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#utilGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Cost Breakdown" subtitle="% of total operating cost">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={costBreakdown}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
              >
                {costBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-2 mt-4">
            {costBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </span>
                <span className="text-slate-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Route Efficiency + Vehicle Type */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartContainer
          title="Route Efficiency"
          subtitle="Average trip duration by route (hours)"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={routeEfficiency} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" stroke="#64748b" tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="route"
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
                width={140}
              />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} hrs`, "Avg Time"]} />
              <Bar dataKey="avgTime" fill="#10b981" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Vehicle Type Mix" subtitle="Active fleet composition">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={vehicleTypeDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
              >
                {vehicleTypeDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-2 mt-4">
            {vehicleTypeDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </span>
                <span className="text-slate-400">{item.value}</span>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>
    </div>
  );
}