const {
  createVehicle,
  getAllVehicles,
  searchVehicles,
} = require("../services/vehicleService");

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

    const vehicles = await getAllVehicles();

    res.status(200).json({
      success: true,
      vehicles,
    });

  } catch (error) {
    next(error);
  }
};

const searchVehicle = async (req, res, next) => {
  try {

    const vehicles = await searchVehicles(req.query);

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
  searchVehicle,
};