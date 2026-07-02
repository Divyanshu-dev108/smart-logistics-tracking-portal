const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    tripId: {
      type: String,
      required: true,
      unique: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    sourceLatitude: {
      type: Number,
    },
    sourceLongitude: {
      type: Number,
    },
    destination: {
      type: String,
      required: true,
    },
    destinationLatitude: {
      type: Number,
    },
    destinationLongitude: {
      type: Number,
    },
    cargoType: {
      type: String,
    },
    cargoWeight: {
      type: Number, // in kg
    },
    status: {
      type: String,
      enum: ["Pending", "In Transit", "Delivered", "Cancelled"],
      default: "Pending",
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    estimatedDistance: {
      type: Number,
    },
    actualDistance: {
      type: Number,
    },
    fuelCost: {
      type: Number,
      default: 0,
    },
    revenue: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
