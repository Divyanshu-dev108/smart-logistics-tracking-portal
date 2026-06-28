import DashboardCard from "../components/DashboardCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", trips: 40 },
  { month: "Feb", trips: 55 },
  { month: "Mar", trips: 70 },
  { month: "Apr", trips: 65 },
  { month: "May", trips: 90 },
  { month: "Jun", trips: 120 },
];

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Logistics Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          title="Total Vehicles"
          value="120"
          color="bg-blue-600"
        />

        <DashboardCard
          title="Drivers"
          value="85"
          color="bg-green-600"
        />

        <DashboardCard
          title="Active Trips"
          value="48"
          color="bg-yellow-500"
        />

        <DashboardCard
          title="Completed"
          value="560"
          color="bg-purple-600"
        />
      </div>

      {/* Chart */}
      <div className="bg-white mt-8 p-5 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          Monthly Trips
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="trips" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;