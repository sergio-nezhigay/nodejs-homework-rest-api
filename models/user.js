const { Schema, model } = require("mongoose");
const bCrypt = require("bcryptjs");
const Joi = require("joi");

const { handleMongooseError } = require("../middlewares");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const authSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "Joi validation error: email is required " }),
  password: Joi.string().required().messages({
    "any.required": "Joi validation error: password is required ",
  }),
});

const schemas = {
  authSchema,
};

module.exports = { User, schemas };
