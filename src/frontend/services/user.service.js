import api from "./api";

export const getAll = async () => {
  const response = await api.get("/api/users");
  return response.data;
};

export const getById = async (id) => {
  const response = await api.get(`/api/users/${id}`);
  return response.data;
};

export const create = async (data) => {
  const response = await api.post("/api/users", data);
  return response.data;
};

export const update = async (id, data) => {
  const response = await api.put(`/api/users/${id}`, data);
  return response.data;
};

export const deactivate = async (id) => {
  const response = await api.patch(`/api/users/${id}/deactivate`);
  return response.data;
};
