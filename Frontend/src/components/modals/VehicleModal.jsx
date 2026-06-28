import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const emptyForm = {
  number: "",
  type: "Truck",
  driver: "",
  status: "Active",
};

export default function VehicleModal({ isOpen, onClose, onSave, vehicle }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(vehicle ? vehicle : emptyForm);
  }, [vehicle, isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, id: vehicle ? vehicle.id : Date.now() });
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
          name="number"
          placeholder="Vehicle Number"
          value={form.number}
          onChange={handleChange}
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full h-12 rounded-xl bg-slate-900 border border-slate-700 px-4 outline-none text-white focus:border-emerald-500 transition-all"
        >
          <option value="Truck">Truck</option>
          <option value="Mini Truck">Mini Truck</option>
          <option value="Container">Container</option>
        </select>

        <Input
          name="driver"
          placeholder="Assigned Driver"
          value={form.driver}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full h-12 rounded-xl bg-slate-900 border border-slate-700 px-4 outline-none text-white focus:border-emerald-500 transition-all"
        >
          <option value="Active">Active</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" className="flex-1">
            {vehicle ? "Save Changes" : "Add Vehicle"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}