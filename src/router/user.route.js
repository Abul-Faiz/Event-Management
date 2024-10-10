const express = require("express");
const router = express.Router();
const { userController } = require("../controller/user.controller");

router.get("/getAllUser", userController.userList);
router.get("/getById/:userId", userController.userID);
router.put("/userUpdate/:userId", userController.userUpdate);
router.delete("/deleteUser/:userId", userController.userDelete);

module.exports = router;
