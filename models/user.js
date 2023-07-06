const { Schema, model } = require("mongoose");
const bCrypt = require("bcryptjs");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const SUBSCRIPTION_OPTIONS = ["starter", "pro", "business"];

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
    enum: SUBSCRIPTION_OPTIONS,
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

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...SUBSCRIPTION_OPTIONS)
    .required()
    .messages({
      "any.required": "missing field subscription",
      "any.only": `subscription must be one of options: ${SUBSCRIPTION_OPTIONS.join(
        ", "
      )}`,
    }),
});

const schemas = {
  authSchema,
  updateSubscriptionSchema,
};

module.exports = { User, schemas };
