import api from "./AxiosInstance";

export const getSkiAreas = async () => {
  const res = await api.get("/api/SkiAreas/getall");
  return res.data;
};

export const getSkiAreaById = async (id) => {
  const res = await api.get(`/api/SkiAreas/getbyid?id=${id}`);
  return res.data;
};

export const getLatestSkiAreas = async () => {
  const data = await getSkiAreas();
  return data.slice(0, 3);
};
