import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import AdminLayout from "./layouts/AdminLayout";
import DriverLayout from "./layouts/DriverLayout";
import CustomerLayout from "./layouts/CustomerLayout";

import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Vehicles from "./pages/Vehicles";
import Trips from "./pages/Trips";
import Tracking from "./pages/Tracking";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";

import DriverHome from "./pages/driver/DriverHome";
import CustomerHome from "./pages/customer/CustomerHome";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin area */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="trips" element={<Trips />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="reports" element={<Reports />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Driver area */}
        <Route path="/driver" element={<DriverLayout />}>
          <Route path="home" element={<DriverHome />} />
          <Route path="trips" element={<Trips />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Customer area */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route path="home" element={<CustomerHome />} />
          <Route path="trips" element={<Trips />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}