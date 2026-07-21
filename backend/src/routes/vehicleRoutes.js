const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addVehicle,
  getVehicles,
} = require("../controllers/vehicleController");

router.post("/", authMiddleware, addVehicle);

router.get("/", authMiddleware, getVehicles);

module.exports = router;
