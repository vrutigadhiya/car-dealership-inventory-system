const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addVehicle,
} = require("../controllers/vehicleController");

// Protected Route
router.post("/", authMiddleware, addVehicle);

module.exports = router;