const jwt = require("jsonwebtoken");
require('dotenv').config()

function createToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

// function getTokenExpiry(token) {
//   try {
//     const decoded = verifyToken(token);
//     return decoded.exp;
//   } catch (error) {
//     throw new Error("Error retrieving token expiry date");
//   }
// }

// function refreshToken(token) {
//   try {
//     const decoded = verifyToken(token);
//     delete decoded.exp;
//     delete decoded.iat;
//     const newToken = createToken(decoded);
//     return {
//       token: newToken,
//       expiresIn: getTokenExpiry(newToken),
//     };
//   } catch (error) {
//     throw new Error("Error refreshing token");
//   }
// }

module.exports = {
  createToken,
  verifyToken,
//  getTokenExpiry,
//  refreshToken,
};
