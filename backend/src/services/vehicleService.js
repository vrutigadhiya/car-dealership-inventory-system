const Vehicle = require("../models/Vehicle");
const buildVehicleFilter = require("../utils/buildVehicleFilter");


// Create Vechicle Card
const createVehicle = async (vehicleData) => {
  return await Vehicle.create(vehicleData);
};

// Get Vehicle
const getAllVehicles = async () => {
  return await Vehicle.find();
};

// Search Vechicle
const searchVehicles = async (query) => {
  const filter = buildVehicleFilter(query);
  return await Vehicle.find(filter);
};

// Update Vehicle
const updateVehicle = async (id, vehicleData) => {
  return await Vehicle.findByIdAndUpdate(
    id,
    vehicleData,
    {
      new: true,
      runValidators: true,
    }
  );
};

module.exports = {
  createVehicle,
  getAllVehicles,
  searchVehicles,
  updateVehicle,
};