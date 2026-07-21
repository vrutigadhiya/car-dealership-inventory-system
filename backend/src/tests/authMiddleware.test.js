require("dotenv").config();

const request = require("supertest");
const app = require("../app");

describe("Authentication Middleware", () => {

  it("should return 401 if no token is provided", async () => {

    const res = await request(app)
      .post("/api/vehicles");

    expect(res.statusCode).toBe(401);

    expect(res.body.success).toBe(false);

    expect(res.body.message).toBe("Access denied. No token provided.");

  });

});