const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  addVehicle,
  getVehicles,
  searchVehicle,
  updateVehicleById,
  deleteVehicleById
} = require("../controllers/vehicleController");

router.post("/", authMiddleware, addVehicle);
router.get("/", authMiddleware, getVehicles);
router.get("/search", authMiddleware, searchVehicle);
router.put("/:id", authMiddleware, updateVehicleById);
router.delete("/:id", authMiddleware, adminMiddleware, deleteVehicleById);

module.exports = router;
