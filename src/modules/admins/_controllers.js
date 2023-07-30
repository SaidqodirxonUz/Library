const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postRegisterAdminSchema,
  postLoginAdminSchema,
  patchMeSchema,
} = require("./_schemas");
const addAdmin = require("./add-admin");
const loginAdmin = require("./login-admin");
const editAdminS = require("./edit-admin");
const showAdmin = require("./show-admin");
const removeAdmin = require("./remove-admin");
const allAdmins = require("./all-admins");
const { UnauthorizedError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postRegisterAdmin = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postRegisterAdminSchema);

    const result = await addAdmin(req.body);

    res.status(201).json({
      succes: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postLoginAdmin = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postLoginAdminSchema);

    const result = await loginAdmin(req.body);

    res.status(200).json({
      token: result,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const editAdmin = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchMeSchema);
    const result = await editAdminS({
      id: req.params.id || req.user.id,
      ...req.body,
    });

    res.status(200).json({
      succes: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const getMe = async (req, res, next) => {
  try {
    const result = await showAdmin({ id: req.user.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const getAdmins = async (req, res, next) => {
  try {
    // Extract the query parameters from req.query
    const { q, sort, filters, page, limit } = req.query;

    // Prepare the query object to pass to the allAdmins function
    const query = {
      q,
      sort: sort ? { by: sort.by, order: sort.order } : undefined,
      filters: filters ? { is_deleted: filters.is_deleted } : undefined,
      page,
      limit,
    };

    // Call the allAdmins function with the query
    const result = await allAdmins(query);

    // Return the admins and pagination information in the response
    res.status(200).json({
      data: result.admins,
      page: result.page,
      totalPages: result.totalPages,
      totalItems: result.totalItems,
    });
  } catch (error) {
    // Handle errors and pass them to the error handling middleware
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const deleteMe = async (req, res, next) => {
  try {
    const result = await removeAdmin({ id: req.user.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postRegisterAdmin,
  postLoginAdmin,
  editAdmin,
  getMe,
  deleteMe,
  getAdmins,
};
