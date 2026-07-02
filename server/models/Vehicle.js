const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      enum: ["Truck", "Mini Truck", "Container", "Van", "Auto"],
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
    },
    yearOfManufacture: {
      type: Number,
    },
    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    status: {
      type: String,
      enum: ["Active", "Maintenance", "Inactive", "Out for Repair"],
      default: "Active",
    },
    fuelType: {
      type: String,
      enum: ["Diesel", "Petrol", "CNG", "Electric"],
      default: "Diesel",
    },
    capacity: {
      type: Number, // in kg
      required: true,
    },
    mileage: {
      type: Number,
      default: 0,
    },
    lastMaintenanceDate: {
      type: Date,
    },
    insuranceExpiry: {
      type: Date,
    },
    pollutionCertificateExpiry: {
      type: Date,
    },
    gpsDeviceId: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    totalTrips: {
      type: Number,
      default: 0,
    },
    totalDistance: {
      type: Number,
      default: 0,
    },
    totalFuelCost: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
