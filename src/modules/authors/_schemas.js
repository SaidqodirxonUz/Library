const Joi = require("joi");

exports.addAuthorSchema = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

// exports.showAuthorSchema = {
//   params: Joi.object({
//     id: Joi.string(),
//   }),
// };

exports.patchAuthorSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    name: Joi.string(),
  }),
};

// exports.deleteAuthorSchmea = {
//   params: Joi.object({
//     id: Joi.string(),
//   }),
// };
