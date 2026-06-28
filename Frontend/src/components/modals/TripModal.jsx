import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const emptyForm = {
  source: "",
  destination: "",
  driver: "",
  vehicle: "",
  status: "Pending",
};

export default function TripModal({ isOpen, onClose, onSave, trip }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(trip ? trip : emptyForm);
  }, [trip, isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, id: trip ? trip.id : `TR${Date.now()}` });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={trip ? "Edit Trip" : "Create Trip"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="source"
          placeholder="Source"
          value={form.source}
          onChange={handleChange}
          required
        />

        <Input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />

        <Input
          name="driver"
          placeholder="Driver"
          value={form.driver}
          onChange={handleChange}
          required
        />

        <Input
          name="vehicle"
          placeholder="Vehicle Number"
          value={form.vehicle}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full h-12 rounded-xl bg-slate-900 border border-slate-700 px-4 outline-none text-white focus:border-emerald-500 transition-all"
        >
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" className="flex-1">
            {trip ? "Save Changes" : "Create Trip"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}