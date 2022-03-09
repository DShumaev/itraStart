const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUser);

router.post("/", userController.addNewUser); // necessary add auth validation

router.put("/:id", userController.changeUserInfo); // necessary add auth validation

router.delete("/:id", userController.removeUser); // necessary add auth validation

module.exports = router;
