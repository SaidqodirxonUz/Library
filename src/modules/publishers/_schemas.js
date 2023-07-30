const Joi = require("joi");

exports.addPublisherSchema = {
  body: Joi.object({
    full_name: Joi.string().required(),
    adress: Joi.string().required(),
    phone: Joi.string().required(),
  }),
};

// exports.showPublisherSchema = {
//   params: Joi.object({
//     id: Joi.string(),
//   }),
// };

exports.patchPublisherSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    full_name: Joi.string(),
    adress: Joi.string(),
    phone: Joi.string(),
  }),
};

// exports.deletePublisherSchmea = {
//   params: Joi.object({
//     id: Joi.string(),
//   }),
// };
