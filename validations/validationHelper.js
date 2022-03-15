const { validate } = require("express-validation");

module.exports = function (schema) {
  return validate(schema, { context: true });
};
