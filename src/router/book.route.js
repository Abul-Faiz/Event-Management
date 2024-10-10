const express = require("express");
const router = express.Router();
const { bookController } = require("../controller/book.controller");

router.post("/insert-book", bookController.insertBook);
router.get("/book-List", bookController.bookList);
router.get("/bookById/:id", bookController.bookById);

module.exports = router;
