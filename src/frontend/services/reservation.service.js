import api from "./api";

export const getAll = async () => {
  const response = await api.get("/api/reservations");
  return response.data;
};

export const getById = async (id) => {
  const response = await api.get(`/api/reservations/${id}`);
  return response.data;
};

export const create = async (data) => {
  const response = await api.post("/api/reservations", data);
  return response.data;
};

export const update = async (id, data) => {
  const response = await api.put(`/api/reservations/${id}`, data);
  return response.data;
};

export const cancel = async (id) => {
  const response = await api.patch(`/api/reservations/${id}/cancel`);
  return response.data;
};
