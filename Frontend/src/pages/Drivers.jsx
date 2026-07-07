import { useState } from "react";
import { Plus, Phone, IdCard, Pencil, Trash2 } from "lucide-react";

import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import DriverModal from "../components/modals/DriverModal";
import ConfirmModal from "../components/modals/ConfirmModal";
import { useEffect } from "react";
import {
  getDrivers,
  addDriver,
  updateDriver,
  deleteDriver,
} from "../services/driverService";

const statusVariant = {
  Available: "success",
  "On Trip": "info",
};

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredDrivers = drivers.filter((d) =>
    [
      d.name,
      d.phone,
      d.email,
      d.licenseNumber,
      d.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
        await updateDriver(driver._id, driver);
      } else {
        await addDriver(driver);
      }
  
      await loadDrivers();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDriver(id);
      await loadDrivers();
      setDeleteTarget(null);
    } catch (error) {
      console.error(error);
    }
  };
  
  const loadDrivers = async () => {
    try {
      const data = await getDrivers();
      setDrivers(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadDrivers();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Drivers</h1>
          <p className="text-slate-400 mt-2">
            Manage your fleet drivers and their assignments.
          </p>
        </div>

        <Button onClick={openAddModal}>
          <Plus size={18} className="mr-2" />
          Add Driver
        </Button>
      </div>

      <Input
        placeholder="Search drivers..."
        className="max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Card className="p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 text-left text-slate-400 text-sm">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Phone</th>
              <th className="p-4 font-medium">License</th>
              <th className="p-4 font-medium">Vehicle</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {filteredDrivers.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  No drivers found.
                </td>
              </tr>
            ) : (
              filteredDrivers.map((driver) => (
                <tr
                  key={driver._id}
                  className="border-b border-slate-800 last:border-0 hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-4 text-white font-medium">{driver.name}</td>

                  <td className="p-4 text-slate-300">
                    <span className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-500" />
                      {driver.phone}
                    </span>
                  </td>

                  <td className="p-4 text-slate-300">
                    <span className="flex items-center gap-2">
                      <IdCard size={14} className="text-slate-500" />
                      {driver.licenseNumber}
                    </span>
                  </td>

                  <td className="p-4 text-slate-300">{driver.vehicleAssigned?.vehicleNumber || "Not Assigned"}</td>

                  <td className="p-4">
                    <Badge variant={statusVariant[driver.status] || "info"}>
                      {driver.status}
                    </Badge>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => openEditModal(driver)}
                        className="text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => setDeleteTarget(driver)}
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
        message={`Are you sure you want to remove ${deleteTarget?.name}? This cannot be undone.`}
      />
    </div>
  );
};

export default Drivers;