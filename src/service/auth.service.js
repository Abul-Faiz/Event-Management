require("dotenv").config();
const User = require("../model/user.model");
const { statusCodeEnum } = require("../helper/status.enum");
const { responseEnum } = require("../helper/response.enum");
const { response } = require("../helper/response.helper");
const { errorHandler } = require("../helper/errorHandler.helper");
const { createToken, verifyToken, getTokenExpiry } = require("../utils/jwt");
const { sendPasswordResetEmail } = require("../utils/email");
const bcrypt = require('bcrypt')

async function signUp(reqData) {
  try {
    const { name, email, password, role, favoriteGenres } = reqData;
    const newUser = new User({ name, email, password, role, favoriteGenres });
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
    const passMatch = await user.comparePassword(password);
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

async function requestPassword(email) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response(responseEnum.DataNotFound, statusCodeEnum.HTTP_NOT_FOUND);
    }
    const resetToken = createToken({ id: user._id });
    const expiryTime = getTokenExpiry(resetToken);
    console.log("Token expires at:", expiryTime);
    await sendPasswordResetEmail(user, resetToken);
    return response(responseEnum.passwordToken, statusCodeEnum.HTTP_OK);
  } catch (error) {
    return errorHandler(error);
  }
}

async function reset(token, newPassword) {
  try {
    const decode = verifyToken(token);
    const expiryTime = getTokenExpiry(token);
    const user = await User.findById(decode._id);
    console.log(user,'<<<<<<<<<<<<<<<<<<<<<<<<<<')
    if (!user) {
      return response(responseEnum.DataNotFound, statusCodeEnum.HTTP_NOT_FOUND);
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return response(
      responseEnum.Saved,
      statusCodeEnum.HTTP_OK,
      responseEnum.Success,
      {expiredAT : expiryTime}
    );
  } catch (error) {
    return errorHandler(error);
  }
}

const authService = { signUp, login, requestPassword, reset };
module.exports = { authService };
