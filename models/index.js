const Sequelize = require("sequelize");
const config = require("config");

const sequelize = new Sequelize(
  config.get("development.database"),
  config.get("development.username"),
  config.get("development.password"),
  {
    host: config.get("development.host"),
    dialect: config.get("development.dialect"),
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
