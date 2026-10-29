import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Truck, ShieldAlert, CheckCircle2, Wrench, Activity } from "lucide-react";
import toast from "react-hot-toast";
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicleService";
import PageHeader from "../components/common/PageHeader";
import FilterBar from "../components/common/FilterBar";
import EmptyState from "../components/ui/EmptyState";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import KpiCard from "../components/ui/KpiCard";
import VehicleModal from "../components/modals/VehicleModal";
import ConfirmModal from "../components/modals/ConfirmModal";
import { vehicles as mockVehicles } from "../data/vehicleData";

const statusVariant = {
  Active: "success",
  Maintenance: "warning",
  Inactive: "danger",
};

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      const data = await getVehicles();
      if (Array.isArray(data) && data.length > 0) {
        setVehicles(data);
      } else {
        setVehicles(
          mockVehicles.map((v) => ({
            ...v,
            _id: v.id.toString(),
            registrationNumber: v.number,
            driver: { name: v.driver },
          }))
        );
      }
    } catch (err) {
      console.warn("Using mock vehicles fallback:", err.message);
      setVehicles(
        mockVehicles.map((v) => ({
          ...v,
          _id: v.id.toString(),
          registrationNumber: v.number,
          driver: { name: v.driver },
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const openAddModal = () => {
    setEditingVehicle(null);
    setIsModalOpen(true);
  };

  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleSave = async (vehicle) => {
    try {
      if (editingVehicle) {
        await updateVehicle(editingVehicle._id, vehicle).catch(() => {});
        setVehicles((prev) =>
          prev.map((v) => (v._id === editingVehicle._id ? { ...v, ...vehicle } : v))
        );
        toast.success("Vehicle details updated!");
      } else {
        const newId = Date.now().toString();
        await addVehicle(vehicle).catch(() => {});
        setVehicles((prev) => [{ ...vehicle, _id: newId }, ...prev]);
        toast.success("New vehicle added to fleet!");
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to save vehicle");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id).catch(() => {});
      setVehicles((prev) => prev.filter((v) => v._id !== id));
      toast.success("Vehicle decommissioned from fleet");
      setDeleteTarget(null);
    } catch (err) {
      toast.error("Failed to delete vehicle");
    }
  };

  const filteredVehicles = vehicles.filter((v) => {
    const regNum = v.registrationNumber || v.number || "";
    const driverName = v.driver?.name || (typeof v.driver === "string" ? v.driver : "");
    const matchesSearch = [regNum, v.type, driverName, v.status]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "all" || v.status === filter;
    return matchesSearch && matchesFilter;
  });

  const activeCount = vehicles.filter((v) => v.status === "Active").length;
  const maintenanceCount = vehicles.filter((v) => v.status === "Maintenance").length;

  return (
    <div className="space-y-7 sm:space-y-8 pb-12 w-full max-w-full min-w-0">
      <PageHeader
        title="Fleet Assets"
        subtitle="Real-time status, vehicle classifications, and assigned drivers across all hubs."
        badge={`${vehicles.length} Vehicles Tracked`}
        icon={Truck}
        actions={
          <Button onClick={openAddModal} size="sm" starBorder={true}>
            <Plus size={16} />
            Add Vehicle
          </Button>
        }
      />

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 min-w-0 w-full items-stretch">
        <KpiCard
          title="Total Fleet"
          value={vehicles.length}
          change="+2 this quarter"
          subtitle="registered commercial assets"
          color="emerald"
          icon={Truck}
          showSparkline={false}
          animateValue={true}
        />
        <KpiCard
          title="Active in Service"
          value={activeCount}
          change={`${Math.round((activeCount / (vehicles.length || 1)) * 100)}%`}
          subtitle="on-road operations"
          color="blue"
          icon={CheckCircle2}
          showSparkline={false}
          animateValue={true}
        />
        <KpiCard
          title="Under Maintenance"
          value={maintenanceCount}
          change={`${maintenanceCount} units`}
          subtitle="workshop & inspection"
          color="orange"
          icon={Wrench}
          showSparkline={false}
          animateValue={true}
        />
        <KpiCard
          title="Fleet Reliability"
          value="99.1%"
          change="+0.8%"
          subtitle="operational uptime score"
          color="purple"
          icon={Activity}
          showSparkline={false}
          animateValue={true}
        />
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search by vehicle registration, type, driver..."
        filters={[
          { id: "all", label: "All Fleet", count: vehicles.length },
          { id: "Active", label: "Active", count: activeCount },
          { id: "Maintenance", label: "Maintenance", count: maintenanceCount },
        ]}
        activeFilter={filter}
        onFilterChange={setFilter}
        totalCount={vehicles.length}
        filteredCount={filteredVehicles.length}
      />

      <Card className="p-0 overflow-hidden border border-slate-800/80 shadow-2xl rounded-2xl" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Plate / Asset ID</th>
                <th className="py-4 px-6">Vehicle Category</th>
                <th className="py-4 px-6">Designated Driver</th>
                <th className="py-4 px-6">Operating Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 text-sm">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    <td className="p-6"><Skeleton className="h-5 w-32" /></td>
                    <td className="p-6"><Skeleton className="h-5 w-28" /></td>
                    <td className="p-6"><Skeleton className="h-5 w-24" /></td>
                    <td className="p-6"><Skeleton className="h-6 w-16 rounded-full" /></td>
                    <td className="p-6 text-right"><Skeleton className="h-5 w-12 ml-auto" /></td>
                  </tr>
                ))
              ) : filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12">
                    <EmptyState
                      title="No vehicles match your query"
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
                filteredVehicles.map((vehicle) => {
                  const plate = vehicle.registrationNumber || vehicle.number;
                  const driverName = vehicle.driver?.name || (typeof vehicle.driver === "string" ? vehicle.driver : "Unassigned");

                  return (
                    <tr
                      key={vehicle._id}
                      className="table-row-hover transition-colors"
                    >
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 shadow-sm">
                            <Truck size={18} />
                          </div>
                          <span className="font-mono text-sm font-semibold text-white tracking-wide">
                            {plate}
                          </span>
                        </div>
                      </td>

                      <td className="py-5 px-6 text-slate-300 font-medium">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
                          {vehicle.type || "Medium Duty"}
                        </span>
                      </td>

                      <td className="py-5 px-6 text-slate-300">
                        {driverName !== "Unassigned" ? (
                          <span className="font-medium text-slate-200">
                            {driverName}
                          </span>
                        ) : (
                          <span className="text-slate-500 italic text-xs">
                            Unassigned
                          </span>
                        )}
                      </td>

                      <td className="py-5 px-6">
                        <Badge variant={statusVariant[vehicle.status] || "info"}>
                          {vehicle.status}
                        </Badge>
                      </td>

                      <td className="py-5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(vehicle)}
                            className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                            title="Edit Vehicle"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            onClick={() => setDeleteTarget(vehicle)}
                            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                            title="Remove Vehicle"
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

      <VehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        vehicle={editingVehicle}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => handleDelete(deleteTarget._id)}
        title="Decommission Vehicle"
        message={`Are you sure you want to remove ${deleteTarget?.registrationNumber || deleteTarget?.number}? This action cannot be reversed.`}
      />
    </div>
  );
}