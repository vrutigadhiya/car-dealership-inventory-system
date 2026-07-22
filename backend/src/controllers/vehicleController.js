const mongoose = require("mongoose");
const { createBooking } = require("../services/bookingService");

const {
  createVehicle,
  getAllVehicles,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
} = require("../services/vehicleService");

// Add Vehicle
const addVehicle = async (req, res, next) => {
  try {
    const vehicleData = { ...req.body };

    if (req.file) {
      vehicleData.imageUrl = `/uploads/vehicles/${req.file.filename}`;
    }

    const vehicle = await createVehicle(vehicleData);

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      vehicle,
    });
  } catch (error) {
    next(error);
  }
};

const updateVehicleById = async (req, res, next) => {
  try {
    const vehicleData = { ...req.body };

    if (req.file) {
      vehicleData.imageUrl = `/uploads/vehicles/${req.file.filename}`;
    }

    const vehicle = await updateVehicle(req.params.id, vehicleData);

    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
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

// Delete Vehicle
const deleteVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vehicle = await deleteVehicle(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Purchase Vehicle (books it, decrements stock, saves buyer details)
const purchaseVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { buyerName, buyerPhone, buyerEmail, buyerAddress } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid vehicle ID format" });
    }

    if (!buyerName || !buyerPhone || !buyerEmail || !buyerAddress) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, email, and address are required",
      });
    }

    // purchaseVehicle (service) handles the stock check + decrement + save
    const vehicle = await purchaseVehicle(id);

    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    const booking = await createBooking({
      vehicle: vehicle._id,
      user: req.user.id,
      buyerName,
      buyerPhone,
      buyerEmail,
      buyerAddress,
      price: vehicle.price,
    });

    res.status(201).json({
      success: true,
      message: "Vehicle booked successfully",
      booking,
      vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// Restock Vehicle
const restockVehicleById = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    const vehicle = await restockVehicle(req.params.id, Number(quantity));

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle restocked successfully",
      vehicle,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addVehicle,
  getVehicles,
  searchVehicle,
  updateVehicleById,
  deleteVehicleById,
  purchaseVehicleById,
  restockVehicleById,
};