import api from "../api/AxiosInstance";

export const getCommentsBySkiArea = (skiAreaId) =>
  api.get(`/api/Comments/getbyskiareaid?skiAreaId=${skiAreaId}`);

export const addComment = (data) =>
  api.post("/api/Comments/add", data);
