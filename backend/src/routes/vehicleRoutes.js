const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const validateObjectId = require("../middleware/validateObjectId");
const upload = require("../middleware/uploadMiddleware");


const {
  addVehicle,
  getVehicles,
  searchVehicle,
  updateVehicleById,
  deleteVehicleById,
  purchaseVehicleById,
  restockVehicleById,
} = require("../controllers/vehicleController");

router.post("/", authMiddleware, upload.single("image"), addVehicle);
router.get("/", authMiddleware, getVehicles);
router.get("/search", authMiddleware, searchVehicle);
router.put("/:id", authMiddleware, upload.single("image"), validateObjectId, updateVehicleById);
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
router.post(
  "/:id/restock",
  authMiddleware,
  adminMiddleware,
  validateObjectId,
  restockVehicleById
);

module.exports = router;
