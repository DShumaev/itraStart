const router = require("express").Router();
const Controller = require("../controllers/controller");

router.get("/hello", Controller.sendHelloMessage);

module.exports = router;
