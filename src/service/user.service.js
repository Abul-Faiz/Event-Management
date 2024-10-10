require("dotenv").config();
const User = require("../model/user.model");
const { statusCodeEnum } = require("../helper/status.enum");
const { responseEnum } = require("../helper/response.enum");
const { response } = require("../helper/response.helper");
const { pagination, convertToObjectId } = require("../helper/common.helper");

async function getAll(pageNumber, pageSize, name = "") {
  pageNumber = pageNumber || 1;
  pageSize = pageSize || 10;
  const skip = (pageNumber - 1) * pageSize;
  const filter = name ? { name: { $regex: new RegExp(name, "i") } } : {};
  const totalCount = await User.find(filter).countDocuments();
  const data = await User.find(filter)
    .select("-password")
    .skip(skip)
    .limit(pageSize);
  return pagination(data, pageNumber, pageSize, totalCount);
}

async function getById(id) {
  return await User.findOne({ _id: convertToObjectId(id) });
}

async function updateProfile(id, userData) {
  await User.updateOne({ _id: convertToObjectId(id) }, userData);
  return response(responseEnum.Updated, statusCodeEnum.HTTP_CREATED);
}

async function deleteUser(id) {
  await User.updateOne({ _id: convertToObjectId(id) }, { $set: { status: 0 } });
  return response(responseEnum.Deleted, statusCodeEnum.HTTP_OK);
}

const userService = { getAll, getById, updateProfile, deleteUser };
module.exports = { userService };
