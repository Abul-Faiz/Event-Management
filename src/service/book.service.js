const books = require("../model/book.model");
const { pagination, convertToObjectId } = require("../helper/common.helper");
const { response } = require("../helper/response.helper");
const { responseEnum } = require("../helper/response.enum");
const { statusCodeEnum } = require("../helper/status.enum");
const { errorHandler } = require("../helper/errorHandler.helper");

async function createBook(insertData) {
  try {
    await new books(insertData).save();
    return response(
      responseEnum.Success,
      statusCodeEnum.HTTP_CREATED,
      responseEnum.Created
    );
  } catch (error) {
    return errorHandler(error);
  }
}

async function getAll(pageNumber, pageSize, query = {}) {
  try {
    pageNumber = Number(pageNumber) || 1;
    pageSize = Number(pageSize) || 10;
    const skip = (pageNumber - 1) * pageSize;
    let searchQuery = {};
    if (query.title) {
      searchQuery.title = new RegExp(query.title, "i");
    }
    if (query.author) {
      searchQuery.author = new RegExp(query.author, "i");
    }
    if (
      query.genres &&
      Array.isArray(query.genres) &&
      query.genres.length > 0
    ) {
      searchQuery.genres = { $in: query.genres };
    }
    const totalCount = await books.find(searchQuery).countDocuments();
    const data = await books.find(searchQuery).skip(skip).limit(pageSize);
    const result = pagination(data, pageNumber, pageSize, totalCount);
    return response(responseEnum.Success, statusCodeEnum.HTTP_OK, result);
  } catch (error) {
    return errorHandler(error);
  }
}

async function getById(id) {
  try {
    const book = await books.findOne({ _id: convertToObjectId(id) });
    if (!book) {
      return response(responseEnum.DataNotFound, statusCodeEnum.NOT_FOUND);
    }
    return response(responseEnum.Success, statusCodeEnum.HTTP_OK, book);
  } catch (error) {
    return errorHandler(error);
  }
}
const bookService = { createBook, getAll, getById };
module.exports = { bookService };
