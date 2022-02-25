const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.get("/all", userController.getAllUsers);

router.get("/:id", userController.getUser);

router.post("/create", userController.addNewUser); // necessary add auth validation

router.put("/update/:id", userController.changeUserInfo); // necessary add auth validation

router.delete("/remove/:id", userController.removeUser); // necessary add auth validation

module.exports = router;
