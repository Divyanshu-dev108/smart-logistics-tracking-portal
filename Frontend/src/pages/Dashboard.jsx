import { useEffect, useState, Suspense } from "react";
import { Truck, Users, Route, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import StatsCard from "../components/cards/StatsCard";
import ActivityCard from "../components/cards/ActivityCard";
import AreaChart from "../components/charts/AreaChart";
import PieChart from "../components/charts/PieChart";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import DataMesh3D from "../components/3d/DataMesh3D";
import { getDashboardStats } from "../services/dashboardService";
import { revenueData, tripStatusData, recentActivity } from "../data/dashboardData";

const statIcons = { 1: Truck, 2: Users, 3: Route, 4: IndianRupee };

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setIsLoading(true);
    // Artificial delay to show off beautiful skeleton loaders
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const data = await getDashboardStats();
      setStats([
        { id: 1, title: "Total Drivers", value: data.totalDrivers, change: "+5%", color: "emerald" },
        { id: 2, title: "Total Vehicles", value: data.totalVehicles, change: "+12%", color: "blue" },
        { id: 3, title: "Total Trips", value: data.totalTrips, change: "+8%", color: "yellow" },
        { id: 4, title: "Active Trips", value: data.activeTrips, change: "+3%", color: "purple" },
      ]);
    } catch (err) {
      setStats([
        { id: 1, title: "Fleet Vehicles", value: 128, change: "+12%", color: "emerald" },
        { id: 2, title: "Active Drivers", value: 76, change: "+5%", color: "blue" },
        { id: 3, title: "Running Trips", value: 39, change: "+8%", color: "yellow" },
        { id: 4, title: "Revenue", value: "₹12.4L", change: "+16%", color: "purple" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Suspense fallback={null}>
        <DataMesh3D />
      </Suspense>

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 space-y-8 pb-8">
        <motion.div variants={item}>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Good Evening 👋
          </h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">
            Here's an overview of your logistics network.
          </p>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((card) => (
            <StatsCard key={card.id} {...card} icon={statIcons[card.id]} />
          ))}
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
                <p className="text-sm text-slate-400">Last 7 months</p>
              </div>
            </div>
            <AreaChart data={revenueData} />
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-white mb-1">Trip Status</h3>
            <p className="text-sm text-slate-400 mb-4">Current breakdown</p>
            <PieChart data={tripStatusData} />
            <div className="space-y-2 mt-4">
              {tripStatusData.map((dataItem) => (
                <div key={dataItem.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-300">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: dataItem.color }}
                    />
                    {dataItem.name}
                  </span>
                  <span className="text-slate-400">{dataItem.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <h3 className="text-lg font-semibold text-white mb-2">Recent Activity</h3>
            <div className="divide-y divide-slate-800/60">
              {recentActivity.map((activity) => (
                <ActivityCard key={activity.id} {...activity} />
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}