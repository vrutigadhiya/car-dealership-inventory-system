require("dotenv").config();
const express = require("express");

//Local Module 
const authRoutes = require("./routes/authRoute")
const errorHandler = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.post("/api/vehicles", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed",
  });
});

app.get("/", (req, res) => {
    res.send("API Running...");
});

module.exports = app;