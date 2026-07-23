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
  return await Vehicle.find({ isDeleted: { $ne: true } });
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

  return Vehicle.findOneAndUpdate({ _id: id, isDeleted: { $ne: true } }, vehicleData, options);
};

// Delete Vehicle (Soft Delete)
const deleteVehicle = async (id) => {
  return await Vehicle.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

// Purchase Vehicle
const purchaseVehicle = async (id) => {
  const vehicle = await Vehicle.findOne({ _id: id, isDeleted: { $ne: true } });

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
  const vehicle = await Vehicle.findOne({ _id: id, isDeleted: { $ne: true } });
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