const authController = require("../controllers/authController");
const { Router } = require("express");

const router = Router();

router.post("/login", authController.login);

module.exports = router;
