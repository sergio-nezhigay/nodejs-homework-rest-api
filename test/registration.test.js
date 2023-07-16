const mongoose = require("mongoose");
require("dotenv").config();
const testRequest = require("supertest");
const app = require("../app");
const { User } = require("../models/user");

const { DB_TEST_HOST, PORT = 3000 } = process.env;
mongoose.set("strictQuery", true);

describe("registration", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_TEST_HOST)
      .then(() => {
        console.log("Database TEST connection successful");
      })
      .catch((error) => {
        console.log(error.message);
      });
    await User.deleteMany();
  });
  it("should registarte new user2", async () => {
    const response = await testRequest(app).post("/api/users/register").send({
      email: "abc144441",
      password: "9s1dfhdsfbhdsf",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.user.email).toBe("abc144441");
  });
  afterAll(async () => {
    await mongoose
      .disconnect(DB_TEST_HOST)
      .then(() => console.log("DB disconnected"));
  });
});
