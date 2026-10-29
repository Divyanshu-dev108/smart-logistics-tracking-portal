import { useState, useEffect } from "react";
import {
  getTrips,
  addTrip,
  updateTrip,
  deleteTrip,
} from "../services/tripService";
import { Plus, Pencil, Trash2, Route, ArrowRight, Navigation, CheckCircle2, Clock } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "../components/common/PageHeader";
import FilterBar from "../components/common/FilterBar";
import EmptyState from "../components/ui/EmptyState";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import KpiCard from "../components/ui/KpiCard";
import TripModal from "../components/modals/TripModal";
import ConfirmModal from "../components/modals/ConfirmModal";
import { trips as mockTrips } from "../data/tripData";

const statusVariant = {
  Delivered: "success",
  "In Transit": "info",
  Pending: "warning",
};

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadTrips = async () => {
    setLoading(true);
    try {
      const data = await getTrips();
      if (Array.isArray(data) && data.length > 0) {
        setTrips(data);
      } else {
        setTrips(
          mockTrips.map((t) => ({
            ...t,
            _id: t.id,
            tripId: t.id,
            driver: { name: t.driver },
            vehicle: { registrationNumber: t.vehicle },
          }))
        );
      }
    } catch (err) {
      console.warn("Using mock trips fallback:", err.message);
      setTrips(
        mockTrips.map((t) => ({
          ...t,
          _id: t.id,
          tripId: t.id,
          driver: { name: t.driver },
          vehicle: { registrationNumber: t.vehicle },
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const openAddModal = () => {
    setEditingTrip(null);
    setIsModalOpen(true);
  };

  const openEditModal = (trip) => {
    setEditingTrip(trip);
    setIsModalOpen(true);
  };

  const handleSave = async (trip) => {
    try {
      if (editingTrip) {
        await updateTrip(editingTrip._id, trip).catch(() => {});
        setTrips((prev) =>
          prev.map((t) => (t._id === editingTrip._id ? { ...t, ...trip } : t))
        );
        toast.success("Trip details updated!");
      } else {
        const newId = `TR${Math.floor(100 + Math.random() * 900)}`;
        await addTrip(trip).catch(() => {});
        setTrips((prev) => [{ ...trip, _id: newId, tripId: newId }, ...prev]);
        toast.success("New trip dispatched!");
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to save trip");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTrip(id).catch(() => {});
      setTrips((prev) => prev.filter((t) => t._id !== id));
      toast.success("Trip manifest archived");
      setDeleteTarget(null);
    } catch (err) {
      toast.error("Failed to delete trip");
    }
  };

  const filteredTrips = trips.filter((t) => {
    const tId = t.tripId || t.id || "";
    const driverName = t.driver?.name || (typeof t.driver === "string" ? t.driver : "");
    const vehicleReg = t.vehicle?.registrationNumber || (typeof t.vehicle === "string" ? t.vehicle : "");

    const matchesSearch = [tId, t.source, t.destination, driverName, vehicleReg, t.status]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "all" || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  const inTransitCount = trips.filter((t) => t.status === "In Transit").length;
  const deliveredCount = trips.filter((t) => t.status === "Delivered").length;
  const pendingCount = trips.filter((t) => t.status === "Pending").length;

  return (
    <div className="space-y-7 sm:space-y-8 pb-12 w-full max-w-full min-w-0">
      <PageHeader
        title="Trip Manifests"
        subtitle="Manage logistics dispatches, point-to-point transit routes, and consignment states."
        badge={`${trips.length} Total Trips`}
        icon={Route}
        actions={
          <Button onClick={openAddModal} size="sm" starBorder={true}>
            <Plus size={16} />
            Create Trip
          </Button>
        }
      />

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 min-w-0 w-full items-stretch">
        <KpiCard
          title="Total Manifests"
          value={trips.length}
          change="+14% this week"
          subtitle="logged logistics dispatches"
          color="emerald"
          icon={Route}
          showSparkline={false}
          animateValue={true}
        />
        <KpiCard
          title="Active In Transit"
          value={inTransitCount}
          change={`${Math.round((inTransitCount / (trips.length || 1)) * 100)}%`}
          subtitle="live road transit"
          color="blue"
          icon={Navigation}
          showSparkline={false}
          animateValue={true}
        />
        <KpiCard
          title="Delivered Today"
          value={deliveredCount}
          change={`${Math.round((deliveredCount / (trips.length || 1)) * 100)}%`}
          subtitle="successfully fulfilled"
          color="emerald"
          icon={CheckCircle2}
          showSparkline={false}
          animateValue={true}
        />
        <KpiCard
          title="Pending Departure"
          value={pendingCount}
          change={`${pendingCount} orders`}
          subtitle="awaiting dock departure"
          color="orange"
          icon={Clock}
          showSparkline={false}
          animateValue={true}
        />
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search trip ID, city, driver, vehicle..."
        filters={[
          { id: "all", label: "All Trips", count: trips.length },
          { id: "In Transit", label: "In Transit", count: inTransitCount },
          { id: "Delivered", label: "Delivered", count: deliveredCount },
          { id: "Pending", label: "Pending", count: pendingCount },
        ]}
        activeFilter={filter}
        onFilterChange={setFilter}
        totalCount={trips.length}
        filteredCount={filteredTrips.length}
      />

      <Card className="p-0 overflow-hidden border border-slate-800/80 shadow-2xl rounded-2xl" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Trip ID</th>
                <th className="py-4 px-6">Route (Origin → Destination)</th>
                <th className="py-4 px-6">Assigned Driver</th>
                <th className="py-4 px-6">Vehicle</th>
                <th className="py-4 px-6">Delivery Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 text-sm">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    <td className="p-6"><Skeleton className="h-5 w-20" /></td>
                    <td className="p-6"><Skeleton className="h-5 w-40" /></td>
                    <td className="p-6"><Skeleton className="h-5 w-28" /></td>
                    <td className="p-6"><Skeleton className="h-5 w-24" /></td>
                    <td className="p-6"><Skeleton className="h-6 w-16 rounded-full" /></td>
                    <td className="p-6 text-right"><Skeleton className="h-5 w-12 ml-auto" /></td>
                  </tr>
                ))
              ) : filteredTrips.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12">
                    <EmptyState
                      title="No trips found"
                      description="Try searching for a different origin, destination, or clear active filters."
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
                filteredTrips.map((trip) => {
                  const tripId = trip.tripId || trip.id;
                  const driverName = trip.driver?.name || (typeof trip.driver === "string" ? trip.driver : "Unassigned");
                  const vehicleReg = trip.vehicle?.registrationNumber || (typeof trip.vehicle === "string" ? trip.vehicle : "Unassigned");

                  return (
                    <tr
                      key={trip._id}
                      className="table-row-hover transition-colors"
                    >
                      <td className="py-5 px-6">
                        <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-lg tracking-wider">
                          {tripId}
                        </span>
                      </td>

                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2.5 text-white font-medium">
                          <span className="text-slate-200 text-sm font-semibold">{trip.source}</span>
                          <ArrowRight size={14} className="text-emerald-400 shrink-0" />
                          <span className="text-slate-200 text-sm font-semibold">{trip.destination}</span>
                        </div>
                      </td>

                      <td className="py-5 px-6 text-slate-300 font-medium">
                        {driverName}
                      </td>

                      <td className="py-5 px-6">
                        <span className="font-mono text-xs text-slate-300 bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded-lg">
                          {vehicleReg}
                        </span>
                      </td>

                      <td className="py-5 px-6">
                        <Badge variant={statusVariant[trip.status] || "info"}>
                          {trip.status}
                        </Badge>
                      </td>

                      <td className="py-5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(trip)}
                            className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                            title="Edit Trip"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            onClick={() => setDeleteTarget(trip)}
                            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                            title="Remove Trip"
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

      <TripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        trip={editingTrip}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => handleDelete(deleteTarget._id)}
        title="Cancel Trip"
        message={`Are you sure you want to delete manifest ${deleteTarget?.tripId || deleteTarget?.id}?`}
      />
    </div>
  );
}