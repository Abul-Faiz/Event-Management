const mongoose = require('mongoose')

const pagination = (list, page, limit, totalcount) => {
  const total = totalcount;
  const currentPage = page ? Number(page) : 1;
  const totalPages = Math.ceil(total / limit);
  const pageMeta = {
    size: limit,
    page: currentPage,
    total: total,
    totalPages: totalPages,
    data: list,
  };
  return pageMeta;
};

const convertToObjectId = (id) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    throw new Error("Invalid ID format");
  }
};

module.exports = { pagination, convertToObjectId };
