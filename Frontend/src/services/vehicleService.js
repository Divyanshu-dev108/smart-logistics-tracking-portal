import API from "./api";

export const getVehicles = async () => {
  const res = await API.get("/vehicles");
  return res.data.vehicles;
};

export const addVehicle = async (vehicle) => {
  return await API.post("/vehicles", vehicle);
};

export const updateVehicle = async (id, vehicle) => {
  return await API.put(`/vehicles/${id}`, vehicle);
};

export const deleteVehicle = async (id) => {
  return await API.delete(`/vehicles/${id}`);
};