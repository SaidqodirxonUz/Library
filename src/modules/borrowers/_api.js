const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  addBorrower,
  showBorrower,
  editBorrower,
  deleteBorrower,
  getBorrower,
} = require("./_controllers");
// const isSuperAdmin = require("../../shared/auth/is_super_admin");

const router = express.Router();

router.post("/borrowers", isLoggedIn, addBorrower);
router.get("/borrowers", isLoggedIn, getBorrower);
router.get("/borrowers/:id", isLoggedIn, showBorrower);
router.patch("/borrowers/:id", isLoggedIn, editBorrower);
router.delete("/borrowers/:id", isLoggedIn, deleteBorrower);

module.exports = router;
