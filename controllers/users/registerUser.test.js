require("dotenv").config();
const app = require("../../app");
const testReq = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../models");

const { DB_TEST_HOST } = process.env;

describe("registration", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_TEST_HOST)
      .then(() => console.log("Test DB Connected"))
      .catch((err) => {
        console.log(err);
      });

    await User.deleteMany();
  });

  it("shoud registrate new user", async () => {
    const response = await testReq(app).post("/api/users/register").send({
      email: "test1@gmail.com.ua",
      password: "9s1dfhdsfbhdsf",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.user?.email).toBe("test1@gmail.com.ua");
  });

  it("shoud not registrate the same user 2 time", async () => {
    await testReq(app).post("/api/users/register").send({
      email: "test@gmail.com",
      password: "123456",
    });

    const response = await testReq(app).post("/api/users/register").send({
      email: "test@gmail.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Email in use");
  });

  afterAll(async () => {
    await mongoose
      .disconnect(DB_TEST_HOST)
      .then(() => console.log("Test DB Disconnected"))
      .catch((err) => {
        console.log(err);
      });
  });
});
