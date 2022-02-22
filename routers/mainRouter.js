const { Router } = require("express");
const Controller = require("../controllers/controller");

const router = Router();
router.get("/hello", Controller.sendHelloMessage);

module.exports = router;
