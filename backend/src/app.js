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
    console.log("Incoming Origin:", origin);

    // Allow Postman, mobile apps, etc.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked Origin:", origin);

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// Test Route
app.get("/test-cors", (req, res) => {
  res.json({
    message: "Backend is updated",
    allowedOrigins,
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Error Handler (always last)
app.use(errorHandler);

module.exports = app;