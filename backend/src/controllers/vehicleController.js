const Vehicle = require("../models/Vehicle");

// Add Vehicle
const addVehicle = async (req, res, next) => {
  try {
    const { make, model, category, price, quantity } = req.body;

    const vehicle = await Vehicle.create({
      make,
      model,
      category,
      price,
      quantity,
    });

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