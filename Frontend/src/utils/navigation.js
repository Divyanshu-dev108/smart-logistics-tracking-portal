import {
  LayoutDashboard,
  Truck,
  Users,
  Route,
  MapPinned,
  ChartColumn,
  FileBarChart,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Fleet",
    path: "/vehicles",
    icon: Truck,
  },

  {
    title: "Drivers",
    path: "/drivers",
    icon: Users,
  },

  {
    title: "Trips",
    path: "/trips",
    icon: Route,
  },

  {
    title: "Tracking",
    path: "/tracking",
    icon: MapPinned,
  },

  {
    title: "Reports",
    path: "/reports",
    icon: FileBarChart,
  },

  {
    title: "Analytics",
    path: "/analytics",
    icon: ChartColumn,
  },

  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];