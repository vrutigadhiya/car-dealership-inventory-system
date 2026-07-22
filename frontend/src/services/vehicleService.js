import api from "./api";

export const fetchVehicles = async () => {
  const res = await api.get("/vehicles");
  return res.data.vehicles;
};

export const searchVehicles = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const res = await api.get(`/vehicles/search?${params}`);
  return res.data.vehicles;
};

export const createVehicle = async (vehicle) => {
  const res = await api.post("/vehicles", vehicle);
  return res.data.vehicle;
};

export const updateVehicle = async (id, vehicle) => {
  const res = await api.put(`/vehicles/${id}`, vehicle);
  return res.data.vehicle;
};

export const deleteVehicle = async (id) => {
  return api.delete(`/vehicles/${id}`);
};

export const purchaseVehicle = async (id) => {
  return api.post(`/vehicles/${id}/purchase`);
};

export const restockVehicle = async (id, quantity) => {
  return api.post(`/vehicles/${id}/restock`, { quantity });
};