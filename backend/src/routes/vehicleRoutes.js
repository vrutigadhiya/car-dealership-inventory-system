const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

const {
  addVehicle,
  getVehicles,
  searchVehicle,
  updateVehicleById,
  deleteVehicleById,
  purchaseVehicleById,
} = require("../controllers/vehicleController");

router.post("/", authMiddleware, addVehicle);
router.get("/", authMiddleware, getVehicles);
router.get("/search", authMiddleware, searchVehicle);
router.put("/:id", authMiddleware, validateObjectId, updateVehicleById);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validateObjectId,
  deleteVehicleById,
);
router.post(
  "/:id/purchase",
  authMiddleware,
  validateObjectId,
  purchaseVehicleById,
);

module.exports = router;
