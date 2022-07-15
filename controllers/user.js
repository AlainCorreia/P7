const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userValidation = require('../validation/user');
require('dotenv').config();

const maxAge = 7 * 24 * 60 * 60;

const createToken = (id, isAdmin) => {
  return jwt.sign(
    { userId: id, isAdmin: isAdmin },
    process.env.TOKEN_SECRET_KEY,
    {
      expiresIn: maxAge,
    }
  );
};

exports.register = (req, res, next) => {
  // Request validation
  const validation = userValidation.registerSchema.validate(req.body);
  if (validation.error)
    return res.status(400).json({ error: validation.error.details[0].message });
  // Hash password and save user to database
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: 'User created.' }))
        .catch((error) => {
          if (error.errors.email) {
            return res
              .status(400)
              .json({ error: 'Cette adresse email est déjà enregistrée.' });
          } else if (error.errors.username) {
            return res
              .status(400)
              .json({ error: "Ce nom d'utilisateur est déjà enregistré." });
          } else {
            return res.status(400).json({ error });
          }
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  // Request validation
  const validation = userValidation.loginSchema.validate(req.body);
  if (validation.error)
    return res.status(400).json({ error: validation.error.details[0].message });
  User.findOne({ email: req.body.email })
    .then((user) => {
      // If email adress not in database
      if (!user)
        return res.status(401).json({ error: 'Adresse email inconnue.' });
      // Check password
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid)
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
          const token = createToken(user._id, user.isAdmin);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(200).json({
            userId: user._id,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.logout = (req, res, next) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Déconnexion réussie' });
};

exports.getUser = (req, res, next) => {
  User.findById(req.auth.userId)
    .then((user) => {
      return res.status(200).json({
        username: user.username,
        userId: user._id,
        isAdmin: user.isAdmin,
      });
    })
    .catch((err) => console.log(err));
};
