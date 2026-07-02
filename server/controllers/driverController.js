const Driver = require("../models/Driver");

// Get all drivers
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().populate("vehicleAssigned");
    res.status(200).json({ drivers });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch drivers", error: error.message });
  }
};

// Get single driver
exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate("vehicleAssigned");
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json({ driver });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch driver", error: error.message });
  }
};

// Create driver
exports.createDriver = async (req, res) => {
  try {
    const { name, phone, email, licenseNumber } = req.body;

    if (!name || !phone || !email || !licenseNumber) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return res.status(400).json({ message: "Driver email already exists" });
    }

    const driver = new Driver(req.body);
    await driver.save();

    res.status(201).json({ message: "Driver created successfully", driver });
  } catch (error) {
    res.status(500).json({ message: "Failed to create driver", error: error.message });
  }
};

// Update driver
exports.updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("vehicleAssigned");

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({ message: "Driver updated successfully", driver });
  } catch (error) {
    res.status(500).json({ message: "Failed to update driver", error: error.message });
  }
};

// Delete driver
exports.deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete driver", error: error.message });
  }
};
