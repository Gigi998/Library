import express from "../../server";
const router = express.Router();
const {
  getAllBooks,
  addNewBook,
  deleteBook,
  getSingleBook,
} = require("../../controllers/booksController");

router.route("/").get(getAllBooks).post(addNewBook);

router.route("/:id").delete(deleteBook).get(getSingleBook);

module.exports = router;
