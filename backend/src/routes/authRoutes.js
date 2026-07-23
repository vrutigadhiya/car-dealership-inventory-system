const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

// Import both validation arrays from the single validators file
const { validateRegister, validateLogin } = require("../middleware/validators");

// Register route
router.post("/register", validateRegister, registerUser);

// Login route
router.post("/login", validateLogin, loginUser);

module.exports = router;