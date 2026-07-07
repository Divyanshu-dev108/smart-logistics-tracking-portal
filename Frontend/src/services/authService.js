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

// export const register = async (data) => {
//   const response = await API.post("/auth/register", data);

//   localStorage.setItem("token", response.data.token);
//   localStorage.setItem("user", JSON.stringify(response.data.user));

//   return response.data;
// };

export const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
export const register = async (data) => {
  try {
    const response = await API.post("/auth/register", data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (err) {
    // Dummy fallback jab backend nahi chala ho
    const fakeUser = { name: data.name, email: data.email, role: data.role };
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("user", JSON.stringify(fakeUser));
    return { token: "dummy-token", user: fakeUser };
  }
};