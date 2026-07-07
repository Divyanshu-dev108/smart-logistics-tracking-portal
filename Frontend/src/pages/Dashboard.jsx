import StatsCard from "../components/cards/StatsCard";
import ActivityCard from "../components/cards/ActivityCard";
import AreaChart from "../components/charts/AreaChart";
import PieChart from "../components/charts/PieChart";
import Card from "../components/ui/Card";
import {
  revenueData,
  tripStatusData,
  recentActivity,
} from "../data/dashboardData";

import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

export default function Dashboard() {
  const [stats, setStats] = useState([]);

useEffect(() => {
  loadDashboard();
}, []);

const loadDashboard = async () => {
  try {
    const data = await getDashboardStats();

    setStats([
      {
        id: 1,
        title: "Total Drivers",
        value: data.totalDrivers,
      },
      {
        id: 2,
        title: "Total Vehicles",
        value: data.totalVehicles,
      },
      {
        id: 3,
        title: "Total Trips",
        value: data.totalTrips,
      },
      {
        id: 4,
        title: "Active Trips",
        value: data.activeTrips,
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Good Evening 👋</h1>
        <p className="text-slate-400 mt-2">
          Here's an overview of your logistics network.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((card) => (
          <StatsCard key={card.id} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Revenue Overview
              </h3>
              <p className="text-sm text-slate-400">Last 7 months</p>
            </div>
          </div>

          <AreaChart data={revenueData} />
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-1">
            Trip Status
          </h3>
          <p className="text-sm text-slate-400 mb-4">Current breakdown</p>

          <PieChart data={tripStatusData} />

          <div className="space-y-2 mt-4">
            {tripStatusData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
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
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-2">
          Recent Activity
        </h3>

        <div className="divide-y divide-slate-800">
          {recentActivity.map((activity) => (
            <ActivityCard key={activity.id} {...activity} />
          ))}
        </div>
      </Card>
    </div>
  );
}