require("dotenv").config();
const express = require("express");

//Local Module 
const authRoutes = require("./routes/authRoute")

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API Running...");
});

module.exports = app;