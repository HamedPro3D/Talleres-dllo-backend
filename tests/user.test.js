const request = require("supertest");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("../src/app");
const User = require("../src/models/user.model");

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI + "_test");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("User controller", () => {
  test("CREATE User - success", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        name: "Andrea",
        email: "andrea@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe("andrea@example.com");
  });

  test("CREATE User - fail validation (missing email)", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        name: "Andrea",
        password: "123456"
      });

    expect(res.statusCode).toBe(400);
  });
});
