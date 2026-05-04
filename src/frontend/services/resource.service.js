import api from "./api";

export const getAll = async () => {
  const response = await api.get("/api/resources");
  return response.data;
};

export const getById = async (id) => {
  const response = await api.get(`/api/resources/${id}`);
  return response.data;
};

export const create = async (data) => {
  const response = await api.post("/api/resources", data);
  return response.data;
};

export const update = async (id, data) => {
  const response = await api.put(`/api/resources/${id}`, data);
  return response.data;
};

export const deleteResource = async (id) => {
  const response = await api.delete(`/api/resources/${id}`);
  return response.data;
};
