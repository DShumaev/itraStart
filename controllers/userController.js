const userService = require("../services/dbUserServices");

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      if (!users) {
        res.status(200).json({
          users: [],
        });

        return;
      }
      res.status(200).json({ users });
    } catch (e) {
      res.status(500).json({
        message: "unexpected server error",
      });
    }
  }

  async addNewUser(req, res) {
    try {
      if (await userService.getUserByUserName(req.body)) {
        res.status(400).json({
          message: "user with this user name has already been created",
        });

        return;
      }
      if (await userService.getUserByEmail(req.body)) {
        res.status(400).json({
          message: "user with this email address has already been created",
        });

        return;
      }
      const userId = await userService.addNewUser(req.body);
      if (!userId) {
        res.status(400).json({
          message: "user has not been created",
        });

        return;
      }
      res.status(200).json({
        id: `${userId}`,
      });
    } catch (e) {
      res.status(500).json({
        message: "unexpected server error",
      });
    }
  }

  async getUser(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        res.status(400).json({
          message: `user with ID = ${req.params.id} is not found`,
        });

        return;
      }
      res.status(200).json({ user });
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
        res.status(400).json({
          message: "Problem with change information about user",
        });

        return;
      }
      res.status(200).json({
        id: req.params.id,
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
          id: req.params.id,
        });
      } else {
        res.status(400).json({
          message: "Can't delete user. User with this ID is not found",
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
