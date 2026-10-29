import { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { Truck, Users, Route, IndianRupee, Navigation, Plus, Activity, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "../components/common/PageHeader";
import KpiCard from "../components/ui/KpiCard";
import ActivityCard from "../components/cards/ActivityCard";
import AreaChart from "../components/charts/AreaChart";
import PieChart from "../components/charts/PieChart";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import DataMesh3D from "../components/3d/DataMesh3D";
import ShinyText from "../components/ui/ShinyText";
import ClickSpark from "../components/ui/ClickSpark";
import StarBorder from "../components/ui/StarBorder";
import { getDashboardStats } from "../services/dashboardService";
import { revenueData, tripStatusData, recentActivity } from "../data/dashboardData";

const statIcons = { 1: Truck, 2: Users, 3: Route, 4: IndianRupee };

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 24 },
  },
};

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      const data = await getDashboardStats();
      setStats([
        { id: 1, title: "Fleet Vehicles", value: data.totalVehicles || 128, change: "+12%", color: "emerald" },
        { id: 2, title: "Active Drivers", value: data.totalDrivers || 76, change: "+5%", color: "blue" },
        { id: 3, title: "Active Trips", value: data.activeTrips || 39, change: "+8%", color: "yellow" },
        { id: 4, title: "Total Revenue", value: "₹12.4L", change: "+16%", color: "purple" },
      ]);
    } catch (err) {
      setStats([
        { id: 1, title: "Fleet Vehicles", value: 128, change: "+12%", color: "emerald" },
        { id: 2, title: "Active Drivers", value: 76, change: "+5%", color: "blue" },
        { id: 3, title: "Active Trips", value: 39, change: "+8%", color: "yellow" },
        { id: 4, title: "Total Revenue", value: "₹12.4L", change: "+16%", color: "purple" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-full min-w-0 overflow-hidden">
      <Suspense fallback={null}>
        <DataMesh3D />
      </Suspense>

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 space-y-6 pb-8 w-full max-w-full min-w-0">
        <motion.div variants={item}>
          <PageHeader
            title={<ShinyText text={`${getGreeting()} 👋`} speed={4} />}
            subtitle="Real-time operational overview of your smart logistics network."
            badge="Live Telemetry"
            actions={
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <ClickSpark sparkColor="#10b981">
                  <StarBorder speed="6s" color="rgba(16, 185, 129, 0.4)">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={loadDashboard}
                      className="text-xs h-8"
                    >
                      <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
                      Sync
                    </Button>
                  </StarBorder>
                </ClickSpark>

                <ClickSpark sparkColor="#3b82f6">
                  <Link to="/admin/tracking">
                    <Button variant="secondary" size="sm" className="text-xs h-8">
                      <Navigation size={13} />
                      Live Map
                    </Button>
                  </Link>
                </ClickSpark>

                <ClickSpark sparkColor="#10b981">
                  <StarBorder speed="4s" color="#10b981">
                    <Link to="/admin/trips">
                      <Button variant="primary" size="sm" className="text-xs h-8">
                        <Plus size={14} />
                        New Trip
                      </Button>
                    </Link>
                  </StarBorder>
                </ClickSpark>
              </div>
            }
          />
        </motion.div>

        {/* Stats Grid with MagicBento 3D tilt and DecryptedText */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 min-w-0 w-full items-stretch">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-white/[0.08] bg-slate-900/60 p-5 space-y-3 min-w-0 w-full">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))
            : stats.map((card) => (
                <KpiCard key={card.id} {...card} icon={statIcons[card.id]} />
              ))}
        </motion.div>

        {/* Charts Grid */}
        <motion.div variants={item} className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch min-w-0 w-full">
          <Card className="xl:col-span-2 flex flex-col justify-between p-5 sm:p-6 min-w-0 w-full overflow-hidden">
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-3 mb-5 flex-wrap min-w-0">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-white font-sans tracking-tight truncate">Revenue Overview</h3>
                  <p className="text-xs text-slate-400 font-normal mt-0.5 truncate">Historical earnings across last 7 months</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-slate-400">Monthly Run Rate</span>
                </div>
              </div>
            </div>
            <div className="flex-1 min-h-[280px] w-full min-w-0 overflow-hidden">
              {isLoading ? (
                <Skeleton className="h-[280px] w-full rounded-xl" />
              ) : (
                <AreaChart data={revenueData} />
              )}
            </div>
          </Card>

          <Card className="flex flex-col justify-between p-5 sm:p-6 min-w-0 w-full overflow-hidden">
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap min-w-0">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-white font-sans tracking-tight truncate">Trip Status</h3>
                  <p className="text-xs text-slate-400 font-normal mt-0.5 truncate">Current operational breakdown</p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tabular-nums shrink-0">
                  199 Total
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center min-w-0 w-full">
              {isLoading ? (
                <Skeleton className="h-[240px] w-full rounded-xl" />
              ) : (
                <>
                  <div className="w-full min-w-0 overflow-hidden flex justify-center">
                    <PieChart data={tripStatusData} />
                  </div>
                  <div className="space-y-2 mt-4 pt-3 border-t border-slate-800/70 min-w-0">
                    {tripStatusData.map((dataItem) => (
                      <div key={dataItem.name} className="flex items-center justify-between text-xs min-w-0 gap-2">
                        <span className="flex items-center gap-2 text-slate-300 font-medium truncate min-w-0">
                          <span
                            className="h-2 w-2 rounded-full shrink-0"
                            style={{ backgroundColor: dataItem.color }}
                          />
                          <span className="truncate">{dataItem.name}</span>
                        </span>
                        <span className="text-slate-300 font-semibold tabular-nums shrink-0">{dataItem.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={item} className="min-w-0 w-full">
          <Card className="min-w-0 w-full">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap min-w-0">
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-white font-sans tracking-tight truncate">Recent Dispatch Activity</h3>
                <p className="text-xs text-slate-400 font-normal mt-0.5 truncate">Automated telemetry & status changes</p>
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
                Auto-syncing
              </span>
            </div>
            <div className="divide-y divide-slate-800/60 min-w-0">
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