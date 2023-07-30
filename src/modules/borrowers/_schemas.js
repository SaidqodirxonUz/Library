const Joi = require("joi");

exports.addBorrowerSchema = {
  body: Joi.object({
    full_name: Joi.string().required(),
    adress: Joi.string().required(),
    phone: Joi.string().required(),
  }),
};

// exports.showBorrowerSchema = {
//   params: Joi.object({
//     id: Joi.string(),
//   }),
// };

exports.patchBorrowerSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    full_name: Joi.string(),
    adress: Joi.string(),
    phone: Joi.string(),
  }),
};

// exports.deleteBorrowerSchmea = {
//   params: Joi.object({
//     id: Joi.string(),
//   }),
// };
