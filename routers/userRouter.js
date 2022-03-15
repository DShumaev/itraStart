const { Router } = require("express");
const userController = require("../controllers/userController");
const validator = require("../validations/validationHelper");
const authValidator = require("../validations/authValidator");
const userValidSchema = require("../validations/userValidationsSchema");

const router = Router();

router.get("/", validator(userValidSchema.get), userController.getAllUsers);

router.get("/:id", validator(userValidSchema.get), userController.getUser);

router.post(
  "/",
  authValidator(),
  validator(userValidSchema.post),
  userController.addNewUser
);

router.put(
  "/:id",
  authValidator(),
  validator(userValidSchema.put),
  userController.changeUserInfo
);

router.delete(
  "/:id",
  authValidator(),
  validator(userValidSchema.delete),
  userController.removeUser
);

module.exports = router;
