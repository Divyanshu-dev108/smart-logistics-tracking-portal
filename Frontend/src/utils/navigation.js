import {
  LayoutDashboard,
  Truck,
  Users,
  Route,
  MapPinned,
  ChartColumn,
  FileBarChart,
  Settings,
  Home,
  Package,
} from "lucide-react";

export const adminNavigation = [
  { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Fleet", path: "/admin/vehicles", icon: Truck },
  { title: "Drivers", path: "/admin/drivers", icon: Users },
  { title: "Trips", path: "/admin/trips", icon: Route },
  { title: "Tracking", path: "/admin/tracking", icon: MapPinned },
  { title: "Reports", path: "/admin/reports", icon: FileBarChart },
  { title: "Analytics", path: "/admin/analytics", icon: ChartColumn },
  { title: "Settings", path: "/admin/settings", icon: Settings },
];

export const driverNavigation = [
  { title: "Home", path: "/driver/home", icon: Home },
  { title: "My Trips", path: "/driver/trips", icon: Route },
  { title: "Live Tracking", path: "/driver/tracking", icon: MapPinned },
  { title: "Settings", path: "/driver/settings", icon: Settings },
];

export const customerNavigation = [
  { title: "Track Shipment", path: "/customer/home", icon: Package },
  { title: "My Orders", path: "/customer/trips", icon: Route },
  { title: "Settings", path: "/customer/settings", icon: Settings },
];

// kept for backward compatibility, in case anything still imports `navigation`
export const navigation = adminNavigation;