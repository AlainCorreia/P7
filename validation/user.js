const Joi = require('joi');

exports.registerSchema = Joi.object({
  username: Joi.string().required().min(2),
  email: Joi.string()
    .pattern(
      /^[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)*@[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)+$/
    )
    .required(),
  password: Joi.string().required().min(6),
});

exports.loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
