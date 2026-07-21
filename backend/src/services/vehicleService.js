const Vehicle = require("../models/Vehicle");
const buildVehicleFilter = require("../utils/buildVehicleFilter");

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
    new: true,
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

  if (vehicle.quantity <= 0) {
    throw new Error("Vehicle is out of stock");
  }

  vehicle.quantity -= 1;

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
};