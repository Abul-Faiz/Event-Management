const express = require("express");
const router = express.Router();
const { bookController } = require("../controller/book.controller");
const { validate } = require("../middleware/validate");
const { bookSchema } = require("../validation/book.validate");

router.post("/insert-book", validate(bookSchema), bookController.insertBook);
router.get("/book-List", bookController.bookList);
router.get("/bookById/:id", bookController.bookById);
router.put("/update-Books", validate(bookSchema), bookController.updateBooks);
router.put("/delete-Book", bookController.deleteBook);

module.exports = router;
