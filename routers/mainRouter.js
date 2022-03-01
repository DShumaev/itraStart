const router = require("express").Router();
const Controller = require("../conntrollers/controller");

router.get("/hello", Controller.sendHelloMessage);

module.exports = router;
