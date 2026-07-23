require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// Local Modules
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://car-dealership-inventory-system-plum.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. Postman, mobile apps, cURL)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked Origin by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Enable CORS middleware (handles all HTTP OPTIONS preflight requests automatically)
app.use(cors(corsOptions));

// Body Parser Middleware
app.use(express.json());

// Serve static upload files directly from the absolute uploads directory
const uploadsPath = path.resolve(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// Test Route
app.get("/test-cors", (req, res) => {
  res.json({
    message: "Backend is updated",
    allowedOrigins,
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Global Error Handler (Must be registered last)
app.use(errorHandler);

module.exports = app;