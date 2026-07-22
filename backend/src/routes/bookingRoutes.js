const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { getMyBookings, getAllBookingsHandler } = require("../controllers/bookingController");

router.get("/my", authMiddleware, getMyBookings);
router.get("/", authMiddleware, adminMiddleware, getAllBookingsHandler);

module.exports = router;