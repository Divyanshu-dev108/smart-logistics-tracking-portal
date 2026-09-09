import API from "./api";
export const login = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response.data;
};
export const register = async (data) => {
  const response = await API.post("/auth/register", data);
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response.data;
};
export const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};