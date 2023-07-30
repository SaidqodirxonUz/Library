const express = require("express");
require("dotenv/config");
const jwt = require("jsonwebtoken");
const Admin = require("../../modules/admins/Admin");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const isSuperAdmin = async (req, res, next) => {
  try {
    // const { role } = req.user;

    console.log(req.user.id);

    const id = req.user.id;

    const admin = await Admin.findById(id);

    const adminCredentials = admin.is_super;
    console.log(adminCredentials);

    if (adminCredentials !== true) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      // Duplicate key error
      const duplicateKey = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: `The ${duplicateKey} '${error.keyValue[duplicateKey]}' already exists.`,
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = isSuperAdmin;
