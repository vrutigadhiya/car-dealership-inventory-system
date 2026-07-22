require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

//Local Module 
const authRoutes = require("./routes/authRoutes")
const errorHandler = require("./middleware/errorHandler");
const vehicleRoutes = require("./routes/vehicleRoutes");
const bookingRoutes = require("./routes/bookingRoutes");


const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://car-dealership-inventory-system-vruti.vercel.app/" // add this after step 4 gives you the URL
  ],
  credentials: true,
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("API Running...");
});

module.exports = app;