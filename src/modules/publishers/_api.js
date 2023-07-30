const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  addPublisher,
  showPublisher,
  editPublisher,
  deletePublisher,
  getPublisher,
} = require("./_controllers");
// const isSuperAdmin = require("../../shared/auth/is_super_admin");

const router = express.Router();

router.post("/publishers", isLoggedIn, addPublisher);
router.get("/publishers", isLoggedIn, getPublisher);
router.get("/publishers/:id", isLoggedIn, showPublisher);
router.patch("/publishers/:id", isLoggedIn, editPublisher);
router.delete("/publishers/:id", isLoggedIn, deletePublisher);

module.exports = router;
