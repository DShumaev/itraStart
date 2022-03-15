const { Joi } = require("express-validation");
const validationParams = require("./validationParams");

const userValidationsSchema = {
  get: {
    params: Joi.object({
      id: Joi.number().integer().positive(),
    }),
  },
  post: {
    body: Joi.object({
      userName: Joi.string()
        .min(validationParams.userNameMinLength)
        .max(validationParams.userNameMaxLength)
        .required(),
      firstName: Joi.string()
        .min(validationParams.firstNameMinLength)
        .max(validationParams.firstNameMaxLength)
        .required(),
      lastName: Joi.string()
        .min(validationParams.lastNameMinLength)
        .max(validationParams.lastNameMaxLength)
        .required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(validationParams.passwordRegex).required(),
    }).options({ stripUnknown: true }),
  },
  put: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
    body: Joi.object({
      userName: Joi.string()
        .min(validationParams.userNameMinLength)
        .max(validationParams.userNameMaxLength)
        .required(),
      firstName: Joi.string()
        .min(validationParams.firstNameMinLength)
        .max(validationParams.firstNameMaxLength)
        .required(),
      lastName: Joi.string()
        .min(validationParams.lastNameMinLength)
        .max(validationParams.lastNameMaxLength)
        .required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(validationParams.passwordRegex).required(),
    }).options({ stripUnknown: true }),
  },
  delete: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
};

module.exports = userValidationsSchema;
