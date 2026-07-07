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
    let {
      tripId,
      driver,
      vehicle,
      source,
      destination,
      revenue,
      status,
    } = req.body;

    if (!tripId) {
      tripId = `TR${Date.now()}`;
    }

    if (!revenue) {
      revenue = 0;
    }

    // Driver can be name or ObjectId
    let driverDoc = await Driver.findOne({
      name: driver.trim(),
    });
    
    if (!driverDoc) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    // Vehicle can be registration number or ObjectId
    let vehicleDoc = await Vehicle.findOne({
      registrationNumber: vehicle.trim(),
    });
    
    if (!vehicleDoc) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    const trip = await Trip.create({
      tripId,
      driver: driverDoc._id,
      vehicle: vehicleDoc._id,
      source,
      destination,
      revenue,
      status,
    });

    await Driver.findByIdAndUpdate(driverDoc._id, {
      $inc: { totalTrips: 1 },
      status: "On Trip",
    });

    await Vehicle.findByIdAndUpdate(vehicleDoc._id, {
      $inc: { totalTrips: 1 },
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });

  } catch (error) {
    console.error(error);

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
