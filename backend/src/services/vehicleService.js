const Vehicle = require("../models/Vehicle");

const createVehicle = async (vehicleData) => {
  return await Vehicle.create(vehicleData);
};

module.exports = {
  createVehicle,
};