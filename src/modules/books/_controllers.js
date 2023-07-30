const express = require("express");
const httpValidator = require("../../shared/http-validator");
const { addBookSchema, patchBookSchema } = require("./_schemas");
const addBookS = require("./add-book");
const editBookS = require("./edit-book");
const showBookS = require("./show-book");
const removeBookS = require("./remove-book");
const allBookS = require("./all-book");
const { UnauthorizedError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const addBook = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, addBookSchema);

    const result = await addBookS(req.body);

    res.status(200).json({
      success: result,
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

const editBook = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchBookSchema);
    const result = await editBookS({
      id: req.params.id,
      ...req.body,
    });

    res.status(200).json({
      success: result, // Corrected the key from "succes" to "success"
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

const showBook = async (req, res, next) => {
  try {
    console.log("Book ID from req.params:", req.params.id);

    const result = await showBookS({ id: req.params.id });

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

const getBooks = async (req, res, next) => {
  try {
    // Extract the query parameters from req.query
    const { q, sort, filters, page, limit } = req.query;

    // Prepare the query object to pass to the allBooks middleware
    const query = {
      q,
      sort: sort ? { by: sort.by, order: sort.order } : undefined,
      filters: filters ? { is_deleted: filters.is_deleted } : undefined,
      page,
      limit,
    };

    // Call the allBooks middleware with the query
    const result = await allBookS(query);

    // Return the books and pagination information in the response
    res.status(200).json({
      data: result.books,
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

const deleteBook = async (req, res, next) => {
  try {
    const result = await removeBookS({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBook,
  editBook,
  showBook,
  deleteBook,
  getBooks,
};
