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
    await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: "admin@test.com",
      password: "Password@123",
      role: "admin",
    });

    // Login
    const loginRes = await request(app).post("/api/auth/login").send({
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
          imageUrl:"/uploads/vehicles/bmw.avif",
        });

      expect(res.statusCode).toBe(201);

      expect(res.body.success).toBe(true);

      expect(res.body.vehicle.make).toBe("Toyota");
    });
  });

  // Fetch Vehicle
  describe("GET /api/vehicles", () => {
    it("should return all vehicles", async () => {
      await Vehicle.create({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      });

      await Vehicle.create({
        make: "Honda",
        model: "City",
        category: "Sedan",
        price: 1500000,
        quantity: 8,
      });

      const res = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

      expect(res.body.success).toBe(true);

      expect(res.body.vehicles.length).toBe(2);
    });
  });

  // Search Vehicle
  describe("GET /api/vehicles/search", () => {
    it("should search vehicles by make", async () => {
      await Vehicle.create({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      });

      await Vehicle.create({
        make: "Honda",
        model: "City",
        category: "Sedan",
        price: 1500000,
        quantity: 8,
      });

      const res = await request(app)
        .get("/api/vehicles/search?make=Toyota")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.vehicles.length).toBe(1);
      expect(res.body.vehicles[0].make).toBe("Toyota");
    });
  });

  // Update Vehicle
  describe("PUT /api/vehicles/:id", () => {
    it("should update a vehicle", async () => {
      const vehicle = await Vehicle.create({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      });

      const res = await request(app)
        .put(`/api/vehicles/${vehicle._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          make: "Toyota",
          model: "Fortuner Legender",
          category: "SUV",
          price: 4800000,
          quantity: 10,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.vehicle.model).toBe("Fortuner Legender");
      expect(res.body.vehicle.price).toBe(4800000);
    });
  });

  // Delete
  describe("DELETE /api/vehicles/:id", () => {
    it("should delete a vehicle", async () => {
      const vehicle = await Vehicle.create({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      });

      const res = await request(app)
        .delete(`/api/vehicles/${vehicle._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

      expect(res.body.success).toBe(true);

      expect(res.body.message).toBe("Vehicle deleted successfully");
    });
  });

  // Purchase
  describe("POST /api/vehicles/:id/purchase", () => {
    it("should purchase a vehicle and decrease quantity", async () => {
      const vehicle = await Vehicle.create({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      });

      const res = await request(app)
        .post(`/api/vehicles/${vehicle._id}/purchase`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

      expect(res.body.success).toBe(true);

      expect(res.body.message).toBe("Vehicle purchased successfully");

      expect(res.body.vehicle.quantity).toBe(4);
    });
  });

  // Restock Vehicle
  describe("POST /api/vehicles/:id/restock", () => {
    it("should restock a vehicle", async () => {
      const vehicle = await Vehicle.create({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 2,
      });

      const res = await request(app)
        .post(`/api/vehicles/${vehicle._id}/restock`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          quantity: 5,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Vehicle restocked successfully");
      expect(res.body.vehicle.quantity).toBe(7);
    });

    it("should return 404 if vehicle is not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .post(`/api/vehicles/${fakeId}/restock`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          quantity: 5,
        });

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Vehicle not found");
    });

    it("should return 403 for non-admin user", async () => {
      await request(app).post("/api/auth/register").send({
        name: "User",
        email: "user@test.com",
        password: "Password@123",
        role: "user",
      });

      const loginRes = await request(app).post("/api/auth/login").send({
        email: "user@test.com",
        password: "Password@123",
      });

      const userToken = loginRes.body.token;

      const vehicle = await Vehicle.create({
        make: "BMW",
        model: "X5",
        category: "SUV",
        price: 7000000,
        quantity: 5,
        imageUrl: "/uploads/vehicles/bmw.avif",
      });

      const res = await request(app)
        .post(`/api/vehicles/${vehicle._id}/restock`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          quantity: 5,
        });

      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Access denied. Admins only.");
    });
  });
});
