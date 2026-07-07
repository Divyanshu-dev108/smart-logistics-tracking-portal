import API from "./api";

export const getDrivers = async () => {
  const response = await API.get("/drivers");
  return response.data.drivers;
};

export const addDriver = async (driver) => {
  const response = await API.post("/drivers", driver);
  return response.data;
};

export const updateDriver = async (id, driver) => {
  const response = await API.put(`/drivers/${id}`, driver);
  return response.data;
};

export const deleteDriver = async (id) => {
  const response = await API.delete(`/drivers/${id}`);
  return response.data;
};