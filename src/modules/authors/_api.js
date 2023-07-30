const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  addAuthor,
  showAuthor,
  editAuthor,
  deleteAuthor,
  getAuthor,
} = require("./_controllers");
// const isSuperAdmin = require("../../shared/auth/is_super_admin");

const router = express.Router();

router.post("/authors", isLoggedIn, addAuthor);
router.get("/authors", isLoggedIn, getAuthor);
router.get("/authors/:id", isLoggedIn, showAuthor);
router.patch("/authors/:id", isLoggedIn, editAuthor);
router.delete("/authors/:id", isLoggedIn, deleteAuthor);

module.exports = router;
