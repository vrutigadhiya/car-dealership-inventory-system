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

module.exports = {
  createVehicle,
  getAllVehicles,
  searchVehicles,
  updateVehicle,
};