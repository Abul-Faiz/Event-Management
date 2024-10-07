const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    profilePicture: {
      type: String,
      default: "Abul Faiz.jpg",
    },
    favoriteGenres: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const hashPassword = (password, salt) => {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  return hash.digest("hex");
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = hashPassword(this.password, salt);
  this.password = `${salt}:${hashedPassword}`;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const [salt, storedHash] = this.password.split(":");
  const hashedPassword = hashPassword(password, salt);
  return hashedPassword === storedHash;
};
module.exports = mongoose.model("User", userSchema);
