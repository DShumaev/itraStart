const userService = require("../services/dbUserServices");

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      if (!users) {
        res.status(200).json({
          status: "error",
          message: "user didn't creat yet",
        });
        return;
      }
      res.status(200).json({
        users,
        status: "success",
      });
    } catch (e) {
      res.status(500).json({
        message: "unexpected server error",
      });
    }
  }

  async addNewUser(req, res) {
    try {
      const isUserCreated = await userService.addNewUser(req.body);
      if (!isUserCreated) {
        res.status(200).json({
          status: "error",
          message: "user has not been created",
        });
        return;
      }
      res.status(200).json({
        status: "success",
        message: "user created",
      });
    } catch (e) {
      res.status(500).json({
        message: "unexpected server error",
      });
    }
  }

  async getUser(req, res) {
    try {
      const user = await userService.getUser(req.params.id);
      if (!user) {
        res.status(200).json({
          status: "error",
          message: `user with ID = ${req.params.id} is not found`,
        });
        return;
      }
      res.status(200).json({
        user,
        status: "success",
      });
    } catch (e) {
      res.status(500).json({
        message: "unexpected server error",
      });
    }
  }

  async changeUserInfo(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);

      if (!user) {
        res.status(200).json({
          status: "error",
          message: "Problem with change information about user",
        });
        return;
      }
      res.status(200).json({
        status: "success",
        message: "Information about user changed successfully",
      });
    } catch (e) {
      res.status(500).json({
        message: "unexpected server error",
      });
    }
  }

  async removeUser(req, res) {
    try {
      const isDeleted = await userService.deleteUser(req.params.id);
      if (isDeleted) {
        res.status(200).json({
          status: "success",
          message: "user deleted successfully",
        });
        return;
      } else {
        res.status(200).json({
          status: "error",
          message: "have a problem with deleting this user",
        });
      }
    } catch (e) {
      res.status(500).json({
        message: "unexpected server error",
      });
    }
  }
}

module.exports = new UserController();
