const Vehicle = require("../models/Vehicle");
const buildVehicleFilter = require("../utils/buildVehicleFilter");
const checkVehicleStock = require("../utils/checkVehicleStock");
const updateVehicleQuantity = require("../utils/updateVehicleQuantity");

// Create Vehicle
const createVehicle = async (vehicleData) => {
  return await Vehicle.create(vehicleData);
};

// Get All Vehicles
const getAllVehicles = async () => {
  return await Vehicle.find();
};

// Search Vehicles
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
  getAllVehicles,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
};