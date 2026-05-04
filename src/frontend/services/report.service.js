import api from "./api";

export const getByPeriod = async (startDate, endDate) => {
  const response = await api.get("/api/reports/period", {
    params: { start_date: startDate, end_date: endDate },
  });
  return response.data;
};

export const getByResource = async () => {
  const response = await api.get("/api/reports/resource");
  return response.data;
};

export const getByLocation = async () => {
  const response = await api.get("/api/reports/location");
  return response.data;
};
