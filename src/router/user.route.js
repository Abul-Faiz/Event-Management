const express = require("express");
const router = express.Router();
const { authController } = require("../controller/auth.controller");
const validate = require("../middleware/validate");
const { signupSchema, loginSchema } = require("../validation/auth.validate");

router.post("/signUp", validate(signupSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
