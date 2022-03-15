const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (userId, userName) => {
  return jwt.sign(
    {
      userId,
      userName,
    },
    config.get("jwtSecret"),
    {
      expiresIn: "24h",
    }
  );
};
