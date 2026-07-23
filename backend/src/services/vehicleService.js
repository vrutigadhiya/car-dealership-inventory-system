const Vehicle = require("../models/Vehicle");
const buildVehicleFilter = require("../utils/buildVehicleFilter");
const checkVehicleStock = require("../utils/checkVehicleStock");
const updateVehicleQuantity = require("../utils/updateVehicleQuantity");

// Create Vehicle
const createVehicle = async (vehicleData) => {
  return await Vehicle.create(vehicleData);
};

// Get Vehicle By Id
const getVehicleById = async (id) => {
  return await Vehicle.findById(id);
};

// Get All Vehicles
const getAllVehicles = async () => {
  return await Vehicle.find();
};

// Get Vehicles Added By A Specific Admin (with optional search filters)
const getVehiclesByAdmin = async (adminId, query = {}) => {
  const filter = buildVehicleFilter(query);
  filter.createdBy = adminId;
  return await Vehicle.find(filter).sort({ createdAt: -1 });
};

// Search Vehicles (across all vehicles — used by customer dashboard)
const searchVehicles = async (query) => {
  const filter = buildVehicleFilter(query);
  return await Vehicle.find(filter);
};

// Update Vehicle
const updateVehicle = async (id, vehicleData) => {
  const options = {
    returnDocument: "after",
    runValidators: true,
  };

  return Vehicle.findByIdAndUpdate(id, vehicleData, options);
};

// Delete Vehicle
const deleteVehicle = async (id) => {
  return await Vehicle.findByIdAndDelete(id);
};

// Purchase Vehicle
const purchaseVehicle = async (id) => {
  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    return null;
  }

  checkVehicleStock(vehicle);

  updateVehicleQuantity(vehicle, -1);

  await vehicle.save();

  return vehicle;
};

// Restock Vehicle
const restockVehicle = async (id, quantity) => {
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    return null;
  }
  updateVehicleQuantity(vehicle, quantity);
  await vehicle.save();
  return vehicle;
};

module.exports = {
  createVehicle,
  getVehicleById,
  getAllVehicles,
  getVehiclesByAdmin,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
};