const Joi = require('joi');

exports.registerValidationSchema = Joi.object({
  username: Joi.string().trim().required().min(2).max(16).messages({
    'string.empty': "Le champ nom d'utilisateur est obligatoire.",
    'string.min': "Le nom d'utilisateur doit comporter au moins 2 caractères.",
    'string.max':
      "Le nom d'utilisateur doit comporter un maximum de 16 caractères.",
  }),
  email: Joi.string()
    .trim()
    .pattern(
      /^[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)*@[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)+$/
    )
    .required()
    .messages({
      'string.pattern.base': 'Veuillez renseigner une adresse email valide.',
      'string.empty': 'Le champ email est obligatoire.',
    }),
  password: Joi.string().required().min(6).max(18).messages({
    'string.empty': 'Le champ mot de passe est obligatoire.',
    'string.min': 'Le mot de passe doit comporter au moins 6 caractères.',
    'string.max': 'Le mot de passe doit comporter un maximum de 18 caractères.',
  }),
});

exports.loginValidationSchema = Joi.object({
  email: Joi.string().trim().required().messages({
    'string.empty': 'Le champ email est obligatoire.',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Le champ mot de passe est obligatoire.',
  }),
});
