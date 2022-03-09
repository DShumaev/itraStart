const sequelize = require("../models/index");
const getUserModel = require("../models/user");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("config");

class UserServices {
  userModel = getUserModel(sequelize, Sequelize.DataTypes);

  userDbField = ["userName", "firstName", "lastName", "email", "password"];

  async getAllUsers() {
    const usersData = await this.userModel.findAll();
    if (!(Array.isArray(usersData) && usersData.length > 0)) {
      return false;
    }
    const users = [];
    usersData.forEach((userData) => {
      users.push(userData.dataValues);
    });

    return users;
  }

  async addNewUser(userData) {
    if (!(typeof userData === "object" && Object.keys(userData).length > 0)) {
      return false;
    }
    const countReqFields = this.userDbField.reduce((counter, field) => {
      if (!Object.keys(userData).includes(field)) {
        return 0;
      }
      return (counter += 1);
    }, 0);

    if (Object.keys(this.userDbField).length !== countReqFields) {
      return false;
    }
    const createdUser = await this.userModel.create({
      userName: userData.userName,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: await bcrypt.hash(
        userData.password,
        config.get("hashPswdSalt")
      ),
    });

    if (!createdUser) {
      return false;
    }

    return createdUser.dataValues.id;
  }

  async getUserById(id) {
    try {
      const userData = await this.userModel.findOne({
        where: { id },
      });
      if (!(userData && userData.dataValues)) {
        return false;
      }
      return userData.dataValues;
    } catch {
      return false;
    }
  }

  async getUserByEmail({ email }) {
    try {
      const userData = await this.userModel.findOne({
        where: { email },
      });
      if (!(userData && userData.dataValues)) {
        return false;
      }
      return userData.dataValues;
    } catch {
      return false;
    }
  }

  async getUserByUserName({ userName }) {
    try {
      const userData = await this.userModel.findOne({
        where: { userName },
      });
      if (!(userData && userData.dataValues)) {
        return false;
      }
      return userData.dataValues;
    } catch {
      return false;
    }
  }

  async updateUser(id, newUserData) {
    try {
      if (
        !(
          typeof newUserData === "object" && Object.keys(newUserData).length > 0
        )
      ) {
        return false;
      }
      const countUserFields = this.userDbField.reduce((counter, field) => {
        if (!Object.keys(newUserData).includes(field)) {
          return 0;
        }
        return (counter += 1);
      }, 0);

      if (countUserFields !== Object.length(this.userDbField)) {
        return false;
      }
      const updatedData = await this.userModel.update(newUserData, {
        where: { id },
      });
      if (!updatedData[0]) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async deleteUser(id) {
    const isUserDelete = await this.userModel.destroy({
      where: { id },
    });

    if (isUserDelete) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new UserServices();
