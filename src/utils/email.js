const nodemailer = require("nodemailer");
require("dotenv").config();
const { responseEnum } = require("../helper/response.enum");
const { response } = require("../helper/response.helper");

async function sendPasswordResetEmail(user, resetToken) {
  const resetUrl = `https://beta.onefede.com/auth/newpass?token=${resetToken}`;
  const message = `You are receiving this email because you (or someone else) requested a password reset. Please go to the following link to reset your password: \n\n${resetUrl}`;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    to: user.email,
    subject: "Password Reset Request",
    text: message,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return response(responseEnum.Success, responseEnum.Activated);
  } catch (error) {
    console.error("Error sending email: ", error);
    return response(responseEnum.Error, responseEnum.DataNotFound);
  }
}

module.exports = { sendPasswordResetEmail };
