const { bookService } = require("../service/book.service");

async function bookList(req, res) {
  // #swagger.tags = ["Books"]
  // #swagger.summary = "Get all books"
  const { pageNumber, pageSize, title, author } = req.query;
  const result = await bookService.getAll(pageNumber, pageSize, title, author);
  return res.send(result);
}

async function bookById(req, res) {
  // #swagger.tags = ["Books"]
  // #swagger.summary = "Get book by id"
  const { id } = req.params;
  const result = await bookService.getById(id);
  return res.send(result);
}

const bookController = { bookList, bookById };
module.exports = { bookController };
