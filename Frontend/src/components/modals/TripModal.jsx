import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const emptyForm = {
  tripId: "",
  source: "",
  destination: "",
  driver: "",
  vehicle: "",
  revenue: 0,
  status: "Pending",
};

export default function TripModal({
  isOpen,
  onClose,
  onSave,
  trip,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (trip) {
      setForm({
        tripId: trip.tripId || "",
        source: trip.source || "",
        destination: trip.destination || "",
        driver: trip.driver?.name || "",
        vehicle: trip.vehicle?.registrationNumber || "",
        revenue: trip.revenue || 0,
        status: trip.status || "Pending",
      });
    } else {
      setForm(emptyForm);
    }
  }, [trip, isOpen]);

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
      tripId: form.tripId.trim(),
      source: form.source.trim(),
      destination: form.destination.trim(),
      driver: form.driver.trim(),
      vehicle: form.vehicle.trim(),
      revenue: Number(form.revenue),
    });

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
          name="tripId"
          placeholder="Trip ID (Optional)"
          value={form.tripId}
          onChange={handleChange}
        />

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
          placeholder="Driver Name"
          value={form.driver}
          onChange={handleChange}
          required
        />

        <Input
          name="vehicle"
          placeholder="Vehicle Registration Number"
          value={form.vehicle}
          onChange={handleChange}
          required
        />

        <Input
          name="revenue"
          type="number"
          placeholder="Revenue"
          value={form.revenue}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full h-12 rounded-xl bg-slate-900 border border-slate-700 px-4 text-white"
        >
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
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
            {trip ? "Save Changes" : "Create Trip"}
          </Button>
        </div>

      </form>
    </Modal>
  );
}