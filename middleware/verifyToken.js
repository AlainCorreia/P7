const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const {userId, role} = decodedToken;
    req.auth = {userId, role}
    next()
  } catch (error) {
    return res.status(401).json({message: 'Requête non authentifiée'})
  }
};
