const { createVehicle } = require("../services/vehicleService");
const Vehicle = require("../models/Vehicle");

// Add Vehicle
const addVehicle = async (req, res, next) => {
  try {
    const vehicle = await createVehicle(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Vehicles
const getVehicles = async (req, res, next) => {

  try {

    const vehicles = await Vehicle.find();

    res.status(200).json({
      success: true,
      vehicles,
    });

  } catch (error) {

    next(error);

  }
};

module.exports = {
  addVehicle,
  getVehicles,
};