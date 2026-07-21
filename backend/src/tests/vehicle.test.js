require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

describe("Vehicle API", () => {

  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  beforeEach(async () => {

    await User.deleteMany({});
    await Vehicle.deleteMany({});

    // Register user
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Admin",
        email: "admin@test.com",
        password: "Password@123",
      });

    // Login
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "Password@123",
      });

    token = loginRes.body.token;

  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("POST /api/vehicles", () => {

    it("should add a vehicle", async () => {

      const res = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
          make: "Toyota",
          model: "Fortuner",
          category: "SUV",
          price: 4500000,
          quantity: 5,
        });

      expect(res.statusCode).toBe(201);

      expect(res.body.success).toBe(true);

      expect(res.body.vehicle.make).toBe("Toyota");

    });

  });

});