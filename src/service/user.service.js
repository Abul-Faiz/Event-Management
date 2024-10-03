require("dotenv").config();
const User = require("../model/user.model");
const { statusCodeEnum } = require("../helper/status.enum");
const { responseEnum } = require("../helper/response.enum");
const { response } = require("../helper/response.helper");
const { errorHandler } = require("../helper/errorHandler.helper");
const { pagination } = require("../helper/common.helper");
const mongoose = require("mongoose");

async function getAll(pageNumber, pageSize, name = "") {
  pageNumber = pageNumber || 1;
  pageSize = pageSize || 10;
  const skip = (pageNumber - 1) * pageSize;
  const filter = name ? { name: { $regex: new RegExp(name, "i") } } : {};
  const totalCount = await User.find(filter).countDocuments();
  const data = await User.find(filter).skip(skip).limit(pageSize);
  return pagination(data, pageNumber, pageSize, totalCount);
}

async function getById(id) {
  const objectId = new mongoose.Types.ObjectId(id);
  return await User.findOne({ _id: objectId });
}

async function updateProfile(id, userData) {
    const objectId = new mongoose.Types.ObjectId(id);
    await User.updateOne({ _id: objectId }, userData);
    return response(responseEnum.Updated, statusCodeEnum.HTTP_CREATED);
}

async function deleteUser(id) {
  const objectId = new mongoose.Types.ObjectId(id);
  await User.deleteOne({ _id: objectId });
  return response(responseEnum.Deleted, statusCodeEnum.HTTP_OK);
}

const userService = { getAll, getById, updateProfile, deleteUser };
module.exports = { userService };
