const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  addBook,
  showBook,
  editBook,
  deleteBook,
  getBooks,
} = require("./_controllers");
// const isSuperAdmin = require("../../shared/auth/is_super_admin");

const router = express.Router();

router.post("/books", isLoggedIn, addBook);
router.get("/books", isLoggedIn, getBooks);
router.get("/books/:id", isLoggedIn, showBook);
router.patch("/books/:id", isLoggedIn, editBook);
router.delete("/books/:id", isLoggedIn, deleteBook);

module.exports = router;
