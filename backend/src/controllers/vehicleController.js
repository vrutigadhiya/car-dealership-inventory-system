const { createVehicle } = require("../services/vehicleService");

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

module.exports = {
  addVehicle,
};