import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTruck,
  FaUserTie,
  FaRoute,
  FaMapMarkedAlt,
  FaChartBar,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Drivers", path: "/drivers", icon: <FaUserTie /> },
    { name: "Vehicles", path: "/vehicles", icon: <FaTruck /> },
    { name: "Trips", path: "/trips", icon: <FaRoute /> },
    { name: "Tracking", path: "/tracking", icon: <FaMapMarkedAlt /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center py-6">
        Smart Logistics
      </h1>

      <div className="flex flex-col gap-2 px-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;