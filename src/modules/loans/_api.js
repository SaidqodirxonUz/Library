const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const { rentBook, getRentedBooks, showRentedBooks } = require("./_controllers");

const router = express.Router();

router.post("/rent", isLoggedIn, rentBook);
router.get("/rent", isLoggedIn, getRentedBooks);
router.get("/rent/:id", isLoggedIn, showRentedBooks);

module.exports = router;
