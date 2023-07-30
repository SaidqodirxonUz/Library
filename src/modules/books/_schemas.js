const Joi = require("joi");

exports.addBookSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    publisher: Joi.string().required(),
    author: Joi.string().required(),
    copies: Joi.string().required(),
  }),
};

// exports.showBookSchema = {
//   params: Joi.object({
//     id: Joi.string(),
//   }),
// };

exports.patchBookSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    title: Joi.string(),
    publisher: Joi.string(),
    author: Joi.string(),
    copies: Joi.string(),
  }),
};

// exports.deleteBookSchmea = {
//   params: Joi.object({
//     id: Joi.string(),
//   }),
// };
