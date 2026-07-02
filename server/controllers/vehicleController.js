const Vehicle = require("../models/Vehicle");

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("assignedDriver");
    res.status(200).json({ vehicles });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vehicles", error: error.message });
  }
};

// Get single vehicle
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate("assignedDriver");
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ vehicle });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vehicle", error: error.message });
  }
};

// Create vehicle
exports.createVehicle = async (req, res) => {
  try {
    const { registrationNumber, vehicleType, model, capacity } = req.body;

    if (!registrationNumber || !vehicleType || !model || !capacity) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const existingVehicle = await Vehicle.findOne({ registrationNumber });
    if (existingVehicle) {
      return res.status(400).json({ message: "Vehicle already registered" });
    }

    const vehicle = new Vehicle(req.body);
    await vehicle.save();

    res.status(201).json({ message: "Vehicle created successfully", vehicle });
  } catch (error) {
    res.status(500).json({ message: "Failed to create vehicle", error: error.message });
  }
};

// Update vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("assignedDriver");

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ message: "Vehicle updated successfully", vehicle });
  } catch (error) {
    res.status(500).json({ message: "Failed to update vehicle", error: error.message });
  }
};

// Delete vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete vehicle", error: error.message });
  }
};
