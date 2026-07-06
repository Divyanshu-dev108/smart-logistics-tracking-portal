const Vehicle = require("../models/Vehicle");

exports.updateLocation = async (vehicleId, latitude, longitude) => {
  try {
    return await Vehicle.findByIdAndUpdate(
      vehicleId,
      {
        latitude,
        longitude,
      },
      {
        new: true,
      }
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};