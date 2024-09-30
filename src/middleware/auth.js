const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { responseEnum } = require("../helper/response.enum");
require("dotenv").config();

function authguard(allowedRoles = ["ADMIN", "USER"]) {
  return async (req, res, next) => {
    try {
      const token = req.header("Authorization");
      if (!token) {
        return res.status(403).json({
          Type: responseEnum.Error,
          message: responseEnum.AccessDenied,
        });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          Type: responseEnum.Error,
          message: responseEnum.Forbidden,
        });
      }
      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(404).json({
          Type: responseEnum.Error,
          message: responseEnum.DataNotFound,
        });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({
        Type: responseEnum.Error,
        message: responseEnum.Unauthorized,
      });
    }
  };
}

module.exports = { authguard };
