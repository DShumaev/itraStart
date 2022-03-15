const authService = require("../services/authService");

class AuthController {
  async login(req, res) {
    try {
      const user = await authService.loginUser(
        req.body.email,
        req.body.password
      );
      if (!user) {
        res.status(400).json({
          message: "user with current credentials can't be logged in",
        });
        return;
      }
      res.status(200).json(user);
    } catch (e) {
      res.status(500).json({
        message: "unexpected server error",
      });
    }
  }
}

module.exports = new AuthController();
