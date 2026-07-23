const mongoose = require("mongoose");
const { createBooking } = require("../services/bookingService");

const {
  createVehicle,
  getVehicleById,
  getAllVehicles,
  getVehiclesByAdmin,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
} = require("../services/vehicleService");

// Add Vehicle
const addVehicle = async (req, res, next) => {
  try {
    const vehicleData = { ...req.body, createdBy: req.user.id };

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

// Get All Vehicles (customer-facing, sees everything)
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

// Get Vehicles Added By The Logged-In Admin Only
const getMyVehicles = async (req, res, next) => {
  try {
    const vehicles = await getVehiclesByAdmin(req.user.id, req.query);

    res.status(200).json({
      success: true,
      vehicles,
    });
  } catch (error) {
    next(error);
  }
};

// Search Vehicles (customer-facing, across all vehicles)
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

// Update Vehicle — only the admin who created it may edit
const updateVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid vehicle ID format" });
    }

    const existingVehicle = await getVehicleById(id);

    if (!existingVehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    if (existingVehicle.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only edit vehicles you added",
      });
    }

    const vehicleData = { ...req.body };

    if (req.file) {
      vehicleData.imageUrl = `/uploads/vehicles/${req.file.filename}`;
    }

    const vehicle = await updateVehicle(id, vehicleData);

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Vehicle — only the admin who created it may delete
const deleteVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid vehicle ID format" });
    }

    const existingVehicle = await getVehicleById(id);

    if (!existingVehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    if (existingVehicle.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete vehicles you added",
      });
    }

    await deleteVehicle(id);

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

    const vehicle = await purchaseVehicle(id);

    if (!vehicle) {
      return res.status(400).json({ success: false, message: "Vehicle is out of stock or not found" });
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

// Restock Vehicle — only the admin who created it may restock
const restockVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid vehicle ID format" });
    }

    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive number",
      });
    }

    const existingVehicle = await getVehicleById(id);

    if (!existingVehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    if (existingVehicle.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only restock vehicles you added",
      });
    }

    const vehicle = await restockVehicle(id, Number(quantity));

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
  getMyVehicles,
  searchVehicle,
  updateVehicleById,
  deleteVehicleById,
  purchaseVehicleById,
  restockVehicleById,
};