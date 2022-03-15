const Sequelize = require("sequelize");
const sequelize = require("../models/index");
const getUserModel = require("../models/user");
const config = require("config");
const bcrypt = require("bcrypt");

const userModel = getUserModel(sequelize, Sequelize.DataTypes);

const testUserValue = {
  userName: "Testik",
  firstName: "Test",
  lastName: "Testovich",
  email: "test@mail.ru",
  password: "Testpassword0",
};

const testUserValue2 = {
  userName: "Testik2",
  firstName: "Test2",
  lastName: "Testovich2",
  email: "test2@mail.ru",
  password: "Testpassword2",
};

const testUserUpdatedValue = {
  userName: "Testikovich",
  firstName: "Teston",
  lastName: "Testovichovski",
  email: "testing@mail.ru",
  password: "Testpassword12345",
};

const testUserIncorrectValue = {
  user: "Testikovich",
  firstName: "Teston",
  lastName: "Testovichovski",
  email: "testing@mail.ru",
  password: "Testpassword12345",
};

const testUserUpdatedIncorrectValue = {
  user: "Testikovich",
  firstName: "Teston",
  lastName: "Testovichovski",
  email: "testing@mail.ru",
  password: "Testpassword12345",
};

async function createTestUser(userData) {
  const createdUser = await userModel.create({
    userName: userData.userName,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: await bcrypt.hash(userData.password, config.get("hashPswdSalt")),
  });

  return createdUser.dataValues.id;
}

async function deleteTestUser(id) {
  await userModel.destroy({
    where: { id },
  });
}

module.exports = {
  userModel,
  createTestUser,
  deleteTestUser,
  testUserValue,
  testUserValue2,
  testUserUpdatedValue,
  testUserIncorrectValue,
  testUserUpdatedIncorrectValue,
};
