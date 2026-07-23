const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  addVehicle,
  getVehicles,
  getMyVehicles,
  searchVehicle,
  updateVehicleById,
  deleteVehicleById,
  purchaseVehicleById,
  restockVehicleById,
} = require("../controllers/vehicleController");

// Wraps multer so its errors flow into the global error handler
const handleImageUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) return next(err);
    next();
  });
};

// Specific/named routes must come before "/:id"-style routes
router.get("/search", authMiddleware, searchVehicle);
router.get("/mine", authMiddleware, adminMiddleware, getMyVehicles);
router.get("/", authMiddleware, getVehicles);

// Admin routes
router.post("/", authMiddleware, adminMiddleware, handleImageUpload, addVehicle);
router.put("/:id", authMiddleware, adminMiddleware, handleImageUpload, updateVehicleById);
router.delete("/:id", authMiddleware, adminMiddleware, deleteVehicleById);
router.post("/:id/restock", authMiddleware, adminMiddleware, restockVehicleById);

// Customer purchase
router.post("/:id/purchase", authMiddleware, purchaseVehicleById);

module.exports = router;