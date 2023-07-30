const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postRegisterAdmin,
  postLoginAdmin,
  getMe,
  editAdmin,
  deleteMe,
  getAdmins,
} = require("./_controllers");
const isSuperAdmin = require("../../shared/auth/is_super_admin");

const router = express.Router();

router.post("/admins/register", postRegisterAdmin);
router.post("/admins/login", postLoginAdmin);
router.get("/admins/me", isLoggedIn, getMe);
router.get("/admins", isLoggedIn, getAdmins);
router.patch("/admins/me", isLoggedIn, editAdmin);
router.patch("/admins/:id", isLoggedIn, isSuperAdmin, editAdmin);

router.delete("/admins/me", isLoggedIn, deleteMe);

module.exports = router;
