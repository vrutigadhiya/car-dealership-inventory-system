const mongoose = require("mongoose");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
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

// Helper to remove orphaned file if update/delete happens
const { UPLOADS_DIR } = require("../config/paths");

const deleteOldImage = (imagePath) => {
  if (!imagePath || imagePath.startsWith("http")) return;
  // imagePath looks like "/uploads/vehicles/xyz.png" - strip the leading
  // "/uploads/" since UPLOADS_DIR already points at that folder.
  const relativePath = imagePath.replace(/^\/?uploads\//, "");
  const fullPath = path.join(UPLOADS_DIR, relativePath);
  if (fs.existsSync(fullPath)) {
    fs.unlink(fullPath, (err) => {
      if (err) console.error("Error deleting old image:", err);
    });
  }
};

// ================= ADD VEHICLE =================
const addVehicle = async (req, res, next) => {
  console.log("=== CLOUDINARY ADD VEHICLE ===");
  try {
    const vehicleData = { ...req.body, createdBy: req.user.id };

    console.log("req.file:", req.file);

    if (req.file) {
      console.log("Uploading to Cloudinary...");

      console.log("Uploading to Cloudinary...");

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "vehicles",
      });

      console.log("Cloudinary Result:", result);
      console.log("Cloudinary URL:", result.secure_url);

      console.log("Cloudinary secure_url:", result.secure_url);

      vehicleData.imageUrl = result.secure_url;

      fs.unlinkSync(req.file.path);
    }

    console.log("Vehicle data before save:", vehicleData);

    const vehicle = await createVehicle(vehicleData);

    console.log("Saved vehicle:", vehicle);

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      vehicle,
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    next(error);
  }
};

// ================= GET ALL VEHICLES =================
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

// ================= GET MY VEHICLES =================
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

// ================= SEARCH VEHICLES =================
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

// ================= UPDATE VEHICLE =================
const updateVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid vehicle ID format" });
    }

    const existingVehicle = await getVehicleById(id);

    if (!existingVehicle) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
    }

    if (existingVehicle.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only edit vehicles you added",
      });
    }

    const vehicleData = { ...req.body };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "vehicles",
      });

      vehicleData.imageUrl = result.secure_url;

      // delete temporary local file
      fs.unlinkSync(req.file.path);

      // Clean up old image file on disk
      const oldImage = existingVehicle.imageUrl;
      if (oldImage) deleteOldImage(oldImage);
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

// ================= DELETE VEHICLE =================
const deleteVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid vehicle ID format" });
    }

    const existingVehicle = await getVehicleById(id);

    if (!existingVehicle) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
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

// ================= PURCHASE VEHICLE =================
const purchaseVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { buyerName, buyerPhone, buyerEmail, buyerAddress } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid vehicle ID format" });
    }

    if (!buyerName || !buyerPhone || !buyerEmail || !buyerAddress) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, email, and address are required",
      });
    }

    const vehicle = await purchaseVehicle(id);

    if (!vehicle) {
      return res.status(400).json({
        success: false,
        message: "Vehicle is out of stock or not found",
      });
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

// ================= RESTOCK VEHICLE =================
const restockVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid vehicle ID format" });
    }

    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive number",
      });
    }

    const existingVehicle = await getVehicleById(id);

    if (!existingVehicle) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
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
