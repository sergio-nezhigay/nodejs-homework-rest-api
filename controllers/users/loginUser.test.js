require("dotenv").config();
const app = require("../../app");
const testReq = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../models");

const { DB_TEST_HOST } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    console.log("Test DB Connected");
    await User.deleteMany();
  });

  // it("should get a token and a statusCode = 200", async () => {
  //   const response = await testReq(app).post("/api/users/login").send({
  //     email: "example@mail.com",
  //     password: "password",
  //   });
  //   const token = response.body.data.token;
  //   expect(response.statusCode).toBe(200);
  //   expect(token).toBeDefined();
  //   expect(typeof token).toBe("string");
  // });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_HOST);
    console.log("Test DB Disconnected");
  });
});
