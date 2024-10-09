const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
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
    bio: {
      type: String,
    },
    currentRead: {
      type: String,
    },
    level: {
      type: Number,
      default: 1,
    },
    status: {
      type: Number,
      default: 1, // 0: delete, 1:active, 2: Blocked
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
