require("dotenv").config();
const User = require("../model/user.model");
const { statusCodeEnum } = require("../helper/status.enum");
const { responseEnum } = require("../helper/response.enum");
const { response } = require("../helper/response.helper");
const { errorHandler } = require("../helper/errorHandler.helper");
const { createToken, verifyToken, getTokenExpiry } = require("../utils/jwt");
const { sendPasswordResetEmail } = require("../utils/email");

async function signUp(reqData) {
  try {
    const { name, email, password, role } = reqData;
    const newUser = new User({ name, email, password, role });
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
    if (user.status === 0) {
      return response(
        responseEnum.AccountDisabled,
        statusCodeEnum.HTTP_UNAUTHORIZED,
        responseEnum.Error
      );
    }
    return response(responseEnum.Saved, statusCodeEnum.HTTP_OK, {
      message: responseEnum.Success,
      token: token,
      expiresIn: process.env.EXPIRES_IN,
      _id: user._id,
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
    await sendPasswordResetEmail(user, resetToken);
    return response(responseEnum.passwordToken, statusCodeEnum.HTTP_OK, {
      message: expiryTime,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

async function reset(token, newPassword) {
  try {
    const decode = verifyToken(token);
    const expiryTime = getTokenExpiry(token);
    const user = await User.findById(decode._id);
    if (!user) {
      return response(responseEnum.DataNotFound, statusCodeEnum.HTTP_NOT_FOUND);
    }
    user.password = newPassword;
    await user.save();
    return response(
      responseEnum.Saved,
      statusCodeEnum.HTTP_OK,
      responseEnum.Success,
      { expiredAT: expiryTime }
    );
  } catch (error) {
    return errorHandler(error);
  }
}

const authService = { signUp, login, requestPassword, reset };
module.exports = { authService };
