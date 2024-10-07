const axios = require("axios");
const { response } = require("../helper/response.helper");
const { responseEnum } = require("../helper/response.enum");
const { statusCodeEnum } = require("../helper/status.enum");

async function getAll(pageNumber, pageSize, title = "", author = "") {
  pageNumber = pageNumber || 1;
  pageSize = pageSize || 10;
  const skip = (pageNumber - 1) * pageSize;
  const titleQuery = title ? `&search=${encodeURIComponent(title)}` : "";
  const authorQuery = author ? `&search=${encodeURIComponent(author)}` : "";
  const resData = await axios.get(
    `https://freetestapi.com/api/v1/books?limit=${pageSize}&skip=${skip}${titleQuery}${authorQuery}`
  );
  const books = resData.data;
  const totalCount = resData.headers["x-total-count"] || 0;
  return response(responseEnum.Success, statusCodeEnum.HTTP_OK, {
    data: books,
    currentPage: pageNumber,
    pageSize: pageSize,
    totalBooks: totalCount,
  });
}

async function getById(id) {
  const response = await axios.get(
    `https://freetestapi.com/api/v1/books/${id}`
  );
  const book = response.data;
  return book;
}
const bookService = { getAll, getById };
module.exports = { bookService };
