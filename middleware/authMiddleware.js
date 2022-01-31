const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // vérifier que le json Web token existe et est vérifié
  if (token) {
    jwt.verify(token, 'token', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/session');
        console.log("401 UNAUTHORIZED");
      } else {
        console.log(decodedToken);
        console.log("200 OK");
        next();
      }
    });
  } else {
    res.redirect('/session');
    console.log("401 UNAUTHORIZED");
  }
};

// vérifier l'utilisateur actuel
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'token', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };