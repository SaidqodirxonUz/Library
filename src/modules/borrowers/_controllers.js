const express = require("express");
const httpValidator = require("../../shared/http-validator");
const { addBorrowerSchema, patchBorrowerSchema } = require("./_schemas");
const addBorrowerS = require("./add-borrower");
const editBorrowerS = require("./edit-borrower");
const showBorrowerS = require("./show-borrower");
const removeBorrower = require("./remove-borrower");
const allBorrowers = require("./all-borrower");
const { UnauthorizedError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const addBorrower = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, addBorrowerSchema);

    const result = await addBorrowerS(req.body);

    res.status(200).json({
      success: result, // Corrected the typo "succes" to "success"
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

const editBorrower = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchBorrowerSchema);
    const result = await editBorrowerS({
      id: req.params.id,
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

const showBorrower = async (req, res, next) => {
  try {
    console.log("Borrower ID from req.params:", req.params.id);

    const result = await showBorrowerS({ id: req.params.id });

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

const getBorrower = async (req, res, next) => {
  try {
    // Extract the query parameters from req.query
    const { q, sort, filters, page, limit } = req.query;

    // Prepare the query object to pass to the allBorrowers function
    const query = {
      q,
      sort: sort ? { by: sort.by, order: sort.order } : undefined,
      filters: filters ? { is_deleted: filters.is_deleted } : undefined,
      page,
      limit,
    };

    // Call the allBorrowers function with the query
    const result = await allBorrowers(query);

    // Return the admins and pagination information in the response
    res.status(200).json({
      data: result,
      // page: result.page,
      // totalPages: result.totalPages,
      // totalItems: result.totalItems,
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

const deleteBorrower = async (req, res, next) => {
  try {
    const result = await removeBorrower({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBorrower,
  editBorrower,
  showBorrower,
  deleteBorrower,
  getBorrower,
};
