const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../model/user.model");
const { statusCodeEnum } = require("../helper/status.enum");
const { responseEnum } = require("../helper/response.enum");
const { response } = require("../helper/response.helper");
const { errorHandler } = require("../helper/errorHandler.helper");
const { createToken } = require("../utils/jwt");

async function signUp(reqData) {
  try {
    const { name, email, password, role } = reqData;
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALTROUNDS)
    );
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    return response(
      responseEnum.SignUp,
      statusCodeEnum.HTTP_CREATED,
      responseEnum.Success
    );
  } catch (error) {
    return errorHandler(error);
  }
}

async function login(LoginData) {
  try {
    const { email, password } = LoginData;
    const user = await User.findOne({ email });
    if (!user) {
      return response(
        responseEnum.DataNotFound,
        statusCodeEnum.HTTP_NOT_FOUND,
        responseEnum.Error
      );
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return response(
        responseEnum.Invalid,
        statusCodeEnum.HTTP_UNAUTHORIZED,
        responseEnum.Error
      );
    }
    const payload = { _id: user._id, role: user.role };
    const token = createToken(payload);
    return response(responseEnum.Saved, statusCodeEnum.HTTP_OK, {
      message: responseEnum.Success,
      token: token,
      expiresIn: process.env.EXPIRES_IN,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

const authService = { signUp, login };
module.exports = { authService };
