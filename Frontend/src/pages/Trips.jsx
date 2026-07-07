import { useState, useEffect } from "react";

import {
  getTrips,
  addTrip,
  updateTrip,
  deleteTrip,
} from "../services/tripService";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import TripModal from "../components/modals/TripModal";
import ConfirmModal from "../components/modals/ConfirmModal";

const statusVariant = {
  Delivered: "success",
  "In Transit": "info",
  Pending: "warning",
};

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  useEffect(() => {
    loadTrips();
  }, []);
  
  const loadTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTrips = trips.filter((t) =>
    [
      t.tripId,
      t.source,
      t.destination,
      t.driver?.name || "",
      t.vehicle?.registrationNumber || "",
      t.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
        await updateTrip(editingTrip._id, trip);
      } else {
        await addTrip(trip);
      }
  
      await loadTrips();
  
      setIsModalOpen(false);
  
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTrip(id);
  
      await loadTrips();
  
      setDeleteTarget(null);
  
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Trips</h1>
          <p className="text-slate-400 mt-2">
            Monitor all ongoing and completed trips.
          </p>
        </div>

        <Button onClick={openAddModal}>
          <Plus size={18} className="mr-2" />
          Create Trip
        </Button>
      </div>

      <Input
        placeholder="Search trips..."
        className="max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Card className="p-0 overflow-hidden overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 text-left text-slate-400 text-sm">
              <th className="p-4 font-medium">Trip ID</th>
              <th className="p-4 font-medium">Source</th>
              <th className="p-4 font-medium">Destination</th>
              <th className="p-4 font-medium">Driver</th>
              <th className="p-4 font-medium">Vehicle</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {filteredTrips.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  No trips found.
                </td>
              </tr>
            ) : (
              filteredTrips.map((trip) => (
                <tr
                  key={trip._id}
                  className="border-b border-slate-800 last:border-0 hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-4 text-white font-medium">{trip.tripId}</td>
                  <td className="p-4 text-slate-300">{trip.source}</td>
                  <td className="p-4 text-slate-300">{trip.destination}</td>
                  <td className="p-4 text-slate-300">{trip.driver?.name || "Unknown"}</td>
                  <td className="p-4 text-slate-300">{trip.vehicle?.registrationNumber || "Unknown"}</td>

                  <td className="p-4">
                    <Badge variant={statusVariant[trip.status] || "info"}>
                      {trip.status}
                    </Badge>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => openEditModal(trip)}
                        className="text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => setDeleteTarget(trip)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
        title="Delete Trip"
        message={`Are you sure you want to delete trip ${deleteTarget?.tripId}? This cannot be undone.`}
      />
    </div>
  );
};

export default Trips;