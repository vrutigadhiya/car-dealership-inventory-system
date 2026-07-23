require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email: "admin@ironclad.com" });
    if (existing) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("AdminPass123", 10);
    await User.create({
      name: "Admin",
      email: "admin@ironclad.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created: admin@ironclad.com / AdminPass123");
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error);
    process.exit(1);
  }
};

createAdmin();