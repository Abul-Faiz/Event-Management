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
  const { pageNumber, pageSize, search, genres } = req.query;
  const result = await bookService.getAll(pageNumber, pageSize, search, genres);
  return res.send(result);
}

async function bookById(req, res) {
  // #swagger.tags = ["Books"]
  // #swagger.summary = "Get book by id"
  const { BookId } = req.params;
  const result = await bookService.getById(BookId);
  return res.send(result);
}

async function updateBooks(req, res) {
  /* 
     #swagger.tags = ["Books"]
     #swagger.summary = "update book Api"
     #swagger.parameters['body'] = {
     in : 'body',
     description: 'Book details',
     schema: {
          title: "Lord of the Rings",
          author: "Michael Horton",
          year: 1987,
          genres: ["action","fantasy"],
          status: 2
        }
}
  */
  const { BookId } = req.params;
  const result = await bookService.updateBook(BookId, req.body);
  return res.send(result);
}

async function deleteBook(req, res) {
  // #swagger.tags = ["Books"]
  // #swagger.summary = "delete Book Api"
  const { BookId } = req.params;
  const result = await bookService.bookDelete(BookId);
  return res.send(result);
}

const bookController = {
  bookList,
  bookById,
  insertBook,
  updateBooks,
  deleteBook,
};
module.exports = { bookController };
