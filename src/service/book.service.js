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

async function getAll(pageNumber, pageSize, search, genres) {
  try {
    pageNumber = Number(pageNumber) || 1;
    pageSize = Number(pageSize) || 10;
    const skip = (pageNumber - 1) * pageSize;
    const searchQuery = {};
    if (genres && Array.isArray(genres) && genres.length > 0) {
      searchQuery.genres = { $in: genres };
    }
    if (search) {
      const titleOrAuthorSearch = {
        $or: [
          { title: { $regex: new RegExp(search, "i") } },
          { author: { $regex: new RegExp(search, "i") } },
        ],
      };
      if (Object.keys(searchQuery).length > 0) {
        searchQuery.$and = [searchQuery, titleOrAuthorSearch];
      } else {
        Object.assign(searchQuery, titleOrAuthorSearch);
      }
    }
    const totalCount = await books.countDocuments(searchQuery);
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

async function update(id, data) {
  try {
    await books.updateOne({ id: convertToObjectId(id) }, data);
    return response(responseEnum.Updated, statusCodeEnum.HTTP_OK);
  } catch (error) {
    return errorHandler(error);
  }
}

async function bookDelete(id) {
  try {
    await books.updateOne(
      { id: convertToObjectId(id) },
      { $set: { status: 0 } }
    );
    return response(responseEnum.Deleted, statusCodeEnum.HTTP_OK);
  } catch (error) {
    return errorHandler(error);
  }
}
const bookService = { createBook, getAll, getById, update, bookDelete };
module.exports = { bookService };
