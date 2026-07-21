const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addVehicle,
  getVehicles,
  searchVehicle,
} = require("../controllers/vehicleController");

router.post("/", authMiddleware, addVehicle);

router.get("/", authMiddleware, getVehicles);

router.get("/search", authMiddleware, searchVehicle);

module.exports = router;