import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const emptyForm = {
  name: "",
  phone: "",
  license: "",
  vehicle: "",
  status: "Available",
};

export default function DriverModal({ isOpen, onClose, onSave, driver }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(driver ? driver : emptyForm);
  }, [driver, isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, id: driver ? driver.id : Date.now() });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={driver ? "Edit Driver" : "Add Driver"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <Input
          name="license"
          placeholder="License Number"
          value={form.license}
          onChange={handleChange}
          required
        />

        <Input
          name="vehicle"
          placeholder="Assigned Vehicle No."
          value={form.vehicle}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full h-12 rounded-xl bg-slate-900 border border-slate-700 px-4 outline-none text-white focus:border-emerald-500 transition-all"
        >
          <option value="Available">Available</option>
          <option value="On Trip">On Trip</option>
        </select>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" className="flex-1">
            {driver ? "Save Changes" : "Add Driver"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}