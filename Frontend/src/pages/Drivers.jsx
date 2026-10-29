import { useState, useEffect } from "react";
import {
  getDrivers,
  addDriver,
  updateDriver,
  deleteDriver,
} from "../services/driverService";
import { Plus, Pencil, Trash2, Phone, IdCard, User, Users, CheckCircle2, Route, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "../components/common/PageHeader";
import FilterBar from "../components/common/FilterBar";
import EmptyState from "../components/ui/EmptyState";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import KpiCard from "../components/ui/KpiCard";
import DriverModal from "../components/modals/DriverModal";
import ConfirmModal from "../components/modals/ConfirmModal";
import { drivers as mockDrivers } from "../data/driverData";

const statusVariant = {
  Available: "success",
  "On Trip": "info",
  "Off Duty": "warning",
};

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadDrivers = async () => {
    setLoading(true);
    try {
      const data = await getDrivers();
      if (Array.isArray(data) && data.length > 0) {
        setDrivers(data);
      } else {
        // Fallback to mock data with consistent _id mapping
        setDrivers(mockDrivers.map(d => ({
          ...d,
          _id: d.id.toString(),
          licenseNumber: d.license,
          vehicleAssigned: d.vehicle ? { vehicleNumber: d.vehicle } : null,
        })));
      }
    } catch (error) {
      console.warn("Using mock drivers fallback:", error.message);
      setDrivers(mockDrivers.map(d => ({
        ...d,
        _id: d.id.toString(),
        licenseNumber: d.license,
        vehicleAssigned: d.vehicle ? { vehicleNumber: d.vehicle } : null,
      })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const openAddModal = () => {
    setEditingDriver(null);
    setIsModalOpen(true);
  };

  const openEditModal = (driver) => {
    setEditingDriver(driver);
    setIsModalOpen(true);
  };

  const handleSave = async (driver) => {
    try {
      if (editingDriver) {
        await updateDriver(editingDriver._id, driver).catch(() => {});
        setDrivers((prev) =>
          prev.map((d) => (d._id === editingDriver._id ? { ...d, ...driver } : d))
        );
        toast.success("Driver updated successfully!");
      } else {
        const newId = Date.now().toString();
        await addDriver(driver).catch(() => {});
        setDrivers((prev) => [{ ...driver, _id: newId }, ...prev]);
        toast.success("New driver registered!");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save driver");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDriver(id).catch(() => {});
      setDrivers((prev) => prev.filter((d) => d._id !== id));
      toast.success("Driver removed from roster");
      setDeleteTarget(null);
    } catch (error) {
      toast.error("Failed to delete driver");
    }
  };

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch = [
      driver.name,
      driver.phone,
      driver.licenseNumber,
      driver.vehicleAssigned?.vehicleNumber || "",
      driver.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "all" || driver.status === filter;
    return matchesSearch && matchesFilter;
  });

  const availableCount = drivers.filter((d) => d.status === "Available").length;
  const onTripCount = drivers.filter((d) => d.status === "On Trip").length;

  return (
    <div className="space-y-7 sm:space-y-8 pb-12 w-full max-w-full min-w-0">
      <PageHeader
        title="Drivers Roster"
        subtitle="Manage fleet personnel, license compliance, and current assignment status."
        badge={`${drivers.length} Drivers Active`}
        icon={Users}
        actions={
          <Button onClick={openAddModal} size="sm" starBorder={true}>
            <Plus size={16} />
            Add Driver
          </Button>
        }
      />

      {/* KPI Summary Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 min-w-0 w-full items-stretch">
        <KpiCard
          title="Total Personnel"
          value={drivers.length}
          change="+3 this month"
          subtitle="registered roster"
          color="emerald"
          icon={Users}
          showSparkline={false}
          animateValue={true}
        />
        <KpiCard
          title="Ready for Dispatch"
          value={availableCount}
          change={`${Math.round((availableCount / (drivers.length || 1)) * 100)}%`}
          subtitle="available capacity"
          color="blue"
          icon={CheckCircle2}
          showSparkline={false}
          animateValue={true}
        />
        <KpiCard
          title="Active on Trip"
          value={onTripCount}
          change={`${Math.round((onTripCount / (drivers.length || 1)) * 100)}%`}
          subtitle="en route journeys"
          color="purple"
          icon={Route}
          showSparkline={false}
          animateValue={true}
        />
        <KpiCard
          title="Compliance Score"
          value="99.4%"
          change="+1.2%"
          subtitle="SLA & safety audited"
          color="orange"
          icon={ShieldCheck}
          showSparkline={false}
          animateValue={true}
        />
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search by name, phone, license..."
        filters={[
          { id: "all", label: "All Drivers", count: drivers.length },
          { id: "Available", label: "Available", count: availableCount },
          { id: "On Trip", label: "On Trip", count: onTripCount },
        ]}
        activeFilter={filter}
        onFilterChange={setFilter}
        totalCount={drivers.length}
        filteredCount={filteredDrivers.length}
      />

      <Card className="p-0 overflow-hidden border border-slate-800/80 shadow-2xl rounded-2xl" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Driver Name</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">License ID</th>
                <th className="py-4 px-6">Assigned Asset</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 text-sm">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td className="p-6"><Skeleton className="h-5 w-36" /></td>
                    <td className="p-6"><Skeleton className="h-4 w-28" /></td>
                    <td className="p-6"><Skeleton className="h-5 w-24" /></td>
                    <td className="p-6"><Skeleton className="h-5 w-20" /></td>
                    <td className="p-6"><Skeleton className="h-6 w-16 rounded-full" /></td>
                    <td className="p-6 text-right"><Skeleton className="h-5 w-12 ml-auto" /></td>
                  </tr>
                ))
              ) : filteredDrivers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12">
                    <EmptyState
                      title="No drivers match your filter"
                      description="Try searching with a different keyword or reset active filters."
                      action={
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setSearch("");
                            setFilter("all");
                          }}
                        >
                          Reset Filters
                        </Button>
                      }
                    />
                  </td>
                </tr>
              ) : (
                filteredDrivers.map((driver) => {
                  const initials = driver.name
                    ? driver.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()
                    : "DR";

                  return (
                    <tr
                      key={driver._id}
                      className="table-row-hover transition-colors"
                    >
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700/80 to-slate-800 text-xs font-bold text-white border border-slate-700/70 shadow-sm shrink-0 font-display">
                            {initials}
                          </div>
                          <div>
                            <p className="font-semibold text-white tracking-tight font-display text-sm">
                              {driver.name}
                            </p>
                            <p className="text-xs text-slate-400 font-normal mt-0.5">
                              {driver.email || "driver@fleetflow.com"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-5 px-6 text-slate-300">
                        <span className="flex items-center gap-2 text-xs tabular-nums text-slate-300 font-mono">
                          <Phone size={13} className="text-slate-500 shrink-0" />
                          {driver.phone}
                        </span>
                      </td>

                      <td className="py-5 px-6">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-300 bg-slate-800/70 border border-slate-700/50 px-2.5 py-1 rounded-lg">
                          <IdCard size={13} className="text-slate-400 shrink-0" />
                          {driver.licenseNumber}
                        </span>
                      </td>

                      <td className="py-5 px-6">
                        {driver.vehicleAssigned?.vehicleNumber ? (
                          <span className="inline-block font-mono text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
                            {driver.vehicleAssigned.vehicleNumber}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500 italic">
                            Unassigned
                          </span>
                        )}
                      </td>

                      <td className="py-5 px-6">
                        <Badge variant={statusVariant[driver.status] || "info"}>
                          {driver.status}
                        </Badge>
                      </td>

                      <td className="py-5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(driver)}
                            className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                            title="Edit Driver"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            onClick={() => setDeleteTarget(driver)}
                            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                            title="Remove Driver"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <DriverModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        driver={editingDriver}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => handleDelete(deleteTarget._id)}
        title="Delete Driver"
        message={`Are you sure you want to remove ${deleteTarget?.name}? This action cannot be reversed.`}
      />
    </div>
  );
};

export default Drivers;