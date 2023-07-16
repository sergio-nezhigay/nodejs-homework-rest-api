const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../../models/user");
const loginUser = require("./loginUser");

jest.mock("../../models/user");

describe("Login User Controller", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {
        email: "010",
        password: "9s1dfhdsfbhdsf",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("should generate a token and return user information", async () => {
    const user = {
      email: "010",
      subscription: "starter",
      validPassword: jest.fn().mockReturnValue(true),
    };

    User.findOne.mockResolvedValue(user);

    const token = "test_token";
    jest.spyOn(jwt, "sign").mockReturnValue(token);

    await loginUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token,
      user: {
        email: "010",
        subscription: "starter",
      },
    });
  });
});
