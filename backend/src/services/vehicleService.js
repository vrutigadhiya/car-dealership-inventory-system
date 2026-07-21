const Vehicle = require("../models/Vehicle");
const buildVehicleFilter = require("../utils/buildVehicleFilter");

const createVehicle = async (vehicleData) => {
  return await Vehicle.create(vehicleData);
};

const getAllVehicles = async () => {
  return await Vehicle.find();
};

const searchVehicles = async (query) => {
  const filter = buildVehicleFilter(query);
  return await Vehicle.find(filter);
};

module.exports = {
  createVehicle,
  getAllVehicles,
  searchVehicles,
};