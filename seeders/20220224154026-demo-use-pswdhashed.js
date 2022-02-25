const bcrypt = require("bcrypt");
const config = require("config");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        userName: "UilchikHashed",
        firstName: "Uil",
        lastName: "Smith",
        email: "smitishe2@california.com",
        password: await bcrypt.hash("pswd111", config.get("hashPswdSalt")),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: "ArianushkaHashed",
        firstName: "Arianna",
        lastName: "Grande",
        email: "grandovoz2@state.com",
        password: await bcrypt.hash("pswd222", config.get("hashPswdSalt")),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: "pomeloHashed",
        firstName: "Pamela",
        lastName: "Anderson",
        email: "superstar2@fruit.com",
        password: await bcrypt.hash("pswd333", config.get("hashPswdSalt")),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
