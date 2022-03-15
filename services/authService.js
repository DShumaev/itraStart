const sequelize = require("../models/index");
const getUserModel = require("../models/user");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const getToken = require("./utils/token");

class AuthServices {
  userModel = getUserModel(sequelize, Sequelize.DataTypes);

  async loginUser(email, password) {
    try {
      const userData = await this.userModel.findOne({ where: { email } });
      console.log(userData);
      if (!(userData && userData.dataValues)) {
        return false;
      }
      const isPswdCorrect = await bcrypt.compare(
        password,
        userData.dataValues.password
      );
      if (!isPswdCorrect) {
        return false;
      }
      const token = getToken(
        userData.dataValues.userName,
        userData.dataValues.id
      );
      const user = {
        token,
        userId: userData.dataValues.id,
        userName: userData.dataValues.userName,
      };
      return user;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = new AuthServices();
