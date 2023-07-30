const express = require("express");
const httpValidator = require("../../shared/http-validator");
const { addAuthorSchema, patchAuthorSchema } = require("./_schemas");
const addAuthorS = require("./add-author");
const editAuthorS = require("./edit-author");
const showAuthorS = require("./show-author");
const removeAuthorS = require("./remove-author");
const allAuthorS = require("./all-author");
const { UnauthorizedError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const addAuthor = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, addAuthorSchema);

    const result = await addAuthorS(req.body);

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

const editAuthor = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchAuthorSchema);
    const result = await editAuthorS({
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

const showAuthor = async (req, res, next) => {
  try {
    console.log("Author ID from req.params:", req.params.id);

    const result = await showAuthorS({ id: req.params.id });

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

const getAuthor = async (req, res, next) => {
  try {
    // Extract the query parameters from req.query
    const { q, sort, filters, page, limit } = req.query;

    // Prepare the query object to pass to the allAuthorS function
    const query = {
      q,
      sort: sort ? { by: sort.by, order: sort.order } : undefined,
      filters: filters ? { is_deleted: filters.is_deleted } : undefined,
      page,
      limit,
    };

    // Call the allAuthorS function with the query
    const result = await allAuthorS(query);

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

const deleteAuthor = async (req, res, next) => {
  try {
    const result = await removeAuthorS({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAuthor,
  editAuthor,
  showAuthor,
  deleteAuthor,
  getAuthor,
};
