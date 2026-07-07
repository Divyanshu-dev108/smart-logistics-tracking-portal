import API from "./api";

export const getDashboardStats = async () => {
  const [drivers, vehicles, trips] = await Promise.all([
    API.get("/drivers"),
    API.get("/vehicles"),
    API.get("/trips"),
  ]);

  return {
    totalDrivers: drivers.data.drivers.length,
    totalVehicles: vehicles.data.vehicles.length,
    totalTrips: trips.data.trips.length,
    activeTrips: trips.data.trips.filter(
      (t) => t.status === "Pending" || t.status === "In Transit"
    ).length,
  };
};