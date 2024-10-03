const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { userController } = require("../controller/user.controller");
const { signupSchema } = require("../validation/auth.validate");

router.get("/getAllUser", userController.userList);
router.get("/getById/:userId", userController.userID);
router.put(
  "/userUpdate/:userId",
  validate(signupSchema),
  userController.userUpdate
);
router.delete("/deleteUser/:userId", userController.userDelete);

module.exports = router;
