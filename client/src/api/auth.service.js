import api from "./AxiosInstance";

export const login = (data) =>
  api.post("/api/Auth/login", data);

export const register = (data) =>
  api.post("/api/Auth/register", data);