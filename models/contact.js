const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../middlewares");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const requiredField = (fieldName) =>
  Joi.string()
    .required()
    .messages({
      "any.required": `missing required '${fieldName}' field`,
    });

const addSchema = Joi.object({
  name: requiredField("name"),
  email: requiredField("email"),
  phone: requiredField("phone"),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean().optional(),
})
  .required()
  .messages({
    "object.min": "missing fields",
  })
  .min(1);

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

const schemas = {
  addSchema,
  updateSchema,
  updateStatusSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
