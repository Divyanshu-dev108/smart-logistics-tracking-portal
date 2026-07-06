const Trip = require("../models/Trip");
const Driver = require("../models/Driver");
const Vehicle = require("../models/Vehicle");

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("driver")
      .populate("vehicle");
    res.status(200).json({ trips });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trips", error: error.message });
  }
};

// Get single trip
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("driver")
      .populate("vehicle");
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json({ trip });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trip", error: error.message });
  }
};

// Create trip
exports.createTrip = async (req, res) => {
  try {
    const {
      tripId,
      driver,
      vehicle,
      source,
      destination,
      revenue,
    } = req.body;

    if (!tripId || !driver || !vehicle || !source || !destination || !revenue) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    // Trip ID already exists?
    const existingTrip = await Trip.findOne({ tripId });

    if (existingTrip) {
      return res.status(400).json({
        message: "Trip ID already exists",
      });
    }

    // Driver exists?
    const driverExists = await Driver.findById(driver);

    if (!driverExists) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    // Vehicle exists?
    const vehicleExists = await Vehicle.findById(vehicle);

    if (!vehicleExists) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    // Driver already busy?
    const activeDriverTrip = await Trip.findOne({
      driver,
      status: {
        $in: ["Pending", "In Transit"],
      },
    });

    if (activeDriverTrip) {
      return res.status(400).json({
        message: "Driver already has an active trip",
      });
    }

    // Vehicle already busy?
    const activeVehicleTrip = await Trip.findOne({
      vehicle,
      status: {
        $in: ["Pending", "In Transit"],
      },
    });

    if (activeVehicleTrip) {
      return res.status(400).json({
        message: "Vehicle already has an active trip",
      });
    }

    const trip = await Trip.create(req.body);

    await Driver.findByIdAndUpdate(driver, {
      $inc: { totalTrips: 1 },
      status: "On Trip",
    });

    await Vehicle.findByIdAndUpdate(vehicle, {
      $inc: { totalTrips: 1 },
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Trip ID already exists",
      });
    }

    res.status(500).json({
      message: "Failed to create trip",
      error: error.message,
    });
  }
};

// Update trip
exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("driver")
      .populate("vehicle");

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    if (trip.status === "Delivered") {
      await Driver.findByIdAndUpdate(trip.driver._id, {
        status: "Available",
      });
    }

    res.status(200).json({
      message: "Trip updated successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update trip",
      error: error.message,
    });
  }
};

// Delete trip
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    await Driver.findByIdAndUpdate(trip.driver, {
      status: "Available",
    });

    await Trip.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete trip",
      error: error.message,
    });
  }
};

// Get trips by status
exports.getTripsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const trips = await Trip.find({ status })
      .populate("driver")
      .populate("vehicle");
    res.status(200).json({ trips });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trips", error: error.message });
  }
};
