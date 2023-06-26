const Joi = require("joi");

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
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})
  .required()
  .messages({
    "object.min": "missing fields",
  })
  .min(1);

module.exports = {
  addSchema,
  updateSchema,
};
