const Driver = require("../models/Driver");
const Vehicle = require("../models/Vehicle");
const Trip = require("../models/Trip");

exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalDrivers,
      availableDrivers,
      totalVehicles,
      activeVehicles,
      totalTrips,
      pendingTrips,
      activeTrips,
      completedTrips,
      cancelledTrips,
      revenue,
    ] = await Promise.all([
      Driver.countDocuments(),
      Driver.countDocuments({ status: "Available" }),

      Vehicle.countDocuments(),
      Vehicle.countDocuments({ status: "Active" }),

      Trip.countDocuments(),
      Trip.countDocuments({ status: "Pending" }),
      Trip.countDocuments({ status: "In Transit" }),
      Trip.countDocuments({ status: "Delivered" }),
      Trip.countDocuments({ status: "Cancelled" }),

      Trip.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$revenue" },
          },
        },
      ]),
    ]);

    res.status(200).json({
      totalDrivers,
      availableDrivers,

      totalVehicles,
      activeVehicles,

      totalTrips,
      pendingTrips,
      activeTrips,
      completedTrips,
      cancelledTrips,

      totalRevenue: revenue[0]?.totalRevenue || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};