module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        userName: "Uilchik",
        firstName: "Uil",
        lastName: "Smith",
        email: "smitishe@california.com",
        password: "pswd111",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: "Arianushka",
        firstName: "Arianna",
        lastName: "Grande",
        email: "grandovoz@state.com",
        password: "pswd222",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: "pomelo",
        firstName: "Pamela",
        lastName: "Anderson",
        email: "superstar@fruit.com",
        password: "pswd333",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
