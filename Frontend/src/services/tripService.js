import API from "./api";

export const getTrips = async () => {
  const response = await API.get("/trips");
  return response.data.trips;
};

export const addTrip = async (trip) => {
  const response = await API.post("/trips", trip);
  return response.data;
};

export const updateTrip = async (id, trip) => {
  const response = await API.put(`/trips/${id}`, trip);
  return response.data;
};

export const deleteTrip = async (id) => {
  const response = await API.delete(`/trips/${id}`);
  return response.data;
};