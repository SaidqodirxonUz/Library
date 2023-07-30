const express = require("express");
const httpValidator = require("../../shared/http-validator");
const { addPublisherSchema, patchPublisherSchema } = require("./_schemas");
const addPublisherS = require("./add-publisher");
const editPublisherS = require("./edit-publisher");
const showPublisherS = require("./show-publisher");
const removePublisherS = require("./remove-publisher");
const allPublisherS = require("./all-publisher");
const { UnauthorizedError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const addPublisher = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, addPublisherSchema);

    const result = await addPublisherS(req.body);

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

const editPublisher = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchPublisherSchema);
    const result = await editPublisherS({
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

const showPublisher = async (req, res, next) => {
  try {
    console.log("PublisherS ID from req.params:", req.params.id);

    const result = await showPublisherS({ id: req.params.id });

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

const getPublisher = async (req, res, next) => {
  try {
    // Extract the query parameters from req.query
    const { q, sort, filters, page, limit } = req.query;

    // Prepare the query object to pass to the allPublisherS function
    const query = {
      q,
      sort: sort ? { by: sort.by, order: sort.order } : undefined,
      filters: filters ? { is_deleted: filters.is_deleted } : undefined,
      page,
      limit,
    };

    // Call the allPublisherS function with the query
    const result = await allPublisherS(query);

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

const deletePublisher = async (req, res, next) => {
  try {
    const result = await removePublisherS({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPublisher,
  editPublisher,
  showPublisher,
  deletePublisher,
  getPublisher,
};
