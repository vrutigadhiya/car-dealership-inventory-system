const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

const validateRegister = require("../middleware/validateRegister");

// Register route
router.post("/register", validateRegister, registerUser);

// Login route
router.post("/login", loginUser);

module.exports = router;
