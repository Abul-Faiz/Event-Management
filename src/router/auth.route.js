const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { authController } = require("../controller/auth.controller");
const { signupSchema, loginSchema } = require("../validation/auth.validate");

router.post("/signUp", validate(signupSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/requestPassword", authController.passwordRequest);
router.post("/resetPassword", authController.resetPassword);

module.exports = router;
