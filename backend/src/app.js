require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

//Local Module 
const authRoutes = require("./routes/authRoutes")
const errorHandler = require("./middleware/errorHandler");
const vehicleRoutes = require("./routes/vehicleRoutes");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("API Running...");
});

module.exports = app;