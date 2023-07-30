const Joi = require("joi");

exports.postRegisterAdminSchema = {
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    // is_super: true,
  }),
};

exports.postLoginAdminSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

exports.patchMeSchema = {
  body: Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
  }),
};

exports.showAdminSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.patchAdminSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
  }),
};

exports.updatePasswordSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    password: Joi.string().required(),
  }),
};

exports.deleteAdminSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
