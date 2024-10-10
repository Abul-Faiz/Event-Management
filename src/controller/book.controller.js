const { bookService } = require("../service/book.service");

async function insertBook(req, res) {
  /* 
     #swagger.tags = ["Books"]
     #swagger.summary = "Create a new book"
     #swagger.parameters['body'] = {
     in : 'body',
     description: 'Book details',
     schema: {
          title: "Lord of the Rings",
          author: "Michael Horton",
          year: 1987,
          genres: ["action","fantasy"]
        }
}
  */
  const result = await bookService.createBook(req.body);
  return res.send(result);
}

async function bookList(req, res) {
  // #swagger.tags = ["Books"]
  // #swagger.summary = "Get all books"
  const { pageNumber, pageSize, query } = req.query;
  const result = await bookService.getAll(pageNumber, pageSize, query);
  return res.send(result);
}

async function bookById(req, res) {
  // #swagger.tags = ["Books"]
  // #swagger.summary = "Get book by id"
  const { id } = req.params;
  const result = await bookService.getById(id);
  return res.send(result);
}

const bookController = { bookList, bookById, insertBook };
module.exports = { bookController };
