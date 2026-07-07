import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicleService";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import VehicleModal from "../components/modals/VehicleModal";
import ConfirmModal from "../components/modals/ConfirmModal";

const statusVariant = {
  Active: "success",
  Maintenance: "warning",
};

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredVehicles = vehicles.filter((v) =>
    [
      v.registrationNumber,
      v.vehicleType,
      v.model,
      v.assignedDriver?.name || "",
      v.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
        await updateVehicle(editingVehicle._id, vehicle);
      } else {
        await addVehicle(vehicle);
      }
  
      await loadVehicles();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id);
  
      await loadVehicles();
  
      setDeleteTarget(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);
  
  const loadVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Vehicles</h1>
          <p className="text-slate-400 mt-2">
            Track and manage your entire fleet.
          </p>
        </div>

        <Button onClick={openAddModal}>
          <Plus size={18} className="mr-2" />
          Add Vehicle
        </Button>
      </div>

      <Input
        placeholder="Search vehicles..."
        className="max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Card className="p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 text-left text-slate-400 text-sm">
              <th className="p-4 font-medium">Vehicle No.</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Driver</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No vehicles found.
                </td>
              </tr>
            ) : (
              filteredVehicles.map((vehicle) => (
                <tr
                  key={vehicle._id}
                  className="border-b border-slate-800 last:border-0 hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-4 text-white font-medium">
                    {vehicle.registrationNumber}
                  </td>

                  <td className="p-4 text-slate-300">{vehicle.vehicleType}</td>
                  <td className="p-4 text-slate-300">{vehicle.assignedDriver?.name || "Not Assigned"}</td>

                  <td className="p-4">
                    <Badge variant={statusVariant[vehicle.status] || "info"}>
                      {vehicle.status}
                    </Badge>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => openEditModal(vehicle)}
                        className="text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => setDeleteTarget(vehicle)}
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
        title="Delete Vehicle"
        message={`Are you sure you want to remove ${deleteTarget?.registrationNumber}? This cannot be undone.`}
      />
    </div>
  );
};

export default Vehicles;