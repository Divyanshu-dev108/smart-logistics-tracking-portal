import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const emptyForm = {
  registrationNumber: "",
  vehicleType: "Truck",
  model: "",
  capacity: "",
  status: "Active",
};

export default function VehicleModal({
  isOpen,
  onClose,
  onSave,
  vehicle,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (vehicle) {
      setForm({
        registrationNumber: vehicle.registrationNumber || "",
        vehicleType: vehicle.vehicleType || "Truck",
        model: vehicle.model || "",
        capacity: vehicle.capacity || "",
        status: vehicle.status || "Active",
      });
    } else {
      setForm(emptyForm);
    }
  }, [vehicle, isOpen]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...form,
      registrationNumber: form.registrationNumber.trim(),
      model: form.model.trim(),
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={vehicle ? "Edit Vehicle" : "Add Vehicle"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">

        <Input
          name="registrationNumber"
          placeholder="Registration Number"
          value={form.registrationNumber}
          onChange={handleChange}
          required
        />

        <select
          name="vehicleType"
          value={form.vehicleType}
          onChange={handleChange}
          className="w-full h-12 rounded-xl bg-slate-900 border border-slate-700 px-4 text-white"
        >
          <option value="Truck">Truck</option>
          <option value="Mini Truck">Mini Truck</option>
          <option value="Container">Container</option>
          <option value="Van">Van</option>
          <option value="Auto">Auto</option>
        </select>

        <Input
          name="model"
          placeholder="Vehicle Model"
          value={form.model}
          onChange={handleChange}
          required
        />

        <Input
          name="capacity"
          type="number"
          placeholder="Capacity (kg)"
          value={form.capacity}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full h-12 rounded-xl bg-slate-900 border border-slate-700 px-4 text-white"
        >
          <option value="Active">Active</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Inactive">Inactive</option>
          <option value="Out for Repair">Out for Repair</option>
        </select>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="flex-1"
          >
            {vehicle ? "Save Changes" : "Add Vehicle"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}