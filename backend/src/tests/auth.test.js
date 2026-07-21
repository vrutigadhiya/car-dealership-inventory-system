require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");

describe("Authentication API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  beforeEach(async () => {
    // Clear users before each test
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("POST /api/auth/register", () => {
    it("should create a new user", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Vruti Gadhiya",
          email: "vruti@example.com",
          password: "Password123"
        });

      expect(res.statusCode).toBe(201);

      expect(res.body.success).toBe(true);

      expect(res.body.user).toHaveProperty("_id");
      expect(res.body.user.name).toBe("Vruti Gadhiya");
      expect(res.body.user.email).toBe("vruti@example.com");

      // Password should not be returned
      expect(res.body.user.password).toBeUndefined();
    });
  });
});